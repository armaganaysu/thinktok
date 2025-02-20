import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { LANGUAGES } from '../constants/languages';

const LanguageModal = ({ visible, onClose, currentLanguage, onLanguageChange }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  currentLanguage === lang.code && styles.selectedLanguage
                ]}
                onPress={() => onLanguageChange(lang.code)}
              >
                <Text
                  style={[
                    styles.languageOptionText,
                    currentLanguage === lang.code && styles.selectedLanguageText
                  ]}
                >
                  {lang.name} ({lang.code.toUpperCase()})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal; 