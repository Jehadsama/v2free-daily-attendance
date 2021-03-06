const moment = require('moment');
const schedule = require('node-schedule');

const signin = require('./signIn');

const healthcheck = async () => 'v2free_daily_attendance,schedule,ok';

const cron = {
  // sign in at 9am every day
  d1: '0 0 9 * * *',

  // check health every hour
  h1: '0 * * * *',
};

const ticktock = (rule, handler) => {
  schedule.scheduleJob(rule, async () => {
    const log = (description, obj = '') =>
      console.log(
        `${handler.name},${description},${moment().format(
          'YYYY-MM-DD HH:mm:ss'
        )}`,
        obj
      );
    log('running');
    await handler()
      .then((result) => {
        log('result', result);
      })
      .catch((err) => {
        log('err', err);
      });
    log('ending');
  });
};

const running = async () => {
  [healthcheck].forEach((fn) => ticktock(cron.h1, fn));
  [signin].forEach((fn) => ticktock(cron.d1, fn));
};

if (!module.parent) {
  running();
}
