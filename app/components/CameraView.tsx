import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';

interface CameraViewProps {
  setPhotoUri: (uri: string) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ setPhotoUri }) => {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const devices = useCameraDevices();
  const cameraRef = useRef<Camera | null>(null);

  const toggleCameraType = () => {
    setIsFrontCamera(prev => !prev);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      setPhotoUri(photo.path);
    }
  };

  const uploadImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, response => {
      if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri || '');
      }
    });
  };

  // Find front and back camera devices
  const frontDevice = devices.find(device => device.position === 'front');
  const backDevice = devices.find(device => device.position === 'back');

  const device = isFrontCamera ? frontDevice : backDevice;

  if (!device) {
    return <Text>Loading camera...</Text>;
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Switch Camera" onPress={toggleCameraType} />
        <Button title="Take Picture" onPress={takePicture} />
        <Button title="Upload Image" onPress={uploadImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CameraView;
