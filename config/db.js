const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/Partitura';

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports={
    mongoDB
}
