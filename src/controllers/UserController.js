/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
import createUserSchema from '../schemas/createUser.schema.js';
import UserService from '../services/UserService.js';
import logger from '../common/logger.js';
import createHttpError from 'http-errors';

class UserController {
  static async createUser(req, res, next) {
    try {
      const userService = new UserService();

      const { username, email, password, role } = req.body;

      // Validate request body
      const { error: validationError } = createUserSchema.validate(req.body);
      if (validationError) {
        logger.log('error', validationError.message);
        return res.status(400).json({ error: validationError.message });
      }

      let existingUser = await userService.getUserByUsername(username);

      if (existingUser) {
        const conflictError = createHttpError(
          409,
          `Username ${username} is already taken`,
        );
        logger.log('error', `Username ${username} is already taken`);
        return next(conflictError);
      }

      existingUser = await userService.getUserByEmail(email);

      if (existingUser) {
        const conflictError = createHttpError(
          409,
          `Email ${email} is already registered`,
        );
        logger.log('error', `Email ${email} is already registered`);
        return next(conflictError);
      }

      // Business logic: Create user
      const userId = await userService.createUser(
        username,
        email,
        password,
        role,
      );

      logger.log('info', `User with id ${userId} created`);

      // Respond with the created user ID
      return res.status(201).json({ userId });
    } catch (error) {
      // Handle errors
      logger.log('error', error.message);
      return next(error);
    }
  }
}

export default UserController;
