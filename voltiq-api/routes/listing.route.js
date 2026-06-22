import { Router } from "express";
import path from "path";

import {
  createListing,
  getLatestListings,
  getListing,
  getRandomListings,
  searchListings,
} from "../controllers/listing.controller.js";
import createUploadMiddleware from "../utils/imgFileUpload.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const listingRouter = Router();

const uploadListingImages = createUploadMiddleware(
  path.join("public", "img", "cars"),
).array("images", 10);

listingRouter.post("/", verifyUserToken, uploadListingImages, createListing);

listingRouter.get("/search", searchListings);
listingRouter.get("/latest", getLatestListings);
listingRouter.get("/random", getRandomListings);
listingRouter.get("/:id", getListing);

export default listingRouter;
