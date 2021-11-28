import Deal from '../models/deal.js';

export default {
  all: () => {
    return Deal.find().sort('-createdAt').exec();
  },

  findById: (id) => {
    return Deal.findById(id)
      .populate(['offer', 'seller', 'buyer'])
      .exec()
      .then((deal) => {
        if (!deal) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        return deal;
      });
  },

  findByAddress: async (address) => {
    return Deal.findOne({ address })
      .populate(['offer', 'seller', 'buyer'])
      .exec()
      .then((deal) => {
        if (!deal) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        return deal;
      });
  },

  findByUser: (user) => {
    return Deal.find({
      $or: [{ seller: user }, { buyer: user }],
      closed: false
    })
      .sort('-createdAt')
      .populate(['offer', 'seller', 'buyer'])
      .exec();
  },

  findSalesByUser: (user) => {
    return Deal.find({ seller: user, closed: false })
      .sort('-createdAt')
      .populate(['offer', 'seller', 'buyer'])
      .exec();
  },

  findPurchasesByUser: (user) => {
    return Deal.find({ buyer: user, closed: false })
      .sort('-createdAt')
      .populate(['offer', 'seller', 'buyer'])
      .exec();
  },

  findSalesInProgressByUser: (user) => {
    return Deal.find({ seller: user, closed: false })
      .sort('-createdAt')
      .populate(['offer', 'seller', 'buyer'])
      .exec();
  },

  findPurchasesInProgressByUser: (user) => {
    return Deal.find({ buyer: user, closed: false })
      .sort('-createdAt')
      .populate(['offer', 'seller', 'buyer'])
      .exec();
  },

  findClosedSalesByUser: (user) => {
    return Deal.find({ $and: [{ seller: user }, { closed: true }] })
      .sort('-createdAt')
      .populate(['offer', 'seller', 'buyer'])
      .exec();
  },

  findClosedPurchasesByUser: (user) => {
    return Deal.find({ $and: [{ buyer: user }, { closed: true }] })
      .sort('-createdAt')
      .populate(['offer', 'seller', 'buyer'])
      .exec();
  },

  create: ({
    address,
    offer,
    seller,
    buyer,
    value,
    amount,
    collateral,
    details
  }) => {
    return new Deal({
      address,
      offer,
      seller,
      buyer,
      value,
      amount,
      collateral,
      details,
      fulfilled: false,
      closed: false
    }).save();
  },

  update: (id, { offer, seller, buyer, amount, collateral, details }) => {
    return Deal.findById(id)
      .exec()
      .then((deal) => {
        if (!deal) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        deal.offer = offer;
        deal.seller = seller;
        deal.buyer = buyer;
        deal.amount = amount;
        deal.collateral = collateral;
        deal.details = details;
        return deal.save();
      });
  },

  close: (id) => {
    return Deal.findById(id)
      .exec()
      .then((deal) => {
        if (!deal) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        deal.closed = true;
        return deal.save();
      });
  },

  delete: (address) => {
    return Deal.findOne({ address })
      .exec()
      .then((deal) => {
        if (!deal) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        deal.closed = true;
        deal.collateral = 0;
        return deal.save();
      });
  },

  fulfill: (address) => {
    return Deal.findOne({ address })
      .exec()
      .then((deal) => {
        if (!deal) {
          throw new Error();
          // throw new httpError.NotFound();
        }
        deal.fulfilled = true;
        return deal.save();
      });
  }
};
