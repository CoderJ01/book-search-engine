const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

// create resolver function to each query/mutation that perform CRUD
const resolvers = {
  // perform GET request from GraphQL API
  Query: {
    // return a User type
    // parent = placeholder, would be useful for handling complicated actions
    // is useful for nested resolvers
    // args = object of all the values passed into query or mutation request at all paramters
    // context = data accessible by all reolvers (e.g. logged in user status, API access tokens) will come through context 
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        .select('-__v -password')
        .populate('savedBooks');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
      .select('-__v -password')
      .populate('savedBooks');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('savedBooks')
    },
    savedBooks: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    savedBook: async (parent, { _id }) => {
      return Book.findOne({ _id });
    }
  },

  // perform POST request from GraphQL API
  Mutation: {
    // add User
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // allow User login
    // accept email and password parameters
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    // add Book if User is logged in
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const book = await Book.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { books: book._id }},
          { new: true }
        );

        return book;
    }
      throw new AuthenticationError('You need to be logged in!');
    },
    // delete Book if user is logged in
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const book = await Book.destroy({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book._id }},
          { new: true }
        );

        return book;
    }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
}

module.exports = resolvers;