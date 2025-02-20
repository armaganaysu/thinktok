import { useState, useEffect } from 'react';
import { fetchInitialArticles, fetchRandomArticle } from '../services/wikiService';

export const useArticles = (language) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  useEffect(() => {
    loadInitialArticles();
  }, [language]);

  const loadInitialArticles = async () => {
    try {
      const initialArticles = await fetchInitialArticles(language);
      setArticles(initialArticles);
      setLoading(false);
    } catch (error) {
      console.error('Error loading initial articles:', error);
      setLoading(false);
    }
  };

  const loadMoreArticles = async () => {
    if (isLoadingMore) return;
    
    setIsLoadingMore(true);
    try {
      const article = await fetchRandomArticle(language);
      setArticles(prevArticles => [...prevArticles, article]);
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleEndReached = () => {
    if (!isLoadingMore && !loading) {
      loadMoreArticles();
      loadMoreArticles();
      loadMoreArticles();
    }
  };

  return {
    articles,
    loading,
    isLoadingMore,
    currentArticle,
    setCurrentArticle,
    handleEndReached,
  };
}; 