const bookshelf = require('../db');

module.exports = bookshelf.model('Tag', {
  tableName: 'tags',
  posts() {
    return this.belongsToMany('Post', 'posts_tags');
  }
});
