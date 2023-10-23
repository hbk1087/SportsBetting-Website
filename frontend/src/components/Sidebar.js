import React from 'react';
import '../css/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sticky-sidebar">
            {/* TODO: Make list dynamic */}
            <h2>Sports</h2>
            <ul>
                <li>NFL</li>
                {/* ... add more items as needed */}
            </ul>
        </div>
    );
}

export default Sidebar;
