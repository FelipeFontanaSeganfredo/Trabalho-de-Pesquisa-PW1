/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts_tags', table => {
    table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE');
    table.integer('tag_id').unsigned().references('id').inTable('tags').onDelete('CASCADE');
    table.primary(['post_id', 'tag_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('posts_tags');
};
