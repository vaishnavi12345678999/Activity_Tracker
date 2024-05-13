import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea } from 'recharts';
import { base_url } from '../baseurl';
import Header from './Header';

const Dashboard = () => {
    const [initialData, setInitialData] = useState([]); // Initial individual state
    const [filteredData, setFilteredData] = useState([]); // Initial Filtered state

    const [consolidatedData, setConsolidatedData] = useState([]); // Consolidated data
    const [showDomainActivity, setShowDomainActivity] = useState(true); // State to track whether to show domain or individual page activity

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await fetch(`${base_url}activities`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const data = await response.json();

                // Set initial individual state
                setInitialData(data);

                // Aggregate data by hostname and sum time spent
                const aggregatedData = {};
                data.forEach(activity => {
                    const hostname = activity.hostname;
                    if(hostname !== "newtab"){
                        if (aggregatedData[hostname]) {
                            aggregatedData[hostname] += activity.time_spent;
                        } else {
                            aggregatedData[hostname] = activity.time_spent;
                        }    
                    }
                });

                // Convert aggregated data back to array format
                const sortedData = Object.keys(aggregatedData).map(hostname => ({
                    hostname: hostname,
                    time_spent: aggregatedData[hostname]
                }));

                // Sort data by time spent
                sortedData.sort((a, b) => b.time_spent - a.time_spent);

                // Set consolidated data
                setConsolidatedData(sortedData);
            } catch (error) {
                console.error('Error fetching user activity data:', error);
            }
        };

        fetchUserData();
    }, []);


    const handleBarClick = (event) => {
        const hostname__ = event.hostname;
        if (showDomainActivity) {
            handleToggleChange("barclick");
            // Use consolidated data to filter detailed analytics for the clicked hostname
            const detailedAnalytics = initialData.filter(activity => activity.hostname === hostname__);
            // Update the initialData state variable with the filtered data
            detailedAnalytics.sort((a, b) => b.time_spent - a.time_spent);
            setFilteredData(detailedAnalytics);
            // Proceed with displaying detailed analytics
            console.log(detailedAnalytics);
        }
    };

    const handleToggleChange = (custom) => {
        
        if(showDomainActivity && filteredData.length === 0 && custom !== "barclick"){
            const notify = () => toast("Please Click on Domain bar!");
            notify();
            return;
        }
        setShowDomainActivity(!showDomainActivity);
    };

    return (
        <div>
            <Header />
            <div className='mt-20 flex-col justify-center'>
            <div className='flex justify-center mb-10 slide-bar'>
                <label 
                    className={`slide-bar-label ${showDomainActivity ? 'active bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} inline-block px-3 py-1 rounded-full cursor-pointer border-2 border-gray-200 mr-3`}
                    onClick={() => !showDomainActivity && handleToggleChange()}
                >
                    Domain Activity
                </label>
                <label 
                    className={`slide-bar-label ${!showDomainActivity ? 'active bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} inline-block px-3 py-1 rounded-full cursor-pointer border-2 border-gray-200`}
                    onClick={() => showDomainActivity && handleToggleChange()}
                >
                    Individual Page Activity
                </label>
            </div>

                <div className='flex justify-center'>
                {showDomainActivity ? (
                    <BarChart width={800} height={600} data={consolidatedData} margin={{ left: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="hostname"
                        tick={{
                            angle: -45, // Adjust the angle here
                            textAnchor: 'end',
                            fontSize: 15
                        }}
                        interval={0}
                        height={120}
                    />
                    <YAxis label={{ value: 'Time Spent (minutes)', angle: -90, position: 'insideLeft', dx: -30, dy: 50 }} tickFormatter={(value) => (value / 60).toFixed(2)} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="time_spent" fill="#8884d8" onClick={handleBarClick} />
                </BarChart>
                ): (
                    <BarChart width={800} height={600} data={filteredData} margin={{ left: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="url" tick={{ display: 'none' }} />
                    <YAxis label={{ value: 'Time Spent (minutes)', angle: -90, position: 'insideLeft', dx: -30, dy: 50 }} tickFormatter={(value) => (value / 60).toFixed(2)} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="time_spent" fill="#8884d8" />
                </BarChart>

                )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
