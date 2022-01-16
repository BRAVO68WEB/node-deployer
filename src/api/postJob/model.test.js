import { PostJob } from '.'

let postJob

beforeEach(async () => {
  postJob = await PostJob.create({ gitUrl: 'test', deployLocation: 'test', deploySys: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = postJob.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(postJob.id)
    expect(view.gitUrl).toBe(postJob.gitUrl)
    expect(view.deployLocation).toBe(postJob.deployLocation)
    expect(view.deploySys).toBe(postJob.deploySys)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = postJob.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(postJob.id)
    expect(view.gitUrl).toBe(postJob.gitUrl)
    expect(view.deployLocation).toBe(postJob.deployLocation)
    expect(view.deploySys).toBe(postJob.deploySys)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
