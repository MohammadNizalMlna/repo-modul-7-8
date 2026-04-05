<h1 align="center">LAPORAN PRAKTIKUM</h1>
<h1 align="center">APLIKASI BERBASIS PLATFORM</h1>

<br>

<h2 align="center">TUGAS COTS </h2>
<h2 align="center">daftar - kontak</h2>

<br><br>

<p align="center">
<img src="/daftar-kontak/assets/LogoTelkom.png" width="350">
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
**Node JS** merupakan runtime environment yang memungkinkan JavaScript dijalankan di sisi server. Pada aplikasi ini, NodeJS digunakan untuk membuat server dan menangani proses CRUD terhadap data yang disimpan dalam file JSON.<br>
**AJAX (Asynchronous JavaScript and XML)** merupakan teknik yang digunakan untuk melakukan komunikasi dengan server secara asynchronous tanpa harus melakukan reload halaman. Dalam aplikasi ini, AJAX digunakan untuk mengirim dan mengambil data dari server sehingga aplikasi menjadi lebih responsif dan efisien.<br>
**JSON (JavaScript Object Notation)** merupakan format pertukaran data yang ringan dan mudah dibaca oleh manusia maupun mesin. JSON digunakan sebagai media penyimpanan data pada aplikasi ini dan sebagai format data yang dikirim dari server ke client.
## 2. Stuktur Folder
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
Halaman ini menampilkan data kontak ddalam bentuk tabel memakai jQuery DataTables. Data diambil dari server dalam formaat JSON dan ditampilkan secara dinamis. Pada data ini juga tersedia tombol aksi untuk melakukan update dan hapus data.
<img src="/daftar-kontak/assets/home.png">

### Halaman Form (Tambah Kontak)
Halaman ini digunakan untuk menambahkan data kontak baru. User dapat mengisi form berupa nama, nomor HP dan email. Data yang dimasukkan akan dikirim ke server menggunakan AJAX dalam format JSON tanpa reload halaman. 
<img src="/daftar-kontak/assets/forrm.png">

### Halaman Edit (Edit data kontak)
Halaman ini difunakan untuk mengubah data kontak yang sudah ada. Data kontak akan ditampilkan secara otomatis pada form berdasarkan ID yang dipilih dari halaman utama. User dapat mengubah data dengan validasi yang sama seperti pada form tambah. Setelah data diperbarui, perubahan dikirim ke server.
<img src="/daftar-kontak/assets/edit.png">

## 4. Kode Program
### A. `server.js`
```js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const FILE = 'data.json';

// baca data
function readData() {
    return JSON.parse(fs.readFileSync(FILE));
}

// simpan data
function writeData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// GET ALL (untuk DataTables)
app.get('/kontak', (req, res) => {
    res.json({ data: readData() });
});

// GET BY ID
app.get('/kontak/:id', (req, res) => {
    const data = readData().find(k => k.id == req.params.id);
    res.json(data);
});

// CREATE
app.post('/kontak', (req, res) => {
    let data = readData();
    const newData = {
        id: Date.now(),
        nama: req.body.nama,
        nohp: req.body.nohp,
        email: req.body.email
    };
    data.push(newData);
    writeData(data);
    res.send('Berhasil');
});

// UPDATE
app.put('/kontak/:id', (req, res) => {
    let data = readData();

    data = data.map(k => {
        if (k.id == req.params.id) {
            return { ...k, ...req.body };
        }
        return k;
    });
    writeData(data);
    res.send('Updated');
});

// DELETE
app.delete('/kontak/:id', (req, res) => {
    let data = readData().filter(k => k.id != req.params.id);
    writeData(data);
    res.send('Deleted');
});

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));
```
**penjelasan `server.js`**
Program di atas merupakan aplikasi backend sederhana menggunakan Express.js yang berjalan pada port 3000. Aplikasi ini berfungsi sebagai API untuk mengelola data kontak yang disimpan dalam file data.json sebagai database sederhana. Modul body-parser digunakan untuk membaca data dari request, sedangkan express.static('public') digunakan untuk mengakses file frontend.

Aplikasi ini menerapkan konsep CRUD. Endpoint GET /kontak digunakan untuk menampilkan seluruh data kontak, sedangkan GET /kontak/:id untuk mengambil satu data berdasarkan ID (biasanya untuk keperluan edit). Endpoint POST /kontak digunakan untuk menambahkan data kontak baru dengan ID otomatis. Kemudian, PUT /kontak/:id digunakan untuk memperbarui data kontak tertentu, dan DELETE /kontak/:id untuk menghapus data berdasarkan ID. Saat server dijalankan, aplikasi dapat diakses melalui http://localhost:3000.
### B. `/daftar-kontak/public/index.html`###
```html
<!DOCTYPE html>
<html>
<head>
    <title>Kontak App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <!-- navbar -->
<nav class="navbar navbar-dark shadow">
    <div class="container d-flex justify-content-between">
        <span class="navbar-brand fw-bold">
            <i class="bi bi-person-lines-fill"></i> Kontak App
        </span>
        <span class="text-light small">2311102150 Mohammad Nizal Maulana</span>
    </div>
</nav>
    <!-- total kontak -->
<div class="container mt-4">
    <div class="row mb-3">
        <div class="col-md-4">
            <div class="card p-3 text-center">
                <h6>Total Kontak</h6>
                <h3 id="totalKontak">0</h3>
            </div>
        </div>
    </div>
    <div class="card p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h4 class="fw-bold mb-0">Daftar Kontak</h4>
                <small class="subtitle">Kelola semua kontak dengan mudah</small>
            </div>
            <a href="form.html" class="btn btn-primary">
                <i class="bi bi-plus-lg"></i> Tambah
            </a>
        </div>
        <!-- tabel -->
        <div class="table-responsive">
            <table id="tabel" class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>No HP</th>
                        <th>Email</th>
                        <th class="text-center">Aksi</th>
                    </tr>
                </thead>
            </table>
        </div>

    </div>

</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
    // ambil data dari data.json
$(document).ready(function () {
    const table = $('#tabel').DataTable({
        ajax: {
            url: 'http://localhost:3000/kontak',
            dataSrc: function(json) {
                document.getElementById('totalKontak').innerText = json.data.length;
                return json.data;
            }
        },
        columns: [
            { data: 'nama' },
            { data: 'nohp' },
            { data: 'email' },
            {
                data: 'id',
                className: 'text-center',
                render: function (data) {
                    return `
                        <a href="edit.html?id=${data}" class="btn btn-warning btn-sm me-1">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <button onclick="hapus(${data})" class="btn btn-danger btn-sm">
                            <i class="bi bi-trash"></i>
                        </button>
                    `;
                }
            }
        ]
    });

});
// tombol hapus
function hapus(id) {
    Swal.fire({
        title: 'Yakin hapus?',
        text: 'Data tidak bisa dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:3000/kontak/${id}`, {
                method: 'DELETE'
            }).then(() => {
                Swal.fire('Berhasil!', 'Data dihapus', 'success')
                .then(() => location.reload());
            });
        }
    });
}
</script>
</body>
</html>
```
**penjelasan `/daftar-kontak/public/index.html`**
Program di atas merupakan halaman utama aplikasi yang berfungsi untuk menampilkan data kontak dalam bentuk tabel interaktif menggunakan plugin jQuery DataTables. Tampilan halaman dibangun menggunakan Bootstrap sehingga menghasilkan antarmuka yang responsif dan user-friendly, serta dilengkapi dengan navbar dan informasi jumlah total kontak.
Data kontak diambil dari server melalui AJAX dengan endpoint GET /kontak dalam format JSON. Data tersebut kemudian ditampilkan secara dinamis ke dalam tabel. Pada setiap baris data tersedia tombol aksi untuk melakukan edit dan hapus data. Proses penghapusan dilakukan menggunakan Fetch API dengan metode DELETE secara asynchronous tanpa reload halaman. Halaman ini dapat diakses melalui http://localhost:3000/index.html.
### C. `/daftar-kontak/public/form.html`###
```html
<!DOCTYPE html>
<html>
<head>
    <title>Tambah Kontak</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- navbar -->
<nav class="navbar navbar-dark bg-dark shadow">
    <div class="container">
        <span class="navbar-brand fw-bold">
            <i class="bi bi-person-plus"></i> Tambah Kontak
        </span>
    </div>
</nav>
<!-- card utama -->
<div class="container mt-4">
    <div class="card p-4">
        <h4 class="fw-bold mb-3">Form Tambah Kontak</h4>
        <form id="form">
            <!-- nama -->
            <div class="mb-3">
                <label class="form-label">Nama</label>
                <input class="form-control" name="nama" required>
            </div>
            <!-- no hp -->
            <div class="mb-3">
                <label class="form-label">No HP</label>
                <input 
                    class="form-control" 
                    name="nohp" 
                    required
                    placeholder="Contoh: 08123456789"
                    oninput="this.value=this.value.replace(/[^0-9]/g,'')"
                >
            </div>
            <!-- email -->
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input class="form-control" name="email" type="email" required>
            </div>
            <button class="btn btn-success w-100">
                <i class="bi bi-save"></i> Simpan
            </button>
        </form>
    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    // tambah data 
$('#form').submit(function(e){
    e.preventDefault();
    let nama = $('input[name=nama]').val().trim();
    let nohp = $('input[name=nohp]').val().trim();
    let email = $('input[name=email]').val().trim();
    if (!/^[0-9]+$/.test(nohp)) {
        Swal.fire('Error!', 'No HP hanya boleh angka!', 'error');
        return;
    }
    if (!email.includes('@')) {
        Swal.fire('Error!', 'Email tidak valid!', 'error');
        return;
    }
    $.ajax({
        url: 'http://localhost:3000/kontak',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            nama: nama,
            nohp: nohp,
            email: email
        }),
        success: () => {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Kontak berhasil ditambahkan'
            }).then(() => {
                window.location = 'index.html';
            });
        }
    });
});
</script>
</body>
</html>
```
**penjelasan `/daftar-kontak/public/form.html`**
Program di atas merupakan halaman yang digunakan untuk menambahkan data kontak baru (Create). Tampilan halaman dibangun menggunakan Bootstrap dengan form input yang terdiri dari nama, nomor HP, dan email.
Sistem dilengkapi dengan validasi input, seperti nomor HP hanya boleh berisi angka dan email harus memiliki format yang valid. Data yang dimasukkan akan dikirim ke server menggunakan AJAX (jQuery) dengan metode POST dalam format JSON. Proses ini dilakukan secara asynchronous tanpa reload halaman. Setelah data berhasil disimpan, pengguna akan mendapatkan notifikasi dan diarahkan kembali ke halaman utama.

### D. `/daftar-kontak/public/edit.html`###
```html
<!DOCTYPE html>
<html>
<head>
    <title>Edit Kontak</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="navbar navbar-dark bg-dark shadow">
    <div class="container">
        <span class="navbar-brand fw-bold">
            <i class="bi bi-pencil-square"></i> Edit Kontak
        </span>
    </div>
</nav>

<div class="container mt-4">
    <div class="card p-4">
        <h4 class="fw-bold mb-3">Form Edit Kontak</h4>
        <form id="form">
            <!-- Nama -->
            <div class="mb-3">
                <label class="form-label">Nama</label>
                <input id="nama" class="form-control" required>
            </div>
            <!-- No HP -->
            <div class="mb-3">
                <label class="form-label">No HP</label>
                <input 
                    id="nohp" 
                    class="form-control" 
                    required
                    placeholder="Contoh: 08123456789"
                    oninput="this.value=this.value.replace(/[^0-9]/g,'')"
                >
            </div>
            <!-- Email -->
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input id="email" class="form-control" type="email" required>
            </div>
            <!-- tombol -->
            <button class="btn btn-warning w-100">
                <i class="bi bi-save"></i> Perbarui
            </button>
        </form>
    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
const id = new URLSearchParams(window.location.search).get('id');

// ambil data
fetch(`http://localhost:3000/kontak/${id}`)
.then(res => res.json())
.then(data => {
    $('#nama').val(data.nama);
    $('#nohp').val(data.nohp);
    $('#email').val(data.email);
});

// update
$('#form').submit(function(e){
    e.preventDefault();
    let nama = $('#nama').val().trim();
    let nohp = $('#nohp').val().trim();
    let email = $('#email').val().trim();
    if (!/^[0-9]+$/.test(nohp)) {
        Swal.fire('Error!', 'No HP hanya boleh angka!', 'error');
        return;
    }
    if (!email.includes('@')) {
        Swal.fire('Error!', 'Email tidak valid!', 'error');
        return;
    }
    fetch(`http://localhost:3000/kontak/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nama: nama,
            nohp: nohp,
            email: email
        })
    }).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data berhasil diubah'
        }).then(() => {
            window.location = 'index.html';
        });
    });
});
</script>
</body>
</html>
```
**penjelasan `/daftar-kontak/public/edit.html`**
Program di atas merupakan halaman yang digunakan untuk mengubah data kontak yang sudah ada (Update). Saat halaman dibuka, aplikasi akan mengambil data kontak berdasarkan ID melalui endpoint GET /kontak/:id dan menampilkannya pada form input.
Pengguna dapat mengubah data yang ada dengan validasi yang sama seperti pada halaman tambah. Setelah form disubmit, data akan dikirim ke server menggunakan Fetch API dengan metode PUT dalam format JSON. Proses ini dilakukan secara asynchronous tanpa reload halaman. Setelah data berhasil diperbarui, sistem akan menampilkan notifikasi dan mengarahkan pengguna kembali ke halaman utama.

## 5. Link Video Presentasi
https://drive.google.com/drive/folders/1Uz4QZY-1uup9-AvGvtT3Je-1I2wBCklY?usp=sharing
