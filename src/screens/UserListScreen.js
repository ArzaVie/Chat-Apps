// src/screens/UserListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase/config';

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mengambil semua dokumen dari collection 'users'
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = [];
        
        querySnapshot.forEach((doc) => {
          // Filter supaya user yang lagi login nggak masuk daftar
          if (doc.id !== auth.currentUser?.uid) {
            usersData.push({ id: doc.id, ...doc.data() });
          }
        });
        
        setUsers(usersData);
      } catch (error) {
        console.error("Gagal mengambil data user: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fungsi untuk melempar data ke layar Chat saat nama di-klik
  const startChat = (selectedUser) => {
    navigation.navigate('Chat', { 
      receiverId: selectedUser.id, 
      receiverName: selectedUser.name 
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userCard} onPress={() => startChat(item)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name ? item.name.charAt(0).toUpperCase() : '?'}</Text>
            </View>
            <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  userCard: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderColor: '#eee',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  userName: { fontSize: 16, fontWeight: 'bold' },
  userEmail: { fontSize: 14, color: '#666' }
});