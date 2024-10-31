'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('punyasiapa', 10);
    return queryInterface.bulkInsert('Users', [
      {
        email: 'rafifrmd@mail.com',
        password: hashedPassword,
        name: 'Muhammad Rafif Ramadhansyah',
        role: 'superadmin',
        address: 'Indonesia',
        phoneNumber: '0123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'adminbcr@mail.com',
        password: hashedPassword,
        name: 'Yoga Hernawan',
        role: 'admin',
        address: 'Indonesia',
        phoneNumber: '9876543210',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'memberbcr@mail.com',
        password: hashedPassword,
        name: 'Tony Budi Santoso',
        role: 'member',
        address: 'Indonesia',
        phoneNumber: '9876543210',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
