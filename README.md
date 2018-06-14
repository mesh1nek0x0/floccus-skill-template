# floccus-skill-template

:goat: Floccus skill template powered by serverless.
<!-- One sentence about your product and what it dose.-->

![](https://circleci.com/gh/mesh1nek0x0/floccus-skill-template.svg?style=shield)
<!-- add ci status badge -->

## :pushpin: Description
Focus on Creating a back-end service for Slack Slash Commands.

## :white_check_mark: Features
<!-- list up your product features. -->
- :zap: support [Serverless](https://serverless.com/)
- :art: support .editorconfig
- :shirt: support lint with [eslint](https://eslint.org/)
- :black_joker: support test&coverage with [jest](https://facebook.github.io/jest/)
- :arrows_counterclockwise: support [CircleCI](https://circleci.com/)

---

## :floppy_disk: Install
### Requirements
<!-- show dependencies first -->
* node v8.10+
* yarn v1.3.2+
* serverless 1.26.0+

### Step
1. Install
```
$ git clone ...
$ yarn install
```
You can also fork this repository

## :arrow_forward: Usage
*invoke local*
```
$ yarn invoke
```

*run test*
```
$ yarn test
```

*run eslint*
```
$ yarn lint
```

*deploy Lambda&API Gateway*
```
$ yarn deploy
```

※Setting up AWS-CLI configuration yet? see [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html)

## :information_source: Anything else
After deploy, add SLACK_TOKEN to lambda environment variable.

## :pencil: Author
[mesh1nek0x0](https://github.com/mesh1nek0x0)

## :clipboard: LICENCE
`floccus-skill-template` is licensed under the [MIT](https://github.com/mesh1neko/floccus-skill-template/blob/master/LICENSE) license.
