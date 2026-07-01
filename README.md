# ☕ Bikin Cafe

> **Aplikasi Web Manajemen Cafe** — Menampilkan menu digital, menerima reservasi, dan mengelola operasional cafe melalui dashboard admin.

---

## ✨ Fitur Utama

### 🏠 Halaman Publik
- **Hero Section** — Sambutan dengan visual menarik dan ajakan memesan
- **Statistik Cafe** — Menampilkan angka kunjungan, menu, pelanggan & cabang
- **Katalog Menu** — Menampilkan menu berdasarkan kategori (Makanan, Minuman, Cemilan)
- **Reservasi Online** — Form reservasi meja dengan pilihan tanggal, waktu & jumlah tamu
- **Desain Responsif** — Tampilan optimal di Desktop, Tablet & Mobile

### 🔐 Admin Dashboard
- **Autentikasi** — Login/Logout menggunakan Laravel Sanctum (token-based)
- **Manajemen Kategori** — CRUD kategori menu (Makanan, Minuman, dll.)
- **Manajemen Menu** — CRUD menu dengan gambar, harga, deskripsi & status popular
- **Manajemen Reservasi** — Melihat & mengubah status reservasi (pending, confirmed, cancelled)
- **Proteksi Route** — Halaman admin hanya bisa diakses setelah login

---

## 🛠️ Tech Stack

### Frontend
| Teknologi | Keterangan |
|-----------|-----------|
| **React 19** | Library UI |
| **Vite 8** | Build tool cepat |
| **React Router DOM 7** | Routing SPA |
| **Axios** | HTTP client untuk API |
| **TanStack React Query** | Manajemen state server (caching, fetching) |
| **Zustand** | State management ringan (auth, UI) |
| **LightningCSS** | CSS processing modern |
| **ESLint** | Linter kode |

### Backend
| Teknologi | Keterangan |
|-----------|-----------|
| **Laravel 12** | Framework PHP |
| **SQLite** | Database |
| **Sanctum** | API token authentication |
| **PHPUnit** | Testing |

---

## 📁 Struktur Proyek

```
bikin-cafe/
├── backend/                          # API Laravel
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── MenuController.php         # Public: daftar menu
│   │   │   ├── ReservationController.php  # Public: reservasi
│   │   │   └── Admin/
│   │   │       ├── AuthController.php      # Login/Logout/Me
│   │   │       ├── CategoryController.php  # CRUD kategori
│   │   │       ├── MenuController.php      # CRUD menu
│   │   │       └── ReservationController.php # Manajemen reservasi
│   │   └── Models/
│   │       ├── Category.php
│   │       ├── Menu.php
│   │       ├── Reservation.php
│   │       └── User.php
│   ├── database/migrations/           # Migrasi tabel
│   ├── routes/api.php                 # Endpoint API
│   └── .env                           # Konfigurasi
│
├── frontend/                          # SPA React
│   ├── src/
│   │   ├── api/
│   │   │   ├── index.js               # Public API (menus, reservations)
│   │   │   └── admin.js               # Admin API
│   │   ├── components/
│   │   │   ├── Hero.jsx + .css        # Hero Section
│   │   │   ├── Stats.jsx + .css       # Statistik
│   │   │   ├── Catalog.jsx + .css     # Katalog Menu
│   │   │   ├── ReservationModal.jsx + .css  # Modal Reservasi
│   │   │   └── Footer.jsx + .css      # Footer
│   │   ├── pages/
│   │   │   ├── AdminLogin.jsx + .css  # Halaman Login Admin
│   │   │   └── AdminDashboard.jsx + .css  # Dashboard Admin
│   │   ├── store/
│   │   │   ├── useAuthStore.js        # State autentikasi (Zustand)
│   │   │   └── useUiStore.js          # State UI (Zustand)
│   │   ├── App.jsx                    # Routing utama
│   │   └── main.jsx                   # Entry point
│   └── index.html
│
├── package.json                       # Dependencies root
└── README.md                          # Dokumentasi
```

---

## 🚀 Cara Menjalankan

### 📋 Prasyarat
- **PHP** >= 8.2
- **Composer**
- **Node.js** >= 20
- **Git**

### ⚙️ 1. Clone & Setup Backend

```bash
# Clone repositori
git clone https://github.com/awand795/web-cafe.git
cd web-cafe/backend

# Install dependencies PHP
composer install

# Copy & konfigurasi environment
cp .env.example .env
php artisan key:generate

# Setup database SQLite
touch database/database.sqlite

# Jalankan migrasi & seeder
php artisan migrate --seed

# Buat storage link
php artisan storage:link

# Jalankan server Laravel
php artisan serve
```

> 📝 **Catatan:** Pastikan file `.env` sudah dikonfigurasi. Untuk SQLite, cukup atur `DB_CONNECTION=sqlite`.

### ⚙️ 2. Setup Frontend

```bash
# Buka terminal baru
cd web-cafe/frontend

# Install dependencies Node.js
npm install

# Jalankan dev server
npm run dev
```

Frontend akan berjalan di **http://localhost:5173** dan backend di **http://localhost:8000**.

### 🔐 3. Login Admin

1. Buka **http://localhost:5173/admin/login**
2. Gunakan kredensial dari seeder admin (default: email dan password yang sudah di-seed)

---

## 📡 API Endpoints

### Public API

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/menus` | Daftar semua menu |
| `POST` | `/api/reservations` | Buat reservasi baru |

### Admin API (auth: `sanctum`)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/api/admin/login` | Login admin |
| `POST` | `/api/admin/logout` | Logout admin |
| `GET` | `/api/admin/me` | Data admin saat ini |
| `GET` | `/api/admin/categories` | Daftar kategori |
| `POST` | `/api/admin/categories` | Tambah kategori |
| `PUT` | `/api/admin/categories/{id}` | Update kategori |
| `DELETE` | `/api/admin/categories/{id}` | Hapus kategori |
| `GET` | `/api/admin/menus` | Daftar menu (admin) |
| `POST` | `/api/admin/menus` | Tambah menu |
| `GET` | `/api/admin/menus/{id}` | Detail menu |
| `PUT` | `/api/admin/menus/{id}` | Update menu |
| `DELETE` | `/api/admin/menus/{id}` | Hapus menu |
| `GET` | `/api/admin/reservations` | Daftar reservasi |
| `GET` | `/api/admin/reservations/{id}` | Detail reservasi |
| `PUT` | `/api/admin/reservations/{id}/status` | Update status reservasi |
| `DELETE` | `/api/admin/reservations/{id}` | Hapus reservasi |

---

## 🗄️ Database Structure

### Tabel `categories`
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| `id` | bigint (PK) | ID |
| `name` | string | Nama kategori (Makanan, Minuman, dll) |
| `slug` | string (unique) | Slug unik |
| `created_at` | timestamp | Waktu dibuat |
| `updated_at` | timestamp | Waktu diupdate |

### Tabel `menus`
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| `id` | bigint (PK) | ID |
| `category_id` | bigint (FK) | ID kategori |
| `name` | string | Nama menu |
| `description` | text | Deskripsi |
| `price` | decimal | Harga |
| `image_url` | string | URL gambar |
| `is_popular` | boolean | Menu populer? |
| `created_at` | timestamp | Waktu dibuat |
| `updated_at` | timestamp | Waktu diupdate |

### Tabel `reservations`
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| `id` | bigint (PK) | ID |
| `name` | string | Nama pemesan |
| `phone` | string | No. telepon |
| `date` | date | Tanggal reservasi |
| `time` | time | Waktu reservasi |
| `guests` | integer | Jumlah tamu |
| `status` | enum | pending / confirmed / cancelled |
| `special_request` | text | Permintaan khusus |
| `created_at` | timestamp | Waktu dibuat |
| `updated_at` | timestamp | Waktu diupdate |

---

## 🧑‍💻 Author

**Awand**  
🔗 [github.com/awand795](https://github.com/awand795)

---

## 📄 Lisensi

Hak cipta dilindungi. Proyek ini dibuat untuk keperluan portofolio dan pembelajaran.
