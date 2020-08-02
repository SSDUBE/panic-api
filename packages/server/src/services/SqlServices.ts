import {Raw} from 'knex';

// import Context from "../context";
import {knex} from '../db';
// import tracer from "../tracer";

export default class SqlService {
  public static async raw(
    // context: Context,
    sql: string,
    bindings?: any
  ): Promise<Raw> {
    // const span = ''
    // tracer.startSpan("knex raw query", {
    //   childOf: context.span,
    //   tags: {
    //     sql
    //   }
    // });

    try {
      return await knex.raw(sql, bindings);
    } catch (ex) {
      // span.setTag("error", true);

      // span.log({
      //   event: "error",
      //   message: ex.message,
      //   stack: ex.stack
      // });

      throw ex;
    } finally {
      // span.finish();
    }
  }
}
