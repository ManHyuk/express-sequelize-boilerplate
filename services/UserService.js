const model = require('../models');
const Op = require('sequelize').Op;
const util = require('../utils/Crypto');


const userService = () => {

  const getSalt = (phone) => {
    return new Promise((resolve, reject) => {
      model.User.findOne({
        where: {
          phone
        },
        attributes: ['salt']
      })
        .then((result) => {
          result ? resolve(result.salt) : reject(1402);
        })
    })
  };

  // 전화번호가 가입되어있는지 체크
  const isUsedPhone = (phone) => {
    return new Promise((resolve, reject) => {
      model.User.findOne({
        where: {
          phone
        },
        attributes: ['id']
      }).then((result) => {
        // 휴대폰 번호가 등록되어 있다면 reject
        // 없는 번호라면 resolve
        result ? reject(1401) : resolve(true);
      })
    })
  };

  const getUserProfile = (phone) => {
    return new Promise((resolve, reject) => {
      model.User.findOne({
        where: {
          phone
        },
        attributes: ['id']
      })
        .then((result) => {
          result ? resolve(result) : reject(1402);
        })
    })
  };

  const signUp = async (userData) => {
    return new Promise((resolve, reject) => {
      model.User.create(userData)
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  };

  const signIn = (userData) => {
    return new Promise((resolve, reject) => {
      model.User.findOne({
        where: {
          [Op.and]: [{phone: userData.phone}, {password: userData.pw}]
        },
        attributes: ['id', 'phone', 'avatar', 'username']
      })
        .then((result) => {
          result ? resolve(result) : reject(400);
        })
    })
  };

  const updateFcmToken = (userData) => {
    return new Promise((resolve, reject) => {
      model.User.update(
        {fcmToken: userData.fcmToken},
        {where: {[Op.and]: [{phone: userData.phone}, {password: userData.pw}]}})
        .then(result => resolve(result))
        .catch(err => reject(err));
    })
  };

  return {
    getSalt,
    signUp,
    signIn,
    isUsedPhone,
    getUserProfile,
    updateFcmToken
  };
};

module.exports = userService;