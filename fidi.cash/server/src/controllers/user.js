import User from '../models/user.js';

export default {
  all: () => {
    return User.find().exec();
  },

  findById: (id) => {
    return User.findById(id)
      .exec()
      .then((user) => {
        if (!user) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        return user;
      });
  },

  findByAddress: (address) => {
    return User.findOne({ address })
      .exec()
      .then((user) => {
        if (!user) {
          return null;
        }
        return user;
      });
  },

  create: ({ address }) => {
    return new User({
      address,
      rating: 0,
      closedDeals: 0
    }).save();
  },

  update: (id, { address, name, rating, closedDeals }) => {
    return User.findById(id)
      .exec()
      .then((user) => {
        if (!user) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        user.address = address;
        user.name = name;
        user.rating = rating;
        user.closedDeals = closedDeals;
        return user.save();
      });
  },

  incrementClosedDeals: (id) => {
    return User.findById(id)
      .exec()
      .then((user) => {
        if (!user) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        user.closedDeals += 1;
        return user.save();
      });
  },

  delete: (id) => {
    return User.findById(id)
      .exec()
      .then((user) => {
        if (!user) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        return user.remove();
      });
  }
};
