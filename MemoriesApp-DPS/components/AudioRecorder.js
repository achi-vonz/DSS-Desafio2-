import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Button } from 'react-native'; 
import { Audio } from 'expo-av'; 
export const AudioRecorder = () => { 
const [isRecording, setIsRecording] = useState(false); 
const toggleRecording = async () => { 
if (!isRecording) { 
try { 
const { status } = await Audio.requestPermissionsAsync(); 
if (status === 'granted') { 
const recording = new Audio.Recording(); 
await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY); 
await recording.startAsync(); 
setIsRecording(true); 
} else { 
console.log('Permissions Denied'); 
} 
} catch (error) { 
console.error('Failed to start recording', error); 
} 
} else { 
// Stop recording 
setIsRecording(false); 
} 
}; 
return ( 
<View style={styles.container}> 
<Text style={styles.heading}>Grabar Audio</Text> 
<Button   style={styles.buttonText} title={isRecording ? 'STOP' : 'RECORD'} onPress={toggleRecording} /> 
</View> 
); 
} 
const styles = StyleSheet.create({ 
container: { 
flex: 1, 
justifyContent: 'center', 
alignItems: 'center', 
backgroundColor: '#fff', 
}, 
heading: { 
fontSize: 24, 
marginBottom: 20,
}, 
button: { 
backgroundColor: '#007AFF', 
paddingHorizontal: 20, 
paddingVertical: 10, 
borderRadius: 5, 
}, 
buttonText: { 
color: '#fff', 
fontSize: 18, 
}, 
}); 