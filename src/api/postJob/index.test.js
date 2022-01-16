import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { PostJob } from '.'

const app = () => express(apiRoot, routes)

let postJob

beforeEach(async () => {
  postJob = await PostJob.create({})
})

test('POST /postJobs 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ gitUrl: 'test', deployLocation: 'test', deploySys: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.gitUrl).toEqual('test')
  expect(body.deployLocation).toEqual('test')
  expect(body.deploySys).toEqual('test')
})

test('GET /postJobs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /postJobs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${postJob.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(postJob.id)
})

test('GET /postJobs/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /postJobs/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${postJob.id}`)
    .send({ gitUrl: 'test', deployLocation: 'test', deploySys: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(postJob.id)
  expect(body.gitUrl).toEqual('test')
  expect(body.deployLocation).toEqual('test')
  expect(body.deploySys).toEqual('test')
})

test('PUT /postJobs/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ gitUrl: 'test', deployLocation: 'test', deploySys: 'test' })
  expect(status).toBe(404)
})

test('DELETE /postJobs/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${postJob.id}`)
  expect(status).toBe(204)
})

test('DELETE /postJobs/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
