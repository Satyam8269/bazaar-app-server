if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const app = require('./app');
const Database = require('./data-source');
const Logger = require('./core/Logger')

const port = process.env.PORT || 8080;    // If port is not provided in ".env" file then it will run on default port that is 8080.

// IIFE
(async() => {
try {
    await Database.connect();
    Logger.info("DB Connection Open!")
    //console.log(process.env.MY_NAME)   // For deployment purpose
    //console.log("DB Connection Open!")
    app.listen(port, () => {
        //console.log(`Server started at port ${port}`);
        Logger.info(`Server started at port ${port}`);
    })
}
catch(err) {
    //console.log(err);
    Logger.info(err);
}
})();