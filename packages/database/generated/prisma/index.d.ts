
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model FacebookAuth
 * 
 */
export type FacebookAuth = $Result.DefaultSelection<Prisma.$FacebookAuthPayload>
/**
 * Model FacebookAdAccount
 * 
 */
export type FacebookAdAccount = $Result.DefaultSelection<Prisma.$FacebookAdAccountPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Messages
 * const messages = await prisma.message.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Messages
   * const messages = await prisma.message.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.facebookAuth`: Exposes CRUD operations for the **FacebookAuth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FacebookAuths
    * const facebookAuths = await prisma.facebookAuth.findMany()
    * ```
    */
  get facebookAuth(): Prisma.FacebookAuthDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.facebookAdAccount`: Exposes CRUD operations for the **FacebookAdAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FacebookAdAccounts
    * const facebookAdAccounts = await prisma.facebookAdAccount.findMany()
    * ```
    */
  get facebookAdAccount(): Prisma.FacebookAdAccountDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Message: 'Message',
    FacebookAuth: 'FacebookAuth',
    FacebookAdAccount: 'FacebookAdAccount'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "message" | "facebookAuth" | "facebookAdAccount"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      FacebookAuth: {
        payload: Prisma.$FacebookAuthPayload<ExtArgs>
        fields: Prisma.FacebookAuthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FacebookAuthFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FacebookAuthFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload>
          }
          findFirst: {
            args: Prisma.FacebookAuthFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FacebookAuthFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload>
          }
          findMany: {
            args: Prisma.FacebookAuthFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload>[]
          }
          create: {
            args: Prisma.FacebookAuthCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload>
          }
          createMany: {
            args: Prisma.FacebookAuthCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FacebookAuthCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload>[]
          }
          delete: {
            args: Prisma.FacebookAuthDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload>
          }
          update: {
            args: Prisma.FacebookAuthUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload>
          }
          deleteMany: {
            args: Prisma.FacebookAuthDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FacebookAuthUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FacebookAuthUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload>[]
          }
          upsert: {
            args: Prisma.FacebookAuthUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAuthPayload>
          }
          aggregate: {
            args: Prisma.FacebookAuthAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFacebookAuth>
          }
          groupBy: {
            args: Prisma.FacebookAuthGroupByArgs<ExtArgs>
            result: $Utils.Optional<FacebookAuthGroupByOutputType>[]
          }
          count: {
            args: Prisma.FacebookAuthCountArgs<ExtArgs>
            result: $Utils.Optional<FacebookAuthCountAggregateOutputType> | number
          }
        }
      }
      FacebookAdAccount: {
        payload: Prisma.$FacebookAdAccountPayload<ExtArgs>
        fields: Prisma.FacebookAdAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FacebookAdAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FacebookAdAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload>
          }
          findFirst: {
            args: Prisma.FacebookAdAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FacebookAdAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload>
          }
          findMany: {
            args: Prisma.FacebookAdAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload>[]
          }
          create: {
            args: Prisma.FacebookAdAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload>
          }
          createMany: {
            args: Prisma.FacebookAdAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FacebookAdAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload>[]
          }
          delete: {
            args: Prisma.FacebookAdAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload>
          }
          update: {
            args: Prisma.FacebookAdAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload>
          }
          deleteMany: {
            args: Prisma.FacebookAdAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FacebookAdAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FacebookAdAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload>[]
          }
          upsert: {
            args: Prisma.FacebookAdAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacebookAdAccountPayload>
          }
          aggregate: {
            args: Prisma.FacebookAdAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFacebookAdAccount>
          }
          groupBy: {
            args: Prisma.FacebookAdAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<FacebookAdAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.FacebookAdAccountCountArgs<ExtArgs>
            result: $Utils.Optional<FacebookAdAccountCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    message?: MessageOmit
    facebookAuth?: FacebookAuthOmit
    facebookAdAccount?: FacebookAdAccountOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FacebookAuthCountOutputType
   */

  export type FacebookAuthCountOutputType = {
    adAccounts: number
  }

  export type FacebookAuthCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adAccounts?: boolean | FacebookAuthCountOutputTypeCountAdAccountsArgs
  }

  // Custom InputTypes
  /**
   * FacebookAuthCountOutputType without action
   */
  export type FacebookAuthCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuthCountOutputType
     */
    select?: FacebookAuthCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FacebookAuthCountOutputType without action
   */
  export type FacebookAuthCountOutputTypeCountAdAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FacebookAdAccountWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    content: string | null
    userId: string | null
    variant: string | null
    isLoading: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    content: string | null
    userId: string | null
    variant: string | null
    isLoading: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    content: number
    userId: number
    variant: number
    isLoading: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    content?: true
    userId?: true
    variant?: true
    isLoading?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    content?: true
    userId?: true
    variant?: true
    isLoading?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    content?: true
    userId?: true
    variant?: true
    isLoading?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    content: string
    userId: string
    variant: string
    isLoading: boolean
    createdAt: Date
    updatedAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    userId?: boolean
    variant?: boolean
    isLoading?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    userId?: boolean
    variant?: boolean
    isLoading?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    userId?: boolean
    variant?: boolean
    isLoading?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    content?: boolean
    userId?: boolean
    variant?: boolean
    isLoading?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "userId" | "variant" | "isLoading" | "createdAt" | "updatedAt", ExtArgs["result"]["message"]>

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      userId: string
      variant: string
      isLoading: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly userId: FieldRef<"Message", 'String'>
    readonly variant: FieldRef<"Message", 'String'>
    readonly isLoading: FieldRef<"Message", 'Boolean'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly updatedAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
  }


  /**
   * Model FacebookAuth
   */

  export type AggregateFacebookAuth = {
    _count: FacebookAuthCountAggregateOutputType | null
    _min: FacebookAuthMinAggregateOutputType | null
    _max: FacebookAuthMaxAggregateOutputType | null
  }

  export type FacebookAuthMinAggregateOutputType = {
    id: string | null
    userId: string | null
    accessToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FacebookAuthMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    accessToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FacebookAuthCountAggregateOutputType = {
    id: number
    userId: number
    accessToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FacebookAuthMinAggregateInputType = {
    id?: true
    userId?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FacebookAuthMaxAggregateInputType = {
    id?: true
    userId?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FacebookAuthCountAggregateInputType = {
    id?: true
    userId?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FacebookAuthAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FacebookAuth to aggregate.
     */
    where?: FacebookAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookAuths to fetch.
     */
    orderBy?: FacebookAuthOrderByWithRelationInput | FacebookAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FacebookAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookAuths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FacebookAuths
    **/
    _count?: true | FacebookAuthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FacebookAuthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FacebookAuthMaxAggregateInputType
  }

  export type GetFacebookAuthAggregateType<T extends FacebookAuthAggregateArgs> = {
        [P in keyof T & keyof AggregateFacebookAuth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFacebookAuth[P]>
      : GetScalarType<T[P], AggregateFacebookAuth[P]>
  }




  export type FacebookAuthGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FacebookAuthWhereInput
    orderBy?: FacebookAuthOrderByWithAggregationInput | FacebookAuthOrderByWithAggregationInput[]
    by: FacebookAuthScalarFieldEnum[] | FacebookAuthScalarFieldEnum
    having?: FacebookAuthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FacebookAuthCountAggregateInputType | true
    _min?: FacebookAuthMinAggregateInputType
    _max?: FacebookAuthMaxAggregateInputType
  }

  export type FacebookAuthGroupByOutputType = {
    id: string
    userId: string
    accessToken: string
    createdAt: Date
    updatedAt: Date
    _count: FacebookAuthCountAggregateOutputType | null
    _min: FacebookAuthMinAggregateOutputType | null
    _max: FacebookAuthMaxAggregateOutputType | null
  }

  type GetFacebookAuthGroupByPayload<T extends FacebookAuthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FacebookAuthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FacebookAuthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FacebookAuthGroupByOutputType[P]>
            : GetScalarType<T[P], FacebookAuthGroupByOutputType[P]>
        }
      >
    >


  export type FacebookAuthSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adAccounts?: boolean | FacebookAuth$adAccountsArgs<ExtArgs>
    _count?: boolean | FacebookAuthCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facebookAuth"]>

  export type FacebookAuthSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["facebookAuth"]>

  export type FacebookAuthSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["facebookAuth"]>

  export type FacebookAuthSelectScalar = {
    id?: boolean
    userId?: boolean
    accessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FacebookAuthOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "accessToken" | "createdAt" | "updatedAt", ExtArgs["result"]["facebookAuth"]>
  export type FacebookAuthInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adAccounts?: boolean | FacebookAuth$adAccountsArgs<ExtArgs>
    _count?: boolean | FacebookAuthCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FacebookAuthIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FacebookAuthIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FacebookAuthPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FacebookAuth"
    objects: {
      adAccounts: Prisma.$FacebookAdAccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      accessToken: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["facebookAuth"]>
    composites: {}
  }

  type FacebookAuthGetPayload<S extends boolean | null | undefined | FacebookAuthDefaultArgs> = $Result.GetResult<Prisma.$FacebookAuthPayload, S>

  type FacebookAuthCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FacebookAuthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FacebookAuthCountAggregateInputType | true
    }

  export interface FacebookAuthDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FacebookAuth'], meta: { name: 'FacebookAuth' } }
    /**
     * Find zero or one FacebookAuth that matches the filter.
     * @param {FacebookAuthFindUniqueArgs} args - Arguments to find a FacebookAuth
     * @example
     * // Get one FacebookAuth
     * const facebookAuth = await prisma.facebookAuth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FacebookAuthFindUniqueArgs>(args: SelectSubset<T, FacebookAuthFindUniqueArgs<ExtArgs>>): Prisma__FacebookAuthClient<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FacebookAuth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FacebookAuthFindUniqueOrThrowArgs} args - Arguments to find a FacebookAuth
     * @example
     * // Get one FacebookAuth
     * const facebookAuth = await prisma.facebookAuth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FacebookAuthFindUniqueOrThrowArgs>(args: SelectSubset<T, FacebookAuthFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FacebookAuthClient<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FacebookAuth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAuthFindFirstArgs} args - Arguments to find a FacebookAuth
     * @example
     * // Get one FacebookAuth
     * const facebookAuth = await prisma.facebookAuth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FacebookAuthFindFirstArgs>(args?: SelectSubset<T, FacebookAuthFindFirstArgs<ExtArgs>>): Prisma__FacebookAuthClient<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FacebookAuth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAuthFindFirstOrThrowArgs} args - Arguments to find a FacebookAuth
     * @example
     * // Get one FacebookAuth
     * const facebookAuth = await prisma.facebookAuth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FacebookAuthFindFirstOrThrowArgs>(args?: SelectSubset<T, FacebookAuthFindFirstOrThrowArgs<ExtArgs>>): Prisma__FacebookAuthClient<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FacebookAuths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAuthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FacebookAuths
     * const facebookAuths = await prisma.facebookAuth.findMany()
     * 
     * // Get first 10 FacebookAuths
     * const facebookAuths = await prisma.facebookAuth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const facebookAuthWithIdOnly = await prisma.facebookAuth.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FacebookAuthFindManyArgs>(args?: SelectSubset<T, FacebookAuthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FacebookAuth.
     * @param {FacebookAuthCreateArgs} args - Arguments to create a FacebookAuth.
     * @example
     * // Create one FacebookAuth
     * const FacebookAuth = await prisma.facebookAuth.create({
     *   data: {
     *     // ... data to create a FacebookAuth
     *   }
     * })
     * 
     */
    create<T extends FacebookAuthCreateArgs>(args: SelectSubset<T, FacebookAuthCreateArgs<ExtArgs>>): Prisma__FacebookAuthClient<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FacebookAuths.
     * @param {FacebookAuthCreateManyArgs} args - Arguments to create many FacebookAuths.
     * @example
     * // Create many FacebookAuths
     * const facebookAuth = await prisma.facebookAuth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FacebookAuthCreateManyArgs>(args?: SelectSubset<T, FacebookAuthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FacebookAuths and returns the data saved in the database.
     * @param {FacebookAuthCreateManyAndReturnArgs} args - Arguments to create many FacebookAuths.
     * @example
     * // Create many FacebookAuths
     * const facebookAuth = await prisma.facebookAuth.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FacebookAuths and only return the `id`
     * const facebookAuthWithIdOnly = await prisma.facebookAuth.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FacebookAuthCreateManyAndReturnArgs>(args?: SelectSubset<T, FacebookAuthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FacebookAuth.
     * @param {FacebookAuthDeleteArgs} args - Arguments to delete one FacebookAuth.
     * @example
     * // Delete one FacebookAuth
     * const FacebookAuth = await prisma.facebookAuth.delete({
     *   where: {
     *     // ... filter to delete one FacebookAuth
     *   }
     * })
     * 
     */
    delete<T extends FacebookAuthDeleteArgs>(args: SelectSubset<T, FacebookAuthDeleteArgs<ExtArgs>>): Prisma__FacebookAuthClient<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FacebookAuth.
     * @param {FacebookAuthUpdateArgs} args - Arguments to update one FacebookAuth.
     * @example
     * // Update one FacebookAuth
     * const facebookAuth = await prisma.facebookAuth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FacebookAuthUpdateArgs>(args: SelectSubset<T, FacebookAuthUpdateArgs<ExtArgs>>): Prisma__FacebookAuthClient<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FacebookAuths.
     * @param {FacebookAuthDeleteManyArgs} args - Arguments to filter FacebookAuths to delete.
     * @example
     * // Delete a few FacebookAuths
     * const { count } = await prisma.facebookAuth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FacebookAuthDeleteManyArgs>(args?: SelectSubset<T, FacebookAuthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FacebookAuths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAuthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FacebookAuths
     * const facebookAuth = await prisma.facebookAuth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FacebookAuthUpdateManyArgs>(args: SelectSubset<T, FacebookAuthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FacebookAuths and returns the data updated in the database.
     * @param {FacebookAuthUpdateManyAndReturnArgs} args - Arguments to update many FacebookAuths.
     * @example
     * // Update many FacebookAuths
     * const facebookAuth = await prisma.facebookAuth.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FacebookAuths and only return the `id`
     * const facebookAuthWithIdOnly = await prisma.facebookAuth.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FacebookAuthUpdateManyAndReturnArgs>(args: SelectSubset<T, FacebookAuthUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FacebookAuth.
     * @param {FacebookAuthUpsertArgs} args - Arguments to update or create a FacebookAuth.
     * @example
     * // Update or create a FacebookAuth
     * const facebookAuth = await prisma.facebookAuth.upsert({
     *   create: {
     *     // ... data to create a FacebookAuth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FacebookAuth we want to update
     *   }
     * })
     */
    upsert<T extends FacebookAuthUpsertArgs>(args: SelectSubset<T, FacebookAuthUpsertArgs<ExtArgs>>): Prisma__FacebookAuthClient<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FacebookAuths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAuthCountArgs} args - Arguments to filter FacebookAuths to count.
     * @example
     * // Count the number of FacebookAuths
     * const count = await prisma.facebookAuth.count({
     *   where: {
     *     // ... the filter for the FacebookAuths we want to count
     *   }
     * })
    **/
    count<T extends FacebookAuthCountArgs>(
      args?: Subset<T, FacebookAuthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FacebookAuthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FacebookAuth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAuthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FacebookAuthAggregateArgs>(args: Subset<T, FacebookAuthAggregateArgs>): Prisma.PrismaPromise<GetFacebookAuthAggregateType<T>>

    /**
     * Group by FacebookAuth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAuthGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FacebookAuthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FacebookAuthGroupByArgs['orderBy'] }
        : { orderBy?: FacebookAuthGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FacebookAuthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacebookAuthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FacebookAuth model
   */
  readonly fields: FacebookAuthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FacebookAuth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FacebookAuthClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    adAccounts<T extends FacebookAuth$adAccountsArgs<ExtArgs> = {}>(args?: Subset<T, FacebookAuth$adAccountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FacebookAuth model
   */
  interface FacebookAuthFieldRefs {
    readonly id: FieldRef<"FacebookAuth", 'String'>
    readonly userId: FieldRef<"FacebookAuth", 'String'>
    readonly accessToken: FieldRef<"FacebookAuth", 'String'>
    readonly createdAt: FieldRef<"FacebookAuth", 'DateTime'>
    readonly updatedAt: FieldRef<"FacebookAuth", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FacebookAuth findUnique
   */
  export type FacebookAuthFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAuthInclude<ExtArgs> | null
    /**
     * Filter, which FacebookAuth to fetch.
     */
    where: FacebookAuthWhereUniqueInput
  }

  /**
   * FacebookAuth findUniqueOrThrow
   */
  export type FacebookAuthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAuthInclude<ExtArgs> | null
    /**
     * Filter, which FacebookAuth to fetch.
     */
    where: FacebookAuthWhereUniqueInput
  }

  /**
   * FacebookAuth findFirst
   */
  export type FacebookAuthFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAuthInclude<ExtArgs> | null
    /**
     * Filter, which FacebookAuth to fetch.
     */
    where?: FacebookAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookAuths to fetch.
     */
    orderBy?: FacebookAuthOrderByWithRelationInput | FacebookAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FacebookAuths.
     */
    cursor?: FacebookAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookAuths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FacebookAuths.
     */
    distinct?: FacebookAuthScalarFieldEnum | FacebookAuthScalarFieldEnum[]
  }

  /**
   * FacebookAuth findFirstOrThrow
   */
  export type FacebookAuthFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAuthInclude<ExtArgs> | null
    /**
     * Filter, which FacebookAuth to fetch.
     */
    where?: FacebookAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookAuths to fetch.
     */
    orderBy?: FacebookAuthOrderByWithRelationInput | FacebookAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FacebookAuths.
     */
    cursor?: FacebookAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookAuths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FacebookAuths.
     */
    distinct?: FacebookAuthScalarFieldEnum | FacebookAuthScalarFieldEnum[]
  }

  /**
   * FacebookAuth findMany
   */
  export type FacebookAuthFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAuthInclude<ExtArgs> | null
    /**
     * Filter, which FacebookAuths to fetch.
     */
    where?: FacebookAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookAuths to fetch.
     */
    orderBy?: FacebookAuthOrderByWithRelationInput | FacebookAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FacebookAuths.
     */
    cursor?: FacebookAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookAuths.
     */
    skip?: number
    distinct?: FacebookAuthScalarFieldEnum | FacebookAuthScalarFieldEnum[]
  }

  /**
   * FacebookAuth create
   */
  export type FacebookAuthCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAuthInclude<ExtArgs> | null
    /**
     * The data needed to create a FacebookAuth.
     */
    data: XOR<FacebookAuthCreateInput, FacebookAuthUncheckedCreateInput>
  }

  /**
   * FacebookAuth createMany
   */
  export type FacebookAuthCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FacebookAuths.
     */
    data: FacebookAuthCreateManyInput | FacebookAuthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FacebookAuth createManyAndReturn
   */
  export type FacebookAuthCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * The data used to create many FacebookAuths.
     */
    data: FacebookAuthCreateManyInput | FacebookAuthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FacebookAuth update
   */
  export type FacebookAuthUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAuthInclude<ExtArgs> | null
    /**
     * The data needed to update a FacebookAuth.
     */
    data: XOR<FacebookAuthUpdateInput, FacebookAuthUncheckedUpdateInput>
    /**
     * Choose, which FacebookAuth to update.
     */
    where: FacebookAuthWhereUniqueInput
  }

  /**
   * FacebookAuth updateMany
   */
  export type FacebookAuthUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FacebookAuths.
     */
    data: XOR<FacebookAuthUpdateManyMutationInput, FacebookAuthUncheckedUpdateManyInput>
    /**
     * Filter which FacebookAuths to update
     */
    where?: FacebookAuthWhereInput
    /**
     * Limit how many FacebookAuths to update.
     */
    limit?: number
  }

  /**
   * FacebookAuth updateManyAndReturn
   */
  export type FacebookAuthUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * The data used to update FacebookAuths.
     */
    data: XOR<FacebookAuthUpdateManyMutationInput, FacebookAuthUncheckedUpdateManyInput>
    /**
     * Filter which FacebookAuths to update
     */
    where?: FacebookAuthWhereInput
    /**
     * Limit how many FacebookAuths to update.
     */
    limit?: number
  }

  /**
   * FacebookAuth upsert
   */
  export type FacebookAuthUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAuthInclude<ExtArgs> | null
    /**
     * The filter to search for the FacebookAuth to update in case it exists.
     */
    where: FacebookAuthWhereUniqueInput
    /**
     * In case the FacebookAuth found by the `where` argument doesn't exist, create a new FacebookAuth with this data.
     */
    create: XOR<FacebookAuthCreateInput, FacebookAuthUncheckedCreateInput>
    /**
     * In case the FacebookAuth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FacebookAuthUpdateInput, FacebookAuthUncheckedUpdateInput>
  }

  /**
   * FacebookAuth delete
   */
  export type FacebookAuthDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAuthInclude<ExtArgs> | null
    /**
     * Filter which FacebookAuth to delete.
     */
    where: FacebookAuthWhereUniqueInput
  }

  /**
   * FacebookAuth deleteMany
   */
  export type FacebookAuthDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FacebookAuths to delete
     */
    where?: FacebookAuthWhereInput
    /**
     * Limit how many FacebookAuths to delete.
     */
    limit?: number
  }

  /**
   * FacebookAuth.adAccounts
   */
  export type FacebookAuth$adAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
    where?: FacebookAdAccountWhereInput
    orderBy?: FacebookAdAccountOrderByWithRelationInput | FacebookAdAccountOrderByWithRelationInput[]
    cursor?: FacebookAdAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FacebookAdAccountScalarFieldEnum | FacebookAdAccountScalarFieldEnum[]
  }

  /**
   * FacebookAuth without action
   */
  export type FacebookAuthDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAuth
     */
    select?: FacebookAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAuth
     */
    omit?: FacebookAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAuthInclude<ExtArgs> | null
  }


  /**
   * Model FacebookAdAccount
   */

  export type AggregateFacebookAdAccount = {
    _count: FacebookAdAccountCountAggregateOutputType | null
    _min: FacebookAdAccountMinAggregateOutputType | null
    _max: FacebookAdAccountMaxAggregateOutputType | null
  }

  export type FacebookAdAccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    name: string | null
    authId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FacebookAdAccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    name: string | null
    authId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FacebookAdAccountCountAggregateOutputType = {
    id: number
    accountId: number
    name: number
    authId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FacebookAdAccountMinAggregateInputType = {
    id?: true
    accountId?: true
    name?: true
    authId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FacebookAdAccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    name?: true
    authId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FacebookAdAccountCountAggregateInputType = {
    id?: true
    accountId?: true
    name?: true
    authId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FacebookAdAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FacebookAdAccount to aggregate.
     */
    where?: FacebookAdAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookAdAccounts to fetch.
     */
    orderBy?: FacebookAdAccountOrderByWithRelationInput | FacebookAdAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FacebookAdAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookAdAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookAdAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FacebookAdAccounts
    **/
    _count?: true | FacebookAdAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FacebookAdAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FacebookAdAccountMaxAggregateInputType
  }

  export type GetFacebookAdAccountAggregateType<T extends FacebookAdAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateFacebookAdAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFacebookAdAccount[P]>
      : GetScalarType<T[P], AggregateFacebookAdAccount[P]>
  }




  export type FacebookAdAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FacebookAdAccountWhereInput
    orderBy?: FacebookAdAccountOrderByWithAggregationInput | FacebookAdAccountOrderByWithAggregationInput[]
    by: FacebookAdAccountScalarFieldEnum[] | FacebookAdAccountScalarFieldEnum
    having?: FacebookAdAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FacebookAdAccountCountAggregateInputType | true
    _min?: FacebookAdAccountMinAggregateInputType
    _max?: FacebookAdAccountMaxAggregateInputType
  }

  export type FacebookAdAccountGroupByOutputType = {
    id: string
    accountId: string
    name: string
    authId: string
    createdAt: Date
    updatedAt: Date
    _count: FacebookAdAccountCountAggregateOutputType | null
    _min: FacebookAdAccountMinAggregateOutputType | null
    _max: FacebookAdAccountMaxAggregateOutputType | null
  }

  type GetFacebookAdAccountGroupByPayload<T extends FacebookAdAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FacebookAdAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FacebookAdAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FacebookAdAccountGroupByOutputType[P]>
            : GetScalarType<T[P], FacebookAdAccountGroupByOutputType[P]>
        }
      >
    >


  export type FacebookAdAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    name?: boolean
    authId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    facebookAuth?: boolean | FacebookAuthDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facebookAdAccount"]>

  export type FacebookAdAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    name?: boolean
    authId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    facebookAuth?: boolean | FacebookAuthDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facebookAdAccount"]>

  export type FacebookAdAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    name?: boolean
    authId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    facebookAuth?: boolean | FacebookAuthDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facebookAdAccount"]>

  export type FacebookAdAccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    name?: boolean
    authId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FacebookAdAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "name" | "authId" | "createdAt" | "updatedAt", ExtArgs["result"]["facebookAdAccount"]>
  export type FacebookAdAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    facebookAuth?: boolean | FacebookAuthDefaultArgs<ExtArgs>
  }
  export type FacebookAdAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    facebookAuth?: boolean | FacebookAuthDefaultArgs<ExtArgs>
  }
  export type FacebookAdAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    facebookAuth?: boolean | FacebookAuthDefaultArgs<ExtArgs>
  }

  export type $FacebookAdAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FacebookAdAccount"
    objects: {
      facebookAuth: Prisma.$FacebookAuthPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      name: string
      authId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["facebookAdAccount"]>
    composites: {}
  }

  type FacebookAdAccountGetPayload<S extends boolean | null | undefined | FacebookAdAccountDefaultArgs> = $Result.GetResult<Prisma.$FacebookAdAccountPayload, S>

  type FacebookAdAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FacebookAdAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FacebookAdAccountCountAggregateInputType | true
    }

  export interface FacebookAdAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FacebookAdAccount'], meta: { name: 'FacebookAdAccount' } }
    /**
     * Find zero or one FacebookAdAccount that matches the filter.
     * @param {FacebookAdAccountFindUniqueArgs} args - Arguments to find a FacebookAdAccount
     * @example
     * // Get one FacebookAdAccount
     * const facebookAdAccount = await prisma.facebookAdAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FacebookAdAccountFindUniqueArgs>(args: SelectSubset<T, FacebookAdAccountFindUniqueArgs<ExtArgs>>): Prisma__FacebookAdAccountClient<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FacebookAdAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FacebookAdAccountFindUniqueOrThrowArgs} args - Arguments to find a FacebookAdAccount
     * @example
     * // Get one FacebookAdAccount
     * const facebookAdAccount = await prisma.facebookAdAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FacebookAdAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, FacebookAdAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FacebookAdAccountClient<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FacebookAdAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAdAccountFindFirstArgs} args - Arguments to find a FacebookAdAccount
     * @example
     * // Get one FacebookAdAccount
     * const facebookAdAccount = await prisma.facebookAdAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FacebookAdAccountFindFirstArgs>(args?: SelectSubset<T, FacebookAdAccountFindFirstArgs<ExtArgs>>): Prisma__FacebookAdAccountClient<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FacebookAdAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAdAccountFindFirstOrThrowArgs} args - Arguments to find a FacebookAdAccount
     * @example
     * // Get one FacebookAdAccount
     * const facebookAdAccount = await prisma.facebookAdAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FacebookAdAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, FacebookAdAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__FacebookAdAccountClient<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FacebookAdAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAdAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FacebookAdAccounts
     * const facebookAdAccounts = await prisma.facebookAdAccount.findMany()
     * 
     * // Get first 10 FacebookAdAccounts
     * const facebookAdAccounts = await prisma.facebookAdAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const facebookAdAccountWithIdOnly = await prisma.facebookAdAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FacebookAdAccountFindManyArgs>(args?: SelectSubset<T, FacebookAdAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FacebookAdAccount.
     * @param {FacebookAdAccountCreateArgs} args - Arguments to create a FacebookAdAccount.
     * @example
     * // Create one FacebookAdAccount
     * const FacebookAdAccount = await prisma.facebookAdAccount.create({
     *   data: {
     *     // ... data to create a FacebookAdAccount
     *   }
     * })
     * 
     */
    create<T extends FacebookAdAccountCreateArgs>(args: SelectSubset<T, FacebookAdAccountCreateArgs<ExtArgs>>): Prisma__FacebookAdAccountClient<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FacebookAdAccounts.
     * @param {FacebookAdAccountCreateManyArgs} args - Arguments to create many FacebookAdAccounts.
     * @example
     * // Create many FacebookAdAccounts
     * const facebookAdAccount = await prisma.facebookAdAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FacebookAdAccountCreateManyArgs>(args?: SelectSubset<T, FacebookAdAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FacebookAdAccounts and returns the data saved in the database.
     * @param {FacebookAdAccountCreateManyAndReturnArgs} args - Arguments to create many FacebookAdAccounts.
     * @example
     * // Create many FacebookAdAccounts
     * const facebookAdAccount = await prisma.facebookAdAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FacebookAdAccounts and only return the `id`
     * const facebookAdAccountWithIdOnly = await prisma.facebookAdAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FacebookAdAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, FacebookAdAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FacebookAdAccount.
     * @param {FacebookAdAccountDeleteArgs} args - Arguments to delete one FacebookAdAccount.
     * @example
     * // Delete one FacebookAdAccount
     * const FacebookAdAccount = await prisma.facebookAdAccount.delete({
     *   where: {
     *     // ... filter to delete one FacebookAdAccount
     *   }
     * })
     * 
     */
    delete<T extends FacebookAdAccountDeleteArgs>(args: SelectSubset<T, FacebookAdAccountDeleteArgs<ExtArgs>>): Prisma__FacebookAdAccountClient<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FacebookAdAccount.
     * @param {FacebookAdAccountUpdateArgs} args - Arguments to update one FacebookAdAccount.
     * @example
     * // Update one FacebookAdAccount
     * const facebookAdAccount = await prisma.facebookAdAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FacebookAdAccountUpdateArgs>(args: SelectSubset<T, FacebookAdAccountUpdateArgs<ExtArgs>>): Prisma__FacebookAdAccountClient<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FacebookAdAccounts.
     * @param {FacebookAdAccountDeleteManyArgs} args - Arguments to filter FacebookAdAccounts to delete.
     * @example
     * // Delete a few FacebookAdAccounts
     * const { count } = await prisma.facebookAdAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FacebookAdAccountDeleteManyArgs>(args?: SelectSubset<T, FacebookAdAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FacebookAdAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAdAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FacebookAdAccounts
     * const facebookAdAccount = await prisma.facebookAdAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FacebookAdAccountUpdateManyArgs>(args: SelectSubset<T, FacebookAdAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FacebookAdAccounts and returns the data updated in the database.
     * @param {FacebookAdAccountUpdateManyAndReturnArgs} args - Arguments to update many FacebookAdAccounts.
     * @example
     * // Update many FacebookAdAccounts
     * const facebookAdAccount = await prisma.facebookAdAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FacebookAdAccounts and only return the `id`
     * const facebookAdAccountWithIdOnly = await prisma.facebookAdAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FacebookAdAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, FacebookAdAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FacebookAdAccount.
     * @param {FacebookAdAccountUpsertArgs} args - Arguments to update or create a FacebookAdAccount.
     * @example
     * // Update or create a FacebookAdAccount
     * const facebookAdAccount = await prisma.facebookAdAccount.upsert({
     *   create: {
     *     // ... data to create a FacebookAdAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FacebookAdAccount we want to update
     *   }
     * })
     */
    upsert<T extends FacebookAdAccountUpsertArgs>(args: SelectSubset<T, FacebookAdAccountUpsertArgs<ExtArgs>>): Prisma__FacebookAdAccountClient<$Result.GetResult<Prisma.$FacebookAdAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FacebookAdAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAdAccountCountArgs} args - Arguments to filter FacebookAdAccounts to count.
     * @example
     * // Count the number of FacebookAdAccounts
     * const count = await prisma.facebookAdAccount.count({
     *   where: {
     *     // ... the filter for the FacebookAdAccounts we want to count
     *   }
     * })
    **/
    count<T extends FacebookAdAccountCountArgs>(
      args?: Subset<T, FacebookAdAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FacebookAdAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FacebookAdAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAdAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FacebookAdAccountAggregateArgs>(args: Subset<T, FacebookAdAccountAggregateArgs>): Prisma.PrismaPromise<GetFacebookAdAccountAggregateType<T>>

    /**
     * Group by FacebookAdAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookAdAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FacebookAdAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FacebookAdAccountGroupByArgs['orderBy'] }
        : { orderBy?: FacebookAdAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FacebookAdAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacebookAdAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FacebookAdAccount model
   */
  readonly fields: FacebookAdAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FacebookAdAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FacebookAdAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    facebookAuth<T extends FacebookAuthDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FacebookAuthDefaultArgs<ExtArgs>>): Prisma__FacebookAuthClient<$Result.GetResult<Prisma.$FacebookAuthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FacebookAdAccount model
   */
  interface FacebookAdAccountFieldRefs {
    readonly id: FieldRef<"FacebookAdAccount", 'String'>
    readonly accountId: FieldRef<"FacebookAdAccount", 'String'>
    readonly name: FieldRef<"FacebookAdAccount", 'String'>
    readonly authId: FieldRef<"FacebookAdAccount", 'String'>
    readonly createdAt: FieldRef<"FacebookAdAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"FacebookAdAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FacebookAdAccount findUnique
   */
  export type FacebookAdAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
    /**
     * Filter, which FacebookAdAccount to fetch.
     */
    where: FacebookAdAccountWhereUniqueInput
  }

  /**
   * FacebookAdAccount findUniqueOrThrow
   */
  export type FacebookAdAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
    /**
     * Filter, which FacebookAdAccount to fetch.
     */
    where: FacebookAdAccountWhereUniqueInput
  }

  /**
   * FacebookAdAccount findFirst
   */
  export type FacebookAdAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
    /**
     * Filter, which FacebookAdAccount to fetch.
     */
    where?: FacebookAdAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookAdAccounts to fetch.
     */
    orderBy?: FacebookAdAccountOrderByWithRelationInput | FacebookAdAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FacebookAdAccounts.
     */
    cursor?: FacebookAdAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookAdAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookAdAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FacebookAdAccounts.
     */
    distinct?: FacebookAdAccountScalarFieldEnum | FacebookAdAccountScalarFieldEnum[]
  }

  /**
   * FacebookAdAccount findFirstOrThrow
   */
  export type FacebookAdAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
    /**
     * Filter, which FacebookAdAccount to fetch.
     */
    where?: FacebookAdAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookAdAccounts to fetch.
     */
    orderBy?: FacebookAdAccountOrderByWithRelationInput | FacebookAdAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FacebookAdAccounts.
     */
    cursor?: FacebookAdAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookAdAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookAdAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FacebookAdAccounts.
     */
    distinct?: FacebookAdAccountScalarFieldEnum | FacebookAdAccountScalarFieldEnum[]
  }

  /**
   * FacebookAdAccount findMany
   */
  export type FacebookAdAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
    /**
     * Filter, which FacebookAdAccounts to fetch.
     */
    where?: FacebookAdAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookAdAccounts to fetch.
     */
    orderBy?: FacebookAdAccountOrderByWithRelationInput | FacebookAdAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FacebookAdAccounts.
     */
    cursor?: FacebookAdAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookAdAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookAdAccounts.
     */
    skip?: number
    distinct?: FacebookAdAccountScalarFieldEnum | FacebookAdAccountScalarFieldEnum[]
  }

  /**
   * FacebookAdAccount create
   */
  export type FacebookAdAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a FacebookAdAccount.
     */
    data: XOR<FacebookAdAccountCreateInput, FacebookAdAccountUncheckedCreateInput>
  }

  /**
   * FacebookAdAccount createMany
   */
  export type FacebookAdAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FacebookAdAccounts.
     */
    data: FacebookAdAccountCreateManyInput | FacebookAdAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FacebookAdAccount createManyAndReturn
   */
  export type FacebookAdAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * The data used to create many FacebookAdAccounts.
     */
    data: FacebookAdAccountCreateManyInput | FacebookAdAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FacebookAdAccount update
   */
  export type FacebookAdAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a FacebookAdAccount.
     */
    data: XOR<FacebookAdAccountUpdateInput, FacebookAdAccountUncheckedUpdateInput>
    /**
     * Choose, which FacebookAdAccount to update.
     */
    where: FacebookAdAccountWhereUniqueInput
  }

  /**
   * FacebookAdAccount updateMany
   */
  export type FacebookAdAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FacebookAdAccounts.
     */
    data: XOR<FacebookAdAccountUpdateManyMutationInput, FacebookAdAccountUncheckedUpdateManyInput>
    /**
     * Filter which FacebookAdAccounts to update
     */
    where?: FacebookAdAccountWhereInput
    /**
     * Limit how many FacebookAdAccounts to update.
     */
    limit?: number
  }

  /**
   * FacebookAdAccount updateManyAndReturn
   */
  export type FacebookAdAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * The data used to update FacebookAdAccounts.
     */
    data: XOR<FacebookAdAccountUpdateManyMutationInput, FacebookAdAccountUncheckedUpdateManyInput>
    /**
     * Filter which FacebookAdAccounts to update
     */
    where?: FacebookAdAccountWhereInput
    /**
     * Limit how many FacebookAdAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FacebookAdAccount upsert
   */
  export type FacebookAdAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the FacebookAdAccount to update in case it exists.
     */
    where: FacebookAdAccountWhereUniqueInput
    /**
     * In case the FacebookAdAccount found by the `where` argument doesn't exist, create a new FacebookAdAccount with this data.
     */
    create: XOR<FacebookAdAccountCreateInput, FacebookAdAccountUncheckedCreateInput>
    /**
     * In case the FacebookAdAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FacebookAdAccountUpdateInput, FacebookAdAccountUncheckedUpdateInput>
  }

  /**
   * FacebookAdAccount delete
   */
  export type FacebookAdAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
    /**
     * Filter which FacebookAdAccount to delete.
     */
    where: FacebookAdAccountWhereUniqueInput
  }

  /**
   * FacebookAdAccount deleteMany
   */
  export type FacebookAdAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FacebookAdAccounts to delete
     */
    where?: FacebookAdAccountWhereInput
    /**
     * Limit how many FacebookAdAccounts to delete.
     */
    limit?: number
  }

  /**
   * FacebookAdAccount without action
   */
  export type FacebookAdAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacebookAdAccount
     */
    select?: FacebookAdAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FacebookAdAccount
     */
    omit?: FacebookAdAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacebookAdAccountInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MessageScalarFieldEnum: {
    id: 'id',
    content: 'content',
    userId: 'userId',
    variant: 'variant',
    isLoading: 'isLoading',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const FacebookAuthScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    accessToken: 'accessToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FacebookAuthScalarFieldEnum = (typeof FacebookAuthScalarFieldEnum)[keyof typeof FacebookAuthScalarFieldEnum]


  export const FacebookAdAccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    name: 'name',
    authId: 'authId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FacebookAdAccountScalarFieldEnum = (typeof FacebookAdAccountScalarFieldEnum)[keyof typeof FacebookAdAccountScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    userId?: StringFilter<"Message"> | string
    variant?: StringFilter<"Message"> | string
    isLoading?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    isLoading?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    content?: StringFilter<"Message"> | string
    userId?: StringFilter<"Message"> | string
    variant?: StringFilter<"Message"> | string
    isLoading?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    isLoading?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    userId?: StringWithAggregatesFilter<"Message"> | string
    variant?: StringWithAggregatesFilter<"Message"> | string
    isLoading?: BoolWithAggregatesFilter<"Message"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type FacebookAuthWhereInput = {
    AND?: FacebookAuthWhereInput | FacebookAuthWhereInput[]
    OR?: FacebookAuthWhereInput[]
    NOT?: FacebookAuthWhereInput | FacebookAuthWhereInput[]
    id?: StringFilter<"FacebookAuth"> | string
    userId?: StringFilter<"FacebookAuth"> | string
    accessToken?: StringFilter<"FacebookAuth"> | string
    createdAt?: DateTimeFilter<"FacebookAuth"> | Date | string
    updatedAt?: DateTimeFilter<"FacebookAuth"> | Date | string
    adAccounts?: FacebookAdAccountListRelationFilter
  }

  export type FacebookAuthOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adAccounts?: FacebookAdAccountOrderByRelationAggregateInput
  }

  export type FacebookAuthWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: FacebookAuthWhereInput | FacebookAuthWhereInput[]
    OR?: FacebookAuthWhereInput[]
    NOT?: FacebookAuthWhereInput | FacebookAuthWhereInput[]
    accessToken?: StringFilter<"FacebookAuth"> | string
    createdAt?: DateTimeFilter<"FacebookAuth"> | Date | string
    updatedAt?: DateTimeFilter<"FacebookAuth"> | Date | string
    adAccounts?: FacebookAdAccountListRelationFilter
  }, "id" | "userId">

  export type FacebookAuthOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FacebookAuthCountOrderByAggregateInput
    _max?: FacebookAuthMaxOrderByAggregateInput
    _min?: FacebookAuthMinOrderByAggregateInput
  }

  export type FacebookAuthScalarWhereWithAggregatesInput = {
    AND?: FacebookAuthScalarWhereWithAggregatesInput | FacebookAuthScalarWhereWithAggregatesInput[]
    OR?: FacebookAuthScalarWhereWithAggregatesInput[]
    NOT?: FacebookAuthScalarWhereWithAggregatesInput | FacebookAuthScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FacebookAuth"> | string
    userId?: StringWithAggregatesFilter<"FacebookAuth"> | string
    accessToken?: StringWithAggregatesFilter<"FacebookAuth"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FacebookAuth"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FacebookAuth"> | Date | string
  }

  export type FacebookAdAccountWhereInput = {
    AND?: FacebookAdAccountWhereInput | FacebookAdAccountWhereInput[]
    OR?: FacebookAdAccountWhereInput[]
    NOT?: FacebookAdAccountWhereInput | FacebookAdAccountWhereInput[]
    id?: StringFilter<"FacebookAdAccount"> | string
    accountId?: StringFilter<"FacebookAdAccount"> | string
    name?: StringFilter<"FacebookAdAccount"> | string
    authId?: StringFilter<"FacebookAdAccount"> | string
    createdAt?: DateTimeFilter<"FacebookAdAccount"> | Date | string
    updatedAt?: DateTimeFilter<"FacebookAdAccount"> | Date | string
    facebookAuth?: XOR<FacebookAuthScalarRelationFilter, FacebookAuthWhereInput>
  }

  export type FacebookAdAccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    name?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    facebookAuth?: FacebookAuthOrderByWithRelationInput
  }

  export type FacebookAdAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    accountId_authId?: FacebookAdAccountAccountIdAuthIdCompoundUniqueInput
    AND?: FacebookAdAccountWhereInput | FacebookAdAccountWhereInput[]
    OR?: FacebookAdAccountWhereInput[]
    NOT?: FacebookAdAccountWhereInput | FacebookAdAccountWhereInput[]
    accountId?: StringFilter<"FacebookAdAccount"> | string
    name?: StringFilter<"FacebookAdAccount"> | string
    authId?: StringFilter<"FacebookAdAccount"> | string
    createdAt?: DateTimeFilter<"FacebookAdAccount"> | Date | string
    updatedAt?: DateTimeFilter<"FacebookAdAccount"> | Date | string
    facebookAuth?: XOR<FacebookAuthScalarRelationFilter, FacebookAuthWhereInput>
  }, "id" | "accountId_authId">

  export type FacebookAdAccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    name?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FacebookAdAccountCountOrderByAggregateInput
    _max?: FacebookAdAccountMaxOrderByAggregateInput
    _min?: FacebookAdAccountMinOrderByAggregateInput
  }

  export type FacebookAdAccountScalarWhereWithAggregatesInput = {
    AND?: FacebookAdAccountScalarWhereWithAggregatesInput | FacebookAdAccountScalarWhereWithAggregatesInput[]
    OR?: FacebookAdAccountScalarWhereWithAggregatesInput[]
    NOT?: FacebookAdAccountScalarWhereWithAggregatesInput | FacebookAdAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FacebookAdAccount"> | string
    accountId?: StringWithAggregatesFilter<"FacebookAdAccount"> | string
    name?: StringWithAggregatesFilter<"FacebookAdAccount"> | string
    authId?: StringWithAggregatesFilter<"FacebookAdAccount"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FacebookAdAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FacebookAdAccount"> | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    userId: string
    variant?: string
    isLoading?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    content: string
    userId: string
    variant?: string
    isLoading?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    variant?: StringFieldUpdateOperationsInput | string
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    variant?: StringFieldUpdateOperationsInput | string
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    content: string
    userId: string
    variant?: string
    isLoading?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    variant?: StringFieldUpdateOperationsInput | string
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    variant?: StringFieldUpdateOperationsInput | string
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacebookAuthCreateInput = {
    id?: string
    userId: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    adAccounts?: FacebookAdAccountCreateNestedManyWithoutFacebookAuthInput
  }

  export type FacebookAuthUncheckedCreateInput = {
    id?: string
    userId: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    adAccounts?: FacebookAdAccountUncheckedCreateNestedManyWithoutFacebookAuthInput
  }

  export type FacebookAuthUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adAccounts?: FacebookAdAccountUpdateManyWithoutFacebookAuthNestedInput
  }

  export type FacebookAuthUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adAccounts?: FacebookAdAccountUncheckedUpdateManyWithoutFacebookAuthNestedInput
  }

  export type FacebookAuthCreateManyInput = {
    id?: string
    userId: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FacebookAuthUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacebookAuthUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacebookAdAccountCreateInput = {
    id?: string
    accountId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    facebookAuth: FacebookAuthCreateNestedOneWithoutAdAccountsInput
  }

  export type FacebookAdAccountUncheckedCreateInput = {
    id?: string
    accountId: string
    name: string
    authId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FacebookAdAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    facebookAuth?: FacebookAuthUpdateOneRequiredWithoutAdAccountsNestedInput
  }

  export type FacebookAdAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacebookAdAccountCreateManyInput = {
    id?: string
    accountId: string
    name: string
    authId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FacebookAdAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacebookAdAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    isLoading?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    isLoading?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    isLoading?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FacebookAdAccountListRelationFilter = {
    every?: FacebookAdAccountWhereInput
    some?: FacebookAdAccountWhereInput
    none?: FacebookAdAccountWhereInput
  }

  export type FacebookAdAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FacebookAuthCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FacebookAuthMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FacebookAuthMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FacebookAuthScalarRelationFilter = {
    is?: FacebookAuthWhereInput
    isNot?: FacebookAuthWhereInput
  }

  export type FacebookAdAccountAccountIdAuthIdCompoundUniqueInput = {
    accountId: string
    authId: string
  }

  export type FacebookAdAccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    name?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FacebookAdAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    name?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FacebookAdAccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    name?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FacebookAdAccountCreateNestedManyWithoutFacebookAuthInput = {
    create?: XOR<FacebookAdAccountCreateWithoutFacebookAuthInput, FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput> | FacebookAdAccountCreateWithoutFacebookAuthInput[] | FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput[]
    connectOrCreate?: FacebookAdAccountCreateOrConnectWithoutFacebookAuthInput | FacebookAdAccountCreateOrConnectWithoutFacebookAuthInput[]
    createMany?: FacebookAdAccountCreateManyFacebookAuthInputEnvelope
    connect?: FacebookAdAccountWhereUniqueInput | FacebookAdAccountWhereUniqueInput[]
  }

  export type FacebookAdAccountUncheckedCreateNestedManyWithoutFacebookAuthInput = {
    create?: XOR<FacebookAdAccountCreateWithoutFacebookAuthInput, FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput> | FacebookAdAccountCreateWithoutFacebookAuthInput[] | FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput[]
    connectOrCreate?: FacebookAdAccountCreateOrConnectWithoutFacebookAuthInput | FacebookAdAccountCreateOrConnectWithoutFacebookAuthInput[]
    createMany?: FacebookAdAccountCreateManyFacebookAuthInputEnvelope
    connect?: FacebookAdAccountWhereUniqueInput | FacebookAdAccountWhereUniqueInput[]
  }

  export type FacebookAdAccountUpdateManyWithoutFacebookAuthNestedInput = {
    create?: XOR<FacebookAdAccountCreateWithoutFacebookAuthInput, FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput> | FacebookAdAccountCreateWithoutFacebookAuthInput[] | FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput[]
    connectOrCreate?: FacebookAdAccountCreateOrConnectWithoutFacebookAuthInput | FacebookAdAccountCreateOrConnectWithoutFacebookAuthInput[]
    upsert?: FacebookAdAccountUpsertWithWhereUniqueWithoutFacebookAuthInput | FacebookAdAccountUpsertWithWhereUniqueWithoutFacebookAuthInput[]
    createMany?: FacebookAdAccountCreateManyFacebookAuthInputEnvelope
    set?: FacebookAdAccountWhereUniqueInput | FacebookAdAccountWhereUniqueInput[]
    disconnect?: FacebookAdAccountWhereUniqueInput | FacebookAdAccountWhereUniqueInput[]
    delete?: FacebookAdAccountWhereUniqueInput | FacebookAdAccountWhereUniqueInput[]
    connect?: FacebookAdAccountWhereUniqueInput | FacebookAdAccountWhereUniqueInput[]
    update?: FacebookAdAccountUpdateWithWhereUniqueWithoutFacebookAuthInput | FacebookAdAccountUpdateWithWhereUniqueWithoutFacebookAuthInput[]
    updateMany?: FacebookAdAccountUpdateManyWithWhereWithoutFacebookAuthInput | FacebookAdAccountUpdateManyWithWhereWithoutFacebookAuthInput[]
    deleteMany?: FacebookAdAccountScalarWhereInput | FacebookAdAccountScalarWhereInput[]
  }

  export type FacebookAdAccountUncheckedUpdateManyWithoutFacebookAuthNestedInput = {
    create?: XOR<FacebookAdAccountCreateWithoutFacebookAuthInput, FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput> | FacebookAdAccountCreateWithoutFacebookAuthInput[] | FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput[]
    connectOrCreate?: FacebookAdAccountCreateOrConnectWithoutFacebookAuthInput | FacebookAdAccountCreateOrConnectWithoutFacebookAuthInput[]
    upsert?: FacebookAdAccountUpsertWithWhereUniqueWithoutFacebookAuthInput | FacebookAdAccountUpsertWithWhereUniqueWithoutFacebookAuthInput[]
    createMany?: FacebookAdAccountCreateManyFacebookAuthInputEnvelope
    set?: FacebookAdAccountWhereUniqueInput | FacebookAdAccountWhereUniqueInput[]
    disconnect?: FacebookAdAccountWhereUniqueInput | FacebookAdAccountWhereUniqueInput[]
    delete?: FacebookAdAccountWhereUniqueInput | FacebookAdAccountWhereUniqueInput[]
    connect?: FacebookAdAccountWhereUniqueInput | FacebookAdAccountWhereUniqueInput[]
    update?: FacebookAdAccountUpdateWithWhereUniqueWithoutFacebookAuthInput | FacebookAdAccountUpdateWithWhereUniqueWithoutFacebookAuthInput[]
    updateMany?: FacebookAdAccountUpdateManyWithWhereWithoutFacebookAuthInput | FacebookAdAccountUpdateManyWithWhereWithoutFacebookAuthInput[]
    deleteMany?: FacebookAdAccountScalarWhereInput | FacebookAdAccountScalarWhereInput[]
  }

  export type FacebookAuthCreateNestedOneWithoutAdAccountsInput = {
    create?: XOR<FacebookAuthCreateWithoutAdAccountsInput, FacebookAuthUncheckedCreateWithoutAdAccountsInput>
    connectOrCreate?: FacebookAuthCreateOrConnectWithoutAdAccountsInput
    connect?: FacebookAuthWhereUniqueInput
  }

  export type FacebookAuthUpdateOneRequiredWithoutAdAccountsNestedInput = {
    create?: XOR<FacebookAuthCreateWithoutAdAccountsInput, FacebookAuthUncheckedCreateWithoutAdAccountsInput>
    connectOrCreate?: FacebookAuthCreateOrConnectWithoutAdAccountsInput
    upsert?: FacebookAuthUpsertWithoutAdAccountsInput
    connect?: FacebookAuthWhereUniqueInput
    update?: XOR<XOR<FacebookAuthUpdateToOneWithWhereWithoutAdAccountsInput, FacebookAuthUpdateWithoutAdAccountsInput>, FacebookAuthUncheckedUpdateWithoutAdAccountsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FacebookAdAccountCreateWithoutFacebookAuthInput = {
    id?: string
    accountId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput = {
    id?: string
    accountId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FacebookAdAccountCreateOrConnectWithoutFacebookAuthInput = {
    where: FacebookAdAccountWhereUniqueInput
    create: XOR<FacebookAdAccountCreateWithoutFacebookAuthInput, FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput>
  }

  export type FacebookAdAccountCreateManyFacebookAuthInputEnvelope = {
    data: FacebookAdAccountCreateManyFacebookAuthInput | FacebookAdAccountCreateManyFacebookAuthInput[]
    skipDuplicates?: boolean
  }

  export type FacebookAdAccountUpsertWithWhereUniqueWithoutFacebookAuthInput = {
    where: FacebookAdAccountWhereUniqueInput
    update: XOR<FacebookAdAccountUpdateWithoutFacebookAuthInput, FacebookAdAccountUncheckedUpdateWithoutFacebookAuthInput>
    create: XOR<FacebookAdAccountCreateWithoutFacebookAuthInput, FacebookAdAccountUncheckedCreateWithoutFacebookAuthInput>
  }

  export type FacebookAdAccountUpdateWithWhereUniqueWithoutFacebookAuthInput = {
    where: FacebookAdAccountWhereUniqueInput
    data: XOR<FacebookAdAccountUpdateWithoutFacebookAuthInput, FacebookAdAccountUncheckedUpdateWithoutFacebookAuthInput>
  }

  export type FacebookAdAccountUpdateManyWithWhereWithoutFacebookAuthInput = {
    where: FacebookAdAccountScalarWhereInput
    data: XOR<FacebookAdAccountUpdateManyMutationInput, FacebookAdAccountUncheckedUpdateManyWithoutFacebookAuthInput>
  }

  export type FacebookAdAccountScalarWhereInput = {
    AND?: FacebookAdAccountScalarWhereInput | FacebookAdAccountScalarWhereInput[]
    OR?: FacebookAdAccountScalarWhereInput[]
    NOT?: FacebookAdAccountScalarWhereInput | FacebookAdAccountScalarWhereInput[]
    id?: StringFilter<"FacebookAdAccount"> | string
    accountId?: StringFilter<"FacebookAdAccount"> | string
    name?: StringFilter<"FacebookAdAccount"> | string
    authId?: StringFilter<"FacebookAdAccount"> | string
    createdAt?: DateTimeFilter<"FacebookAdAccount"> | Date | string
    updatedAt?: DateTimeFilter<"FacebookAdAccount"> | Date | string
  }

  export type FacebookAuthCreateWithoutAdAccountsInput = {
    id?: string
    userId: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FacebookAuthUncheckedCreateWithoutAdAccountsInput = {
    id?: string
    userId: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FacebookAuthCreateOrConnectWithoutAdAccountsInput = {
    where: FacebookAuthWhereUniqueInput
    create: XOR<FacebookAuthCreateWithoutAdAccountsInput, FacebookAuthUncheckedCreateWithoutAdAccountsInput>
  }

  export type FacebookAuthUpsertWithoutAdAccountsInput = {
    update: XOR<FacebookAuthUpdateWithoutAdAccountsInput, FacebookAuthUncheckedUpdateWithoutAdAccountsInput>
    create: XOR<FacebookAuthCreateWithoutAdAccountsInput, FacebookAuthUncheckedCreateWithoutAdAccountsInput>
    where?: FacebookAuthWhereInput
  }

  export type FacebookAuthUpdateToOneWithWhereWithoutAdAccountsInput = {
    where?: FacebookAuthWhereInput
    data: XOR<FacebookAuthUpdateWithoutAdAccountsInput, FacebookAuthUncheckedUpdateWithoutAdAccountsInput>
  }

  export type FacebookAuthUpdateWithoutAdAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacebookAuthUncheckedUpdateWithoutAdAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacebookAdAccountCreateManyFacebookAuthInput = {
    id?: string
    accountId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FacebookAdAccountUpdateWithoutFacebookAuthInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacebookAdAccountUncheckedUpdateWithoutFacebookAuthInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacebookAdAccountUncheckedUpdateManyWithoutFacebookAuthInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}