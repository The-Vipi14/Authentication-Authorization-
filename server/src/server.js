const dotenv = require('dotenv')
dotenv.config()


const conn_db = require('./config/db')
conn_db()

const app = require('./app')
app.listen(5000,()=>{
    console.log("server is running.");
});
