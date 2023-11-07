import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/sort_url.routes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 8080;

routes(app)

app.listen(PORT, ()=>{
    console.log(`=== SERVER IS RUNNING ON PORT ${PORT} ===`);
})