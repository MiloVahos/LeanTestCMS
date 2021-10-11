const cron = require('node-cron')
const axios = require('axios')
const Client = require('ssh2-sftp-client')

const sshConfig = {
  host: '',
  port: 22,
  username: '',
  password: '',
};

const task = cron.schedule(process.env.CRON_EXPRESSION, async () => {
  // Running task everyday at midday
  console.log('CRON JOB RUNNING')
  const sftp = new Client();
  const axiosResponse = await axios.get('https://www.eia.gov/dnav/pet/hist_xls/EMM_EPMRU_PTE_NUS_DPGw.xls')
  try {
    await sftp.connect(sshConfig)

    await sftp.end();
  } catch (e) {
    console.log('Something went wrong connecting to SFTP server')
  }
}, {
  scheduled: false
});

module.exports = task