import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, activate, deactivate, deploy } from './controller'
import { schema } from './model'
export PostJob, { schema } from './model'

const router = new Router()
const { gitUrl, deployLocation, deploySys } = schema.tree

/**
 * @api {post} /postJobs Create post job
 * @apiName CreatePostJob
 * @apiGroup PostJob
 * @apiParam gitUrl Post job's gitUrl.
 * @apiParam deployLocation Post job's deployLocation.
 * @apiParam deploySys Post job's deploySys.
 * @apiSuccess {Object} postJob Post job's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post job not found.
 */
router.post('/',
  body({ gitUrl, deployLocation, deploySys }),
  create)

/**
 * @api {get} /postJobs Retrieve post jobs
 * @apiName RetrievePostJobs
 * @apiGroup PostJob
 * @apiUse listParams
 * @apiSuccess {Object[]} postJobs List of post jobs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /postJobs/:id Retrieve post job
 * @apiName RetrievePostJob
 * @apiGroup PostJob
 * @apiSuccess {Object} postJob Post job's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post job not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /postJobs/:id Update post job
 * @apiName UpdatePostJob
 * @apiGroup PostJob
 * @apiParam gitUrl Post job's gitUrl.
 * @apiParam deployLocation Post job's deployLocation.
 * @apiParam deploySys Post job's deploySys.
 * @apiSuccess {Object} postJob Post job's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post job not found.
 */
router.put('/:id',
  body({ gitUrl, deployLocation, deploySys }),
  update)

/**
 * @api {delete} /postJobs/:id Delete post job
 * @apiName DeletePostJob
 * @apiGroup PostJob
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Post job not found.
 */
router.delete('/:id',
  destroy)

router.get('/:id/activate',
 activate)
  
router.get('/:id/deactivate',
  deactivate)
 
router.post('/:id/deploy',
  deploy)

export default router
