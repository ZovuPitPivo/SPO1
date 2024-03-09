const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5174;
const ip = 'localhost';

// Подключение к базе данных SQLite
const db = new sqlite3.Database('database.db');

// Создание таблицы Players, если она не существует
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Players (PlayerID INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT NOT NULL, Password TEXT NOT NULL, Email TEXT)");
});

// Запрос для получения данных о пользователе по ID
app.get('/players/:id', (req, res) => {
    const playerId = req.params.id;
    db.get('SELECT * FROM Players WHERE PlayerID = ?', [playerId], (err, row) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json(row);
    });
});

// Запрос для сохранения нового пользователя
app.post('/players', (req, res) => {
    const {Username, Password, Email} = req.body;
    db.run('INSERT INTO Players (Username, Password, Email) VALUES (?, ?, ?)', [Username, Password, Email], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({message: 'New player added', playerId: this.lastID});
    });
});

// Запуск сервера
app.listen(port, ip, () => {
    console.log(`Server is running on http://${ip}:${port}`);
});
