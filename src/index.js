const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const repo = core.getInput('repo');
    const branch = core.getInput('branch');
    const commit = core.getInput('commit');
    const state = core.getInput('state');

    const response = await axios.post('https://arms-dealer.vercel.app/get', {
      repo,
      branch,
      commit,
      state
    });

    core.setOutput('result', JSON.stringify(response.data));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();