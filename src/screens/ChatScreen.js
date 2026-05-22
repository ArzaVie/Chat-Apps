// src/screens/ChatScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { COLORS, SIZES, FONTS, SHADOWS } from '../theme'; // Panggil template desain kita

export default function ChatScreen({ route, navigation }) {
  // Nangkep data lawan bicara yang dikirim dari UserListScreen
  const { receiverId, receiverName } = route.params; 
  const currentUserId = auth.currentUser?.uid;

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Logika bikin ID Ruang Obrolan (Chat Room ID) yang unik buat 2 orang
  // Diurutkan biar siapapun yang nge-chat duluan, ID ruangannya tetep sama
  const chatId = currentUserId > receiverId 
    ? `${currentUserId}_${receiverId}` 
    : `${receiverId}_${currentUserId}`;

  // Mengubah nama di Header navigasi jadi nama lawan bicara
  useEffect(() => {
    navigation.setOptions({ title: receiverName });
  }, [navigation, receiverName]);

  // READ: Mengambil pesan secara Real-Time
  useEffect(() => {
    // Arahkan ke koleksi: chats -> [chatId] -> messages
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc')); // 'asc' biar chat baru ada di bawah

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  // CREATE: Ngirim pesan baru
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const messageToSend = inputText.trim();
    setInputText(''); // Kosongin kolom ketik langsung biar kerasa responsif

    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      await addDoc(messagesRef, {
        text: messageToSend,
        senderId: currentUserId,
        receiverId: receiverId,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Gagal ngirim pesan: ", error);
    }
  };

  // Render UI Bubble Chat
  const renderMessage = ({ item }) => {
    const isMyMessage = item.senderId === currentUserId;

    return (
      <View style={[
        styles.bubble, 
        isMyMessage ? styles.myBubble : styles.otherBubble
      ]}>
        {!isMyMessage && <Text style={styles.senderName}>{receiverName}</Text>}
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: SIZES.padding }}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ketik pesan..."
          placeholderTextColor={COLORS.textMuted}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          {/* Pakai icon teks sederhana dulu buat tombol kirim */}
          <Text style={styles.sendText}>{'►'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  // -- BUBBLE CHAT --
  bubble: { 
    padding: 12, 
    borderRadius: SIZES.cardRadius, 
    marginBottom: 10, 
    maxWidth: '80%',
    ...SHADOWS.medium
  },
  myBubble: { 
    backgroundColor: COLORS.surface, 
    alignSelf: 'flex-end', 
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: COLORS.border 
  },
  otherBubble: { 
    backgroundColor: COLORS.surfaceMid, 
    alignSelf: 'flex-start', 
    borderBottomLeftRadius: 0 
  },
  
  // -- TIPOGRAFI --
  senderName: { 
    ...FONTS.caption,
    fontWeight: '700', 
    color: COLORS.textMuted, 
    marginBottom: 4 
  },
  messageText: { 
    ...FONTS.body,
    color: COLORS.text 
  },
  
  // -- AREA INPUT --
  inputRow: { 
    flexDirection: 'row', 
    padding: 12, 
    backgroundColor: COLORS.background, 
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.surface
  },
  input: { 
    flex: 1, 
    backgroundColor: COLORS.surfaceMid,
    color: COLORS.text,
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: SIZES.pill, 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    marginRight: 10,
    ...FONTS.body,
  },
  sendBtn: { 
    backgroundColor: COLORS.primary, 
    width: 48,
    height: 48,
    borderRadius: SIZES.circle,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.heavy
  },
  sendText: { 
    color: '#000000', 
    fontSize: 18,
    marginLeft: 4, // Biar ikon segitiganya keliatan pas di tengah
  }
});