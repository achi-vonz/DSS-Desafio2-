import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [activities, setActivities] = useState([]);

  const handleAddActivity = (newActivity, activityId) => {
    if (activityId) {
      // Si activityId existe, estamos editando una actividad, así que la actualizamos
      setActivities(activities.map(activity => 
        activity.id === activityId ? { ...activity, ...newActivity } : activity
      ));
    } else {
      // Si no hay activityId, es una actividad nueva
      setActivities([...activities, newActivity]);
    }
  };

  const handleDeleteActivity = (activityId) => {
    setActivities(activities.filter(item => item.id !== activityId));
  };

  const handleEditActivity = (activity) => {
    navigation.navigate('Activity', { activity, onSave: handleAddActivity });
  };

  const getActivityColor = (dueDate) => {
    const currentDate = new Date();
    const timeDifference = dueDate - currentDate;

    if (timeDifference < 0) return 'red'; // Pasada
    if (timeDifference < 86400000) return 'green'; // Hoy
    return 'blue'; // Futuro
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actividades</Text>
      {activities.length === 0 ? (
        <Text>No tienes actividades registradas</Text>
      ) : (
        <FlatList
          data={activities}
          renderItem={({ item }) => (
            <View style={[styles.activityCard, { borderColor: getActivityColor(item.dueDate) }]}>
              <Text>{item.name}</Text>
              <Text>{item.subject}</Text>
              <Text>{item.dueDate.toLocaleString()}</Text>
              <View style={styles.buttons}>
                <MaterialIcons name="edit" size={24} color="blue" onPress={() => handleEditActivity(item)} />
                <MaterialIcons name="delete" size={24} color="red" onPress={() => handleDeleteActivity(item.id)} />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <View style={styles.floatingButton}>
        <MaterialIcons name="add" size={30} color="white" onPress={() => navigation.navigate('Activity', { onSave: handleAddActivity })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  activityCard: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0A74DA',
    borderRadius: 50,
    padding: 10,
  },
});
