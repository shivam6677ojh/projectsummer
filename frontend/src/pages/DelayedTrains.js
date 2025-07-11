import React, { useEffect, useState } from 'react';
import TrainTable from '../components/TrainTable';
import { fetchDelayedTrains } from '../utils/api';

const DelayedTrains = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDelayed = async () => {
      try {
        const data = await fetchDelayedTrains();
        setTrains(data);
      } catch (err) {
        setError('Failed to fetch delayed trains');
      } finally {
        setLoading(false);
      }
    };
    fetchDelayed();
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      <h1>Delayed Trains</h1>
      {(!trains || trains.length === 0) ? (
        <div className="no-data">No delayed trains at the moment! 🎉</div>
      ) : (
        <TrainTable trains={trains} />
      )}
    </div>
  );
};

export default DelayedTrains; 