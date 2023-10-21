
const {mongoDB} = require('./db')

module.exports = {
    dbConfig: {
        uri: mongoDB,
        collection: 'sessions', // Collection name for sessions in MongoDB
        expires: 1000 * 60 * 60 * 24, // Session expiration time (1 day)
      },
    cookieConfig: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60000
   },
   passwordHash: 'my_secret&@#$@!#$'
}
