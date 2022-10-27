import { Router } from "express";
import { celebrate } from "celebrate";

import { DisposableController } from "./disposable.controller";
import { Query } from "./disposable.schema";

const routes = Router();

const controller = new DisposableController();

/**
 * - Path: "/api/v1/disposables?email=root.as@temp-mail.org"
 */
routes.get("/disposables", celebrate({ query: Query }), controller.disposable);

export { routes as DisposableRouter };
