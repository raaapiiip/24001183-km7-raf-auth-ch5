# Binar Car Rental API (BCR) - Chapter 5 Challenge

Repository ini berisi API backend untuk aplikasi Binar Car Rental. API ini dikembangkan menggunakan Node.js dan Express serta memanfaatkan Sequelize ORM untuk manajemen data dengan PostgreSQL. Aplikasi ini mencakup autentikasi pengguna, kontrol akses role-based, dan operasi CRUD untuk mengelola data mobil.

## Daftar Isi

- [Fitur](#fitur)
- [Techstack yang Digunakan](#techstack-yang-digunakan)
- [Inisiasi](#inisiasi)
  - [Prasyarat](#prasyarat)
  - [Instalasi](#instalasi)
  - [Setup Database](#setup-database)
  - [Environment Variables](#environment-variables)
- [Dokumentasi API](#dokumentasi-api)

---

## Fitur

- **Autentikasi Pengguna**: Autentikasi berbasis JWT yang aman untuk login dan registrasi.
- **Kontrol Akses Role-Based**: Akses ke beberapa endpoint API dibatasi berdasarkan role (`superadmin`, `admin`, dan `member`).
- **Operasi CRUD untuk Mobil**: Mengizinkan pengguna terotorisasi untuk membuat, memperbarui, menghapus, dan mengambil data mobil.
- **Unggah File**: Mendukung unggahan gambar untuk mobil.

## Techstack yang Digunakan

- **Node.js**
- **Express**
- **Sequelize ORM** (PostgreSQL)
- **ImageKit** (untuk unggah gambar)
- **JWT** (JSON Web Token) untuk autentikasi
- **Swagger** (dokumentasi API)

---

## Inisiasi

### Prasyarat

- **Node.js** dan **npm**: Pastikan Node.js dan npm sudah terinstal.
- **PostgreSQL**: Pastikan PostgreSQL sudah terinstal dan berjalan.

### Instalasi

1. **Kloning repository**:

   ```bash
   git clone https://github.com/username-anda/binar-car-rental-api.git
   cd binar-car-rental-api
   ```

2. **Install dependensi**:

   ```bash
   npm install
   ```

### Setup Database

1. **Buat database PostgreSQL** untuk aplikasi ini.

2. **Jalankan migrasi database**:

   ```bash
   npx sequelize-cli db:migrate
   ```

3. **Jalankan seeders database** (jika tersedia):

   ```bash
   npx sequelize-cli db:seed:all
   ```

### Environment Variables

Buat file `.env` di direktori root project Anda dan tambahkan environment variables berikut:

```env
# Konfigurasi server
PORT=5000

# JWT
JWT_SECRET=jwt_secret_anda
JWT_EXPIRED=1h

# Database (PostgreSQL)
DB_HOST=localhost
DB_USER=user_database_anda
DB_PASSWORD=password_database_anda
DB_NAME=nama_database_anda
DB_PORT=5432

# ImageKit (untuk unggah gambar)
IMAGEKIT_PUBLIC_KEY=public_key_anda
IMAGEKIT_PRIVATE_KEY=private_key_anda
IMAGEKIT_URL_ENDPOINT=url_endpoint_anda
```

---

## Dokumentasi API

Endpoint API didokumentasikan menggunakan Swagger. Setelah Anda menjalankan server, Anda dapat mengakses dokumentasi di:

```
http://localhost:5000/api-docs
```

### Contoh Endpoint

Berikut adalah beberapa endpoint utama API. Untuk dokumentasi lengkap, lihat di Swagger.

#### Autentikasi

- **POST** `/auths/login`: Login pengguna untuk mendapatkan token JWT.
- **POST** `/auths/register`: Mendaftarkan pengguna baru.

#### Manajemen Pengguna

- **POST** `/auths/add-admin`: Tambahkan admin baru (hanya untuk superadmin).

#### Manajemen Mobil

- **GET** `/cars`: Mengambil semua mobil (hanya admin dan superadmin).
- **POST** `/cars`: Menambahkan mobil baru (hanya untuk admin atau superadmin).
- **PATCH** `/cars/:id`: Memperbarui data mobil berdasarkan ID (hanya pemilik atau superadmin).
- **DELETE** `/cars/:id`: Menghapus data mobil secara lunak berdasarkan ID (hanya pemilik atau superadmin).

### Penanganan Kesalahan

Setiap endpoint memberikan respons kesalahan standar untuk kode status HTTP umum:

- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `500` Internal Server Error

---
