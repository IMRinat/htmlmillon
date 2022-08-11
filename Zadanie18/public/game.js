summs = [1000, 5000, 10000, 50000, 1000000];//стоимость вопросов
summgarant = [5000,50000];//несгораемые суммы
letters = ["А","Б","В","Г"];//Буквы вариантов ответов
currentQuestion = 0; //текущий вопрос
countQuestions = questions.length;//всего вопросов
summ = 0; //текуший выигрыш
function run()
{
	currentQuestion = 0; //текущий вопрос
	countQuestions = questions.length;//всего вопросов
	summ = 0; //текуший выигрыш
	//начальное содержимое
	document.body.innerHTML = `
		<H1 id=header>Игра "Кто хочет стать миллионером"</H1>
		<div id="summ"></div>
		<div id="question"></div>
		<table id=tableAnswers>
			<tr>
				<td><button id="answer0" onclick="answer(0);"></button></td>
				<td><button id="answer1" onclick="answer(1);"></button></td>
			</tr>
			<tr>
				<td><button id="answer2" onclick="answer(2);"></button></td>
				<td><button id="answer3" onclick="answer(3);"></button></td>
			</tr>
		</table>`;
	showQuestion();// показать вопрос
}


function showQuestion()//функция для отображения нового вопроса
{
	//отобразить выигрыш
	document.getElementById("summ").innerText = `Ваш текущий выигрыш ${summ} рублей`;
	//отобразить название вопроса
	document.getElementById("question").innerHTML = `Вопрос №${currentQuestion+1} из ${countQuestions} <br>`+ questions[currentQuestion].question;
	//заполняем 4 варианта ответов
	for (i=0;i<4;i++){
	  document.getElementById("answer"+i).innerHTML = // находим div 
	  letters[i]+") "+  //пишем букву ответа
	  questions[currentQuestion].answers[i]; //пишем текст ответа	
	}
	
}


function answer(n){ // функция обработки нажатия ответа, n - номер ответа от 0 до 3
	if ( questions[currentQuestion].rightAnswer==n)	{// если ответ на вопрос правильный
		alert("Этот ответ правильный");
		summ = summs[currentQuestion]; // записываем сумму
		currentQuestion++; // увеличиваем текущий вопрос
		if (currentQuestion==countQuestions){ // если вопросы закончились
			endGame(); // конец игры
		} else	{
			showQuestion(); //показать вопрос
		}
		
	}	else	{ // если ответ на вопрос неправильный
 		alert("Этот ответ неправильный. Правильный ответ - " +questions[currentQuestion].answers[questions[currentQuestion].rightAnswer]);
		endGame(); // функция конец игры
	}
}

function endGame(){ // функция конец игры
	summ = calcGarantSumm();//вычисление несгораемой суммы
	document.getElementById("summ").innerText = `Ваш текущий выигрыш ${summ} рублей`; // показать выигрыш
	document.getElementById("question").innerHTML = ""; // скрыть вопрос
	document.getElementById("tableAnswers").innerHTML = ""; // скрыть ваврианты ответов
	document.body.innerHTML += '<button onclick="run();">Начать новую игру</button>'; // показать кнопку начать новую игру
}

function calcGarantSumm(){ // функция вычисления несгораемой суммы
	for (i=summgarant.length-1;i>=0;i--){ // идем по всем вариантам несгораемой суммы в обратном порядке
		if (summ>=summgarant[i]){ // если сумма больше равна несгораемой то это результат
			return summgarant[i];
		}
	}
	return 0; // если вариантов несгораемой суммы нет то 0
}