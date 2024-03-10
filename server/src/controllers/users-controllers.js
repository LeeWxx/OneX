const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');


const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      '사용자를 불러오지 못했습니다. 나중에 다시 시도하십시오.',
      500
    );
    return next(error);
  }
  res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const getUserById = async (req, res, next) => {
    const userId = req.params.uid;
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError('문제가 발생하여 사용자를 찾을 수 없습니다.', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('해당 ID의 사용자를 찾을 수 없습니다.', 404);
        return next(error);
    }

    res.json({ user: user.toObject({ getters: true }) });
};


const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('잘못된 입력입니다. 데이터를 확인하십시오..', 422));
    }
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('회원가입에 실패했습니다. 나중에 다시 시도하십시오.', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('이미 존재하는 사용자가 있습니다.', 422);
        return next(error);
    }
    const createdUser = new User({
        name,
        email,
        password,
        stores: [],
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('회원가입에 실패했습니다. 다시 시도하십시오.', 500);
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};


const signin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      '로그인에 실패했습니다. 나중에 다시 시도하십시오.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      '잘못된 접근으로 로그인할 수 없습니다.',
      401
    );
    return next(error);
  }

  res.json({
    message: '로그인',
    user: existingUser.toObject({ getters: true })
  });
};

exports.getUsers = getUsers;
exports.getUser = getUserById;
exports.signup = signup;
exports.signin = signin;