import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index } from './controller'

const router = new Router()

/**
 * @api {get} /homes Retrieve homes
 * @apiName RetrieveHomes
 * @apiGroup Home
 * @apiUse listParams
 * @apiSuccess {Object[]} homes List of homes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  index)

export default router
