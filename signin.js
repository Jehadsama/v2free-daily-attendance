const _ = require('lodash');
const axios = require('axios');

// important environment variable!
const COOKIE = process.env.CK;

const signIn = async () => {
  try {
    const opt = {
      method: 'post',
      url: 'https://w1.v2free.net/user/checkin',
      headers: { cookie: COOKIE },
    };
    const result = await axios(opt);
    return _.get(result, 'data', 'msg');
  } catch (err) {
    console.log('err', err);
  }
};

module.exports = signIn;
