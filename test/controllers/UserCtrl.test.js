const request = require('supertest');
const expect = require('chai').expect;

const {
  beforeAction,
  afterAction,
} = require('../setup/setup');
const model = require('../../models');


describe('UserController ', async() => {

  let api;

  before(async () => {
    api = await beforeAction();
  });

  after(() => {
    afterAction();
  });

  describe('POST /users/signup | User SignUp', () => {

    it('should return profile and token when request is OK! ', async () => {
      const res = await request(api)
        .post('/api/users/signup')
        .send({
          phone: '1234',
          password: '1234',
          username: 'testname',
        })
        .expect(200);

      expect(res.body.result).to.have.all.key('profile', 'token');
      expect(res.body.result.profile).to.have.all.key('id', 'phone', 'username');
    });

    it('should return error message when phone already exists', async() => {
      const res = await request(api)
        .post('/api/users/signup')
        .send({
          phone: '1234',
          password: '1234',
          username: 'testnmae2'
        })
        .expect(400);

      const {isSuccess, status, description, message} = res.body;
      expect(isSuccess).to.equal(false);
      expect(status).to.equal(400);
      expect(description).to.equal('이미 존재하는 전화번호 입니다.');
      expect(message).to.equal('exist_id');
    });

    // TODO param vaildation 추가후에 주석 해제
    // it('should return error message when request is not valid', async() => {
    //   const res = await request(api)
    //     .post('/api/users/signup')
    //     .send({
    //       phone: '1'
    //     })
    //     .expect(400)
    // })
  });

  describe('POST /users/signin | User SignIn', () => {

    it('should return profile and token when request is OK', async() => {
      const res = await request(api)
        .post('/api/users/signin')
        .send({
          phone: '1234',
          password: '1234',
        })
        .expect(200);

      expect(res.body.result).to.have.all.key('profile', 'token');
      expect(res.body.result.profile).to.have.all.key('id', 'phone', 'username');

    });

    it('should return error message when phone and password dont matches', async() => {
      const res = await request(api)
        .post('/api/users/signin')
        .send({
          phone: '1',
          password: '1234'
        })
        .expect(400);

      const {isSuccess, status, description, message} = res.body;
      expect(isSuccess).to.equal(false);
      expect(status).to.equal(400);
      expect(description).to.equal('존재하지 않는 전화번호 입니다.');
      expect(message).to.equal('not_signin');
    });

    it('should return error message when request is not valid', async() => {
      const res = await request(api)
        .post('/api/users/signin')
        .send({
        })
        .expect(400);
      const {isSuccess, status, description, message} = res.body;
      expect(isSuccess).to.equal(false);
      expect(status).to.equal(400);
      expect(description).to.equal('존재하지 않는 전화번호 입니다.');
      expect(message).to.equal('not_signin');

    });
  });


});