'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')
const Database = use('Database')
const uuid = use('uuid/v1')

class UserSeeder {
  async run () {
    const user = await Database.from('users').insert([
      {
        uid: uuid(),
        fname: 'Admin',
        lname: 'admin',
        gender: 'M',
        email: 'komenan.komenan@uvci.edu.ci',
        tel_code: '+225',
        tel: '59-84-28-78',
        birthdate: '1998-12-20',
        birthplace: 'Famienkro S/P Prikro',
        group: 'CONSEIL D\'ADMINISTRATION',
        post: 'Informaticien',
        country: 'Côte d\'Ivoire',
        city: 'Abidjan',
        cityzenship: 'Ivoirienne',
        term_start: '2020-03-01',
        term_end: '2023-12-31',
        term_duration: '10',
        role: 'admin',
        pbox: '01 Abidjan 20293',
        // img: 'fa fa-user-circle-o',
        password: await Hash.make('123456'),
        compagny_init: 'TBC'

      }
    ])

  }
}

module.exports = UserSeeder
