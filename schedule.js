const moment = require('moment');
const schedule = require('node-schedule');

const { signIn } = require('./signin');

const cron = {
  // sign in at 9am every day
  d1: '0 0 9 * * *',

  // check health every 5 min
  m1: '*/5 * * * *',
};

const ticktock = (rule, handler) => {
  schedule.scheduleJob(rule, async () => {
    const log = (msg, obj) =>
      console.log(
        `${handler.name},${msg},${moment().format('YYYY-MM-DD HH:mm:ss')}`,
        obj
      );
    log('running');
    await handler()
      .then((result) => {
        log('result', { result });
      })
      .catch((err) => {
        log('err', { err });
      });
    log('ending');
  });
};

const running = async () => {
  [
    async function healthcheck() {
      return 'v2free_daily_attendance,schedule,ok';
    },
  ].forEach((fn) => ticktock(cron.m1, fn));
  [signIn].forEach((fn) => ticktock(cron.d1, fn));
};

if (!module.parent) {
  running();
}