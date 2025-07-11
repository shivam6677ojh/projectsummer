import React, { useEffect, useState } from 'react';
import { fetchPlatforms } from '../utils/api';

const PlatformTimeline = () => {
  const [platforms, setPlatforms] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlatformsData = async () => {
      try {
        const data = await fetchPlatforms();
        setPlatforms(data);
      } catch (err) {
        setError('Failed to fetch platform schedule');
      } finally {
        setLoading(false);
      }
    };
    fetchPlatformsData();
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      <h1>Platform Timeline</h1>
      {Object.keys(platforms).length === 0 ? (
        <p className="no-data">No platform data available.</p>
      ) : (
        <div className="platform-list">
          {Object.keys(platforms).map((platform) => (
            <div className="platform-card" key={platform}>
              <h2>Platform {platform}</h2>
              <ul className="train-list">
                {platforms[platform].map((train) => (
                  <li key={train.id}>
                    <span className="train-id">{train.id}</span>
                    <span className="train-time">{train.arrival} - {train.departure}</span>
                    <span className={`train-status ${train.status === 'Delayed' ? 'delayed' : 'on-time'}`}>{train.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlatformTimeline; 