import express from 'express';
import routes from './routes/sort_url.routes.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.route(routes);

app.listen(PORT, ()=>{
    console.log(`=== SERVER IS RUNNING ON PORT ${PORT} ===`);
})