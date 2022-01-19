import {
  success,
  notFound
} from '../../services/response/'
import {
  PostJob
} from '.'
const {
  exec
} = require("child_process");

export const create = ({
  bodymen: {
    body
  }
}, res, next) => {
  return PostJob.create(body)
    .then(success(res, 201))
    .catch(next)
}

export const index = ({
    querymen: {
      query,
      select,
      cursor
    }
  }, res, next) =>
  PostJob.find(query, select, cursor)
  .then(success(res))
  .catch(next)

export const show = ({
    params
  }, res, next) =>
  PostJob.findById(params.id)
  .then(notFound(res))
  .then(success(res))
  .catch(next)

export const update = ({
    bodymen: {
      body
    },
    params
  }, res, next) =>
  PostJob.findById(params.id)
  .then(notFound(res))
  .then((postJob) => postJob ? Object.assign(postJob, body).save() : null)
  .then(success(res))
  .catch(next)

export const destroy = ({
  params
}, res, next) => {
  PostJob.findById(params.id)
    .then(notFound(res))
    .then((postJob) => postJob ? postJob.remove() : null)
    .then(success(res, 204))
    .catch(next)
}

export const activate = ({
  params
}, res, next) => {
  return PostJob.findById(params.id)
    .then(notFound(res))
    .then((postJob) => {
      if (postJob) {
        postJob.active = true
        postJob.save()
        res.sendStatus(200);
      }
    })
    .then(success(res, 204))
    .catch(next)
}

export const deactivate = ({
  params
}, res, next) => {
  PostJob.findById(params.id)
    .then(notFound(res))
    .then((postJob) => {
      if (postJob) {
        postJob.active = false;
        postJob.save();
        res.sendStatus(200);
      }
    })
    .then(success(res, 204))
    .catch(next)
}

export const deploy = ({
  params
}, res, next) => {
  PostJob.findById(params.id)
    .then(notFound(res))
    .then((postJob) => {
      if (postJob) {
        exec(
          `cd ${
            postJob.deployLocation
          } && git fetch --all && git reset --hard origin/${
            postJob.gitBranch
          } && git pull ${
            postJob.buildRequired ? "&& rm -rf node_modules " : ""
          } && yarn ${postJob.buildRequired ? "&& yarn build " : ""}`,
          (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
          }
        );
        res.sendStatus(200);
      }
    })
    .then(success(res, 204))
    .catch(next)
}
