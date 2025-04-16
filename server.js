const app = require('./app');
require('dotenv').config();
const connectDb = require('./config/mongoose');

// Connect to MongoDB
connectDb();

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if(err) {
        console.error(`Error starting server: ${err}`);
    }
    console.log(`Server is running on port ${PORT}`);
});