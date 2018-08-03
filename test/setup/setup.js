const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');


const env = 'test';
const database = require('../../config/sequelize')[env];

const models = require('../../models');

const beforeAction = async () => {
  const testapp = express();



  testapp.use(bodyParser.urlencoded({ extended: false }));
  testapp.use(bodyParser.json());

  testapp.use((req, res, next) => {
    res.r = (result) => {
      res.json({
        isSuccess: true,
        status: 200,
        description: '성공',
        message: 'success',
        result,
      });
    };
    next();
  });

  // CORS ALL ACCESS
  testapp.use(cors());

  require('../../routes')(testapp);

  // error handler
  require('../../ErrorHandler')(testapp);



  // await database.authenticate();
  // await database.drop();
  // await database.sync().then(() => console.log('Connection to the database has been established successfully'));

  await models.sequelize.authenticate();
  await models.sequelize.drop();
  // await models.sequelize.sync().then(() => console.log('Connection to the database has been established successfully'));
  await models.sequelize.sync();

  return testapp;
};

const afterAction = async () => {
  await models.sequelize.close();
};


module.exports = { beforeAction, afterAction };
