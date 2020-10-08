const db = require('../db/db_config');

/**
 * @typeof Short
 * 
 * @prop {string} name - some string, valid in a URL path
 * @prop {string} url - link to an external source
 * @prop {number} creatorID - id associated with creator
 */

/**
 * @class Shorts
 * 
 * Stores all Shorts.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Shorts {
  /**
   * Add a Short.
   * 
   * @param {string} name - Short name
   * @param {string} url - Short url
   * @param {number} creatorID - Short creator id
   * @return {Short} - created short
   */
  static async addOne(name, url, creatorID) {
    // first insert the short into the DB and wait for completion
    // and then fetch the new short from the DB
    
    /* YOUR CODE HERE */

  }

  /**
   * Find a Short by Name.
   * 
   * @param {string} name - name of Short to find
   * @return {Short | undefined} - found Short
   */
  static async findOne(name) {

    /* YOUR CODE HERE */

  }

  /**
   * Return an array of all of the Shorts.
   * 
   * @return {Short[]}
   */
  static async findAll() {

    /* YOUR CODE HERE */

  }

  /**
   * Update a Short.
   * 
   * @param {string} name - name of Short to update
   * @param {string} url - new URL
   * @return {Short | undefined} - updated Short
   */
  static async updateOne(name, url) {
    // first update the short and wait for completion
    // then fetch the updated short

    /* YOUR CODE HERE */

  }

  /**
   * Delete a Short.
   * 
   * @param {string} name - name of Short to delete
   * @return {Short | undefined} - deleted Short
   */
  static async deleteOne(name) {
    // first fetch the short from the DB
    // and then delete it form the DB, waiting for completion

    /* YOUR CODE HERE */

  }
}

module.exports = Shorts;
