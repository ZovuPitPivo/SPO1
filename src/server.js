const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const ip = '0.0.0.0';

app.use(cors()); // Активация CORS для всех запросов
app.use(express.json()); // Для разбора JSON-полей в запросах

// Подключение к базе данных SQLite
const SECRET_KEY = 'your-secret-key'; // Замените на ваш секретный ключ

const db = new sqlite3.Database('database.db');

// Создание таблицы Players, если она не существует
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Players (PlayerID INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT NOT NULL, Password TEXT NOT NULL, Email TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS Rooms (room_id INTEGER PRIMARY KEY AUTOINCREMENT, creator_username TEXT, player_username TEXT)");
});

// Функция для генерации токена
function generateToken(userID) {
    return jwt.sign({id: userID}, SECRET_KEY, {expiresIn: '24h'});
}

// Функция для аутентификации и генерации токена
app.post('/login', (req, res) => {
    const {Username, Password} = req.body;
    console.log(Username, Password);
    db.get('SELECT * FROM Players WHERE Username = ? AND Password = ?', [Username, Password], (err, row) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        if (row) {
            const token = generateToken(row.PlayerID);
            res.json({message: 'Authenticated successfully', token});
        } else {
            res.status(401).json({error: 'Invalid username or password'});
        }
    });
});

// Миддлвэр для проверки JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

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
    console.log(req.body)
    db.run('INSERT INTO Players (Username, Password, Email) VALUES (?, ?, ?)', [Username, Password, Email], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({message: 'New player added', playerId: this.lastID});
    });
});

// Создание комнаты
app.post('/create_room', (req, res) => {
    const {creator_username} = req.body;

    db.run("INSERT INTO Rooms (creator_username) VALUES (?)", [creator_username], function (err) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({message: 'Room created successfully'});
    });
});

// Присоединение к комнате
app.post('/join_room', (req, res) => {
    const {room_id, player_username} = req.body;

    db.run("UPDATE Rooms SET player_username = ? WHERE room_id = ?", [player_username, room_id], function (err) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({message: 'Joined room successfully'});
    });
});

// Получение списка всех комнат
app.get('/get_rooms', (req, res) => {
    db.all("SELECT * FROM Rooms", (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({rooms: rows});
    });
});

// Запуск сервера
app.listen(port, ip, () => {
    console.log(`Server is running on http://${ip}:${port}`);
});
