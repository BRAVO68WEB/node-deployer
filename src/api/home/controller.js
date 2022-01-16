const pkg = require('../../../package.json')

export const index = (req, res, next) =>
  res.status(200).json({
    title: 'Node Deployer API',
    version: pkg.version,
    mode: process.env.NODE_ENV
  })
