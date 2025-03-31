import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Text, Button, Card, Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

/**
 * Android-specific button with native feedback effect
 */
export const AndroidRippleButton = ({ 
  title, 
  onPress, 
  icon, 
  color = '#4CAF50' 
}: { 
  title: string; 
  onPress: () => void; 
  icon?: string;
  color?: string;
}) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('#ffffff', false)}
    >
      <View style={[styles.androidButton, { backgroundColor: color }]}>
        {icon && <Ionicons name={icon as any} size={20} color="white" style={styles.buttonIcon} />}
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

/**
 * Material Design card with elevation specific to Android
 */
export const AndroidMaterialCard = ({ 
  children, 
  elevation = 2 
}: { 
  children: React.ReactNode; 
  elevation?: number;
}) => {
  return (
    <Surface style={[styles.materialCard, { elevation }]}>
      {children}
    </Surface>
  );
};

/**
 * Bottom sheet dialog in Android style
 */
export const AndroidBottomSheet = ({ 
  visible, 
  onDismiss, 
  title, 
  children 
}: { 
  visible: boolean; 
  onDismiss: () => void; 
  title: string; 
  children: React.ReactNode;
}) => {
  if (!visible) return null;
  
  return (
    <View style={styles.bottomSheetOverlay}>
      <TouchableNativeFeedback onPress={onDismiss}>
        <View style={styles.bottomSheetBackdrop} />
      </TouchableNativeFeedback>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.bottomSheetHandle} />
        <Text style={styles.bottomSheetTitle}>{title}</Text>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  androidButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  materialCard: {
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  bottomSheetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  bottomSheetBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingTop: 8,
    elevation: 24,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDDDDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
