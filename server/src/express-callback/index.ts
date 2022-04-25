import { Request, Response } from "express";
import { HttpResponse } from '../interfaces/index';

export default function makeExpressCallback(controller: Function) {
  return (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      path: req.path,
      ip: req.ip,
      query: req.query,
      method: req.method,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    controller(httpRequest)
      .then((httpResponse: HttpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(() =>
        res.status(500).send({ error: "An unkown error occurred." })
      );
  };
};