import { useState, useEffect, useCallback } from 'react';
import { loadLikedArticles, saveLikedArticles } from '../services/storageService';

export const useLikes = () => {
  const [likedArticles, setLikedArticles] = useState([]);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  useEffect(() => {
    loadInitialLikes();
  }, []);

  const loadInitialLikes = async () => {
    const savedArticles = await loadLikedArticles();
    setLikedArticles(savedArticles);
  };

  const addLike = useCallback(async (article) => {
    const isLiked = likedArticles.some(a => a.pageid === article.pageid);
    if (!isLiked) {
      const newLikedArticles = [...likedArticles, article];
      setLikedArticles(newLikedArticles);
      await saveLikedArticles(newLikedArticles);
      return true;
    }
    return false;
  }, [likedArticles]);

  const unlikeArticle = async (article) => {
    const newLikedArticles = likedArticles.filter(a => a.pageid !== article.pageid);
    setLikedArticles(newLikedArticles);
    await saveLikedArticles(newLikedArticles);
  };

  const clearAllLikedArticles = async () => {
    setLikedArticles([]);
    await saveLikedArticles([]);
    setShowClearConfirmation(false);
  };

  return {
    likedArticles,
    showClearConfirmation,
    setShowClearConfirmation,
    addLike,
    unlikeArticle,
    clearAllLikedArticles,
  };
}; 