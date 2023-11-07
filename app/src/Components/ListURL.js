import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/style.css';
import Scroll from "./Scroll";

export default function ListURL({list, setList}) {
    
    const [offset, setOffset] = useState(5);
    const [limit, setLimit] = useState(5);

    const handleListing = async () => {
        try {
            const resp = await axios.get(`http://localhost:8080/api/v1/sortners/sort?limit=${limit}&offset=${0}`);
            setList(resp.data.data);

        } catch (err) {
            console.log(err);
        }
    };
    
    // When page load then auto call listing API
    useEffect(() => {
        handleListing();
    }, []);

    // This function help when scrolling
    const addMoreData = async () => {
        try {
            setOffset(offset + 5);
            setLimit(5);
            const resp = await axios.get(`http://localhost:8080/api/v1/sortners/sort?limit=${limit}&offset=${offset}`);
            setTimeout(() => {
                setList(list.concat(resp.data.data));
            }, 500);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Scroll
                list={list}
                fetchMoreData={addMoreData}
            />
        </div>
    )
}