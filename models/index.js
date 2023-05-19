const User = require('./user'); 
const Song = require('./song');
const Post = require('./post');
const PostSong = require('./PostSong');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Post.hasOne(Song, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Song.belongsToMany(Post, {
    through: PostSong,
    foreignKey: 'song_id',
    as:'post_song',
    onDelete: 'CASCADE'
});

Song.belongsToMany(User, {
    through: PostSong,
    foreignKey: 'song_id',
    as: 'post_song',
    onDelete: 'CASCADE'
});
  
module.exports = {
    User,
    Song,
    Post,
};

//ASSOCIATIONS (check over)
//USER hasMany POST
//POST belongsTo USER
//POST hasOne SONG
//SONG belongsToMany POST (through PostSong)
//SONG belongsToMany USER (through PostSong)