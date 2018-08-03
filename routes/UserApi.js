'use strict';

const imageUtils = require('../utils/ImageUtil');

const authMdwr = require('../middlewares/AuthMiddleware');
const userCtrl = require('../controllers/UserCtrl');

module.exports = (router) => {

  router.route('/users/signup')
    .post(userCtrl().signup);

  router.route('/users/signin')
    .post(userCtrl().signin);

  router.route('/users')
    .get(authMdwr().auth, userCtrl().getProfile)
    .put(authMdwr().auth, imageUtils.uploadSingle, userCtrl().editProfile);


  return router;
};