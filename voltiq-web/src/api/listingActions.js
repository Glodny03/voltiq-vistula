import { BACKEND_URL } from "../constants/api";

export const getLatestListings = async (
  limit = 5,
  status = "active",
  condition,
) => {
  try {
    let url = `${BACKEND_URL}/api/v1/listings/latest?limit=${limit}&status=${status}`;

    if (condition) {
      url += `&condition=${condition}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Błąd podczas pobierania najnowszych ogłoszeń.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const addListingAction = async (listingData) => {
  return fetch(`${BACKEND_URL}/api/v1/listings/`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    body: listingData,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateListingAction = async (listingData) => {
  return fetch(`${BACKEND_URL}/api/v1/listings/`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    body: listingData,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const finishListingAction = async (id) => {
  return fetch(`${BACKEND_URL}/api/v1/listings/finish`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getListing = async (id) => {
  return fetch(`${BACKEND_URL}/api/v1/listings/${id}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getRandomListings = async (
  limit = 4,
  status = "active",
  excludeId,
) => {
  try {
    let url = `${BACKEND_URL}/api/v1/listings/random?limit=${limit}&status=${status}`;

    if (excludeId) {
      url += `&excludeId=${excludeId}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Błąd podczas pobierania losowych ogłoszeń.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
