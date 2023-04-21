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
              author_name: payload.sender.login,
              author_link: payload.sender.html_url,
              author_icon: payload.sender.avatar_url,
              fields: [
                  {
                      title: "Ref",
                      value: "refs/heads/develop",
                      short: true
                  },
                  {
                      "title": "Event",
                      "value": "pull_request_target",
                      "short": true
                  },
                  {
                      "title": "Actions URL",
                      "value": "<https://github.com/ratecity/swift-client/commit/c767b1e24f60eab3d029f5e701dcf7fa6466b412/checks|staging-test-cases>",
                      "short": true
                  },
                  {
                      "title": "Pull Request",
                      "value": `<${payload.pull_request.html_url}|${payload.pull_request.number}>`,
                      "short": true
                  }
              ]
          }
      ]
    }
    
    const response = await fetch(slackWebhook, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    });
    console.log('result', response.ok)
    // Get the JSON webhook payload for the event that triggered the workflow
    const body = JSON.stringify(github, undefined, 2)
    console.log(`The event payload: ${body}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
