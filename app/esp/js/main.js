var answer;
var hint;
var points = 0;
var score = "0";

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
			$("timeleft").innerHTML = "↻"
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
	$("mypoints").innerHTML = points + " б";
}

function decPoints(s){
	points -= s;
	if(points<0){
		points=0;
	}
	$("mypoints").innerHTML = points.toString() + " б";
}

function gameOver() {
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
}

function newGame() {
	timer.set(70+parseInt(score));
	timer.start();
	nextTask();
	points = 0;
	$("mypoints").innerHTML = points + " б";
	msg("Удачи!","#0a0",300);
}

function R(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextTask() {
	switch(R(0,2)) {
		case 0:
			task1();
			break;
		case 1:
			task2();
			break;
		case 2:
			task3();
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
			$("msg").style.visibility = "hidden";
			$("msg").style.opacity = "0";
		},wait);
	}
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