const { exec } = require('child_process');
const util = require('util');
const execPromisify = util.promisify(exec);

const signIn = async () => {
  try {
    const { stdout, stderr } = await execPromisify('./signin.sh');

    const result = JSON.parse(stdout);

    return result.ret === 1 ? 'success' : 'failed';
  } catch (err) {
    console.log('err', err);
  }
};

module.exports = { signIn };
