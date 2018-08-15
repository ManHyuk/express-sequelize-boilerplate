'use strict';

const util = require('../utils/Crypto');
const model = require('../models');
const axios = require('axios');

const authService = require('../services/AuthService');
const userServcie = require('../services/UserService');

const UserController = () => {

  const signup = async (req, res, next) => {

    let result;

    try {

      const {pw, salt} = util.doCipher(req.body.password);

      const userData = {
        phone: req.body.phone,
        username: req.body.username,
        password: pw,
        salt: salt,
        fcmToken: req.body.fcmtoken
      };

      await userServcie().isUsedPhone(userData.phone);
      const user = await userServcie().signUp(userData);

      const token = authService().issue({id: user.id, phone: user.phone});

      result = {
        profile: {
          id: user.id,
          phone: user.phone,
          username: user.username
        }, token
      }

    } catch (error) {
      return next(error);
    }

    return res.r(result);

  };

  const signin = async (req, res, next) => {

    let result;

    try {

      const salt = await userServcie().getSalt(req.body.phone);

      const userData = {
        phone: req.body.phone,
        pw: util.doCipher(req.body.password, salt).pw,
        fcmToken: req.body.fcmtoken
      };

      // phone, pw 조회해서 값이 있다면 로그인 성공 -> 토큰 발급
      const user = await userServcie().signIn(userData);
      await userServcie().updateFcmToken(userData);

      const token = authService().issue({id: user.id, phone: user.phone});

      result = {
        profile: {
          id: user.id,
          phone: user.phone,
          username: user.username
        }, token
      }

    } catch (error) {
      return next(error);
    }

    return res.r(result);

  };


  const getProfile = async (req, res, next) => {
    let result;

    try {

      result = await model.User.findOne({
        where: {
          id: req.userId
        },
        attributes: ['id', 'username', 'avatar']
      });


    } catch (error) {
      return next(error);
    }

    return res.r(result);
  };


  const editProfile = async(req, res, next) => {
    try {

      const userData = {
        username: req.body.username,
        avatar: !req.file ? null : req.file.location
      };

      await model.User.update(
        userData, {where: {id: req.userId}});

    } catch (error) {
      return next(error);
    }

    return res.r();
  };

  return {
    signup,
    signin,
    getProfile,
    editProfile,
  };
};

module.exports = UserController;
