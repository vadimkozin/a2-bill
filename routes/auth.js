const express = require('express')
// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const db = require('knex')(config.get('db_bill'))
const authRouter = express.Router()
const errorHandler = require('../utils/error-handler')
const { log, TableDb } = require('./helper')

// (POST) /api/auth/login
authRouter.route('/login').post(async (req, res) => {
  const { login, password } = req.body
  try {
    const user = await db
      .first('id', 'pass')
      .from(TableDb.USERS)
      .where('user', '=', login)
      .on('query', (data) => log(data))

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден', ecode:'ERR_USER' })
    }

    // const isOk = await bcrypt.compare(password, user.pass)
    const isOk = password === user.pass

    if (!isOk) {
      return res
        .status(400)
        .json({ message: 'Неверный пароль, попробуйте еще раз', ecode:'ERR_PASS' })
    }

    const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
      expiresIn: '1d',
    })

    res.status(200).json({ token, userId: user.id, userName: login })

  } catch (e) {
    errorHandler(res, e)
  }
})

module.exports = authRouter
