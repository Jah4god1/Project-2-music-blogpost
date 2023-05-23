const User = require('./user'); 
const Post = require('./post');
const Home = require('./home')

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

module.exports = {
    User,
    Post,
    Home
};

