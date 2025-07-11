import React, { useState } from 'react';
import '../App.css';

const FeedbackPage = ({ theme }) => {
  const [feedback, setFeedback] = useState({
    rating: 5,
    category: 'general',
    comment: ''
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const feedbackData = {
        ...feedback,
        username: localStorage.getItem('currentUser'),
        timestamp: new Date().toISOString()
      };

      console.log('Submitting feedback:', feedbackData);

      const response = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('Success response:', result);
        setMessage('Thank you for your feedback!');
        setFeedback({ rating: 5, category: 'general', comment: '' });
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        setMessage(`Failed to submit feedback. Status: ${response.status}. Please make sure the backend server is running.`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage(`Error submitting feedback: ${error.message}. Please check if the backend server is running on port 5000.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container">
      <h1>Feedback</h1>
      <p className="feedback-subtitle">Help us improve the Train Management System</p>
      
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="rating-section">
          <label>Rating:</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                className={`star ${star <= feedback.rating ? 'active' : ''}`}
                onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
              >
                ⭐
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select name="category" value={feedback.category} onChange={handleChange}>
            <option value="general">General</option>
            <option value="usability">Usability</option>
            <option value="features">Features</option>
            <option value="performance">Performance</option>
            <option value="bug">Bug Report</option>
          </select>
        </div>

        <div className="form-group">
          <label>Your Feedback:</label>
          <textarea
            name="comment"
            value={feedback.comment}
            onChange={handleChange}
            placeholder="Tell us what you think about the system..."
            rows="5"
            required
          />
        </div>

        <button 
          type="submit" 
          className="form-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      {message && (
        <div className={message.includes('Thank you') ? 'success' : 'error'}>
          {message}
        </div>
      )}
    </div>
  );
};

export default FeedbackPage; 