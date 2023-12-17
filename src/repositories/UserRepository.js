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
    this.collection = this.db.collection('users');
  }

  async disconnect() {
    await this.client.close();
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
}

export default UserRepository;
