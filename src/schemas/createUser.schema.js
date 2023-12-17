/* eslint-disable indent */
import Joi from 'joi';
import userRoles from '../constants/roles';

const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
    )
    .required()
    .message(
      // eslint-disable-next-line max-len
      'Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    ),
  role: Joi.string()
    .valid(...Object.values(userRoles))
    .default(userRoles.GUEST),
});

export default createUserSchema;
