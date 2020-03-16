import { GraphQLScalarType } from 'graphql';

export const geoPointScalar  = new GraphQLScalarType({
  name: 'Coordinates',
  description: 'A set of coordinates. x, y',
  parseValue(value) {
    return value;
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    return ast.value;
  },
})