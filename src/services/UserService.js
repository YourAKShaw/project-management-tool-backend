/* eslint-disable indent */
/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository.js';

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(username, email, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userEntity = {
      username,
      email,
      password: hashedPassword,
      role,
    };

    const userId = await this.userRepository.createUser(userEntity);
    return userId;
  }

  async getUserById(userId) {
    return await this.userRepository.getUserById(userId);
  }

  async getUserByEmail(email) {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

  async getUserByUsername(username) {
    return await this.userRepository.getUserByUsername(username);
  }

  async isCorrectPassword(email, password) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      return false; // User not found
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    return isPasswordCorrect;
  }

  async updateUser(userId, updatedUserData) {
    const result = await this.userRepository.updateUser(
      userId,
      updatedUserData,
    );
    return result;
  }

  async deleteUser(userId) {
    const result = await this.userRepository.deleteUser(userId);
    return result;
  }
}

export default UserService;
