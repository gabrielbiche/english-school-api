const passport = require('passport')

module.exports = {
  local: (request, response, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error) {
        return response.status(401).json({ Message: error.message })
      }
      if (!user) {
        return response.status(401).json()
      }
      request.user = user
      return next()
    })(request, response, next)
  },

  bearer: (request, response, next) => {
    passport.authenticate('bearer', { session: false }, (error, user, info) => {
      if (error) {
        return response.status(500).json({ Message: error.message })
      }
      if (!user) {
        return response.status(401).json()
      }
      if (error && error.name === 'JsonWebTokenError') {
        response.status(401).json({ Message: error.message })
      }
      if (error && error.name === 'TokenExpiredError') {
        response
          .status(401)
          .json({ Message: error.message, ExpiredAt: error.expiredAt })
      }
      request.token = info.token
      request.user = user
      return next()
    })(request, response, next)
  }
}
