const schedule = require('node-schedule');

const { signIn } = require('./signin');

// sign in at 9am every day
const cron = {
  d1: '0 0 9 * * *',
};

const ticktock = (rule, handler) => {
  schedule.scheduleJob(rule, async () => {
    const log = (msg, obj) => console.log(`${handler.name},${msg}`, obj);
    log('running');
    await handler().catch((err) => {
      log('err', { err });
    });
    log('ending');
  });
};

const running = async () => {
  [signIn].forEach((fn) => ticktock(cron.d1, fn));
};

if (!module.parent) {
  running();
}
