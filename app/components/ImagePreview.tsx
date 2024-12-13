import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';

interface ImagePreviewProps {
  photoUri: string;
  setPhotoUri: (uri: string | null) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ photoUri, setPhotoUri }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.imagePreview} />
      <Button title="Upload Another Image" onPress={() => setPhotoUri(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
});

export default ImagePreview;
