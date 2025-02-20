import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/styles';
import ArticleItem from '../components/ArticleItem';
import LikesModal from '../components/LikesModal';
import LanguageModal from '../components/LanguageModal';
import { useArticles } from '../hooks/useArticles';
import { useLikes } from '../hooks/useLikes';
import { useLikeAnimation } from '../hooks/useLikeAnimation';
import { useDoubleTap } from '../hooks/useDoubleTap';
import { loadSavedLanguage, saveLanguage } from '../services/storageService';

const { height } = Dimensions.get('window');

function HomeScreen() {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [language, setLanguage] = useState('en');
  const flatListRef = useRef(null);

  const {
    articles,
    loading,
    isLoadingMore,
    currentArticle,
    setCurrentArticle,
    handleEndReached,
  } = useArticles(language);

  const {
    likedArticles,
    showClearConfirmation,
    setShowClearConfirmation,
    addLike,
    unlikeArticle,
    clearAllLikedArticles,
  } = useLikes();

  const {
    showHeart,
    heartAnim,
    animateHeart,
  } = useLikeAnimation();

  useEffect(() => {
    initializeLanguage();
  }, []);

  const initializeLanguage = async () => {
    const savedLanguage = await loadSavedLanguage();
    setLanguage(savedLanguage);
  };

  const handleArticleLike = async (article) => {
    const wasAdded = await addLike(article);
    if (wasAdded) {
      animateHeart();
    }
  };

  const handleDoubleTap = useDoubleTap(handleArticleLike);

  const changeLanguage = async (langCode) => {
    await saveLanguage(langCode);
    setLanguage(langCode);
    setShowLanguageModal(false);
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

  const renderArticle = ({ item }) => (
    <ArticleItem
      item={item}
      onDoubleTap={handleDoubleTap}
      showHeartAnimation={showHeart && currentArticle?.pageid === item.pageid}
      heartAnimation={heartAnim}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.likesButton}
          onPress={() => setShowLikesModal(true)}
        >
          <Icon name="heart" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>ThinkTok</Text>

        <TouchableOpacity 
          style={styles.languageButton} 
          onPress={() => setShowLanguageModal(true)}
        >
          <Text style={styles.languageText}>{language.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      <LikesModal
        visible={showLikesModal}
        onClose={() => setShowLikesModal(false)}
        likedArticles={likedArticles}
        onUnlike={unlikeArticle}
        language={language}
        showClearConfirmation={showClearConfirmation}
        setShowClearConfirmation={setShowClearConfirmation}
        onClearAll={clearAllLikedArticles}
      />

      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={() => {
          if (currentArticle) {
            Linking.openURL(`https://${language}.wikipedia.org/wiki/${encodeURIComponent(currentArticle.title)}`);
          }
        }}
      >
        <Icon name="arrow-forward" size={30} color="#fff" />
      </TouchableOpacity>

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        currentLanguage={language}
        onLanguageChange={changeLanguage}
      />

      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.pageid.toString()}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={height}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        removeClippedChildren
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ref={flatListRef}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setCurrentArticle(viewableItems[0].item);
          }
        }}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
      />
    </View>
  );
}

export default HomeScreen; 