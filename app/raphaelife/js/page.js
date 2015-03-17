var P;
var len=32;
var fieldR = [];
var fieldA = [];
var fieldB = [];
var colors = [
  [200,0,0],
  [0,0,200],
  [200,200,0]
];
var mode = 3;
var int;
var L=0;
var LO=0;

function $(o) {
	return document.getElementById(o);
}

function RI(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = function () {
       P = Raphael(0, 0, screen.width*0.5, screen.height*0.88, "render");
       seed();
       field();
       clear();
       resume();
};

function pause() {
  clearInterval(int);
}

function resume() {
  int = setInterval(function(){update()},10);  
}

function clear() {
  for(var x=0;x<len;x++) {
    for(var y=0;y<len;y++) {
      fieldA[x][y]=false;
      fieldR[x][y].attr({"fill":"#fff"});
    }
  }
}

function field() {
  for(var x=0;x<len;x++) {
    var r = new Array();
    for(var y=0;y<len;y++) {
      b = P.rect(16+x*(screen.width/70),16+y*(screen.width/70),(screen.width/70),(screen.width/70)).attr({"stroke-width":"0.0","stroke-color":"#ffffff"}).data("x",x).data("y",y);
      r.push(b);
    }
    fieldR[x]=r;
    for(var y=0;y<len/2;y++) {
    /*fieldR[x][y].mousedown(function() {
	fieldA[this.data("x")-1][this.data("y")] = true;
	fieldA[this.data("x")+1][this.data("y")] = true;
	fieldA[this.data("x")][this.data("y")-1] = true;
	fieldA[this.data("x")][this.data("y")+1] = true;
	rn = RI(0,colors.length-1);
	switch(mode) {
	  case 49:
	    rc = 255;
	    gc = 255;
	    bc = 255;
	    break;
	  case 50:
	    rc = 0;
	    gc = 0;
	    bc = 0;
	    break;	    
	  default:
	    rc = colors[rn][0];
	    gc = colors[rn][1];
	    bc = colors[rn][2];
	    break;
	}
	
	fieldR[this.data("x")-1][this.data("y")].data("rc",rc);
	fieldR[this.data("x")-1][this.data("y")].data("gc",gc);
	fieldR[this.data("x")-1][this.data("y")].data("bc",bc);
	
	fieldR[this.data("x")+1][this.data("y")].data("rc",rc);
	fieldR[this.data("x")+1][this.data("y")].data("gc",gc);
	fieldR[this.data("x")+1][this.data("y")].data("bc",bc);
	
	fieldR[this.data("x")][this.data("y")-1].data("rc",rc);
	fieldR[this.data("x")][this.data("y")-1].data("gc",gc);
	fieldR[this.data("x")][this.data("y")-1].data("bc",bc);
	
	fieldR[this.data("x")][this.data("y")+1].data("rc",rc);
	fieldR[this.data("x")][this.data("y")+1].data("gc",gc);
	fieldR[this.data("x")][this.data("y")+1].data("bc",bc);
      }); */
    }
  }   
}

function seed() {
  for(var x=0;x<len;x++) {
    var r = [];
    var f1 = [];
    var f2 = [];
    for(var y=0;y<len;y++) {
      f1.push(false);
      f2.push(false);
    }
    fieldA[x]=f1;
    fieldB[x]=f2;
  } 
}

function load(v) {
	var ar = eval("[" + v + "]");
	var rc,gc,bc;
	clear();
	for(var i=0;i<ar.length;i+=1) {
		fieldA[ar[i][0]][ar[i][1]] = true;
		switch(ar[i][2]) {
			case "R":
				rc = 255;
				gc = 0;
				bc = 0;
				break;
			case "G":
				rc = 0;
				gc = 255;
				bc = 0;
				break;
			case "B":
				rc = 0;
				gc = 0;
				bc = 255;
				break;
			case "Y":
				rc = 255;
				gc = 255;
				bc = 0;
				break;
			case "O":
				rc = 255;
				gc = 100;
				bc = 0;
				break;
		}
		fieldR[ar[i][0]][ar[i][1]].data("rc",rc);
		fieldR[ar[i][0]][ar[i][1]].data("gc",gc);
		fieldR[ar[i][0]][ar[i][1]].data("bc",bc);
		fieldR[ar[i][0]][ar[i][1]].attr({"fill":"RGB("+fieldR[ar[i][0]][ar[i][1]].data("rc")+","+fieldR[ar[i][0]][ar[i][1]].data("gc")+","+fieldR[ar[i][0]][ar[i][1]].data("bc")+")"})
	}
}

function update() {
  var c;
    for(var x=0;x<len;x++) {
      for(var y=0;y<len;y++) {
	  		if(fieldA[x][y]==true){fieldB[x][y]=true;}else{fieldB[x][y]=false;};
      }
    }
    LO = L;
    L = 0;
    for(var x=0;x<len;x++) {
      for(var y=0;y<len;y++) {
	  c = 0;
	  rcs = 0; gcs = 0; bcs = 0;
	  for(var ix=x-1;ix<=x+1;ix++) {
	    for(var iy=y-1;iy<=y+1;iy++) {
	      try { // INDIA
		if((fieldB[ix][iy]==true)&&!((ix==x)&&(iy==y))) {
		  c++;
		  rcs+=fieldR[ix][iy].data("rc");
		  gcs+=fieldR[ix][iy].data("gc");
		  bcs+=fieldR[ix][iy].data("bc");
		}
	      } catch(e) {continue;}
	    }
	  }
	  switch (c) {
	    case 2:
 	      if(fieldB[x][y]==true){fieldA[x][y]=true;fieldR[x][y].attr({"fill":"RGB("+fieldR[x][y].data("rc")+","+fieldR[x][y].data("gc")+","+fieldR[x][y].data("bc")+")"});}else{fieldA[x][y]==false;fieldR[x][y].attr({"fill":"#fafafa"});};
	      break;
	    case 3:
	      fieldA[x][y]=true;
	      fieldR[x][y].data("rc",rcs/3);
	      fieldR[x][y].data("gc",gcs/3);
	      fieldR[x][y].data("bc",bcs/3);
	      fieldR[x][y].attr({"fill":"RGB("+Math.floor(rcs/3)+","+Math.floor(gcs/3)+","+Math.floor(bcs/3)+")"});
	      break;
	    default:
	      fieldA[x][y]=false;
	      fieldR[x][y].attr({"fill":"#fff"});
	      break;
	  }
	  	if(fieldB[x][y]==true) L++;
      }
    }
	$("l").innerHTML = L;
	$("d").innerHTML = L-LO;	
}