'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Italian', thumbnail: 'thumbnail-italian.jpeg' },
      { name: 'Asian', thumbnail: 'thumbnail-asian.jpeg' },
      { name: 'Mexican', thumbnail: 'thumbnail-mexican.jpeg' },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  },
}
