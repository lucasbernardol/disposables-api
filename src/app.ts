import express from "express";
import cors from "cors";

import morgan from "morgan";
import helmet from "helmet";

import { errors } from "celebrate";

import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());

app.use(cors());

app.use(morgan("dev"));

app.use(routes);

app.use(errors()); /** Validation ERRORS with celebrate */

export { app };
