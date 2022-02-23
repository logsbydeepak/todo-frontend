import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      res.setHeader(
        "Set-Cookie",
        serialize("auth", "true", {
          path: "/",
          httpOnly: true,
          maxAge: 86400000 * 90,
        })
      );
      res.status(200);
      res.send({});
      break;

    case "DELETE":
      res.setHeader(
        "Set-Cookie",
        serialize("auth", "true", { path: "/", httpOnly: true, maxAge: -1 })
      );
      res.status(200);
      res.send({});

    default:
      res.status(404).send({ data: 404 });
      break;
  }
};
