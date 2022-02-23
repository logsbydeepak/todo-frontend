import { serialize } from "cookie";

export const createAuthCookie = () => {
  document.cookie = serialize("auth", "true", {
    path: "/",
    maxAge: 86400000 * 90,
  });
};

export const clearAuthCookie = () => {
  document.cookie = serialize("auth", "true", {
    path: "/",
    maxAge: -1,
  });
};
