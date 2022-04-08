const resolvers = {
    Query: {
      me: () => {
        return User;
      }
    }
  };
  
module.exports = resolvers;