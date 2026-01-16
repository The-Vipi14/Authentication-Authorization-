const dotenv = require('dotenv')
dotenv.config()

const conn_db = require('./config/db')
conn_db()
  
const app = require('./app')
app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`);
}); 
