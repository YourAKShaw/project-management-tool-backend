/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
import 'dotenv/config';
import mongoClient from '../dbClient';

class UserRepository {
  constructor() {
    this.client = mongoClient;
    this.dbName = process.env.DB_NAME;
  }

  async connect() {
    this.db = this.client.db(this.dbName);
  }

  async disconnect() {
    await this.client.close();
  }

  async createUser(userEntity) {
    const userCollection = this.db.collection('users');
    const result = await userCollection.insertOne(userEntity);
    return result.insertedId;
  }

  async getUserById(userId) {
    const userCollection = this.db.collection('users');
    // eslint-disable-next-line new-cap
    return userCollection.findOne({ _id: ObjectId(userId) });
  }

  async getUserByUsername(username) {
    const userCollection = this.db.collection('users');
    return userCollection.findOne({ username });
  }

  // Additional methods for updating or deleting users, if needed
}

export default UserRepository;
