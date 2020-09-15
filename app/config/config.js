module.exports = {
    //connect to local database
    //url: 'mongodb://localhost:27017/lesscentury',

    //connect to cloud database
    url: 'mongodb+srv://tapiwa:firebomb@cluster0.sezzq.mongodb.net/lesscentury?retryWrites=true&w=majority',
    serverport: process.env.PORT || 3000
}