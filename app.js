const express = require('express');
const app = express();
const { connect } = require('./config/config');
 const userRouter = require('./router/UserRouter');
 const cronJob = require('./utils/cron');
 

const port = 3000;
app.use(express.json());
app.use(express.static(__dirname + '/public'));

connect();
app.use('/api/v1/user', userRouter);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/public/success.html');
}
);

cronJob.start();

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});



