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
  - [Contoh Endpoint](#contoh-endpoint)
  - [Health Check](#health-check)
  - [Autentikasi](#autentikasi)
  - [Manajemen Pengguna](#manajemen-pengguna)
  - [Manajemen Mobil](#manajemen-mobil)
  - [Penanganan Kesalahan](#penanganan-kesalahan)
- [Super Admin Account](#super-admin-account)

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
   git clone https://github.com/raaapiiip/24001183-km7-raf-auth-ch5
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

3. **Jalankan seeders database**:

   ```bash
   npx sequelize-cli db:seed:all
   ```

### Environment Variables

Buat file `.env` di direktori root project Anda dan tambahkan environment variables berikut:

```env
# Konfigurasi server
PORT=3000

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
http://localhost:3000/api/v1/docs
```

### Contoh Endpoint

Berikut adalah beberapa endpoint utama API (http://localhost:3000/api/v1/...). Untuk dokumentasi lengkap, lihat di Swagger.

#### Health Check

- **GET** `/health-check`: Memeriksa status kesehatan aplikasi.

#### Autentikasi

- **POST** `/auths/login`: Login pengguna untuk mendapatkan token JWT.
- **POST** `/auths/register`: Mendaftarkan pengguna baru.
- **POST** `/auths/add-admin`: Tambahkan admin baru (hanya untuk superadmin).

#### Manajemen Pengguna

- **GET** `/users`: Mengambil semua data pengguna (hanya untuk admin dan superadmin).
- **GET** `/users/:id`: Mengambil data pengguna berdasarkan ID (hanya untuk admin dan superadmin).

#### Manajemen Mobil

- **GET** `/cars`: Mengambil semua data mobil (hanya untuk admin dan superadmin).
- **GET** `/cars/:id`: Mengambil data mobil berdasarkan ID (hanya untuk admin dan superadmin).
- **POST** `/cars`: Menambahkan mobil baru (hanya untuk admin dan superadmin).
- **PATCH** `/cars/:id`: Memperbarui data mobil berdasarkan ID (hanya untuk superadmin).
- **DELETE** `/cars/:id`: Menghapus data mobil secara lunak berdasarkan ID (hanya untuk superadmin).

### Penanganan Kesalahan

Setiap endpoint memberikan respons kesalahan standar untuk kode status HTTP umum:

- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `500` Internal Server Error

---

## Super Admin Account

Email: rafif@mail.com<br>
Password: punyasiapa

---
