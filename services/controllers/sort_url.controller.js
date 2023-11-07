import shortid from 'shortid';
import { SORTED_URL } from "../utiles/db.connection.js";
import { generateId } from '../utiles/autoId.js';

const baseUrl = 'http:localhost:8080';

const urlSort = async(req, res) =>{

    const url = String(req.body.url);
    let sortedURL = undefined;
    try {

        if(!url) return res.status(400).send({
            status : false,
            data : 'Invalid input !'
        });

        const fatchURL = await SORTED_URL.findOne({logURL : url});

        if(fatchURL){

            sortedURL = fatchURL.sortURL;
        }
        else{

            sortedURL = shortid.generate();
            const genSortedURL = baseUrl + '/' + sortedURL;
    
            const body = {
                id : await generateId(),
                logURL : url,
                sortURL : sortedURL,
                urlCode : genSortedURL,
                created_at : new Date(),
                updated_at : new Date()
            }

            await SORTED_URL.insertOne(body);
        }

        res.status(201).send({
            status : true,
            data : sortedURL
        });

    } catch (err) {

        console.log(err);
        res.status(500).send({
            status : true,
            data : err.message
        });
    }
}

const getAllUrls = async(req, res) =>{
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 0;

    try {

        const fatchURL = await SORTED_URL.find({}).sort({id:-1}).skip(offset).limit(limit).toArray();

        res.status(201).send({
            status : true,
            data : fatchURL
        });

    } catch (err) {

        console.log(err);
        res.status(500).send({
            status : true,
            data : err.message
        });
    }
}

const redirect_originalLink = async(req, res) =>{
    const url = req.params.url;
    console.log("url ",url);
    try {

        const fatchURL = await SORTED_URL.findOne({sortURL : url});

        if(fatchURL){
            return res.redirect(fatchURL.logURL);
        }
        else{
            return res.status(404).send({
                status : false,
                data : 'URL not found !'
            });
        }

    } catch (err) {

        console.log(err);
        res.status(500).send({
            status : true,
            data : err.message
        });
    }
}

export {
    urlSort,
    getAllUrls,
    redirect_originalLink
}