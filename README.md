<h1 align="center">LAPORAN PRAKTIKUM</h1>
<h1 align="center">APLIKASI BERBASIS PLATFORM</h1>

<br>

<h2 align="center">TUGAS COTS </h2>
<h2 align="center">daftar - kontak</h2>

<br><br>

<p align="center">
<img src="/daftar-kontak/assets/logo.png" width="350">
</p>
<br><br><br>

<h2 align="center">Disusun Oleh :</h2>

<p align="center" style="font-size:28px;">
  <b>Mohammad Nizal Maulana</b><br>
  <b>2311102150</b><br>
  <b>S1 IF-11-REG 04</b>
</p>
<br>
<h2 align="center">Dosen Pengampu :</h2>

<p align="center" style="font-size:28px;">
  <b>Cahyo Prihantoro, S.Kom., M.Eng </b>
</p>
<br>

<br>
<h1 align="center">LABORATORIUM HIGH PERFORMANCE</h1>
<h1 align="center">FAKULTAS INFORMATIKA</h1>
<h1 align="center">UNIVERSITAS TELKOM PURWOKERTO</h1>
<h1 align="center">TAHUN 2026</h1>

<hr>

## 1. Dasar Teori
**HTML** atau HyperText Markup Language merupakan bahasa dasar yang digunakan untuk membangun sebuah web dimana HTML menangani elemen-elemen dasar pada pembangunan sebuah website.<br>

**CSS** merupakan bahasa yang membantu memperindah tampilan dari laman web yang telah dibangun dengan HTML. CSS mendeskripsikan bagaimana bentuk tampilan elemen HTML seharusnya saat ditampilkan pada laman browser.<br>
 
**Bootstrap** merupakan sebuah front-end framework gratis untuk pengembangan antar muka web yang lebih cepat dan lebih mudah. Dikembangkan oleh Mark Otto dan Jacom Thornton di Twitter dan dirilis sebagai produk open source pada Agustus 2011 di GitHub. Bootstrap mencakup template desain berbasis HTML dan CSS untuk tipografi, form, button, navigasi, modal, image carousells dan masih banyak lagi, serta terdapat opsional plugin JavaScript.<br>

**JAVASCRIPT & JQUERY** Javascript, seperti namanya, merupakan bahasa pemrograman scripting. Dan seperti bahasa scripting lainnya, Javascript umumnya digunakan hanya untuk program yang tidak terlalu besar, biasanya hanya beberapa ratus baris. Javascript pada umumnya mengontrol program yang berbasis Java. Jadi memang pada dasarnya Javascript tidak dirancang untuk digunakan dalam aplikasi skala besar. jQuery adalah sebuah library Javascript yang dibuat oleh John Resig pada tahun 2006. jQuery memungkinkan manipulasi dokumen HTML dilakukan hanya dalam beberapa baris code.<br>
## 2. Stuktur Halaman
```
daftar-kontak/
│
├── node_modules/          # Folder dependency NodeJS
│
|── assets/                # untuk menyimpan gambar
├── public/                # Folder frontend 
│   ├── index.html         # Halaman utama (tabel)
│   ├── form.html          # Halaman tambah data kontak
│   ├── edit.html          # Halaman edit data kontak
│   └── style.css          # File styling (CSS)
│
├── data.json              # Database sederhana (format JSON)
│
├── server.js              # Backend (NodeJS + Express, API CRUD)
│
├── package.json           # Konfigurasi project & dependency
├── package-lock.json      # Lock versi dependency
│
└── README.md              # Dokumentasi aplikasi
```
## 3. Struktur  Halaman
Website daftar-kontak ini memiliki struktur halaman sebagai berikut :
### Halaman Home
Halaman home ini adalah halaman yang pertama kali ditampilkan ketika user mengakses web. halaman ini berisikan jumlah kontak yang ada, tabel daftar kontak dan tombol tambah,edit dan hapus kontak. 
<img src="/daftar-kontak/assets/home.png">

### Halaman Form (Tambah Kontak)
Digunakan untuk menambah kontak, dengan isi form berupa nama,no HP dan Email. 
<img src="/daftar-kontak/assets/forrm.png">

### Halaman Edit (Edit data kontak)
Digunakan untuk mengedit atau memperbarui data data yang ada di kontak baik itu nama, no HP dan Email
<img src="/daftar-kontak/assets/edit.png">

## 4. Kode Program

## 5. Kesimpulan

## 6. Link Video Presentasi
