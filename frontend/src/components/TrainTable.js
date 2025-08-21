import React from 'react';

const TrainTable = ({ trains, onMarkDelayed, onDelete }) => {
  return (
    <table className="train-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Arrival</th>
          <th>Departure</th>
          <th>Priority</th>
          <th>Platform</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {trains && trains.length > 0 ? (
          trains.map((train) => (
            <tr key={train.id}>
              <td>{train.id}</td>
              <td>{train.name}</td>
              <td>{train.arrival}</td>
              <td>{train.departure}</td>
              <td>{train.priority}</td>
              <td>{train.platform}</td>
              <td>{train.status}</td>
              <td style={{minWidth: 160, maxWidth: 200, padding: 0}}>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', alignItems: 'center'}}>
                  {train.status !== 'Delayed' && onMarkDelayed && (
                    <button className="form-btn" style={{padding: '6px 10px', fontSize: '0.92rem', flex: '1 1 110px', minWidth: 0}} onClick={() => onMarkDelayed(train.id)}>
                      Mark as Delayed
                    </button>
                  )}
                  {onDelete && (
                    <button className="form-btn" style={{padding: '6px 10px', fontSize: '0.92rem', background: '#d32f2f', flex: '1 1 80px', minWidth: 0}} onClick={() => onDelete(train.id)}>
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">No trains found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TrainTable; 