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
                      value: github.context.ref,
                      short: true
                  },
                  {
                      title: "Event",
                      value: payload.context.eventName,
                      short: true
                  },
                  {
                      title: "Actions URL",
                      value: `<${github.context.serverUrl}/${payload.repository.full_name}/commit/${payload.pull_request.head.sha}/checks|${github.context.workflow}>`,
                      short: true
                  },
                  {
                      title: "Pull Request",
                      value: `<${payload.pull_request.html_url}|${payload.pull_request.number}>`,
                      short: true
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
    const body = JSON.stringify(github.context, undefined, 2)
    console.log(`The event payload: ${body}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
