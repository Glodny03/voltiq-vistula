import { BACKEND_URL } from "../constants/api";

export async function listingDetailsLoader({ params: { id } }) {
  const res = await fetch(`${BACKEND_URL}/api/v1/listings/${id}`);

  if (!res.ok) {
    throw new Response("Not Found", { status: 404 });
  }

  const data = await res.json();

  if (
    !data ||
    !data._id ||
    data.status === "sold" ||
    data.status === "hidden"
  ) {
    throw new Response("Not Found", { status: 404 });
  }

  return data;
}
