const middleware = {}

middleware['checkManager'] = require('..\\middleware\\checkManager.js')
middleware['checkManager'] = middleware['checkManager'].default || middleware['checkManager']

export default middleware
