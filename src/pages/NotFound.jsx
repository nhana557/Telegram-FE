import React from 'react';
import './Notfound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className>
      <h1>Not Found</h1>
      <section className="error-container">
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to="/" className="more-link">
          Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
