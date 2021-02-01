import type { IResolvers } from "apollo-server-fastify";
import type { DocumentNode } from "graphql";
import mergeWith from "lodash.mergewith";

export default (...schemas: Array<ISchema>): ISchema => {
  return mergeWith({}, ...schemas, customizer);
};

function customizer(objValue: string[], srcValue: string[]) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return;
}

export interface ISchema {
  readonly resolvers: IResolvers;
  readonly typeDefs: DocumentNode[];
}
