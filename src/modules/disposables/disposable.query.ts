import { knex } from "@query-builder/knex-builder";
import { domainParser } from "@utils/helpers/domain.helper";

import type { Disposable } from "./interfaces/disposable.interface";

export type DisposableOptions = {
  email: string;
};

/**
 * @class DisposableQuery
 */
export class DisposableQuery {
  public constructor() {}

  async disposable({ email }: DisposableOptions) {
    const domain = domainParser(email);

    const disposable = await knex<Disposable>("disposables")
      .select("*")
      .where({ domain })
      .first();

    return disposable ?? null;
  }
}
