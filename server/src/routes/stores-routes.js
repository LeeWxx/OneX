const express = require('express');
const { check } = require('express-validator');

const storesControllers = require('../controllers/stores-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/:sid', storesControllers.getStoreById);
router.get('/', storesControllers.getStores);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  storesControllers.createStore
);

router.delete('/:sid', storesControllers.deleteStore);

module.exports = router;