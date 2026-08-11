require('dotenv').config();

const app = require('./app');
const ConnectDB = require('./database/connectDB');

ConnectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
