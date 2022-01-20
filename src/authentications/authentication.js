const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const blacklist = require('../../redis/manipulateBlacklist')
const db = require('../models')
const User = db.Users

async function checkTokenInBlacklist(token) {
  const tokenInBlacklist = await blacklist.containsToken(token)
  if (tokenInBlacklist) {
    throw new jwt.JsonWebTokenError('Invalid token by logout.')
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
          return done(null, false)
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
          return done(null, false)
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      await checkTokenInBlacklist(token)
      const payload = jwt.verify(token, process.env.CHAVE_JWT)
      const user = await User.findByPk(Number(payload.id))
      return done(null, user, { token: token })
    } catch (error) {
      return done(error)
    }
  })
)
