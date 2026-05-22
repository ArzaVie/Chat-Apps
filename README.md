# Chat-App - Praktikum Pertemeuan 11
## Identitas 

- **Nama**  : Arzza Munabim
- **NIM**   : 2410501032
- **Kelas** : Pemrograman Mobile Lanjut - B

---

## Cara Run Project

Pastikan Anda sudah menginstall Node.js dan aplikasi Expo Go di smartphone.

1.  **Clone Repository**
    ```bash
    git clone 
    cd 
    
    ```
2.  **Install Dependencies**
    ```bash
    npm install
    ```
3.  **Run Metro Bundler**
    ```bash
    npx expo start -c
    ```
4.  **Scan QR Code**: Buka aplikasi **Expo Go** di Android/iOS dan scan QR Code yang muncul di terminal.

---

## Screenshots

| Home                             | Detail Screen                        | Search                               | Favorites                           | Profile                             |
| -------------------------------- | ------------------------------------ | ------------------------------------ | ----------------------------------- | ------------------------------------ |
| ![Home]() | ![Detail]() | ![Seacrh]() | ![Fav]() | ![About]() |

---
## Referensi

## Refleksi
Proyek UTS BookShelf ini memberikan banyak pelajaran teknis, terutama saat integrasi dengan *Open Library API* yang responsnya lambat dan memiliki struktur data inkonsisten (seperti data *cover* yang kosong atau format deskripsi yang berubah-ubah). Saya mengatasi *bug* tersebut dengan mengatur ulang *timeout* pada Axios menjadi 30 detik serta menggunakan *conditional rendering* dan gambar *placeholder*.