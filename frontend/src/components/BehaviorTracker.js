import React, { useEffect } from 'react';
import { useBehaviorTracking } from '../hooks/useBehaviorTracking';

const BehaviorTracker = () => {
    const { behaviorData, sendBehaviorData } = useBehaviorTracking();

    useEffect(() => {
        // Send behavior data to the backend every 10 seconds
        const interval = setInterval(() => {
            sendBehaviorData();
        }, 10000);

        return () => clearInterval(interval);
    }, [sendBehaviorData]);

    return null;  // Invisible component to users
};

export default BehaviorTracker;
