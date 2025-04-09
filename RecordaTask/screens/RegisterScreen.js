// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para validar el correo electrónico
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Función para validar la contraseña
const validatePassword = (password) => {
  return password.length >= 8;  // Al menos 8 caracteres
};

// Función para validar que las contraseñas coincidan
const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Validación de correo
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    // Validación de contraseña
    if (!validatePassword(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // Validación de que las contraseñas coincidan
    if (!validatePasswordMatch(password, confirmPassword)) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Crear el objeto de usuario
    const user = { email, password };

    try {
      // Guardar las credenciales del usuario en AsyncStorage
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      users.push(user); // Añadir el nuevo usuario
      await AsyncStorage.setItem('users', JSON.stringify(users));

      // Mostrar mensaje de éxito
      Alert.alert('Éxito', '¡Cuenta registrada exitosamente!');
      
      // Navegar al inicio de sesión
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error guardando el usuario:', error);
      Alert.alert('Error', 'Hubo un problema al registrar tu cuenta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
