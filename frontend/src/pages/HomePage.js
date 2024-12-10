import React from 'react';
import Navbar from '../components/Navbar';
import BehaviorTracker from '../components/BehaviorTracker';
import '../styles/App.css';


const HomePage = () => {
    return (
        <div className='App'>
            <Navbar />
            <h1>Welcome to the Bot Detection System</h1>
            <BehaviorTracker />
        </div>
    );
};

export default HomePage;
