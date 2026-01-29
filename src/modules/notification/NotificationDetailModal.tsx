// src/screens/NotificationDetailModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NotificationDetailModal = ({ visible, onClose, notification }) => {
  if (!notification) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text>{notification.message}</Text>
          <Text style={styles.date}>{new Date(notification.createdAt).toLocaleString()}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationDetailModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modal: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
