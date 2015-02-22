var answer;
var hint;
var points = 0;
var score = "0";
var game = false;

function $(o) {
	return document.getElementById(o);
}

var timer = {
	time: 0,
	interval: 0,
	start: function() {
		timer.stop();
		timer.interval = setInterval(function(){timer.decrease(1);timer.check();},1000);
	},
	stop: function() {
		if(timer.interval!=0) clearInterval(timer.interval);
		timer.interval = 0;
	},
	set: function(t) {
		timer.time = t;
		timer.updateView();
	},
	decrease: function(t) {
		timer.time -= t;
		timer.updateView();
	},
	updateView: function() {
		$("timeleft").innerHTML = ":" + timer.time;
		if(timer.time==0) {
			$("timeleft").innerHTML = "▶"
		}
		if(timer.time>60) {
			$("grammar").style.opacity = "0";
			$("grammar").style.visibility = "hidden";
		} else {
			$("grammar").style.opacity = "1";
			$("grammar").style.visibility = "visible";
		}
	},
	check: function() {
		if(timer.time==0) {
			timer.stop();
			gameOver();
		}
	}
}

function main() {
	timer.set(0);
	msg("Тренажер грамматики испанского<sup>&alpha;</sup>","#00a",1000)
	score = localStorage.getItem("score");
	if(score===null) score = "0";
}

function showScore() {
	msg("Твой рекорд: <b>" + score + "</b> б.","#00a",1500);
}

function incPoints(s){
	points += s;
	if(points>=999){
		points=999;
		gameOver();
	}
	$("mypoints").innerHTML = points;
}

function decPoints(s){
	points -= s;
	if(points<0){
		points=0;
	}
	$("mypoints").innerHTML = points.toString();
}

function gameOver() {
	if(game==true) {
		clearTimeout(hint);
		timer.stop();
		timer.set(0);
		if(points>parseInt(score)) {
			score = points.toString();
			localStorage.setItem("score",score);
			msg("Игра окончена, новый рекорд!","#0aa",5000);
		} else {
			msg("Игра окончена, рекорд не побит","#f00",5000);
		}
		points = 0;
		$("stop").style.right = "-3em";
		$("taskwall").style.bottom = "0";
		$("tasktext").innerHTML = "Здесь появляется задание";
		$("taskans").placeholder = "сюда писать ответ";
		game = false;
	}
}

function newGame() {
	game = true;
	timer.set(60+parseInt(score));
	timer.start();
	nextTask();
	points = 0;
	$("mypoints").innerHTML = points;
	msg("Удачи!","#0a0",300);
	$("stop").style.right = "0";
	$("taskwall").style.bottom = "-15em";
}


function R(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextTask() {
	switch(R(0,3)) {
		case 0:
			task1();
			break;
		case 1:
			task2();
			break;
		case 2:
			task3();
			break;		
		case 3:
			task4();
			break;	
		case 4:
			task5();
			break;
		case 5:
			task6();
			break;
		case 6:
			task7();
			break;		
		case 7:
			task8();
			break;	
		case 8:
			task9();
			break;		
		case 9:
			task10();
			break;
	}
}

function msg(text,color,wait) {
	$("msg").style.visibility = "visible";
	$("msg").style.opacity = "1";
	$("msg").innerHTML = text;
	$("msg").style.color = color;
	if(wait!==undefined) {
		setTimeout(function(){
			hideMsg();
		},wait);
	}
}

function hideMsg() {
	$("msg").style.visibility = "hidden";
	$("msg").style.opacity = "0";
}

// Личные местоимения

function task1() {
	switch(R(1,5)) { 
		case 1:
			var a = [
				["<b>Yo</b>","Я"],
				["<b>Tú</b>","Ты"],
				["<b>Él</b>","Он"],
				["<b>Ella</b>","Она"],
				["<b>Nosotros</b>","Мы"],
				["<b>Nosotras</b>","Мы"],
				["<b>Vosotros</b>","Вы"],
				["<b>Vosotras</b>","Вы"],
				["<b>Ellos</b>","Они"],
				["<b>Ellas</b>","Они"],
				["<b>Ello</b>","Оно"],
				["<b>Usted</b>","Вы"],		
				["<b>Ustedes</b>","Вы"]																										
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Переведи на русский",a[r][1],"см. местоимения");
			break;
		case 2:
			var a = [
				["<b>Я</b>","Yo"],
				["<b>Ты</b>","Tú"],
				["<b>Он</b>","Él"],
				["<b>Она</b>","Ella"],
				["<b>Мы</b> <em>(парни)</em>","Nosotros"],
				["<b>Мы</b> <em>(девчонки)</em>","Nosotras"],
				["<b>Вы</b> <em>(парни)</em>","Vosotros"],
				["<b>Вы</b> <em>(девчонки)</em>","Vosotras"],
				["<b>Они</b> <em>(парни)</em>","Ellos"],
				["<b>Они</b> <em>(девчонки)</em>","Ellas"],
				["<b>Оно</b>","Ello"],
				["<b>Вы</b> <em>(вежл., ед. ч.)</em>","Usted"],		
				["<b>Вы</b> <em>(вежл., мн. ч.)</em>","Ustedes"]																										
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Переведи на испанский",a[r][1],"см. местоимения");
			break;
		case 3:
			var a = [
				["<b>Yo</b>","о"],
				["<b>Tú</b>","о"],
				["<b>Él</b>","м"],
				["<b>Ella</b>","ж"],
				["<b>Nosotros</b>","м"],
				["<b>Nosotras</b>","ж"],
				["<b>Vosotros</b>","м"],
				["<b>Vosotras</b>","ж"],
				["<b>Ellos</b>","м"],
				["<b>Ellas</b>","ж"],
				["<b>Usted</b>","о"],		
				["<b>Ustedes</b>","о"]																										
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Определи род, (м)ужской, (ж)енский, (о)ба",a[r][1],"см. местоимения");
			break;
		case 4:
			var a = [
				["<b>Yo</b>","1"],
				["<b>Tú</b>","2"],
				["<b>Él</b>","3"],
				["<b>Ella</b>","3"],
				["<b>Nosotros</b>","1"],
				["<b>Nosotras</b>","1"],
				["<b>Vosotros</b>","2"],
				["<b>Vosotras</b>","2"],
				["<b>Ellos</b>","3"],
				["<b>Ellas</b>","3"],
				["<b>Usted</b>","2"],		
				["<b>Ustedes</b>","2"]																										
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Определи лицо, 1, 2, 3",a[r][1],"см. местоимения");
			break;
		case 5:
			var a = [
				["<b>Y...</b>","o"],
				["<b>T...</b>","ú"],
				["<b>...l</b>","é"],
				["<b>...a</b>","ell"],
				["<b>N...os</b>","osotr"],
				["<b>N...as</b>","osotr"],
				["<b>V...os</b>","osotr"],
				["<b>V...as</b>","osotr"],
				["<b>E...os</b>","ll"],
				["<b>E...as</b>","ll"],
				["<b>U...d</b>","ste"],		
				["<b>U...s</b>","stede"]																										
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Заполни пропуски в личных местоимениях",a[r][1],"см. местоимения");
			break;
	}
}

// Притяжательные местоимения-прилагательные

function task2() {
	switch(R(1,5)) { 
		case 1:
			var a = [
				["<b>Mi</b> <em>(м.р.)</em>","Мой"],
				["<b>Mi</b> <em>(ж.р.)</em>","Моя"],
				["<b>Mis</b>","Мои"],
				["<b>Nuestro</b>","Наш"],
				["<b>Nuestra</b>","Наша"],
				["<b>Nuestros</b>","Наши"],
				["<b>Tu</b> <em>(м.р.)</em>","Твой"],
				["<b>Tu</b> <em>(ж.р.)</em>","Твоя"],
				["<b>Tus</b>","Твои"],
				["<b>Vuestro</b>","Ваш"],
				["<b>Vuestra</b>","Ваша"],		
				["<b>Vuestros</b>","Ваши"],
				["<b>Vuestras</b>","Ваши"],	
				["<b>Su</b> <em>(м.р.)</em>","Его"],
				["<b>Su</b> <em>(ж.р.)</em>","Ее"],
				["<b>Sus</b> <em>(м.р.)</em>","Его"],
				["<b>Sus</b> <em>(ж.р.)</em>","Ее"],
				["<b>Su</b> <em>(м.р.)</em>","Их"],
				["<b>Sus</b> <em>(ж.р.)</em>","Их"]
				["<b>Su</b> <em>(уваж.)</em>","Ваш"],
				["<b>Sus</b> <em>(уваж.)</em>","Ваши"]																											
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Переведи на русский",a[r][1],"см. местоимения");
			break;
		case 2:
			var a = [
				["<b>Мой</b> <em>(предмет)</em>","Mi"],
				["<b>Моя</b> <em>(вещь)</em>","Mi"],
				["<b>Мои</b> <em>(вещи)</em>","Mis"],
				["<b>Наш</b> <em>(предмет)</em>","Nuestro"],
				["<b>Наша</b> <em>(вещь)</em>","Nuestra"],
				["<b>Наши</b> <em>(вещи)</em>","Nuestros"],
				["<b>Твой</b> <em>(предмет)</em>","Tu"],
				["<b>Твоя</b> <em>(вещь)</em>","Tu"],
				["<b>Твои</b> <em>(вещи)</em>","Tus"],
				["<b>Ваш</b> <em>(предмет)</em>","Vuestro"],
				["<b>Ваша</b> <em>(вещь)</em>","Vuestra"],		
				["<b>Ваши</b> <em>(вещи м.р.)</em>","Vuestros"],
				["<b>Ваши</b> <em>(вещи ж.р.)</em>","Vuestras"],	
				["<b>Его</b> <em>(вещь)</em>","Su"],
				["<b>Ее</b> <em>(вещь)</em>","Su"],
				["<b>Его</b> <em>(вещи)</em>","Sus"],
				["<b>Ее</b> <em>(вещи)</em>","Sus"],
				["<b>Их</b> <em>(вещь)</em>","Su"],
				["<b>Их</b> <em>(вещи</em>","Sus"]
				["<b>Ваш</b> <em>(предмет уваж. обр.)</em>","Su"],
				["<b>Ваши</b> <em>(предметы уваж. обр.)</em>","Sus"]																											
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Переведи на испанский",a[r][1],"см. местоимения");
			break;
		case 3:
			var a = [
				["<b>Mi</b>","о"],
				["<b>Nuestro</b>","м"],
				["<b>Nuestra</b>","ж"],
				["<b>Nuestros</b>","м"],
				["<b>Nuestras</b>","ж"],
				["<b>Tu</b>","о"],
				["<b>Tus</b>","о"],
				["<b>Vuestro</b>","м"],
				["<b>Vuestra</b>","ж"],
				["<b>Vuestros</b>","м"],
				["<b>Vuestras</b>","ж"],		
				["<b>Su</b>","о"],
				["<b>Sus</b>","о"]																									
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Определи род, (м)ужской, (ж)енский, (о)ба",a[r][1],"см. местоимения");
			break;
		case 4:
			var a = [
				["<b>Mi</b>","1"],
				["<b>Mis</b>","1"],
				["<b>Nuestro</b>","1"],
				["<b>Nuestra</b>","1"],
				["<b>Nuestros</b>","1"],
				["<b>Nuestras</b>","1"],
				["<b>Tu</b>","2"],
				["<b>Tus</b>","2"],
				["<b>Vuestro</b>","2"],
				["<b>Vuestra</b>","2"],
				["<b>Vuestros</b>","2"],
				["<b>Vuestras</b>","2"],
				["<b>Su</b>","3"],
				["<b>Sus</b>","3"]																									
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Определи лицо, 1, 2, 3",a[r][1],"см. местоимения");
			break;
		case 5:
			var a = [
				["<b>M...</b> <em>ед. ч</em>","i"],
				["<b>T...</b> <em>ед. ч.</em>","u"],
				["<b>M...</b> <em>мн. ч</em>","is"],
				["<b>T...</b> <em>мн. ч.</em>","us"],
				["<b>N...o</b>","uestr"],
				["<b>N...a</b>","uestr"],
				["<b>N...os</b>","uestr"],
				["<b>N...as</b>","uestr"],
				["<b>V...o</b>","uestr"],
				["<b>V...a</b>","uestr"],
				["<b>V...os</b>","uestr"],
				["<b>V...as</b>","uestr"],
				["<b>S... <em>ед. ч</em></b>","u"],		
				["<b>S... <em>мн. ч.</em></b>","us"]																										
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Заполни пропуски в притяжательных местоимениях-прилагательных",a[r][1],"см. местоимения");
			break;
	}
}

// Притяжательные местоимения-существительные

function task3() {
	switch(R(1,5)) { 
		case 1:
			var a = [
				["<b>Mío</b>","Мой"],
				["<b>Mía</b>","Моя"],
				["<b>Míos</b>","Мой"],
				["<b>Mías</b>","Моя"],
				["<b>Nuestro</b>","Наш"],
				["<b>Nuestra</b>","Наша"],
				["<b>Nuestros</b>","Наши"],
				["<b>Nuestras</b>","Наши"],
				["<b>Vuestro</b>","Ваш"],
				["<b>Vuestra</b>","Ваша"],
				["<b>Vuestros</b>","Ваши"],
				["<b>Vuestras</b>","Ваши"],
				["<b>Tuyo</b>","Твой"],
				["<b>Tuya</b>","Твоя"],
				["<b>Tuyos</b>","Твои"],
				["<b>Tuyas</b>","Твои"],
				["<b>Suyo</b> <em>(ед. ч.)</em>","Его"],
				["<b>Suya</b> <em>(ед. ч.)</em>","Ее"],
				["<b>Suyos</b> <em>(ед. ч.)</em>","Его"],
				["<b>Suyas</b> <em>(ед. ч.)</em>","Ее"],
				["<b>Suyo</b> <em>(мн. ч.)</em>","Их"],
				["<b>Suya</b> <em>(мн. ч.)</em>","Их"],
				["<b>Suyos</b> <em>(мн. ч.)</em>","Их"],
				["<b>Suyas</b> <em>(мн. ч.)</em>","Их"],
				["<b>Suyo</b> <em>(вежл.)</em>","Ваш"],
				["<b>Suya</b> <em>(вежл.)</em>","Ваша"],
				["<b>Suyos</b> <em>(вежл.)</em>","Ваши"],
				["<b>Suyas</b> <em>(вежл.)</em>","Ваши"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Переведи на русский",a[r][1],"см. местоимения");
			break;
		case 2:
			var a = [
				["&mdash;Чей? &mdash;<b>Мой</b>","Mío"],
				["&mdash;Чья? &mdash;<b>Моя</b>","Mía"],
				["&mdash;Чьи парни? &mdash;<b>Мои</b>","Míos"],
				["&mdash;Чьи девчонки? &mdash;<b>Мой</b>","Mías"],
				["&mdash;Чей? &mdash;<b>Наш</b>","Nuestro"],
				["&mdash;Чья? &mdash;<b>Наша</b>","Nuestra"],
				["&mdash;Чьи парни? &mdash;<b>Наши</b>","Nuestros"],
				["&mdash;Чей девчонки? &mdash;<b>Наши</b>","Nuestras"],
				["&mdash;Чей? &mdash;<b>Ваш</b>","Vuestro"],
				["&mdash;Чья? &mdash;<b>Ваша</b>","Vuestra"],
				["&mdash;Чьи парни? &mdash;<b>Ваши</b>","Vuestros"],
				["&mdash;Чей девчонки? &mdash;<b>Ваши</b>","Vuestras"],
				["&mdash;Чей парень? &mdash;<b>Твой</b>","Tuyo"],
				["&mdash;Чья девчонка? &mdash;<b>Моя</b>","Tuya"],
				["&mdash;Чьи парни? &mdash;<b>Твои</b>","Tuyos"],
				["&mdash;Чьи девчонки? &mdash;<b>Твои</b>","Tuyas"],
				["&mdash;Чей парень? &mdash;<b>Его</b>","Suyo"],
				["&mdash;Чья девчонка? &mdash;<b>Ее</b>","Suya"],
				["&mdash;Чьи парни? &mdash;<b>Его</b>","Suyos"],
				["&mdash;Чьи девчонки? &mdash;<b>Ее</b>","Suyas"],
				["&mdash;Чей парень? &mdash;<b>Их</b>","Suyo"],
				["&mdash;Чья девчонка? &mdash;<b>Их</b>","Suya"],
				["&mdash;Чьи парни? &mdash;<b>Их</b>","Suyos"],
				["&mdash;Чьи девчонки? &mdash;<b>Их</b>","Suyas"],
				["&mdash;Чей парень? &mdash;<b>Ваш</b> <em>(уваж.)</em>","Suyo"],
				["&mdash;Чья девчонка? &mdash;<b>Ваша</b> <em>(уваж.)</em>","Suya"],
				["&mdash;Чьи парни? &mdash;<b>Ваши</b> <em>(уваж.)</em>","Suyos"],
				["&mdash;Чьи девчонки? &mdash;<b>Ваши</b> <em>(уваж.)</em>","Suyas"]																											
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Переведи на испанский",a[r][1],"см. местоимения");
			break;
		case 3:
			var a = [
				["<b>Mío</b>","м"],
				["<b>Mía</b>","ж"],
				["<b>Míos</b>","м"],
				["<b>Mías</b>","ж"],
				["<b>Nuestro</b>","м"],
				["<b>Nuestra</b>","ж"],
				["<b>Nuestros</b>","м"],
				["<b>Nuestras</b>","ж"],
				["<b>Vuestro</b>","м"],
				["<b>Vuestra</b>","ж"],
				["<b>Vuestros</b>","м"],
				["<b>Vuestras</b>","ж"],
				["<b>Tuyo</b>","м"],
				["<b>Tuya</b>","ж"],
				["<b>Tuyos</b>","м"],
				["<b>Tuyas</b>","ж"],
				["<b>Suyo</b> <em>(ед. ч.)</em>","м"],
				["<b>Suya</b> <em>(ед. ч.)</em>","ж"],
				["<b>Suyos</b> <em>(ед. ч.)</em>","м"],
				["<b>Suyas</b> <em>(ед. ч.)</em>","ж"],
				["<b>Suyo</b> <em>(мн. ч.)</em>","м"],
				["<b>Suya</b> <em>(мн. ч.)</em>","ж"],
				["<b>Suyos</b> <em>(мн. ч.)</em>","м"],
				["<b>Suyas</b> <em>(мн. ч.)</em>","ж"],
				["<b>Suyo</b> <em>(вежл.)</em>","м"],
				["<b>Suya</b> <em>(вежл.)</em>","ж"],
				["<b>Suyos</b> <em>(вежл.)</em>","м"],
				["<b>Suyas</b> <em>(вежл.)</em>","ж"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Определи род, (м)ужской, (ж)енский, (о)ба",a[r][1],"см. местоимения");
			break;
		case 4:
			var a = [
				["<b>Mío</b>","1"],
				["<b>Mía</b>","1"],
				["<b>Míos</b>","1"],
				["<b>Mías</b>","1"],
				["<b>Nuestro</b>","1"],
				["<b>Nuestra</b>","1"],
				["<b>Nuestros</b>","1"],
				["<b>Nuestras</b>","1"],
				["<b>Vuestro</b>","2"],
				["<b>Vuestra</b>","2"],
				["<b>Vuestros</b>","2"],
				["<b>Vuestras</b>","2"],
				["<b>Tuyo</b>","2"],
				["<b>Tuya</b>","2"],
				["<b>Tuyos</b>","2"],
				["<b>Tuyas</b>","2"],
				["<b>Suyo</b> <em>(ед. ч.)</em>","3"],
				["<b>Suya</b> <em>(ед. ч.)</em>","3"],
				["<b>Suyos</b> <em>(ед. ч.)</em>","3"],
				["<b>Suyas</b> <em>(ед. ч.)</em>","3"],
				["<b>Suyo</b> <em>(мн. ч.)</em>","3"],
				["<b>Suya</b> <em>(мн. ч.)</em>","3"],
				["<b>Suyos</b> <em>(мн. ч.)</em>","3"],
				["<b>Suyas</b> <em>(мн. ч.)</em>","3"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Определи лицо, 1, 2, 3",a[r][1],"см. местоимения");
			break;
		case 5:
			var a = [
				["<b>M...o</b>","í"],
				["<b>M...a</b>","í"],
				["<b>M...os</b>","í"],
				["<b>M...as</b>","í"],
				["<b>N...o</b>","uestr"],
				["<b>N...a</b>","uestr"],
				["<b>N...os</b>","uestr"],
				["<b>N...as</b>","uestr"],
				["<b>V...o</b>","uestr"],
				["<b>V...a</b>","uestr"],
				["<b>V...os</b>","uestr"],
				["<b>V...as</b>","uestr"],
				["<b>T...o</b>","uy"],
				["<b>T...a</b>","uy"],
				["<b>T...os</b>","uy"],
				["<b>T...as</b>","uy"],
				["<b>S...o</b>","uy"],
				["<b>S...a</b>","uy"],
				["<b>S...os</b>","uy"],
				["<b>S...as</b>","uy"]																										
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Заполни пропуски в притяжательных местоимениях-существительных",a[r][1],"см. местоимения");
			break;
	}
}

// Указательные местоимения

function task4() {
	switch(R(1,5)) { 
		case 1:
			var a = [
				["<b>Este</b>","Этот"],
				["<b>Esta</b>","Эта"],
				["<b>Estos</b>","Эти"],
				["<b>Estas</b>","Эти"],
				["<b>Ese</b>","Этот"],
				["<b>Esa</b>","Эта"],
				["<b>Esos</b>","Эти"],
				["<b>Esas</b>","Эти"],
				["<b>Aquel</b>","Тот"],
				["<b>Aquella</b>","Та"],
				["<b>Aquellos</b>","Те"],
				["<b>Aquellas</b>","Те"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Переведи на русский",a[r][1],"см. местоимения");
			break;
		case 2:
			var a = [
				["<b>Этот</b> <em>(ближе к говорящему)</em>","Este"],
				["<b>Эта</b> <em>(ближе к говорящему)</em>","Esta"],
				["<b>Эти</b> <em>(м.р., ближе к говорящему)</em>","Estos"],
				["<b>Эти</b> <em>(ж.р., ближе к говорящему)</em>","Estos"],
				["<b>Этот</b> <em>(ближе к собеседнику)</em>","Ese"],
				["<b>Эта</b> <em>(ближе к собеседнику)</em>","Esa"],
				["<b>Эти</b> <em>(м.р., ближе к собеседнику)</em>","Esos"],
				["<b>Эти</b> <em>(ж.р., ближе к собеседнику)</em>","Esas"],
				["<b>Тот</b>","Aquel"],
				["<b>Та</b>","Aquella"],
				["<b>Те</b> <em>(м.р.)</em>","Aquellos"],
				["<b>Те</b> <em>(м.р.)</em>","Aquellas"]	
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Переведи на испанский",a[r][1],"см. местоимения");
			break;
	}
}

// Спряжения глаголов

function task5() {
	switch(R(1,3)) { 
		case 1:
			var a = [
				["<b>Yo (-ar)</b>","-o"],
				["<b>Tú (-ar)</b>","-as"],
				["<b>Él (-ar)</b>","-a"],
				["<b>Nosotros (-ar)</b>","-amos"],
				["<b>Vosotros (-ar)</b>","-áis"],
				["<b>Ellos (-ar)</b>","-an"],
				["<b>Ellas (-ar)</b>","-an"],
				["<b>Ustedes (-ar)</b>","-an"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола наст. вр.",a[r][1],"см. глаголы");
			break;
		case 2:
			var a = [
				["<b>Yo (-er)</b>","-o"],
				["<b>Tú (-er)</b>","-es"],
				["<b>Él (-er)</b>","-e"],
				["<b>Nosotros (-er)</b>","-emos"],
				["<b>Vosotros (-er)</b>","-éis"],
				["<b>Ellos (-er)</b>","-en"],
				["<b>Ellas (-er)</b>","-en"],
				["<b>Ustedes (-er)</b>","-en"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола наст. вр.",a[r][1],"см. глаголы");
			break;
		case 3:
			var a = [
				["<b>Yo (-ir)</b>","-o"],
				["<b>Tú (-ir)</b>","-es"],
				["<b>Él (-ir)</b>","-e"],
				["<b>Nosotros (-ir)</b>","-imos"],
				["<b>Vosotros (-ir)</b>","-ís"],
				["<b>Ellos (-ir)</b>","-en"],
				["<b>Ellas (-ir)</b>","-en"],
				["<b>Ustedes (-ir)</b>","-en"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола наст. вр.",a[r][1],"см. глаголы");
			break;
	}
}


function task6() {
	switch(R(1,3)) { 
		case 1:
			var a = [
				["<b>Yo (-ar)</b>","-aba"],
				["<b>Tú (-ar)</b>","-abas"],
				["<b>Él (-ar)</b>","-aba"],
				["<b>Nosotros (-ar)</b>","-ábamos"],
				["<b>Vosotros (-ar)</b>","-abais"],
				["<b>Ellos (-ar)</b>","-aban"],
				["<b>Ellas (-ar)</b>","-aban"],
				["<b>Ustedes (-ar)</b>","-aban"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола прош. несоверш. вр.",a[r][1],"см. глаголы");
			break;
		case 2:
			var a = [
				["<b>Yo (-er)</b>","-í"],
				["<b>Tú (-er)</b>","-ías"],
				["<b>Él (-er)</b>","-ía"],
				["<b>Nosotros (-er)</b>","-íamos"],
				["<b>Vosotros (-er)</b>","-íais"],
				["<b>Ellos (-er)</b>","-ían"],
				["<b>Ellas (-er)</b>","-ían"],
				["<b>Ustedes (-er)</b>","-ían"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола прош. несоверш. вр.",a[r][1],"см. глаголы");
			break;
		case 3:
			var a = [
				["<b>Yo (-ir)</b>","-ía"],
				["<b>Tú (-ir)</b>","-ías"],
				["<b>Él (-ir)</b>","-ía"],
				["<b>Nosotros (-ir)</b>","-íamos"],
				["<b>Vosotros (-ir)</b>","-íais"],
				["<b>Ellos (-ir)</b>","-ían"],
				["<b>Ellas (-ir)</b>","-ían"],
				["<b>Ustedes (-ir)</b>","-ían"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола прош. несоверш. вр.",a[r][1],"см. глаголы");
			break;
	}
}

function task7() {
	switch(R(1,3)) { 
		case 1:
			var a = [
				["<b>Yo (-ar)</b>","-í"],
				["<b>Tú (-ar)</b>","-aste"],
				["<b>Él (-ar)</b>","-ó"],
				["<b>Nosotros (-ar)</b>","-amos"],
				["<b>Vosotros (-ar)</b>","-asteis"],
				["<b>Ellos (-ar)</b>","-aron"],
				["<b>Ellas (-ar)</b>","-aron"],
				["<b>Ustedes (-ar)</b>","-aron"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола прош. соверш. вр.",a[r][1],"см. глаголы");
			break;
		case 2:
			var a = [
				["<b>Yo (-er)</b>","-í"],
				["<b>Tú (-er)</b>","-iste"],
				["<b>Él (-er)</b>","-ió"],
				["<b>Nosotros (-er)</b>","-imos"],
				["<b>Vosotros (-er)</b>","-isteis"],
				["<b>Ellos (-er)</b>","-ieron"],
				["<b>Ellas (-er)</b>","-ieron"],
				["<b>Ustedes (-er)</b>","-ieron"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола прош. соверш. вр.",a[r][1],"см. глаголы");
			break;
		case 3:
			var a = [
				["<b>Yo (-ir)</b>","-í"],
				["<b>Tú (-ir)</b>","-iste"],
				["<b>Él (-ir)</b>","-ió"],
				["<b>Nosotros (-ir)</b>","-imos"],
				["<b>Vosotros (-ir)</b>","-isteis"],
				["<b>Ellos (-ir)</b>","-ieron"],
				["<b>Ellas (-ir)</b>","-ieron"],
				["<b>Ustedes (-ir)</b>","-ieron"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола прош. соверш. вр.",a[r][1],"см. глаголы");
			break;
	}
}

function task8() {
	switch(R(1,3)) { 
		case 1:
			var a = [
				["<b>Yo (-ar)</b>","he -ado"],
				["<b>Tú (-ar)</b>","has -ado"],
				["<b>Él (-ar)</b>","ha -ado"],
				["<b>Nosotros (-ar)</b>","hemos -ado"],
				["<b>Vosotros (-ar)</b>","habéis -ado"],
				["<b>Ellos (-ar)</b>","han -ado"],
				["<b>Ellas (-ar)</b>","han -ado"],
				["<b>Ustedes (-ar)</b>","han -ado"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола прош. только что соверш. вр.",a[r][1],"см. глаголы");
			break;
		case 2:
			var a = [
				["<b>Yo (-er)</b>","he -ido"],
				["<b>Tú (-er)</b>","has -ido"],
				["<b>Él (-er)</b>","ha -ido"],
				["<b>Nosotros (-er)</b>","hemos -ido"],
				["<b>Vosotros (-er)</b>","habéis -ido"],
				["<b>Ellos (-er)</b>","han -ido"],
				["<b>Ellas (-er)</b>","han -ido"],
				["<b>Ustedes (-er)</b>","han -ido"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола прош. только что соверш. вр.",a[r][1],"см. глаголы");
			break;
		case 3:
			var a = [
				["<b>Yo (-ir)</b>","he -ido"],
				["<b>Tú (-ir)</b>","has -ido"],
				["<b>Él (-ir)</b>","ha -ido"],
				["<b>Nosotros (-ir)</b>","hemos -ido"],
				["<b>Vosotros (-ir)</b>","habéis -ido"],
				["<b>Ellos (-ir)</b>","han -ido"],
				["<b>Ellas (-ir)</b>","han -ido"],
				["<b>Ustedes (-ir)</b>","han -ido"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола прош. только что соверш. вр.",a[r][1],"см. глаголы");
			break;
	}
}

function task9() {
	switch(R(1,3)) { 
		case 1:
			var a = [
				["<b>Yo (-ar)</b>","-aré"],
				["<b>Tú (-ar)</b>","-arás"],
				["<b>Él (-ar)</b>","-ará"],
				["<b>Nosotros (-ar)</b>","-aremos"],
				["<b>Vosotros (-ar)</b>","-aréis"],
				["<b>Ellos (-ar)</b>","-arán"],
				["<b>Ellas (-ar)</b>","-arán"],
				["<b>Ustedes (-ar)</b>","-arán"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола буд. несоверш. вр.",a[r][1],"см. глаголы");
			break;
		case 2:
			var a = [
				["<b>Yo (-er)</b>","-eré"],
				["<b>Tú (-er)</b>","-erás"],
				["<b>Él (-er)</b>","-erá"],
				["<b>Nosotros (-er)</b>","-eremos"],
				["<b>Vosotros (-er)</b>","-eréis"],
				["<b>Ellos (-er)</b>","-erán"],
				["<b>Ellas (-er)</b>","-erán"],
				["<b>Ustedes (-er)</b>","-erán"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола буд. несоверш. вр.",a[r][1],"см. глаголы");
			break;
		case 3:
			var a = [
				["<b>Yo (-ir)</b>","-iré"],
				["<b>Tú (-ir)</b>","-irás"],
				["<b>Él (-ir)</b>","-irá"],
				["<b>Nosotros (-ir)</b>","-iremos"],
				["<b>Vosotros (-ir)</b>","-iréis"],
				["<b>Ellos (-ir)</b>","-irán"],
				["<b>Ellas (-ir)</b>","-irán"],
				["<b>Ustedes (-ir)</b>","-irán"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола буд. несоверш. вр.",a[r][1],"см. глаголы");
			break;
	}
}

function task10() {
	switch(R(1,3)) { 
		case 1:
			var a = [
				["<b>Yo (-ar)</b>","habré -ado"],
				["<b>Tú (-ar)</b>","habrás -ado"],
				["<b>Él (-ar)</b>","habrá -ado"],
				["<b>Nosotros (-ar)</b>","habremos -ado"],
				["<b>Vosotros (-ar)</b>","habréis -ado"],
				["<b>Ellos (-ar)</b>","habrán -ado"],
				["<b>Ellas (-ar)</b>","habrán -ado"],
				["<b>Ustedes (-ar)</b>","habrán -ado"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола буд. соверш. вр.",a[r][1],"см. глаголы");
			break;
		case 2:
			var a = [
				["<b>Yo (-er)</b>","habré -ido"],
				["<b>Tú (-er)</b>","habrás -ido"],
				["<b>Él (-er)</b>","habrá -ido"],
				["<b>Nosotros (-er)</b>","habremos -ido"],
				["<b>Vosotros (-er)</b>","habréis -ido"],
				["<b>Ellos (-er)</b>","habrán -ido"],
				["<b>Ellas (-er)</b>","habrán -ido"],
				["<b>Ustedes (-er)</b>","habrán -ido"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола буд. соверш. вр.",a[r][1],"см. глаголы");
			break;
		case 3:
			var a = [
				["<b>Yo (-ir)</b>","habré -ido"],
				["<b>Tú (-ir)</b>","habrás -ido"],
				["<b>Él (-ir)</b>","habrá -ido"],
				["<b>Nosotros (-ir)</b>","habremos -ido"],
				["<b>Vosotros (-ir)</b>","habréis -ido"],
				["<b>Ellos (-ir)</b>","habrán -ido"],
				["<b>Ellas (-ir)</b>","habrán -ido"],
				["<b>Ustedes (-ir)</b>","habrán -ido"]																								
			];
			var r = R(0,a.length-1);
			var C1 = a[r][3];
			setTask(a[r][0],"Спряжение глагола буд. соверш. вр.",a[r][1],"см. глаголы");
			break;
	}
}


function setTask(A,B,C,D) {
	$("tasktext").innerHTML = A;
	$("taskans").placeholder = B;
	$("taskans").value = "";
	answer = C;
	if(hint!==undefined) {
		clearTimeout(hint);
		hint = undefined;
	}
	hint = setTimeout(function(){$("taskans").placeholder = D;},15000);
}

function checkTask() {
	if($("taskans").value.toLowerCase().split(" ").join("")==answer.toLowerCase().split(" ").join("")) {
		msg("ok","#0a0",750);
		incPoints(1);
	} else {
		msg("no, <b>" + answer.toLowerCase().split(" ").join("") + "</b>","#a00",750);
		decPoints(timer.time);
	}
	nextTask();
}

function checkKey(e) {
	if(e.keyCode==13) {
		checkTask();
	}
}