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


const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST });


app.get('/status', async (req, res) => {

  let pg_uptime = JSON.parse(JSON.stringify(await getPGuptime()))[0]["uptime"]

  res.send(JSON.stringify({
    status: "OK",
    postgresUptime: pg_uptime,
    redisConnectedClients: Number(client.server_info.connected_clients)
  }));
});

const Pool = require('pg').Pool;
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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