# CNN Starter App

## Development
Changes will be reflected in real-time via hot module reloading.
- `$ npm run start`

# Building for Production
- `$ npm run build`
- Assets are compiled into `/dist`

# Analyze Bundles
Useful when trying to debug large bundle sizes.
- `$ npm run analyze`

## Server Side Rendering
Enabled only for production builds.
- `$ npm run build`
- `$ BABEL_ENV=server NODE_ENV=production node server.js`

## Creating a New Release and Tagging

After the PR process is complete and the changes have been merged into develop.
Use [Semver][http://semver.org/] for versioning a release. For more details on creating a release
please see [Release Creation][https://gist.github.com/jamsyoung/6af435ff4c42e41f1b1e].

We also have as part of our process the step of sending a release email to this distribution list (*CNN Production Notification - CNNProductionNotification@turner.com).
Included should be:

- Which team is doing the deployment?
- What time is the deployment and how long will it last?
- Any downtime expected?
- List of features/enhancements/fixes being deployed (if possible)

These notifications are only needed for production releases, not QA or lower environments.

- You should send this at least 30 minutes before the deployment is scheduled and send a confirmation email once the deployment is complete and verified.
These notifications are critical for our success and important;
- To alert all stakeholders a change is about to happen
- To allow enough time to adapt for breaking news or major events
- To quickly track down and resolve any failures or bugs that pop up unexpectedly
- To track projects, velocity and site performance

Please reference http://docs.turner.com/display/CNNDPO/Deployment+Notification+Process for the latest regarding these steps.

Execute the following commands
```
$ git fetch -p
$ git checkout master
$ git pull origin master
$ git checkout develop
$ git pull origin develop
$ grep version package.json
  "version": "1.18.0",                  <--- Previous version
$ git checkout -b release/1.19.0        <--- Branch name is new version
$ vim package.json
$ git commit -am '1.19.0'               <--- Commit message with the new version
$ git checkout master
$ git merge --no-ff release/1.19.0
$ git push origin master
$ git tag 1.19.0                        <--- Tag with the new version
$ git push origin 1.19.0
$ git checkout develop
$ git merge --no-ff master
$ git push origin develop
$ git branch -d release/1.19.0
```