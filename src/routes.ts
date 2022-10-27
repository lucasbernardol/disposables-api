import { Router } from "express";
import { DisposableRouter } from "@modules/disposables/disposable.router";

const routes = Router();

/**
 * - Path: "/v1/disposables?email=root.as@temp-mail.org"
 */
routes.use("/api/v1", DisposableRouter);

export { routes };
