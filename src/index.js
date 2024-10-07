const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const reqBody = {
      projectId: core.getInput('projectId'),
      namespace: core.getInput('namespace'),
      stage: 'DEPLOY'
    }

    const response = await axios.post('https://way-of-believers.vercel.app/checkData', reqBody);
    console.log(response)

    core.setOutput('result', JSON.stringify(response.data));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();