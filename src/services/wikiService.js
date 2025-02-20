import axios from 'axios';

export const fetchRandomArticle = async (language) => {
  try {
    const response = await axios.get(`https://${language}.wikipedia.org/api/rest_v1/page/random/summary`);
    const article = response.data;
    
    if (article.originalimage && article.originalimage.source) {
      article.originalImage = article.originalimage.source;
    } else if (article.thumbnail) {
      article.originalImage = article.thumbnail.source;
    }
    
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

export const fetchInitialArticles = async (language) => {
  try {
    const initialArticles = await Promise.all([
      fetchRandomArticle(language),
      fetchRandomArticle(language),
      fetchRandomArticle(language)
    ]);
    
    return initialArticles;
  } catch (error) {
    console.error('Error fetching initial articles:', error);
    throw error;
  }
}; 