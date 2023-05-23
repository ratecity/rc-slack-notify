# rc-slack-notify
## publish the action
```
yarn build
```

## usage
```
name: Test

on:
  pull_request:
    types: [opened, edited, synchronize ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ratecity/rc-slack-notify@master
        with:
          SLACK_CHANNEL: ${{ secrets.SLACK_CHANNEL }}
          SLACK_USERNAME: ${{ secrets.SLACK_USERNAME }}
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
          SLACK_SUCCESS_MESSAGE: ${{ secrets.SLACK_SUCCESS_MESSAGE }}
          SLACK_COLOR: failure
```
