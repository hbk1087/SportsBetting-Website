import React from 'react';
import '../css/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sticky-sidebar">
            {/* Your sidebar content here */}
            <h2>Popular</h2>
            <ul>
                <li>Live now</li>
                <li>Parlay Hub</li>
                <li>Promos</li>
                {/* ... add more items as needed */}
            </ul>
        </div>
    );
}

export default Sidebar;
