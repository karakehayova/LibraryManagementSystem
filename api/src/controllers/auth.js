import * as crypto from 'crypto-js';
import jwt from 'jsonwebtoken';
// import { schema } from '../validation/register-validation';
import Joi from 'joi';
import { JoiPasswordComplexity } from "joi-password";


const db = require('../models');

const tokenExpiresIn = 24 * 60 * 60;

export const register = async (req, res) => {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      password: JoiPasswordComplexity.string()
        // .minOfSpecialCharacters(2)
        // .minOfLowercase(2)
        // .minOfUppercase(2)
        // .minOfNumeric(2)
        .required(),
      password_confirmation: Joi.string().required(),
      email: Joi.string().email().required(),
      admin: Joi.bool().required(),
      subscription: Joi.number().integer(),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).send(validation.error)
    }

    const salt = crypto.lib.WordArray.random(128 / 8).toString();
    const password = crypto.PBKDF2(req.body.password, salt, {
      keySize: 512 / 32,
      iterations: 1000,
    }).toString();

    await db.users.create({ ...req.body, ...{ password, salt } });
    return res.status(201).send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const login = async (req, res) => {

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).send({ message: 'username and password are required' });
  }

  const user = await db.users.findAll({
    where: {
      username: req.body.username,
    },
  });

  if (user.length === 0) {
    return res.status(400).send({ message: 'wrong username or password' });
  }

  // verify password
  const { salt } = user[0];
  const password = crypto.PBKDF2(req.body.password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  }).toString();

  if (password !== user[0].password) {
    return res.status(400).send({ message: 'wrong username or password' });
  }

  // create jwt token
  const tokenData = {
    id: user[0].id,
    username: user[0].username,
    first_name: user[0].first_name,
    last_name: user[0].last_name,
    admin: user[0].admin,
    subscription: user[0].subscription,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: tokenExpiresIn,
  });

  return res.send({
    access_token: token,
    token_type: 'Bearer',
    expires_in: tokenExpiresIn,
  });
};
