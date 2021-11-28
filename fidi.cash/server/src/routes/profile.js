import express from 'express';
import userController from '../controllers/user.js';
import Offer from '../models/offer.js';
import Deal from '../models/deal.js';

const router = express.Router();

const methodNotAllowed = (req, res) => {
  res.sendStatus(405);
};

router
  .route('/:address')
  .get(async (req, res, next) => {
    try {
      let user = await userController.findByAddress(req.params.address);
      if (!user) {
        user = await userController.create({ address: req.params.address });
      }

      const [offers, sales, purchases] = await Promise.all([
        Offer.find({ user, amount: { $gt: 0 }, active: true })
          .select('collateral')
          .exec(),

        Deal.find({ seller: user, closed: false }).select('collateral').exec(),

        Deal.find({ buyer: user, closed: false })
          .select('collateral, amount')
          .exec()
      ]);

      // Collateral for offers can be redeemed
      const available = offers.reduce((p, offer) => p + offer.collateral, 0);

      // Amounts in deals can not be redeemed
      const locked =
        sales.reduce((p, deal) => p + deal.collateral, 0) +
        purchases.reduce((p, deal) => p + deal.collateral + deal.amount, 0);
      const total = available + locked;

      res.json({ total, locked, available });
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

export default router;
