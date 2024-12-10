import { useState, useEffect } from 'react';
import { postBehaviorData } from '../services/api';
import FingerprintJS from '@fingerprintjs/fingerprintjs';


export const useBehaviorTracking = () => {
    const [behaviorData, setBehaviorData] = useState({
        mouseMovements: [],
        scrollPositions: [],
        keyPressTimes: [],
        clicks: [],
        sessionDuration: 0,
        deviceFingerprint: null,
    });

    // Collect mouse movement
    // Maximum number of mouse movements to store
    const MAX_MOUSE_MOVEMENTS = 100;

    useEffect(() => {
        const handleMouseMove = (e) => {
            setBehaviorData(prevState => {
                const newMovements = [...prevState.mouseMovements, { x: e.clientX, y: e.clientY }];

                // Limit the mouse movements array to MAX_MOUSE_MOVEMENTS
                if (newMovements.length > MAX_MOUSE_MOVEMENTS) {
                    newMovements.shift();  // Remove the oldest movement
                }

                return {
                    ...prevState,
                    mouseMovements: newMovements,
                };
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    // Collect scroll positions
    useEffect(() => {
        const handleScroll = () => {
            console.log('Scroll position:', window.scrollY);  // Debug log
            setBehaviorData(prevState => ({
                ...prevState,
                scrollPositions: [...prevState.scrollPositions, window.scrollY],
            }));
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Collect typing speed
    useEffect(() => {
        const handleKeyPress = () => {
            const time = new Date().getTime();
            console.log('Key press at time:', time);  // Debug log
            setBehaviorData(prevState => ({
                ...prevState,
                keyPressTimes: [...prevState.keyPressTimes, time],
            }));
        };
        window.addEventListener('keypress', handleKeyPress);

        return () => window.removeEventListener('keypress', handleKeyPress);
    }, []);


    // Track session duration
    useEffect(() => {
        const startTime = new Date().getTime();
        const calculateSessionDuration = () => {
            const duration = new Date().getTime() - startTime;
            console.log('Session duration:', duration);
            setBehaviorData(prevState => ({
                ...prevState,
                sessionDuration: duration,
            }));
        };
        // Update session duration every second
        const interval = setInterval(calculateSessionDuration, 10000);
        // Clean up when component unmounts
        return () => clearInterval(interval);

        // window.addEventListener('beforeunload', calculateSessionDuration);
        // return () => window.removeEventListener('beforeunload', calculateSessionDuration);
    }, []);

    // Collect clicks
    useEffect(() => {
        const handleClick = (e) => {
            setBehaviorData(prevState => ({
                ...prevState,
                clicks: [...prevState.clicks, { x: e.clientX, y: e.clientY, time: new Date().getTime() }]
            }));
        };
        console.log('clicks: ', behaviorData.clicks);

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    // Initialize FingerprintJS and get the device fingerprint
    useEffect(() => {
        FingerprintJS.load().then(fp => {
            fp.get().then(result => {
                // const fingerprint = result.visitorId;  // Unique identifier
                const fingerprint = result;  // Unique identifier
                setBehaviorData(prevState => ({
                    ...prevState,
                    deviceFingerprint: fingerprint,
                }));
            });
        });
    }, [])

    // Function to send behavior data to the backend
    const sendBehaviorData = async () => {
        try {
            console.log('Sending data:', behaviorData);  // Debug log
            await postBehaviorData(behaviorData);
            console.log('Behavior data sent successfully');
        } catch (error) {
            console.error('Error sending behavior data:', error);
        }
    };


    return { behaviorData, sendBehaviorData };
};
