// src/views/recommendations/Recommendations.jsx
import React from 'react';
import { useRecommendations } from '../../hooks/useRecommendations';
import RecommendationsGrid from '../../components/recommendations/recommendationsGrid';
import LoadingSpinner from '../../components/shared/loadingSpinner';
import ErrorMessage from '../../components/shared/errorMessage';
import './Recommendations.css';

const Recommendations = () => {
  const { recommendations, loading, error } = useRecommendations();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h2 className="page-title">
          {localStorage.getItem('user') 
            ? 'Recommended for You' 
            : 'Popular Movies'}
        </h2>
        <p className="recommendation-subtitle">
          {localStorage.getItem('user') 
            ? 'Based on your watching history' 
            : 'Top picks for everyone'}
        </p>
      </div>
      <RecommendationsGrid recommendations={recommendations} />
    </div>
  );
};

export default Recommendations;