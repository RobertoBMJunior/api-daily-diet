import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('meals', (table) => {
        table.increments('id')

        
        table.integer('user_id').references('users.email').notNullable().onDelete('CASCADE')

        table.text('nameMeal').notNullable()
        table.text('description').notNullable()
        table.text('OnADiet').notNullable()
        table.timestamp('date').defaultTo(knex.fn.now()).notNullable()
        table.text('Hour').notNullable()

    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('meals')
}

