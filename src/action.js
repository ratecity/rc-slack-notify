const fetch = require('node-fetch')
const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    const slackChannel = `#${core.getInput('SLACK_CHANNEL')}`
    const slackWebhook = core.getInput('SLACK_WEBHOOK')
    const slackUsername = core.getInput('SLACK_USERNAME')
    const slackColor = core.getInput('SLACK_COLOR');
    const { payload = {} } = github.context
    const data = {
      channel: slackChannel,
      username: slackUsername,
      icon_url: "https://avatars0.githubusercontent.com/u/43742164",
      attachments: [
          {
              color: slackColor,
              text: "`swift-client` test successfully"
          }
      ]
    }
    
    const response = await fetch(slackWebhook, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    });
    const result = await response.json();
    console.log('result', result)
    // Get the JSON webhook payload for the event that triggered the workflow
    const body = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${body}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
