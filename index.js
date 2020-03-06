document.addEventListener('DOMContentLoaded', function () {
    
    var $start = document.getElementById('start'); /* кнопка старт */
    var $game = document.getElementById('game'); /* игровое поле */
    var score = 0; /* количество кликов по квадрату */
    var $time = document.getElementById('time');
    var isGameStarted = false;

    var $timeHeader = document.getElementById('time-header');
    var $resultHeader = document.getElementById('result-header');
    var $result = document.getElementById('result');
    var $gameTime = document.getElementById('game-time');
    
    
    $start.addEventListener('click', startGame);
    $game.addEventListener('click', handleBoxClick);
    $gameTime.addEventListener('input', setGameTime);
    


    function startGame () {

        isGameStarted = true;
        score = 0;

        hide($resultHeader);
        show($timeHeader);

        $gameTime.setAttribute('disabled', 'true');

        setGameTime();

        $game.style.backgroundColor = '#fff';
        hide($start);
        hide($resultHeader);

        var interval = setInterval(function (params) {
            var time = parseFloat($time.textContent);

            if (time > 0 ) {
                $time.textContent = (time - 0.1).toFixed(1);            
                // console.log('interval', time);
            } else {
                clearInterval(interval);
                endGame();
            }
            
        }, 100);

        renderBox();
    };

    function endGame() {

        isGameStarted = false;
        $start.classList.remove('hide');
        $game.style.backgroundColor = '#ccc';

        $gameTime.removeAttribute('disabled');
        $gameTime.addEventListener('input', setGameTime);

        $game.innerHTML = '';

        // $lastBox = document.querySelector('div[data-box=true]');
        // $lastBox.classList.add('hide');

        $resultHeader.classList.remove('hide');
        $timeHeader.classList.add('hide');

        setScoreResult();


    };


    function setGameTime() {

        $time.textContent = (+$gameTime.value).toFixed(1);

        hide($resultHeader);
        show($timeHeader);

    }


    function setScoreResult() {
        $result.textContent = score.toString();
    }

    function renderBox() {

        if (!isGameStarted) {
            return ;
        }

        $game.innerHTML = ''; /* очищаем игровое поле */

        var boxSize = getRandom(35, 80);
        var gameSize = $game.getBoundingClientRect();
        var maxTop = gameSize.height - boxSize;
        var maxLeft = gameSize.width - boxSize;
        // console.log(gameSize.width);

        var $box = document.createElement('div');
        $box.style.width = $box.style.height = boxSize + 'px';
        $box.style.position = 'absolute';
        $box.style.backgroundColor = 'rgb(' + getRandom(0, 255) + ',' + getRandom(0, 255) + ',' + getRandom(0, 255) + ')';
        
        $box.style.top = getRandom(0, maxTop) + 'px';
        $box.style.left = getRandom(0, maxLeft) + 'px';
        $box.style.cursor = 'pointer';
        $box.setAttribute('data-box', 'true');

        $game.insertAdjacentElement('afterbegin', $box);

    };

    function handleBoxClick(event) {

        if (event.target.dataset.box) {
            console.log('it is box!');
            // console.log( getRandom(10, 50) )
            score++ ;

            renderBox();

        } else {
            console.log('empty click');
        }

    }

    function show ($el) {
        $el.classList.remove('hide');
    }

    function hide ($el) {
        $el.classList.add('hide');
    }
    
});


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}