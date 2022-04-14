type Tsignin = () => Promise<String>;

type Tsigninppt = {
  method: string;
  url: string;
  headers: {
    cookie: string;
  };
};

const _ = require('lodash');
const axios = require('axios');

// important environment variable!
const COOKIE = process.env.CK;

const opt: Tsigninppt = {
  method: 'post',
  url: 'https://w1.v2free.net/user/checkin',
  headers: { cookie: COOKIE! },
};

const signIn: Tsignin = async () => {
  try {
    const result: any = await axios(opt);
    return _.get(result, 'data.ret') === 1
      ? 'sign in successfully'
      : 'sign in failed';
  } catch (err) {
    console.log('err', err);
    return 'sign in failed';
  }
};

module.exports = signIn;
