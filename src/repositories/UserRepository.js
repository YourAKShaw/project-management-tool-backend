/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
import 'dotenv/config';
import mongoClient from '../dbClient.js';

class UserRepository {
  constructor() {
    this.client = mongoClient;
    this.dbName = process.env.DB_NAME;
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection('users');
  }

  async createUser(userEntity) {
    const result = await this.collection.insertOne(userEntity);
    return result.insertedId;
  }

  async getUserById(userId) {
    // eslint-disable-next-line new-cap
    return this.collection.findOne({ _id: ObjectId(userId) });
  }

  async getUserByUsername(username) {
    return this.collection.findOne({ username });
  }

  async getUserByEmail(email) {
    return this.collection.findOne({ email });
  }

  async updateUser(userId, updatedUserData) {
    await this.collection.updateOne(
      // eslint-disable-next-line new-cap
      { _id: ObjectId(userId) },
      { $set: updatedUserData },
    );
  }

  async deleteUser(userId) {
    // eslint-disable-next-line new-cap
    await this.collection.deleteOne({ _id: ObjectId(userId) });
  }
}

export default UserRepository;
