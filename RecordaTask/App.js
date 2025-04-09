import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';  // Asegúrate de que la ruta y nombre del archivo sean correctos
import ActivityScreen from './screens/ActivityScreen';  // Verifica que este archivo exista y exporte correctamente el componente
import LoginScreen from './screens/LoginScreen';  
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
