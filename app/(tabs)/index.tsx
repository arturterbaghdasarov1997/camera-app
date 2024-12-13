import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import CameraView from '../components/CameraView';
import ImagePreview from '../components/ImagePreview';

const CameraApp = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {!photoUri ? (
        <CameraView setPhotoUri={setPhotoUri} />
      ) : (
        <ImagePreview photoUri={photoUri} setPhotoUri={setPhotoUri} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default CameraApp;
