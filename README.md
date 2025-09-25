# Insta App

Aplikasi media sosial sederhana mirip Instagram, dibangun dengan Laravel 12 (backend) dan Vue.js 3 (frontend) serta styling menggunakan tailwind css.

## Fitur Utama
- Registrasi & Login pengguna
- Posting gambar dan teks
- Like dan komentar pada postingan
- Autentikasi dan otorisasi pengguna
- Hak akses terhadap post, like, dan komentar
- Halaman profil dengan grid postingan

## Instalasi & Setup

### 1. Clone Repository
```bash
git clone https://github.com/freeluncher/insta-app.git
cd insta-app
```

### 2. Setup Backend (Laravel)
```bash
cd backend
cp .env.example .env
# Edit .env sesuai konfigurasi database Anda
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```

### 3. Setup Frontend (Vue.js)
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Akses Aplikasi
- Backend: http://localhost:8000
- Frontend: http://localhost:5173

## Guide Penggunaan

1. **Registrasi & Login**
   - Daftar akun baru di halaman register
   - Login dengan email & password
2. **Posting Konten**
   - Klik tombol tambah post
   - Upload gambar dan isi caption
   - Post akan muncul di feed dan profil
3. **Interaksi Sosial**
   - Like postingan dengan klik ikon hati
   - Tambahkan komentar di detail post
4. **Autentikasi & Hak Akses**
   - Hanya user login yang bisa membuat, mengedit, dan menghapus post sendiri
   - Like/komentar hanya bisa dilakukan oleh user login
   - Komentar hanya bisa dihapus oleh pemilik komentar atau pemilik post
5. **Halaman Profil**
   - Tampilkan info user, bio, followers/following, dan grid postingan
   - Navigasi antar halaman dengan bottom navigation (mobile)

## Struktur Folder
```
insta-app/
├── backend/    # Laravel API
├── frontend/   # Vue.js SPA
```

## Seed Data Demo
- User 1: john@example.com / password123
- User 2: jane@example.com / password123

## Troubleshooting
- Pastikan database sudah dikonfigurasi dan berjalan
- Jika ada error pada frontend, cek koneksi ke backend dan token autentikasi
- Jalankan `php artisan migrate --seed` untuk data awal

## Kontribusi
Pull request dan issue sangat diterima untuk pengembangan lebih lanjut.

## Lisensi
MIT
