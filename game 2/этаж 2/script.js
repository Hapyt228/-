  // Переменные состояния игры
        let currentStep = 0;
        let currentRoom = Math.floor(Math.random() * 21); // Персонаж спавнится случайно
        let enemyRoom = Math.floor(Math.random() * 21); // Враг спавнится случайно
        let gameOver = false;
        const totalRooms = 21; // Количество комнат для 7x3 сетки
        let ladderRoom = Math.floor(Math.random() * totalRooms); // Случайная комната для лестницы
        let noteRoom = getRandomRoomForNote(); // Случайная комната для записки, но не с лестницей
        const noteText = "Привет, я тоже пытался выбраться с этого корабля. Корабль имеет три этажа на последнем этаже есть дверь, чтобы ее открыть тебе надо найти ключ, но будь осторожен на каждом этаже ходят охранники, а на последнем этаже у них пост охраны тебе надо не заметно пробраться через них.";
        const gameOverText = "Вы столкнулись с врагом! Игра окончена.";

        // Разделение карты на этажи (ряда)
        const rows = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            [31, 32, 33, 34, 35, 36, 37, 38, 29, 30]

        ];



         // Функция для обновления положения игрока и отображения доступных клеток
    function updatePosition() {
        const roomElements = document.querySelectorAll('.room');
        roomElements.forEach((room, index) => {
            room.innerHTML = ''; // Очистить все комнаты

            // Определяем, доступна ли клетка для игрока
            if (isAccessible(index)) {
                room.classList.add('available');
                room.classList.remove('unavailable');
            } else {
                room.classList.add('unavailable');
                room.classList.remove('available');
            }
        });

        // Поместить персонажа в текущую комнату
        roomElements[currentRoom].innerHTML += '<div class="player"></div>';

        // Поместить врага в его комнату
        roomElements[enemyRoom].innerHTML += '<div class="enemy"></div>';

        // Поместить лестницу в её комнату
        roomElements[ladderRoom].innerHTML += '<div class="ladder"></div>';

        // Добавить случайную записку в случайную комнату
        roomElements[noteRoom].innerHTML += '<div class="note"><div class="note-text">' + noteText + '</div></div>';
    }

    // Функция для проверки доступности клетки (можно ли на неё переместиться)
    function isAccessible(roomIndex) {
        // Получаем текущие координаты игрока
        const row = Math.floor(currentRoom / 7); // Определяем строку (этаж)
        const col = currentRoom % 7; // Определяем колонку

        // Проверяем доступность клеток по соседям (лево, право, вверх, вниз)
        // Лево (col > 0), Право (col < 6), Вверх (row > 0), Вниз (row < 2)
        if (roomIndex === currentRoom - 1 && col > 0) return true; // Лево
        if (roomIndex === currentRoom + 1 && col < 6) return true; // Право
        if (roomIndex === currentRoom - 7 && row > 0) return true; // Вверх
        if (roomIndex === currentRoom + 7 && row < 2) return true; // Вниз
        return false; // Если не соседняя клетка, то недоступно
    }







        // Обработчик нажатия стрелочек и Enter
        document.addEventListener('keydown', function(e) {
            if (gameOver) return;

            switch(e.key) {
                case "ArrowUp":
                    moveUp();
                    break;
                case "ArrowDown":
                    moveDown();
                    break;
                case "ArrowLeft":
                    moveLeft();
                    break;
                case "ArrowRight":
                    moveRight();
                    break;
                case "Enter":
                    showNote();
                    break;
            }

            // После хода игрока, враг делает свой ход
            if (!gameOver) {
                enemyMove();
            }

            // После хода врага, проверим столкновение
            if (currentRoom === enemyRoom) {
                gameOver = true;
                document.getElementById("output").textContent = gameOverText + " Хотите попробовать снова?";
                document.getElementById("restart-buttons").style.display = "flex"; // Показываем кнопки
            }
        });

        // Функция для получения случайной комнаты для записки, исключая комнату с лестницей
        function getRandomRoomForNote() {
            let noteRoom;
            do {
                noteRoom = Math.floor(Math.random() * totalRooms);
            } while (noteRoom === ladderRoom); // Убедиться, что комната не та же, что и для лестницы
            return noteRoom;
        }

        // Функция для движения игрока вверх
           function moveUp() {
        if (currentRoom >= 7 && isAccessible(currentRoom - 7)) {
            currentRoom -= 7;
            updatePosition();
        } else {
            document.getElementById("output").textContent = "Здесь стена, попробуйте двигаться в другом направлении.";
        }
    }

    function moveDown() {
        if (currentRoom <= 13 && isAccessible(currentRoom + 7)) {
            currentRoom += 7;
            updatePosition();
        } else {
            document.getElementById("output").textContent = "Здесь стена, попробуйте двигаться в другом направлении.";
        }
    }

    function moveLeft() {
        if (currentRoom % 7 !== 0 && isAccessible(currentRoom - 1)) {
            currentRoom -= 1;
            updatePosition();
        } else {
            document.getElementById("output").textContent = "Здесь стена, попробуйте двигаться в другом направлении.";
        }
    }

    function moveRight() {
        if (currentRoom % 7 !== 6 && isAccessible(currentRoom + 1)) {
            currentRoom += 1;
            updatePosition();
        } else {
            document.getElementById("output").textContent = "Здесь стена, попробуйте двигаться в другом направлении.";
        }
    }

        // Функция для обновления положения игрока и элементов игры
        function updatePosition() {
            const roomElements = document.querySelectorAll('.room');
            roomElements.forEach(room => room.innerHTML = ''); // Очистить комнаты

            // Поместить персонажа в текущую комнату
            roomElements[currentRoom].innerHTML += '<div class="player"></div>';

            // Поместить врага в его комнату
            roomElements[enemyRoom].innerHTML += '<div class="enemy"></div>';

            // Поместить лестницу в её комнату
            roomElements[ladderRoom].innerHTML += '<div class="ladder"></div>';

            // Добавить случайную записку в случайную комнату
            roomElements[noteRoom].innerHTML += '<div class="note"><div class="note-text">' + noteText + '</div></div>';
        }

        // Функция для отображения текста записки (вызывается, когда игрок нажимает Enter)
        function showNote() {
            let roomElements = document.querySelectorAll('.room');
            if (currentRoom === noteRoom) {
                roomElements[noteRoom].querySelector('.note-text').style.visibility = "visible"; // Показываем текст записки
                document.getElementById("output").textContent = noteText; // Отображаем текст в окне
            }
        }

        // Функция для движения врага
        function enemyMove() {
            let moveDirection = Math.floor(Math.random() * 4);
            switch(moveDirection) {
                case 0: 
                    if (enemyRoom < totalRooms - 7) enemyRoom += 7;
                    break;
                case 1: 
                    if (enemyRoom > 6) enemyRoom -= 7;
                    break;
                case 2:
                    if (enemyRoom % 7 !== 0) enemyRoom -= 1;
                    break;
                case 3:
                    if (enemyRoom % 7 !== 6) enemyRoom += 1;
                    break;
            }
            updatePosition();
        }

        // Функция для перезапуска игры
        function restartGame() {
            gameOver = false;
            currentRoom = Math.floor(Math.random() * 21);
            enemyRoom = Math.floor(Math.random() * 21);
            ladderRoom = Math.floor(Math.random() * totalRooms);
            noteRoom = getRandomRoomForNote();
            document.getElementById("restart-buttons").style.display = "none";
            updatePosition();
            document.getElementById("output").textContent = "Начнем игру снова!";
        }

        // Функция для завершения игры
        function endGame() {
            gameOver = true;
            document.getElementById("output").textContent = "Игра завершена. Спасибо за игру!";
            document.getElementById("restart-buttons").style.display = "none";
        }

        // Инициализация игры
        updatePosition();