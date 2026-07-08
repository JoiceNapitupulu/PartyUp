# 🎮 PartyUp! — Platform Pencari Team Project & Micro-Networking Mahasiswa IT

> **Tema Kompetisi:** INVENTION 2026 - Web Design (Building Smarter Communities Through Digital Learning)  
> **Gaya Estetika:** Retro 8-bit Pixel Art RPG (Monochrome, Pixel Green, Navy Blue)  
> **Tipe Platform:** Static Website / Client-Side Rendering (Tanpa Backend Aktif)

---

## 🌟 Tentang PartyUp!

**PartyUp!** adalah platform pencari anggota tim (*teammate finder*) berbasis proyek dan *micro-networking* khusus untuk mahasiswa teknologi informasi. Mengadaptasi konsep **"Quest Board"** (Papan Misi) dari game RPG klasik, platform ini memudahkan mahasiswa untuk membentuk tim (*Party*) guna mengikuti kompetisi, hackathon, proyek perkuliahan, atau kolaborasi riset berdasarkan kecocokan keahlian (*skill matching*).

Mahasiswa dikelompokkan ke dalam tiga "kelas karakter" utama di dunia IT:
*   **Hacker (Developer/Programmer):** Bertugas membangun kode dan sistem teknis.
*   **Hipster (UI/UX Designer):** Merancang antarmuka, aset visual, dan pengalaman pengguna.
*   **Hustler (Project Manager/Business):** Menyusun strategi bisnis, presentasi, dan memimpin manajemen tim.

---

## ✨ Fitur Utama

1.  **CRT Monitor Hero Simulator & RPG HUD Stats**
    *   Halaman beranda (`/`) menampilkan simulasi monitor tabung CRT interaktif dengan efek *scanlines* visual menyala, dipadukan dengan panel statistik HUD ala game RPG klasik.
2.  **Dynamic Onboarding (Mock Auth)**
    *   Form pendaftaran (`/register`) interaktif yang mensimulasikan pemilihan *class* (Hacker/Hipster/Hustler), universitas, program studi, serta pengisian *tagging tech stack* yang dinamis.
3.  **Project Matchmaking Board (Static Filter)**
    *   Halaman `/board` menyajikan daftar lowongan proyek aktif yang membutuhkan peran tertentu. Dilengkapi filter pencarian instan berbasis teks, *tech stack*, atau kebutuhan *class* anggota secara *real-time* di sisi klien (*client-side filtering*).
4.  **Interactive Portfolio & Invitation**
    *   Pengguna dapat melihat portofolio dan profil mendalam sesama pencari kerja tim (`/profile` & `/showcase`). Dilengkapi tombol interaktif **"Send Invitation"** yang memicu formulir rekrutmen berbasis modal *pop-up* interaktif.
5.  **Micro-Networking Timeline**
    *   Halaman `/following` yang mensimulasikan pembaruan status, unggahan pencapaian, dan aktivitas terkini dari koneksi atau anggota tim terdekat dalam bentuk antarmuka kartu retro yang bersih.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi web modern berkinerja tinggi dengan konfigurasi keluaran statis murni:

*   **Core Framework:** [Next.js (v16.2.10)](https://nextjs.org) (Menggunakan App Router dan dikonfigurasi untuk `output: 'export'`).
*   **Library UI:** [React (v19.2.4)](https://react.dev) (Memanfaatkan `useState`, `useEffect`, dan *hooks* lainnya untuk mengelola status interaktif).
*   **Styling (CSS):** [Tailwind CSS v4](https://tailwindcss.com) & [PostCSS](https://postcss.org) (Dengan kustomisasi tema `@theme` untuk bayangan tegas piksel, batas piksel kustom, dan palet warna retro).
*   **Tipografi (Google Fonts via next/font):**
    *   *Press Start 2P:* Digunakan pada Heading (H1, H2, H3) dan Tombol untuk kesan piksel 8-bit yang otentik.
    *   *Inter / Roboto:* Digunakan pada teks deskripsi, formulir, dan konten bacaan agar tetap nyaman dibaca oleh pengguna.
*   **Data Mocking:** Berbasis JSON lokal yang diletakkan di dalam folder `/src/data` (`users.json` dan `projects.json`) untuk merender daftar petualang dan misi secara dinamis.

---

## 📂 Susunan Project

Struktur folder dalam proyek ini diatur secara modular untuk memudahkan pengelolaan komponen dan halaman:

```text
PartyUp!/
├── .next/                  # Cache kompilasi dan hasil build Next.js (otomatis dibuat)
├── node_modules/           # Paket dependensi proyek (diinstal via npm/yarn)
├── out/                    # File build statis siap hosting (HTML, CSS, JS murni)
├── public/                 # Aset statis publik (ikon, gambar pixel art, favicon)
├── src/                    # Direktori utama kode sumber aplikasi
│   ├── app/                # Struktur halaman Next.js App Router
│   │   ├── board/          # Folder halaman Project Board (/board)
│   │   ├── following/      # Folder halaman feed timeline (/following)
│   │   ├── login/          # Folder halaman login mock (/login)
│   │   ├── profile/        # Folder halaman profil & sub-navigasi (/profile)
│   │   ├── register/       # Folder halaman registrasi / onboarding (/register)
│   │   ├── showcase/       # Folder halaman portofolio lampau (/showcase)
│   │   ├── globals.css     # File CSS utama, memuat Tailwind v4 & custom utility
│   │   ├── layout.js       # Tata letak utama (Root Layout) & pemuatan Font Google
│   │   └── page.js         # Halaman Utama (Beranda dengan Monitor CRT)
│   ├── components/         # Komponen antarmuka yang dapat digunakan berulang kali
│   │   ├── Header.js       # Header Navigasi bergaya retro dengan status koneksi
│   │   ├── Footer.js       # Footer bergaya retro minimalis
│   │   ├── PixelButton.js  # Tombol kustom dengan efek bayangan piksel 3D
│   │   └── ProjectCard.js  # Komponen kartu proyek/quest beserta syarat teknologi
│   └── data/               # Basis data lokal (Mock Database JSON)
│       ├── projects.json   # Kumpulan data quest/proyek
│       └── users.json      # Kumpulan data pengguna/mahasiswa
├── eslint.config.mjs       # Konfigurasi linter kode ESLint
├── jsconfig.json           # Konfigurasi alias path (seperti "@/*" ke "src/*")
├── next.config.mjs         # Konfigurasi build Next.js (dengan target 'export' statis)
├── package.json            # Daftar script perintah dan dependensi library
├── package-lock.json       # Catatan penguncian versi dependensi npm
└── README.md               # File panduan dokumentasi proyek (file ini)
```

---

## 📋 Prasyarat Instalasi

Sebelum memulai instalasi dan menjalankan proyek secara lokal, pastikan perangkat Anda telah memenuhi prasyarat berikut:

1.  **Node.js:** Versi **18.x.x atau lebih baru** (Rekomendasi versi LTS terbaru). Anda bisa mengecek versi Node.js dengan perintah:
    ```bash
    node -v
    ```
2.  **Package Manager:** **npm** (bawaan Node.js), atau alternatif lain seperti **yarn**, **pnpm**, atau **bun**.

---

## 🚀 Contoh Penggunaan & Cara Menjalankan

Ikuti langkah-langkah di bawah ini untuk memasang dan menjalankan proyek **PartyUp!** di komputer Anda:

### 1. Kloning Repositori
Kloning proyek ini terlebih dahulu dari GitHub ke penyimpanan lokal Anda:
```bash
git clone https://github.com/username-anda/party-up.git
cd party-up
```

### 2. Instal Dependensi Proyek
Instal seluruh paket dependensi yang dibutuhkan oleh Next.js dan Tailwind CSS:
```bash
npm install
# atau menggunakan package manager lain:
# yarn install  |  pnpm install  |  bun install
```

### 3. Jalankan Mode Pengembangan (Development Server)
Jalankan server lokal untuk melihat perubahan kode secara instan (*Hot Reloading*):
```bash
npm run dev
```
Setelah server menyala, buka browser Anda dan akses tautan berikut:
👉 [**http://localhost:3000**](http://localhost:3000)

### 4. Melakukan Linter (Opsional)
Untuk memeriksa kualitas kode dari potensi *bug* dan ketidakrapian penulisan:
```bash
npm run lint
```

### 5. Kompilasi & Ekspor File Statis (Production Build)
Untuk melakukan kompilasi proyek dan mengekspornya menjadi halaman web HTML/CSS/JS statis yang bisa diunggah ke layanan hosting gratis seperti Netlify, Vercel, GitHub Pages, atau Cloudflare Pages:
```bash
npm run build
```
Hasil kompilasi siap produksi akan diekspor ke dalam folder `/out`.

### 6. Menjalankan Hasil Build Statis Secara Lokal
Anda dapat mempratinjau hasil build statis di folder `/out` dengan menggunakan server lokal seperti `serve`:
```bash
npx serve out
```
Buka alamat port yang tertera pada konsol terminal Anda (biasanya `http://localhost:3000` atau `http://localhost:5000`).

---

## 👥 Kontributor

Proyek ini dikembangkan oleh tim developer untuk kompetisi **INVENTION 2026**:

   **[Joice Anastasya Napitupulu]** 
   **[Davina]** 
   **[Septian]** 


---
*PartyUp! — Bentuk tim terkuatmu, selesaikan misinya, dan naikkan level komunitas IT bersama!* 🚀
