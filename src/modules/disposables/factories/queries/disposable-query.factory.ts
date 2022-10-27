import type { knex as Knex } from "@query-builder/knex-builder";

import { DisposableQuery } from "../../disposable.query";

// @FIXME: Real world - pass knext object

export class DisposableQueryFactory {
  static query(knex?: typeof Knex) {
    // prettier-ignore
    return new DisposableQuery(
      /** pass knex */
    )
  }
}
