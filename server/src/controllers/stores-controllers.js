const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const getCoordsForAddress = require('../utill/location');
const HttpError = require('../models/http-error');
const Store = require('../models/store');
const User = require('../models/user');

const getStores = async (req, res, next) => {
  let users;
  try {
    Stores = await Store.find({});
  } catch (err) {
    const error = new HttpError(
      '접근에 실패했습니다. 다시 시도하십시오.',
      500
    );
    return next(error);
  }
  res.json({ stores: Stores.map(store => store.toObject({ getters: true })) });
};


const getStoreById = async (req, res, next) => {
    const storeId = req.params.sid;
    let store;
    try {
        store = await Store.findById(storeId);
    } catch (err) {
        const error = new HttpError('해당 가게를 찾을 수 없습니다', 500);
        return next(error);
    }

    if (!store) {
        const error = new HttpError('해당 ID의 가게를 찾을 수 없습니다.', 404);
        return next(error);
    }

    res.json({ store: store.toObject({ getters: true }) });
};

const createStore = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('잘못된 입력입니다. 데이터를 확인하십시오.', 422));
    }

    const {
        title,
        description,
        floor,
        total_floor,
        parking_availability,
        key_money,
        monthly_rent,
        deposit,
        maintenance_cost,
        address,
        creator,
    } = req.body;

    let coordinates;
    try {
      coordinates = await getCoordsForAddress(address);
    } catch (error) {
      return next(error);
    }

    const createdStore = new Store({
        title,
        description,
        address,
        image: req.file.path,
        floor,
        total_floor,
        parking_availability,
        key_money,
        monthly_rent,
        deposit,
        maintenance_cost,
        location: coordinates,
        creator,
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError('매물을 등록하는데 실패했습니다. 다시 시도하십시오.', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('해당 ID의 사용자를 찾을 수 없습니다.', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdStore.save({ session: sess });
        user.stores.push(createdStore);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('가게를 등록하는데 실패했습니다 다시 시도하십시오', 500);
        return next(error);
    }

    res.status(201).json({ store: createdStore });
};

const deleteStore = async (req, res, next) => {
    const storeId = req.params.sid;

    let store;
    try {
        store = await Store.findById(storeId).populate('creator');
    } catch (err) {
        const error = new HttpError('문제가 발생하여 매물을 삭제할 수 없습니다.', 500);
        return next(error);
    }

    if (!store) {
        const error = new HttpError('해당 ID의 매물을 찾을 수 없습니다.', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await store.remove({ session: sess });
        store.creator.stores.pull(store);
        await store.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('문제가 발생하여 매물을 삭제할 수 없습니다.', 500);
        return next(error);
    }

    res.status(200).json({ message: '매물 삭제' });
};

exports.getStores = getStores;
exports.getStoreById = getStoreById;
exports.createStore = createStore;
exports.deleteStore = deleteStore;