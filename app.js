const express = require('express')
const bodyParser = require('body-parser')
const sql = require('mssql')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const conn = 'mssql://sa:####plfrg@localhost/MPCatchSB'

app.get('/status', (req, res) => {
    res.send('Ok :)')
})

app.post('/sql', async (req, res) => {
    try {
        await sql.connect(conn)
        const result = await sql.query`${req.body.query}`
        console.log(result)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
})

app.listen(3002, () => {
    console.log('Running')
})
