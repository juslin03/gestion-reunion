'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meeting extends Model {
    /**
     * @method user
     */
    user() {
        this.belongsToMany("App/Models/User")
    }
}

module.exports = Meeting
