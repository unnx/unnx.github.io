var fs = require("fs");
var path = require("path");

function parseFile(fname,path,template) {
	fs.readFile("txt" + path,{encoding: "utf8"},function(err,data) {
		var t; var t1;
		if (err) throw err;
		t = data.split(";;\n\t").join("'></p><p class='tex'><img class='tex' alt='tex' src='http://latex.codecogs.com/png.latex?");
		t = t.split("\n\t").join("<p class='tex'><img class='tex' alt='tex' src='http://latex.codecogs.com/png.latex?");
		t = t.split(";;\n").join("'></p>");
		t = t.split("  ").join("&nbsp;&nbsp;");
		t = t.split(" ***\n").join("</h4>");
		t = t.split("\n").join("<br>");
		t = t.split(" _").join(" <b>");
		t = t.split("_ ").join("</b> ");
		t = t.split("### ").join("<h1>");
		t = t.split(" ###").join("</h1>");
		t = t.split("*** ").join("<h4>");
		t = t.split("---").join("&mdash;");
		t = t.split("--").join("&ndash;");
		t = t.split("<<<").join("<details><summary></summary>");
		t = t.split(">>>").join("</details>");
		t = t.split("[[").join("<a href='");
		t = t.split("||").join("'>");
		t = t.split("]]").join("</a>");		
		t = t.split("{{").join("<p class='img'><img class='img' src='");
		t = t.split("}}").join("' alt='image'></p>");
		t = t.split("`v`").join("<span class='done-normal'>&nbsp;&nbsp;&nbsp;</span>");		
		t1 = template.split("$HEADER$").join(fname);
		t1 = t1.split("$TEXT$").join(t);
		t1 = t1.split("$TIMESTAMP$").join((new Date()).getDate() + " " + parseMonth());
		t1 = t1.split("$TXTLINK$").join("/txt" + path);
		fs.writeFile("html" + path + ".html",t1,function(err) {
			if (err) throw err;
		});	
	});
}

function parseMonth() {
	var d = new Date();
	switch(d.getMonth()) {
		case 0:
			return "января";
		case 1:
			return "февраля";
		case 2:
			return "марта";
		case 3:
			return "апреля";
		case 4:
			return "мая";
		case 5:
			return "июня";
		case 6:
			return "июля";
		case 7:
			return "августа";
		case 8:
			return "сентября";
		case 9:
			return "октября";
		case 10:
			return "ноября";
		case 11:
			return "декабря";
	}
}

function getFiles(folder,template1,template2) {
	var files = fs.readdirSync("txt" + folder);
	for(var i in files) {
		if(fs.lstatSync("txt"+folder+files[i]).isDirectory()) {
			fs.mkdirSync("html"+folder+files[i]+"/");
			var t = template2;
			var files2 = fs.readdirSync("txt"+folder+files[i]+"/");
			for(var j in files2) {
				if(fs.lstatSync("txt"+folder+files[i]+"/"+files2[j]).isDirectory()) {
					t = t.split("<!--O-->").join("<li class='menu'><a class='folder' href='"+encodeURIComponent(files2[j])+"/'>" + files2[j] + "</a></li><!--O-->");
				} else {
					t = t.split("<!--O-->").join("<li class='menu'><a class='file " + ((encodeURIComponent(files2[j])[0]=="_") ? "task" : "") + "' href='"+encodeURIComponent(files2[j])+".html'>" + files2[j] + "</a></li><!--O-->");
				}
			}
			t = t.split("$TIMESTAMP$").join((new Date()).getDate() + " " + parseMonth());
			t = t.split("$HEADER$").join(files[i]);

			fs.writeFileSync("html"+folder+files[i]+"/index.html",t);
			getFiles(folder + files[i] + "/",template1,template2);					
		} else {
			parseFile(files[i],folder + files[i],template1);
		};
	}
	mkIndex();
}

function mkLatex() {
	fs.readFile("tmp/notes.html",{encoding: "utf8"},function(err,data) {
		var files = fs.readdirSync("latex/");
		var t = data;
		var q = data;
		for(var j in files) {
			if(fs.lstatSync("latex/"+files[j]).isDirectory()) {
				t = t.split("<!--O-->").join("<li class='menu'><a class='folder' href='/latex/"+encodeURIComponent(files[j])+"/index.pdf'>" + files[j] + "</a></li><!--O-->");
				q = q.split("<!--O-->").join("<li class='menu'><a class='folder' type='text/plain' href='/latex/"+encodeURIComponent(files[j])+"/index.tex'>" + files[j] + "</a></li><!--O-->");
			}
		}
		t = t.split("$SRCLINK$").join("<a href='/notes-src.html'>Исходники LaTeX</a>");
		t = t.split("$DESCRIPTION$").join("");
		q = q.split("$DESCRIPTION$").join("(исходники)");
		q = q.split("$SRCLINK$").join("<a href='/notes.html'>PDF-файлы</a>");
		fs.writeFileSync("notes.html",t);
		fs.writeFileSync("notes-src.html",q);
	})
}

function mkIndex() {
	var diff;
	fs.readFile("tmp/index.html",{encoding: "utf8"},function(err,data) {
		var files = fs.readdirSync("txt/");
		var t = data;
		for(var j in files) {
			if(fs.lstatSync("txt/"+files[j]).isDirectory()) {
				t = t.split("<!--O-->").join("<li class='menu'><a class='folder' href='/html/"+encodeURIComponent(files[j])+"/'>" + files[j] + "</a></li><!--O-->");
			} else {
				t = t.split("<!--O-->").join("<li class='menu'><a class='file' href='/html/"+encodeURIComponent(files[j])+".html'>" + files[j] + "</a></li><!--O-->");
			}
		}
		t = t.split("$TIMESTAMP$").join((new Date()).getDate() + " " + parseMonth());
		diff = fs.readFileSync("diff").toString();
		diff = diff.split("\n").join("<br>");
		t = t.split("$COMMIT$").join(diff.split("<br>")[0]);		
		fs.writeFileSync("html/index.html",t);
	})
	fs.readFile("tmp/preface.html",{encoding: "utf8"},function(err,data) {
		var t = data;
		diff = fs.readFileSync("diff").toString();
		t = t.split("$TIMESTAMP$").join((new Date()).getDate() + " " + parseMonth());
		diff = diff.split("\n").join("<br>");
		diff = diff.split("[[").join("<a href='");
		diff = diff.split("||").join("'>");
		diff = diff.split("]]").join("</a>");
		diff = diff.split("{{").join("<img class='img' src='");
		diff = diff.split("}}").join("'>");
		t = t.split("$COMMIT$").join(diff.split("<br>")[0]);
		diff = diff.split(diff.split("<br>")[0]+"<br><br>").join("");	
		t = t.split("$DIFF$").join(diff);
		fs.writeFileSync("index.html",t);
	})
	mkLatex();
}

var rmdir = function(dir) {
	var list = fs.readdirSync(dir);
	for(var i = 0; i < list.length; i++) {
		var filename = path.join(dir, list[i]);
		var stat = fs.statSync(filename);
		
		if(filename == "." || filename == "..") {
		} else if(stat.isDirectory()) {
			rmdir(filename);
		} else {
			fs.unlinkSync(filename);
		}
	}
	fs.rmdirSync(dir);
};

function readTemplate() {
	fs.readFile("tmp/template.html",{encoding: "utf8"},function(err,data1) {
		if (err) throw err;
		fs.readFile("tmp/content.html",{encoding: "utf8"},function(err,data2) {
			rmdir("html");
			fs.mkdirSync("html");
			getFiles("/",data1,data2);
		})
	});
}

readTemplate()
