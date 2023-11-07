import { SORTED_URL } from "./db.connection.js";

const generateId = async() =>{
    let id = 1;
    try {
        const lastId = await SORTED_URL.find().sort({id : -1}).toArray();

        if(lastId.length){
            id =  lastId[0].id + 1;
        }
        return id;

    } catch (err) {
        console.log(err);
        throw Error(err.message);
    }
}

export {
    generateId
}