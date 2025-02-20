import React, { memo } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/styles';

const ArticleItem = ({ item, onDoubleTap, showHeartAnimation, heartAnimation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onDoubleTap(item)}>
      <View style={styles.articleContainer}>
        <Image
          source={{ 
            uri: item.originalImage || item.thumbnail?.source || 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png',
          }}
          style={styles.articleImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.articleInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.extract}>{item.extract}</Text>
        </View>
        <View style={styles.articleOverlay}>
          {showHeartAnimation && (
            <Animated.View style={[styles.heartContainer, {
              transform: [
                { scale: heartAnimation },
                { translateX: -50 },
                { translateY: -50 }
              ]
            }]}>
              <Icon name="heart" size={100} color="#ff2d55" />
            </Animated.View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(ArticleItem, (prevProps, nextProps) => {
  return (
    prevProps.item.pageid === nextProps.item.pageid &&
    prevProps.showHeartAnimation === nextProps.showHeartAnimation &&
    prevProps.heartAnimation === nextProps.heartAnimation
  );
}); 