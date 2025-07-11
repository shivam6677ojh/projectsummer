import React from 'react';

const TrainTable = ({ trains }) => {
  return (
    <table className="train-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Arrival</th>
          <th>Departure</th>
          <th>Priority</th>
          <th>Platform</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {trains && trains.length > 0 ? (
          trains.map((train) => (
            <tr key={train.id}>
              <td>{train.id}</td>
              <td>{train.arrival}</td>
              <td>{train.departure}</td>
              <td>{train.priority}</td>
              <td>{train.platform}</td>
              <td>{train.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No trains found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TrainTable; 