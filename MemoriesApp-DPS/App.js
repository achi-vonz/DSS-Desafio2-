import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { CameraComponent } from './components/CameraComponent'; 
import { AudioRecorder } from './components/AudioRecorder'; 
import { MaterialIcons } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator(); 
export default function App() { 
return ( 
<NavigationContainer> 
<Tab.Navigator 
screenOptions={({ route }) => ({ 
tabBarIcon: ({ color, size }) => { 
let iconName; 
if (route.name === 'Camera') { 
iconName = 'camera'; 
} else if (route.name === 'Audio Recorder') { 
iconName = 'mic'; 
} 
return <MaterialIcons name={iconName} size={size} color={color} />; 
}, 
})} 
tabBarOptions={{ 
activeTintColor: 'blue', 
inactiveTintColor: 'gray', 
}} 
> 
<Tab.Screen name="Camera" component={CameraComponent}  options={{ 
headerShown: false, 
cardStyle: { backgroundColor: 'blue'} // Cambia el color de fondo aquí 
}} />
<Tab.Screen name="Audio Recorder" component={AudioRecorder} 
options={{ 
headerShown: false, 
cardStyle: { backgroundColor: '#000'} // Cambia el color de fondo aquí 
}} /> 
</Tab.Navigator> 
</NavigationContainer> 
); 
} 