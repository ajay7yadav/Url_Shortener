import React, { useState } from 'react';
import axios from 'axios';
import '../css/style.css';
import ListURL from './ListURL';

const SortURL = () => {
    const [url, setUrl] = useState("");
    const [list, setList] = useState([]);

    const submit = async (e) => {
        e.preventDefault()
        const json = JSON.stringify({
            url: url
        });

        try {
            await axios.post('http://localhost:8080/api/v1/sortners/sort', json, {
                headers: { 'Content-Type': 'application/json' }
            });

            const resp = await axios.get(`http://localhost:8080/api/v1/sortners/sort?limit=${5}&offset=${0}`);
            setList(resp.data.data);

            setUrl('');
        } catch (err) {
            console.log("err ", err);
        }
    }

    return (
        <div className=''>
            <div className='header'>
                <h3>SORT YOUR URL</h3>
            </div>

            <form className="d-flex mt-3" role="search">
                <input className="form-control me-2" type="search" value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Enter your long url...' aria-label="Search" />
                <button className="btn btn-outline-success" type="submit" onClick={submit}>Submit</button>
            </form>
            
            <ListURL
                list={list}
                setList={setList}
             />
        </div>
    )
}

export default SortURL;