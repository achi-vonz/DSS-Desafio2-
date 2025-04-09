import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';

export const CameraComponent = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [facing, setFacing] = useState('back');
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [capturedMedia, setCapturedMedia] = useState(null); // image or video uri
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  if (!permission || !mediaPermission) return <View />;
  if (!permission.granted || !mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Se necesitan permisos para la cámara y galería</Text>
        <TouchableOpacity onPress={() => { requestPermission(); requestMediaPermission(); }}>
          <Text style={styles.textButton}>Otorgar permisos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedMedia({ uri: photo.uri, type: 'image' });
      setIsCameraVisible(false);
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      try {
        // Inicia la grabación
        const video = await cameraRef.current.recordAsync();
        setCapturedMedia({ uri: video.uri, type: 'video' }); // Guarda la URI del video
        setIsRecording(false);
        setIsCameraVisible(false);
      } catch (error) {
        console.error('Error al grabar el video:', error);
        setIsRecording(false);
      }
    }
  };
  
  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        await cameraRef.current.stopRecording(); // Detén la grabación
      } catch (error) {
        console.error('Error al detener la grabación:', error);
      }
      setIsRecording(false);
    }
  };
  
  const saveMedia = async () => {
    if (capturedMedia) {
      try {
        await MediaLibrary.saveToLibraryAsync(capturedMedia.uri); // Guarda el video en la galería
        alert('Guardado en la galería');
        resetCamera();
      } catch (error) {
        console.error('Error al guardar el archivo:', error);
        alert('Error al guardar el archivo');
      }
    }
  };

  const resetCamera = () => {
    setCapturedMedia(null);
    setIsCameraVisible(true);
  };

  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={toggleCameraFacing} style={styles.button}>
              <Text style={styles.textButton}>Flip</Text>
            </TouchableOpacity>
            {isRecording ? (
              <TouchableOpacity onPress={stopRecording} style={styles.button}>
                <Text style={styles.textButton}>Detener</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={takePicture} style={styles.button}>
                  <Text style={styles.textButton}>📷</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={startRecording} style={styles.button}>
                  <Text style={styles.textButton}>🎥</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </CameraView>
      ) : capturedMedia ? (
        <View style={styles.previewContainer}>
          {capturedMedia.type === 'image' ? (
            <Image source={{ uri: capturedMedia.uri }} style={styles.preview} />
          ) : (
            <Video
              source={{ uri: capturedMedia.uri }}
              style={styles.preview}
              useNativeControls
              resizeMode="contain"
            />
          )}
          <View style={styles.previewButtons}>
            <TouchableOpacity onPress={saveMedia} style={styles.button}>
              <Text style={styles.textButton}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetCamera} style={styles.button}>
              <Text style={styles.textButton}>Descartar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#00000088',
  },
  button: {
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '80%',
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
});
