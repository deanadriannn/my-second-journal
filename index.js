const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./connect.js');
const journalRoute = require('./routes/journal.js');
const userRoute = require('./routes/user.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"))
app.use(express.json({ limit: '50mb' }));

// routes
app.use('/api/v1/journal', journalRoute);
app.use('/api/v1/user', userRoute);

//static files
app.use(express.static(path.join(__dirname, './client/dist/')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

app.get('/', (req, res) => {
  res.send('Hello to Journal API')
})

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log('Server is listening on http://localhost:8080');
    })
  } catch (error) {
    console.log(error);
  }
}

startServer();