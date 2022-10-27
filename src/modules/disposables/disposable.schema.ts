import Joi from "joi";

import type { DisposableOptions } from "./disposable.query";

export const Query = Joi.object<DisposableOptions>({
  email: Joi.string().trim().lowercase().email().min(8).max(1024).required(),
});
