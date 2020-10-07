const {
  dbColumnNames,
  dbAll, 
  dbGet, 
  dbRun 
} = require('../db/db_config');
const { userName } = dbColumnNames;

/**
 * @typeof User
 * @prop {string} name - name of the user
 * @prop {number} id - id of the user
 */

/**
 * @class Users
 * Stores all Users.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  /**
   * Add a User.
   * @param {string} name - User name
   * @return {User} - created user
   */
  static async addOne(name) {
    try {
      await dbRun(`INSERT INTO users (${userName}) VALUES ('${name}')`);
      const user = await Users.findOne(name);
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find a User by Name.
   * @param {string} name - name of User to find
   * @return {User | undefined} - found User
   */
  static async findOne(name) {
    try {
      const user = await dbGet(`SELECT * FROM users WHERE ${userName} == '${name}'`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return an array of all of the Users.
   * @return {User[]}
   */
  static async findAll() {
    try {
      const rows = await dbAll(`SELECT * FROM users`);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Users;
