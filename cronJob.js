/**
 * This is the server that will run periodicaly
 * cron jobs to delete expired tokens in db
 */

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.CRON_PORT;
const app = express();

app.listen(PORT, (res, err) => {
    if(err) process.exit(1);
    console.log(`Cron Task server running on port ${PORT}`);
});