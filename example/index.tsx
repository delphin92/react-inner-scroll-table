import React from 'react';
import ReactDOM from 'react-dom';
import {InnerScrollTable} from "react-inner-scroll-table";

const App = () => {
    return (
        <div>
            <InnerScrollTable />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
