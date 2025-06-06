const bookshelf = require('../db');

module.exports = bookshelf.model('Post', {
  tableName: 'posts',
  hasTimestamps: true,
  user() {
    return this.belongsTo('User');
  },
  tags() {
    return this.belongsToMany('Tag', 'posts_tags');
  }
});
