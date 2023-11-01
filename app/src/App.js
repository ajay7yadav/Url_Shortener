import React, { useState } from 'react';

const App = () => {
    const [url, setUrl] = useState('');
    const submit = ()=>{
        console.log(url);
    }

    return (
        <div>
            <div>SORT YOUR URL</div>
            <div>
                <input type='text' onChange={(e) => setUrl(e.target.value)} />
                <button onClick={submit} />
            </div>
        </div>
    );
}

export default App;
