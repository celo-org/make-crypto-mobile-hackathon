import express from 'express';
import dealController from '../controllers/deal.js';
import offerController from '../controllers/offer.js';
import userController from '../controllers/user.js';

const router = express.Router();

const methodNotAllowed = (req, res) => {
  res.sendStatus(405);
};

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      res.json(await dealController.all());
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const {
        dealAddress,
        offerAddress,
        buyerAddress,
        value,
        amount,
        collateral,
        details
      } = req.body;

      const offer = await offerController.findByAddress(offerAddress);
      if (!offer) {
        res.sendStatus(404);
        return;
      }

      let buyer = await userController.findByAddress(buyerAddress);
      if (!buyer) {
        buyer = await userController.create({ address: buyerAddress });
      }

      offer.amount -= value;
      offer.collateral -= collateral;
      offer.save();

      res.status(201).json(
        await dealController.create({
          address: dealAddress,
          offer: offer._id,
          seller: offer.user._id,
          buyer: buyer._id,
          value,
          amount,
          collateral,
          details
        })
      );
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

router
  .route('/:address')
  .get(async (req, res, next) => {
    try {
      res.json(await dealController.findByAddress(req.params.address));
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      res.json(await dealController.update(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      res.json(await dealController.delete(req.params.address));
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

router
  .route('/:address/fulfill')
  .patch(async (req, res, next) => {
    try {
      res.json(await dealController.fulfill(req.params.address));
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

export default router;
