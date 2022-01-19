const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user:  async (parent, { userId }) => {
            return Profile.findOne({ _id: userId });
          },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent , {username, email, password}) => {
            const user = await User.create({ username, email, password})
            const token = signToken(user)

            return {token, user}
        },
        login: async (parent, { username , email, password }) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      
            if (!user) {
              throw new AuthenticationError('No profile with this email or username found!');
            }
      
            const correctPw = await User.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      
            const token = signToken(user);
            return { token, profile };
        },

        addBook: async (parent, {bookData}) =>{
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true, runValidators: true }
              );

            return updatedUser
        },
        deleteBook: async (parent, {bookId}) =>{

        }
    }
}

module.exports= {resolvers}