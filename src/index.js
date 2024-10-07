const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const reqBody = {
      projectId: core.getInput('projectId'),
      namespace: core.getInput('namespace'),
      stage: 'DEPLOY'
    }

    const response = await axios.post(
      'https://way-of-believers.vercel.app/checkData',
      reqBody,
      {
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers here
        }
      }
    );
    console.log(response)

    core.setOutput('result', JSON.stringify(response.data));
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      core.setFailed(`Server responded with: ${error.response.status}`);
      core.setFailed(`Response data: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // The request was made but no response was received
      core.setFailed(`No response received: ${error.request}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      core.setFailed(`Error setting up request: ${error.message}`);
    }
    core.setFailed(error.message);
  }
}

run();