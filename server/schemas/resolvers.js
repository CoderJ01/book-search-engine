const resolvers = {
    Query: {
      me: () => {
        return 'Hello World';
      }
    }
  };
  
module.exports = resolvers;