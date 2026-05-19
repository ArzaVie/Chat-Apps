// src/theme/index.js

// ==========================================
// 1. PALET WARNA (COLOR SYSTEM)
// ==========================================
export const COLORS = {
  // Brand Colors
  primary: '#1ed760',    // Warna aksi utama (Tombol Kirim, CTA)
  secondary: '#ffffff',  // Warna aksi sekunder
  
  // Background & Surfaces (Mode Gelap/Terang)
  background: '#121212', // Warna latar belakang layar utama
  surface: '#181818',    // Warna latar elemen/kartu/header
  surfaceMid: '#1f1f1f', // Warna latar input atau elemen melayang
  
  // Typography Colors
  text: '#ffffff',       // Warna teks utama (Heading/Body)
  textMuted: '#b3b3b3',  // Warna teks sekunder (Timestamp, Subtitle)
  
  // Utility Colors
  border: '#4d4d4d',     // Warna garis tepi (Outline/Divider)
  error: '#f3727f',      // Warna peringatan/error
  success: '#1db954',    // Warna sukses
};

// ==========================================
// 2. TIPOGRAFI & UKURAN TEKS (TYPOGRAPHY)
// ==========================================
export const FONTS = {
  title: { fontSize: 24, fontWeight: '700' },
  heading: { fontSize: 18, fontWeight: '600' },
  bodyBold: { fontSize: 16, fontWeight: '700' },
  body: { fontSize: 16, fontWeight: '400' },
  button: { 
    fontSize: 14, 
    fontWeight: '700', 
    letterSpacing: 1.5, 
    textTransform: 'uppercase' 
  },
  caption: { fontSize: 12, fontWeight: '400' },
};

// ==========================================
// 3. GEOMETRI & SPASI (SPACING & SHAPES)
// ==========================================
export const SIZES = {
  // Border Radius
  pill: 500,       // Radius untuk tombol lonjong/text input
  circle: 50,      // Radius 50% untuk avatar/tombol icon bulat
  cardRadius: 8,   // Radius standar untuk kotak/kartu/bubble chat
  
  // Spacing (Padding/Margin)
  base: 8,
  padding: 16,     // Padding standar layar
  margin: 16,      // Margin standar antar elemen
};

// ==========================================
// 4. EFEK BAYANGAN (ELEVATION & DEPTH)
// ==========================================
export const SHADOWS = {
  // Untuk elemen kecil yang sedikit menonjol
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // Untuk kartu atau dropdown
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  // Untuk modal, pop-up, atau tombol CTA utama
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
};