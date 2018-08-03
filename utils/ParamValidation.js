const Joi = require('joi');

module.exports = {
  /*
   USER Validation
   */
  // POST - /users/signup
  signup: {
    body: {
      phone: Joi.string().regex(/^[A-Za-z0-9+]*$/).required(),
      username: Joi.string(),
      password: Joi.string().required()
    }
  },
  // POST - /users/signin
  signin: {
    body: {
      phone: Joi.string().regex(/^[A-Za-z0-9+]*$/).required(),
      password: Joi.string().required()
    }
  },


  /*
   POST Validation
   */
  // POST - /posts
  sendRequest: {
    body: {
      receiver_phone: Joi.string().required(),
      send_time: Joi.number().required(),
      send_date: Joi.string().required(),
      title: Joi.string().required(),
      image: Joi.string(),
      send_location: Joi.string().required()
    }
  },
  // POST - /posts/:post_id
  receiveRequest: {
    params: {
      post_id: Joi.number().required()
    },
    body: {
      receive_date: Joi.string().required(),
      receive_time: Joi.string().required(),
      receive_location: Joi.string().required(),
      status: Joi.string().required(),
    }
  },

  // PUT - /posts/:post_id
  updatePostStatus: {
    params: {
      post_id: Joi.number().required()
    }
  },




  /*
   MATCH Validation
   */
  // POST - /posts/:post_id/match
  deliveryReqeust: {
    params: {
      post_id: Joi.number().required()
    }
  },
  // PUT - /match/:match_id
  deliverDoneRequest: {
    body: {

    },
    params: {
      match_id: Joi.number().required()
    }
  },
  // DELETE - /match/:match_id
  cancelDeliverRequest: {
    params: {
      match_id: Joi.number().required()
    }
  },

};