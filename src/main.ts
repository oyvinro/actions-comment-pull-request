const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const message = core.getInput('message');
    const github_token = core.getInput('GITHUB_TOKEN');

    const context = github.context;
    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    }
    const pull_request_number = context.payload.pull_request.number;
    //const pull_request_reviewers = context.payload.pull_request.requested_reviewers.users[0].login;
    //const pull_request_reviewers = 1;//context.payload.pull_request.requested_reviewers.users.length;


    const octokit = new github.GitHub(github_token);
    const new_comment = octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request_number,
        body: message //+ " and " + pull_request_reviewers
      });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
