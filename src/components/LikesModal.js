import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/styles';

const LikesModal = ({
  visible,
  onClose,
  likedArticles,
  onUnlike,
  language,
  showClearConfirmation,
  setShowClearConfirmation,
  onClearAll
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Liked Articles</Text>
            {likedArticles.length > 0 && (
              <TouchableOpacity 
                style={styles.clearAllButton}
                onPress={() => setShowClearConfirmation(true)}
              >
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
          <ScrollView style={styles.likedArticlesList}>
            {likedArticles.map((article) => (
              <TouchableOpacity 
                key={article.pageid} 
                style={styles.likedArticleItem}
                onPress={() => Linking.openURL(`https://${language}.wikipedia.org/wiki/${encodeURIComponent(article.title)}`)}
              >
                <View style={styles.likedArticleInfo}>
                  <Text style={styles.likedArticleTitle}>{article.title}</Text>
                  <Text style={styles.likedArticleExtract} numberOfLines={2}>
                    {article.extract}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.unlikeButton}
                  onPress={() => onUnlike(article)}
                >
                  <Icon name="heart-dislike" size={24} color="#ff2d55" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Modal
            visible={showClearConfirmation}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowClearConfirmation(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.confirmationModal}>
                <Text style={styles.confirmationTitle}>Clear All Likes?</Text>
                <Text style={styles.confirmationText}>
                  Are you sure you want to remove all liked articles? This action cannot be undone.
                </Text>
                <View style={styles.confirmationButtons}>
                  <TouchableOpacity 
                    style={[styles.confirmationButton, styles.cancelButton]}
                    onPress={() => setShowClearConfirmation(false)}
                  >
                    <Text style={styles.confirmationButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.confirmationButton, styles.deleteButton]}
                    onPress={onClearAll}
                  >
                    <Text style={[styles.confirmationButtonText, styles.deleteButtonText]}>
                      Clear All
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LikesModal; 