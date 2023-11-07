import InfiniteScroll from 'react-infinite-scroll-component';
import '../css/style.css';

export default function Scroll({ list, fetchMoreData }) {
    // Function to copy text to the clipboard
    const copyToClipboard = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    };

    const openNewTab = (url) => {
        window.open(`http://localhost:8080/${url}`);
    };

    return (
        <div className='list-all' id="scrollableDiv">
            <InfiniteScroll
                dataLength={list.length}
                next={fetchMoreData}
                hasMore={true}
                scrollableTarget="scrollableDiv"
            >

                <table className="table">
                    <thead>
                        <tr>
                            <th>SL_No</th>
                            <th>Url</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length === 0 ? (
                            <p>Loading...</p>
                        ) : (
                            list.map(( item ) => {
                                return (
                                    <tr key={item.urlCode}>
                                        <td>{item.id}</td>
                                        <td>{item.urlCode}</td>
                                        <td>
                                            <button className="btn btn-outline-primary" onClick={() => copyToClipboard(item.urlCode)}>Copy</button>
                                            <button className="btn btn-outline-primary openbtn" onClick={() => openNewTab(item.sortURL)}>Open</button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </InfiniteScroll>
        </div>
    )
}