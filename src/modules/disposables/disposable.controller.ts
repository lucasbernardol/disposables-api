import type { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

// @ts-ignore
import { version } from "../../../package.json";

// prettier-ignore
import { 
  DisposableQueryFactory 
} from "./factories/queries/disposable-query.factory";

type ReplyBody<T = any> = T | null;

type ReplyFunctionReturns<T> = {
  data: {
    body: ReplyBody<T>;
  };
};

type ReplyFunction = <T = any>(body: T) => ReplyFunctionReturns<T>;

const reply: ReplyFunction = (body) => ({
  // Simple response normaliation/wrapper
  $version: version,
  data: {
    body,
  },
});

/**
 * @class AppController
 */
export class DisposableController {
  public constructor() {}

  async disposable(request: Request, response: Response, next: NextFunction) {
    try {
      const { email } = request.query as { email: string };

      /** services layer */
      const queries = DisposableQueryFactory.query();

      const disposable = await queries.disposable({ email });

      // normalization
      const body = reply(disposable);

      return response.status(StatusCodes.OK).json(body);
    } catch (error) {
      return next(error);
    }
  }
}
