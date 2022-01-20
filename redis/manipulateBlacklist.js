const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const blacklist = require('./blacklist')

const setAsync = promisify(blacklist.set).bind(blacklist)
const existsAsync = promisify(blacklist.exists).bind(blacklist)

module.exports = {
  addToken: async token => {
    const tokenExpirationDate = jwt.decode(token).exp
    await setAsync(token, '')
    blacklist.expireAt(token, tokenExpirationDate)
  },

  containsToken: async token => {
    const result = await existsAsync(token)
    return result === 1
  }
}
