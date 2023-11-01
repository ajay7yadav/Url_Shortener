import { SORTED_URL } from "../utiles/db.connection.js";
import shortid from 'shortid';

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
            const genSortedURL = baseUrl + '/' + genSortedURL;
    
            const body = {
                logURL : url,
                sortURL : sortedURL,
                urlCode : genSortedURL
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

    try {

        const fatchURL = await SORTED_URL.find({}).toArray();

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