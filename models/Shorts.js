const {
  dbColumnNames,
  dbAll,
  dbGet,
  dbRun
} = require('../db/db_config');
const { shortName, shortURL } = dbColumnNames;

/**
 * @typeof Short
 * @prop {string} name - some string, valid in a URL path
 * @prop {string} url - link to an external source
 * @prop {number} creatorID - id associated with creator
 */

/**
 * @class Shorts
 * Stores all Shorts.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Shorts {
  /**
   * Add a Short.
   * @param {string} name - Short name
   * @param {string} url - Short url
   * @param {number} creatorID - Short creator id
   * @return {Short} - created short
   */
  static async addOne(name, url, creatorID) {

    /*Your Code Here*/

  }

  /**
   * Find a Short by Name.
   * @param {string} name - name of Short to find
   * @return {Short | undefined} - found Short
   */
  static async findOne(name) {

    /*Your Code Here*/

  }

  /**
   * Return an array of all of the Shorts.
   * @return {Short[]}
   */
  static async findAll() {

    /*Your Code Here*/

  }

  /**
   * Update a Short.
   * @param {string} name - name of Short to update
   * @param {string} url - new URL
   * @return {Short | undefined} - updated Short
   */
  static async updateOne(name, url) {
    
    /*Your Code Here*/

  }

  /**
   * Delete a Short
   * @param {string} name - name of Short to delete
   * @return {Short | undefined} - deleted Short
   */
  static async deleteOne(name) {
    
    /*Your Code Here*/

  }
}

module.exports = Shorts;
