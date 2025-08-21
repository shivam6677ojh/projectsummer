import React, { useEffect, useState } from 'react';
import TrainTable from '../components/TrainTable';
import { fetchTrains, markTrainDelayed, deleteTrain } from '../utils/api';

const Dashboard = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrains = async () => {
      try {
        console.log('Dashboard: Starting to fetch trains...');
        const data = await fetchTrains();
        console.log('Dashboard: Received trains data:', data);
        setTrains(data);
      } catch (err) {
        console.error('Dashboard: Error fetching trains:', err);
        setError(`Failed to fetch trains: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    getTrains();
  }, []);

  const handleMarkDelayed = async (trainId) => {
    try {
      await markTrainDelayed(trainId);
      // Refresh train list
      const data = await fetchTrains();
      setTrains(data);
    } catch (err) {
      alert('Failed to mark train as delayed');
    }
  };

  const handleDelete = async (trainId) => {
    if (!window.confirm('Are you sure you want to delete this train?')) return;
    try {
      await deleteTrain(trainId);
      // Refresh train list
      const data = await fetchTrains();
      setTrains(data);
    } catch (err) {
      alert('Failed to delete train');
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p className="dashboard-subtitle">
        Welcome back, {localStorage.getItem('currentUser')}! 
        You have {trains.length} train(s) in your schedule.
      </p>
      <TrainTable trains={trains} onMarkDelayed={handleMarkDelayed} onDelete={handleDelete} />
    </div>
    
  );
};

export default Dashboard; 