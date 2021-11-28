import express from 'express';
import userController from '../controllers/user.js';
import offerController from '../controllers/offer.js';
import dealController from '../controllers/deal.js';

const router = express.Router();

const methodNotAllowed = (req, res) => {
  res.sendStatus(405);
};

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      res.json(await userController.all());
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const existingUser = await userController.findByAddress(req.body.address);
      if (existingUser) {
        res.status(202).json(existingUser);
      } else {
        res.status(201).json(await userController.create(req.body));
      }
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      res.json(await userController.findById(req.params.id));
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      res.json(await userController.update(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      res.json(await userController.delete(req.params.id));
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

router
  .route('/:address/incrementClosedDeals')
  .patch(async (req, res, next) => {
    try {
      let user = await userController.findByAddress(req.params.address);
      if (!user) {
        user = await userController.create({ address: req.params.address });
      }

      res.json(await userController.incrementClosedDeals(user._id));
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

router
  .route('/:address/open/offers')
  .get(async (req, res, next) => {
    const { page, size } = req.query;
    try {
      let user = await userController.findByAddress(req.params.address);
      if (!user) {
        user = await userController.create({ address: req.params.address });
      }

      const { offers, count } = await offerController.findByUser(
        user._id,
        page,
        size
      );
      const lastPage = Math.max(0, Math.ceil(count / size) - 1);
      res.json({ currentPage: page, lastPage, offers });
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

router
  .route('/:address/open/deals')
  .get(async (req, res, next) => {
    try {
      let user = await userController.findByAddress(req.params.address);
      if (!user) {
        user = await userController.create({ address: req.params.address });
      }

      const deals = await dealController.findByUser(user._id);
      res.json(deals);
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

router
  .route('/:address/offers')
  .get(async (req, res, next) => {
    const { page, size } = req.query;
    try {
      let user = await userController.findByAddress(req.params.address);
      if (!user) {
        user = await userController.create({ address: req.params.address });
      }

      const { offers, count } = await offerController.findByNotUser(
        user._id,
        page,
        size
      );
      const lastPage = Math.max(0, Math.ceil(count / size) - 1);
      res.json({ currentPage: page, lastPage, offers });
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

export default router;
