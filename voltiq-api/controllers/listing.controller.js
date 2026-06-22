import mongoose from "mongoose";

import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

const LISTING_STATUSES = ["active", "sold", "hidden"];
const DEFAULT_LISTING_STATUS = "active";
const DEFAULT_LATEST_LIMIT = 10;
const DEFAULT_RANDOM_LIMIT = 4;
const DEFAULT_SEARCH_LIMIT = 20;
const DEFAULT_PAGE = 1;
const MAX_LATEST_LIMIT = 30;
const MAX_RANDOM_LIMIT = 20;
const NEW_CAR_MILEAGE_LIMIT = 1000;

const SERVER_ERROR_RESPONSE = { message: "Wystąpił błąd serwera" };
const INVALID_STATUS_RESPONSE = { message: "Nieprawidłowy parametr statusu" };

const parseNumber = (value, fallback) => parseInt(value, 10) || fallback;

const limitToMax = (value, maxValue) => Math.min(value, maxValue);

const validateStatus = (status) => LISTING_STATUSES.includes(status);

const createValidationErrorMap = (validationError) =>
  Object.entries(validationError.errors).reduce(
    (errors, [field, error]) => ({
      ...errors,
      [field]: error.message,
    }),
    {},
  );

const addRangeFilter = (filters, field, operator, value) => {
  if (!value) {
    return;
  }

  filters[field] = filters[field] || {};
  filters[field][operator] = parseInt(value, 10);
};

const addExactFilter = (filters, field, value) => {
  if (value) {
    filters[field] = value;
  }
};

const addRegexFilter = (filters, field, value) => {
  if (value) {
    filters[field] = { $regex: value, $options: "i" };
  }
};

const applyConditionFilter = (filters, condition) => {
  if (condition === "new") {
    filters.mileage = { $lte: NEW_CAR_MILEAGE_LIMIT };
  }

  if (condition === "used") {
    filters.mileage = { $gt: NEW_CAR_MILEAGE_LIMIT };
  }
};

const createStatusFilter = (req) => ({
  status: req.query.status || DEFAULT_LISTING_STATUS,
});

const createSearchFilters = (queryParams) => {
  const filters = {};

  addExactFilter(filters, "brand", queryParams.brand);
  addRegexFilter(filters, "model", queryParams.model);
  addRegexFilter(filters, "city", queryParams.city);
  addExactFilter(filters, "voivodeship", queryParams.voivodeship);
  addExactFilter(filters, "bodyType", queryParams.bodyType);
  addExactFilter(filters, "driveType", queryParams.driveType);
  addExactFilter(filters, "sellerType", queryParams.sellerType);
  addExactFilter(filters, "batteryType", queryParams.batteryType);

  filters.status = queryParams.status || DEFAULT_LISTING_STATUS;

  addRangeFilter(filters, "year", "$gte", queryParams.minYear);
  addRangeFilter(filters, "year", "$lte", queryParams.maxYear);

  addRangeFilter(filters, "mileage", "$gte", queryParams.minMileage);
  addRangeFilter(filters, "mileage", "$lte", queryParams.maxMileage);

  addRangeFilter(filters, "price", "$gte", queryParams.minPrice);
  addRangeFilter(filters, "price", "$lte", queryParams.maxPrice);

  addRangeFilter(filters, "rangeKm", "$gte", queryParams.minRange);
  addRangeFilter(filters, "rangeKm", "$lte", queryParams.maxRange);

  addRangeFilter(filters, "powerHP", "$gte", queryParams.minPower);
  addRangeFilter(filters, "powerHP", "$lte", queryParams.maxPower);

  return filters;
};

const mapFilesToImageUrls = (files) =>
  files.map((file) => `/img/cars/${file.filename}`);

const createListingPayload = (body, imageUrls, userRef) => ({
  title: body.title,
  description: body.description,
  price: body.price,
  brand: body.brand,
  model: body.model,
  year: body.year,
  mileage: body.mileage,
  city: body.city,
  voivodeship: body.voivodeship,
  bodyType: body.bodyType,
  transmission: body.transmission,
  driveType: body.driveType,
  powerHP: body.powerHP,
  batteryCapacityKWh: body.batteryCapacityKWh,
  batteryType: body.batteryType,
  rangeKm: body.rangeKm,
  chargingPowerDC: body.chargingPowerDC,
  sellerType: body.sellerType,
  status: body.status,
  isBatteryOwned: body.isBatteryOwned,
  accidentFree: body.accidentFree,
  serviceHistory: body.serviceHistory,
  vatInvoice: body.vatInvoice,
  imageUrls,
  userRef,
});

const getLatestListings = async (req, res) => {
  try {
    const limit = limitToMax(
      parseNumber(req.query.limit, DEFAULT_LATEST_LIMIT),
      MAX_LATEST_LIMIT,
    );

    const filters = createStatusFilter(req);

    if (!validateStatus(filters.status)) {
      return res.status(400).json(INVALID_STATUS_RESPONSE);
    }

    applyConditionFilter(filters, req.query.condition);

    const listings = await Listing.find(filters)
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.status(200).json(listings);
  } catch (error) {
    console.error("Błąd podczas pobierania najnowszych listingów:", error);

    return res.status(500).json(SERVER_ERROR_RESPONSE);
  }
};

const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("userRef");

    if (!listing) {
      return res.status(404).json({ message: "Nie znaleziono oferty" });
    }

    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRandomListings = async (req, res) => {
  try {
    const limit = limitToMax(
      parseNumber(req.query.limit, DEFAULT_RANDOM_LIMIT),
      MAX_RANDOM_LIMIT,
    );

    const filters = createStatusFilter(req);

    if (!validateStatus(filters.status)) {
      return res.status(400).json(INVALID_STATUS_RESPONSE);
    }

    if (req.query.excludeId) {
      filters._id = {
        $ne: new mongoose.Types.ObjectId(req.query.excludeId),
      };
    }

    const listings = await Listing.aggregate([
      { $match: filters },
      { $sample: { size: limit } },
    ]);

    return res.status(200).json(listings);
  } catch (error) {
    console.error("Błąd podczas pobierania losowych listingów:", error);

    return res.status(500).json(SERVER_ERROR_RESPONSE);
  }
};

const searchListings = async (req, res) => {
  try {
    const filters = createSearchFilters(req.query);
    const page = parseNumber(req.query.page, DEFAULT_PAGE);
    const limit = parseNumber(req.query.limit, DEFAULT_SEARCH_LIMIT);
    const skip = (page - 1) * limit;

    const listings = await Listing.find(filters)
      .populate("userRef")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Listing.countDocuments(filters);

    return res.status(200).json({
      listings,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Błąd podczas wyszukiwania ofert:", error);

    return res.status(500).json(SERVER_ERROR_RESPONSE);
  }
};

const createListing = async (req, res) => {
  try {
    const userRef = req.user._id;
    const user = await User.findById(userRef);

    if (!user) {
      return res
        .status(400)
        .json({ errors: { userRef: "Użytkownik nie istnieje" } });
    }

    const imageUrls = mapFilesToImageUrls(req.files);
    const listing = new Listing(
      createListingPayload(req.body, imageUrls, userRef),
    );
    const validationError = listing.validateSync();

    if (validationError) {
      return res.status(400).json({
        errors: createValidationErrorMap(validationError),
      });
    }

    await listing.save();

    user.listings.push(listing._id);
    await user.save();

    return res.status(201).json(listing);
  } catch (error) {
    console.error("Błąd podczas dodawania oferty:", error);

    return res.status(500).json(SERVER_ERROR_RESPONSE);
  }
};

export {
  getLatestListings,
  getListing,
  getRandomListings,
  searchListings,
  createListing,
};
