import { BACKEND_URL } from "../constants/api";

export function userPageLoader({ params: { id } }) {
  return fetch(`${BACKEND_URL}/api/v1/users/${id}`);
}
