import React from 'react';
import './css/style.css';
import SortURL from './Components/SortURL';

const App = () => {
    
    return (
        <>
            <div className='container p-5 my-5 bg-dark text-white'>
                <div className='row'>

                    <SortURL />
                </div>
            </div>
        </>
    );
}

export default App;
