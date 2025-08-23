exports.up = function (knex) {
    return knex.schema.createTable('estoque'
        , table => {
            table.increments('id').primary();
            table.string('nome').notNullable();
            table.int('quantidade').notNullable();
            table.float("preco").notNullable();
        });
};
exports.down = function (knex) {
    return knex.schema.dropTable('estoque');
};