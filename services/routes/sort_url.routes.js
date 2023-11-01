import { urlSort, getAllUrls, redirect_originalLink } from '../controllers/sort_url.controller.js';

export default (app) =>{
    app.post('/api/v1/sortners/sort', urlSort);
    app.get('/api/v1/sortners/sort', getAllUrls);
    app.get('/api/v1/sortners/redirect', redirect_originalLink);
}