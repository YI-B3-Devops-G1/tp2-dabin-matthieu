'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send(JSON.stringify({
    message: "Hello world"
  }));
});

app.get('/status', async (req, res) => {

  let pg_uptime = JSON.parse(JSON.stringify(await getPGuptime()))[0]["uptime"]

  res.send(JSON.stringify({
    status: "OK",
    postgresUptime: pg_uptime,
    redisConnectedClients: 123
  }));
});

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '0.0.0.0',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

async function getPGuptime() {
  return new Promise(function (resolve, reject) {
    pool.query('select current_timestamp - pg_postmaster_start_time() as uptime', (error, results) => {
      if (error) {
        throw error
      }
      resolve(results.rows)
    })
  })
}

app.listen(PORT, HOST);