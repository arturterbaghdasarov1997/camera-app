import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';
import CameraView from '../components/CameraView'; // Import the CameraView component

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState<CameraPermissionStatus>('not-determined');
  const [photoUri, setPhotoUri] = useState<string>('');

  const devices = useCameraDevices();

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission);
    })();
  }, []);

  if (hasPermission === 'not-determined' || hasPermission === 'denied') {
    return <Text>Camera permission is required</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView setPhotoUri={setPhotoUri} />
      {photoUri ? <Text>Photo taken: {photoUri}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
