import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import env from 'dotenv';

const app = express();
const port = 3000;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('')); Will need in production / after build

// Create PostgreSQL client and connect to database
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get('/', (req, res) => {
  res.send('home page');
});

// app.get('/habits/:id', async (req, res) => {
//   const result = await db.query('SELECT * FROM habits');
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});