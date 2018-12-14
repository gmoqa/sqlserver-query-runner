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

app.get('/status', (req, res) => {
    res.send('Ok :)')
})

app.post('/sql', asyncHandler(async (req, res, next) => {
    let pool = await sql.connect(config)
    const result = await pool.request()
        .query(`${req.body.query}`);
    console.dir(result)
    res.send(result)
}))

app.listen(3002, () => {
    console.log('Running')
})
