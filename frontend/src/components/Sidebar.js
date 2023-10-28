import React from 'react';
import '../css/Sidebar.css';
// Import other images if needed

const NFLSidebar = () => {
    const sportsItems = [
        {
            text: 'NFL',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png',
        },
        {
            text: 'NBA',
            imageUrl: 'https://images.ctfassets.net/h8q6lxmb5akt/5qXnOINbPrHKXWa42m6NOa/421ab176b501f5bdae71290a8002545c/nba-logo_2x.png',
        },
        // {
        //     text: 'NCAAF',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/NCAA_logo.svg/1200px-NCAA_logo.svg.png',
        // },
        // {
        //     text: 'NCAAB',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/NCAA_logo.svg/1200px-NCAA_logo.svg.png',
        // },
        // {
        //     text: 'MLB',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/MLB_Logo.svg/1200px-MLB_Logo.svg.png',
        // },
        // {
        //     text: 'NHL',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Logo_NHL.svg/1200px-Logo_NHL.svg.png',
        // },
        // {
        //     text: 'MLS',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Major_League_Soccer_logo.svg/1200px-Major_League_Soccer_logo.svg.png',
        // },
        // {
        //     text: 'UFC',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/UFC_logo.svg/1200px-UFC_logo.svg.png',
        // },
        // {
        //     text: 'PGA',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/PGA_Tour_logo.svg/1200px-PGA_Tour_logo.svg.png',
        // },
        // {
        //     text: 'Tennis',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tennis_ball.svg/1200px-Tennis_ball.svg.png',
        // },
        // {
        //     text: 'Boxing',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Boxing_glove.svg/1200px-Boxing_glove.svg.png',
        // },
        // {
        //     text: 'NASCAR',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/NASCAR_logo.svg/1200px-NASCAR_logo.svg.png',
        // },
        // {
        //     text: 'Formula 1',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Formula_One.svg/1200px-Formula_One.svg.png',
        // },
        // {
        //     text: 'Cricket',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cricket_ball.svg/1200px-Cr'
        // }
        // Add more items as needed
    ];

    return (
        <div className="sticky-sidebar">
            <h2 className="sidebar-title">Sports</h2>
            <ul className="custom-list">
                {sportsItems.map((item, index) => (
                    <li key={index} className="list-item">
                        <img
                            src={item.imageUrl}
                            alt={item.text}
                            className="list-item-image"
                        />
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NFLSidebar;
