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

app.post('/sql', (req, res) => {
    async () => {
        try {
            await sql.connect(conn)
            const result = await sql.query`select 1+1`
            console.log(result)
            res.statusCode(200)
        } catch (err) {
            console.log(err)
        }
    }
})

app.listen(3000, () => {
    console.log('Running')
})