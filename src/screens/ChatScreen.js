// src/screens/ChatScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export default function ChatScreen({ route, navigation }) {
  // Menerima data nama dari UserListScreen biar title header-nya dinamis
  const { receiverName } = route.params || {};

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);
  const currentUser = auth.currentUser;

  // Set title header sesuai nama lawan bicara
  useEffect(() => {
    if (receiverName) {
      navigation.setOptions({ title: receiverName });
    }
  }, [navigation, receiverName]);

  // Real-time listener dari Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(msgs);

      // Auto-scroll ke bawah saat ada pesan baru
      setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
    });

    // PENTING: hentikan listener saat komponen unmount
    return () => unsubscribe(); 
  }, []);

  // Kirim pesan
  const sendMessage = async () => { 
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText('');

    await addDoc(collection(db, 'messages'), {
      text,
      senderId: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email,
      timestamp: serverTimestamp(),
    });
  };

  const renderMessage = ({ item }) => {
    const isMyMessage = item.senderId === currentUser.uid;
    return (
      <View style={[styles.bubble, isMyMessage ? styles.myBubble : styles.otherBubble]}> 
        {!isMyMessage && (
          <Text style={styles.senderName}>{item.senderName}</Text>
        )}
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}> 
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 10 }}
      />
      <View style={styles.inputRow}> 
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder='Ketik pesan...'
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}> 
          <Text style={styles.sendText}>Kirim</Text> 
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5DDD5' },
  bubble: { padding: 10, borderRadius: 10, marginBottom: 10, maxWidth: '80%' },
  myBubble: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end', borderBottomRightRadius: 0 },
  otherBubble: { backgroundColor: '#FFF', alignSelf: 'flex-start', borderBottomLeftRadius: 0 },
  senderName: { fontSize: 12, fontWeight: 'bold', color: '#007BFF', marginBottom: 4 },
  messageText: { fontSize: 16 },
  inputRow: { flexDirection: 'row', padding: 10, backgroundColor: '#FFF', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#CCC', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10 },
  sendBtn: { backgroundColor: '#007BFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  sendText: { color: '#FFF', fontWeight: 'bold' }
});