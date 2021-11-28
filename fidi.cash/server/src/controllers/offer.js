import Offer from '../models/offer.js';

const DEFAULT_SIZE = 10;

export default {
  all: async (page = 0, size = DEFAULT_SIZE) => {
    console.log({ page, size });
    const [offers, count] = await Promise.all([
      Offer.find({ amount: { $gt: 0 }, active: true })
        .sort('price')
        .limit(Number(size))
        .skip(Number(page) * Number(size))
        .populate(['user'])
        .exec(),
      Offer.countDocuments({ amount: { $gt: 0 }, active: true }).exec()
    ]);

    return { offers, count };
  },

  findByUser: async (user, page = 0, size = DEFAULT_SIZE) => {
    const [offers, count] = await Promise.all([
      Offer.find({ user, amount: { $gt: 0 }, active: true })
        .sort('price')
        .limit(Number(size))
        .skip(Number(page) * Number(size))
        .select('-deals')
        .populate(['user'])
        .exec(),
      Offer.countDocuments({ user, amount: { $gt: 0 }, active: true }).exec()
    ]);

    return { offers, count };
  },

  findByNotUser: async (user, page = 0, size = DEFAULT_SIZE) => {
    const [offers, count] = await Promise.all([
      Offer.find({ user: { $ne: user }, amount: { $gt: 0 }, active: true })
        .sort('price')
        .limit(Number(size))
        .skip(Number(page) * Number(size))
        .select('-deals')
        .populate(['user'])
        .exec(),
      Offer.countDocuments({
        user: { $ne: user },
        amount: { $gt: 0 },
        active: true
      }).exec()
    ]);

    return { offers, count };
  },

  findByAddress: async (address) => {
    return Offer.findOne({ address })
      .populate(['user', 'deals'])
      .exec()
      .then((offer) => {
        if (!offer) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        return offer;
      });
  },

  findById: (id) => {
    return Offer.findById(id)
      .populate(['user', 'deals'])
      .exec()
      .then((offer) => {
        if (!offer) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        return offer;
      });
  },

  create: ({ user, address, price, amount, collateral, details }) => {
    return new Offer({
      user,
      address,
      price,
      amount,
      collateral,
      details,
      active: true
    }).save();
  },

  update: (id, { user, address, price, amount, collateral, details }) => {
    return Offer.findById(id)
      .exec()
      .then((offer) => {
        if (!offer) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        offer.user = user;
        offer.address = address;
        offer.price = price;
        offer.amount = amount;
        offer.collateral = collateral;
        offer.details = details;
        return offer.save();
      });
  },

  addDeal: (id, { amount, collateral, deal }) => {
    return Offer.findById(id)
      .exec()
      .then((offer) => {
        if (!offer) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        offer.amount = amount;
        offer.collateral = collateral;
        offer.deals.push(deal);
        return offer.save();
      });
  },

  delete: (address) => {
    return Offer.findOne({ address })
      .exec()
      .then((offer) => {
        if (!offer) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        offer.active = false;
        offer.collateral = 0;
        return offer.save();
      });
  }
};
