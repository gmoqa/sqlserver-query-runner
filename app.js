const express = require('express')
const bodyParser = require('body-parser')
const sql = require('mssql')
const cors = require('cors')
const app = express()
const asyncHandler = require('express-async-handler')
 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const config = {
    user: 'sa',
    password: '####plfrg',
    server: 'localhost',
    database: 'MPCatchSB'
}

const POOL = null;

app.get('/status', (req, res) => {
    res.send('Ok :)')
})

app.get('/connect', asyncHandler(async (req, res) => {
    POOL = await sql.connect(config)
    res.send('Ok :)')
}))

app.post('/sql', asyncHandler(async (req, res, next) => {
    const result = await POOL.request()
        .query(`${req.body.query}`);
    console.dir(result)
    res.send(result)
}))

app.listen(3002, () => {
    console.log('Running')
})
