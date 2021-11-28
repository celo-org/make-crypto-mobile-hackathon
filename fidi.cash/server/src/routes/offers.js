import express from 'express';
import offerController from '../controllers/offer.js';
import userController from '../controllers/user.js';

const router = express.Router();

const methodNotAllowed = (req, res) => {
  res.sendStatus(405);
};

router
  .route('/')
  .get(async (req, res, next) => {
    const { page, size, user, notUser } = req.query;
    try {
      let findResult;
      if (user) {
        findResult = await offerController.findByUser(user, page, size);
      } else if (notUser) {
        findResult = await offerController.findByNotUser(notUser, page, size);
      } else {
        findResult = await offerController.all(page, size);
      }
      const { offers, count } = findResult;
      const lastPage = Math.max(0, Math.ceil(count / size) - 1);
      res.json({ currentPage: page, lastPage, offers });
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      let user = await userController.findByAddress(req.body.address);
      if (!user) {
        user = await userController.create({ address: req.body.address });
      }
      res.status(201).json(
        await offerController.create({
          ...req.body,
          user,
          address: req.body.offerAddress
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
      res.json(await offerController.findByAddress(req.params.address));
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      res.json(await offerController.update(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      res.json(await offerController.delete(req.params.address));
    } catch (err) {
      next(err);
    }
  })
  .all(methodNotAllowed);

export default router;
