import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  LIKED_ARTICLES: 'likedArticles',
  SELECTED_LANGUAGE: 'selectedLanguage',
};

export const loadLikedArticles = async () => {
  try {
    const saved = await AsyncStorage.getItem(StorageKeys.LIKED_ARTICLES);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading liked articles:', error);
    return [];
  }
};

export const saveLikedArticles = async (articles) => {
  try {
    await AsyncStorage.setItem(StorageKeys.LIKED_ARTICLES, JSON.stringify(articles));
  } catch (error) {
    console.error('Error saving liked articles:', error);
  }
};

export const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(StorageKeys.SELECTED_LANGUAGE);
    return savedLanguage || 'en';
  } catch (error) {
    console.error('Error loading saved language:', error);
    return 'en';
  }
};

export const saveLanguage = async (language) => {
  try {
    await AsyncStorage.setItem(StorageKeys.SELECTED_LANGUAGE, language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
}; 