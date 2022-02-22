import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  const pahtName = req.nextUrl.pathname.toLocaleLowerCase();
  const authCookie = req.cookies.auth;
  const originUrl = req.nextUrl.origin;

  if (pahtName === "/login" || pahtName === "/signup") {
    if (authCookie === "true") {
      return Response.redirect(originUrl);
    }
  }

  if (pahtName === "/user") {
    if (authCookie !== "true") {
      return Response.redirect(originUrl);
    }
  }
};
