const bookshelf = require('../db');

module.exports = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,
  posts() {
    return this.hasMany('Post');
  }
});
