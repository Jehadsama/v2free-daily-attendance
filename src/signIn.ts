type Tsignin = () => Promise<String>;

type Tsigninopt = {
  method: string;
  url: string;
  headers: {
    cookie: string;
  };
};

const _ = require('lodash');
const axios = require('axios');
const { readFile } = require('node:fs/promises');

// It is an important environment variable!
const COOKIE = process.env.CK;
console.log(__dirname)
const getOpt = async () => ({
  method: 'post',
  url: 'https://w1.v2free.net/user/checkin',
  headers: { cookie: COOKIE || (await readFile('.ck')) },
});

const signIn: Tsignin = async () => {
  try {
    const opt: Tsigninopt = await getOpt();
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
