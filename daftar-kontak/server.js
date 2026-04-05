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