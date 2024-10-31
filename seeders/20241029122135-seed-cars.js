'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cars = [];
    for (let i = 0; i < 100; i++) {
      cars.push({
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.date.past(10).getFullYear(),
        plateNumber: faker.vehicle.vrm(),
        price: faker.number.int({ min: 15000, max: 50000 }),
        carImage: faker.image.url(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Cars', cars, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  },
};
