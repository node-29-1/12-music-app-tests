const Album = require('./Album');
const Artist = require('./Artist');
const Genre = require('./Genre');
const Song = require('./Song');

Artist.belongsToMany(Genre, { through: 'ArtistGenre' });
Genre.belongsToMany(Artist, { through: 'ArtistGenre' });


Artist.hasMany(Album);
Album.belongsTo(Artist);


Album.hasMany(Song);
Song.belongsTo(Album);
