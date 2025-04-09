import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function ActivityScreen({ route, navigation }) {
  const { activity, onSave } = route.params || {};
  const [name, setName] = useState(activity?.name || '');
  const [subject, setSubject] = useState(activity?.subject || '');
  const [team, setTeam] = useState(activity?.team || '');
  const [day, setDay] = useState(activity?.dueDate?.getDate() || '');
  const [month, setMonth] = useState(activity?.dueDate?.getMonth() + 1 || '');
  const [year, setYear] = useState(activity?.dueDate?.getFullYear() || '');
  const [hour, setHour] = useState(activity?.dueDate?.getHours() || '');
  const [minute, setMinute] = useState(activity?.dueDate?.getMinutes() || '');

  useEffect(() => {
    if (activity && activity.dueDate) {
      setDay(activity.dueDate.getDate());
      setMonth(activity.dueDate.getMonth() + 1);
      setYear(activity.dueDate.getFullYear());
      setHour(activity.dueDate.getHours());
      setMinute(activity.dueDate.getMinutes());
    }
  }, [activity]);

  const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
  };

  const isValidTime = (hour, minute) => {
    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
  };

  const isFutureDate = (day, month, year, hour, minute) => {
    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day, hour, minute);
    return inputDate > currentDate;
  };

  const handleSave = () => {
    const inputDay = parseInt(day);
    const inputMonth = parseInt(month);
    const inputYear = parseInt(year);
    const inputHour = parseInt(hour);
    const inputMinute = parseInt(minute);

    if (!isValidDate(inputDay, inputMonth, inputYear)) {
      Alert.alert('Error', 'Por favor ingresa una fecha válida.');
      return;
    }

    if (!isValidTime(inputHour, inputMinute)) {
      Alert.alert('Error', 'Por favor ingresa una hora válida.');
      return;
    }

    if (!isFutureDate(inputDay, inputMonth, inputYear, inputHour, inputMinute)) {
      Alert.alert('Error', 'Por favor ingresa una fecha y hora futura.');
      return;
    }

    const dueDate = new Date(inputYear, inputMonth - 1, inputDay, inputHour, inputMinute);

    const updatedActivity = { 
      id: activity?.id || Math.random().toString(), 
      name, 
      subject, 
      team, 
      dueDate 
    };

    if (activity?.id) {
      // Si estamos editando, llamamos onSave con el id de la actividad para actualizarla
      onSave(updatedActivity, activity.id); 
    } else {
      // Si es nueva, la añadimos
      onSave(updatedActivity);
    }
  
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activity ? 'Editar Actividad' : 'Nueva Actividad'}</Text>

      <TextInput style={styles.input} placeholder="Nombre de la actividad" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Materia" value={subject} onChangeText={setSubject} />
      <TextInput style={styles.input} placeholder="Equipo" value={team} onChangeText={setTeam} />

      <Text>Fecha de entrega:</Text>
      <View style={styles.dateContainer}>
        <TextInput style={styles.input} placeholder="Día" value={day.toString()} onChangeText={setDay} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Mes" value={month.toString()} onChangeText={setMonth} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Año" value={year.toString()} onChangeText={setYear} keyboardType="numeric" />
      </View>

      <Text>Hora (opcional):</Text>
      <View style={styles.dateContainer}>
        <TextInput style={styles.input} placeholder="Hora" value={hour.toString()} onChangeText={setHour} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Minutos" value={minute.toString()} onChangeText={setMinute} keyboardType="numeric" />
      </View>

      <Button title="Guardar" onPress={handleSave} />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
