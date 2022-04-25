import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import makeCallback from "./express-callback";

const app: Express = express();

const apiRoot: string = process.env.DM_API_ROOT || 'api';

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.set({ Tk: "!" });
  next();
});

/*app.post(`${apiRoot}/comments`, makeCallback(postComment));
app.delete(`${apiRoot}/comments/:id`, makeCallback(deleteComment));
app.delete(`${apiRoot}/comments`, makeCallback(deleteComment));
app.patch(`${apiRoot}/comments/:id`, makeCallback(patchComment));
app.patch(`${apiRoot}/comments`, makeCallback(patchComment));
app.get(`${apiRoot}/comments`, makeCallback(getComments));
app.use(makeCallback(notFound));*/

export default app;