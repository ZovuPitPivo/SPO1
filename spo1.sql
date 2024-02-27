-- Таблица игроков
CREATE TABLE Players
(
    PlayerID         INT PRIMARY KEY,
    Username         VARCHAR(50) UNIQUE,
    Password         VARCHAR(50),
    Email            VARCHAR(100) UNIQUE,
    RegistrationDate DATE
);

-- Таблица игровых полей
CREATE TABLE GameBoards
(
    GameBoardID   INT PRIMARY KEY,
    BoardName     VARCHAR(100),
    NumberOfTiles INT,
    DateCreated   DATE,
    CreatorID     INT,
    FOREIGN KEY (CreatorID) REFERENCES Players (PlayerID)
);

-- Таблица плиток
CREATE TABLE Tiles
(
    TileID    INT PRIMARY KEY,
    TileName  VARCHAR(255) NOT NULL,
    ImagePath VARCHAR(255) NOT NULL
);


-- Таблица, связывающая игровые поля с плитками
CREATE TABLE GameBoardTiles
(
    GameBoardID      INT,
    TileID           INT,
    PositionX        INT,
    PositionY        INT,
    Rotation         INT,
    PlacedByPlayerID INT,
    FOREIGN KEY (GameBoardID) REFERENCES GameBoards (GameBoardID),
    FOREIGN KEY (TileID) REFERENCES Tiles (TileID),
    FOREIGN KEY (PlacedByPlayerID) REFERENCES Players (PlayerID)
);
