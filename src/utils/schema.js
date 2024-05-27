const typeDefs = `#graphql
  enum LengthUnit {
    METER
    KILOMETER
    MILE
    FOOT
  }

  type  userDatas{
    username: String
    dateCreate:String
    id: String
    length(unit: LengthUnit = METER): Float
  }
  
  type Query {
    randomeDatas:[userDatas]
  }
`;

const resolvers = {
    Query: {
      randomeDatas: (_, __, {dataSources}) => 
          dataSources.randomUserApi.getUserInfor()
    },
  };

export {
    typeDefs,
    resolvers
}