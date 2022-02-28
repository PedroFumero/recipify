const bcrypt = require('bcrypt')
;('use strict')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return await queryInterface.bulkInsert('users', [
      {
        firstName: 'Pedro',
        lastName: 'Fumero',
        email: '1@1.com',
        password: bcrypt.hashSync('password123', 10),
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        firstName: 'Luis',
        lastName: 'Da Silva',
        email: '2@2.com',
        password: bcrypt.hashSync('password123', 10),
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        firstName: 'Corinne',
        lastName: 'Pikus',
        email: '3@3.com',
        password: bcrypt.hashSync('password123', 10),
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        firstName: 'Gabriella',
        lastName: 'McAddams',
        email: '4@4.com',
        password: bcrypt.hashSync('password123', 10),
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
      {
        firstName: 'Michelle',
        lastName: 'Stone',
        email: '5@5.com',
        password: bcrypt.hashSync('password123', 10),
        createdAt: '2022-02-08 12:32:07',
        updatedAt: '2022-02-08 12:32:07',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('users', null, {})
  },
}
