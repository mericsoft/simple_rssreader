
var _=function(ad){
	var a= document.querySelector(ad);
	return a;
}


/* id,name ve tag ile çekme*/
var elm = function (i){
	var a = document.getElementById(i);
	return a	;
}

var isim = function (i) {
	var a= document.getElementsByName(i);
	return a;
}

var tag = function (i) {
	var a=document.getElementsByTagName(i);
	return a;
}
/*  ////////////////////       */

*/ documan prototipleri */
Document.prototype.yeni=function (a) {
	var yap= this.createElement(a.tur);
	elm(a.ust).appendChild(yap);
	if(a.oz){
		for(key in a.oz){
			yap.setAttribute(key,a.oz[key]);		
		}
	}	
	if(a.ic){
		var mtn=this.createTextNode(a.ic);
		yap.appendChild(mtn);		
	}	
	if(a.once){
		var once= elm(a.ust).insertBefore(yap,elm(a.once));
	}
	if(a.sonra){
		var sonra = elm(a.ust).insertBefore(yap,elm(a.sonra).nextSibling);	
	}
	
}

//document ie uyumluluk //
HTMLDocument.prototype.yeni=function (a) {
	var yap= this.createElement(a.tur);
	elm(a.ust).appendChild(yap);
	if(a.oz){
		for(key in a.oz){
			yap.setAttribute(key,a.oz[key]);		
		}
	}	
	if(a.ic){
		var mtn=this.createTextNode(a.ic);
		yap.appendChild(mtn);		
	}	
	if(a.once){
		var once= elm(a.ust).insertBefore(yap,elm(a.once));
	}
	if(a.sonra){
		var sonra = elm(a.ust).insertBefore(yap,elm(a.sonra).nextSibling);	
	}
	
}


/* element prototipleri */

Element.prototype.sil=function () {
	this.parentNode.removeChild(this)
	}


Element.prototype.bosalt= function () {
	var say = this.childNodes;
	
	//if (say.length>0) {
		for(var i=0;i<say.length;i++){
			this.removeChild(say[i]);		 
		} 
	//}
}

Element.prototype.olay= function (olayad,fonksiyon) {
	var atac= "on"+olayad;
	var ekle= this.addEventListener||this.attachEvent ? this.addEventListener(olayad,fonksiyon,false):this.attachEvent(atac,fonksiyon);
}

Element.prototype.olaysil= function (olayad,fonksiyon)
{
	var atac="on"+olayad;
	var sil= this.removeEventListener?this.removeEventListener(olayad,fonksiyon,false):this.detachEvent(atac,fonksiyon);

}

/* olay prototipleri */
Event.prototype.dur = function () {
	this.stopPropagation();
	this.preventDefault();
}

var ajx = function(){
	var self=this;
	if(window.XMLHttpRequest){
		this.req = new XMLHttpRequest();
	}else{
		this.req= new ActiveXObject("Microsoft.XMLHTTP");
	}	
	this.hdf = ""
	this.qry="";
	this.metot=1;
	this.logic=true;
	
	this.req.onreadystatechange=function(){
		
		
		if(self.req.readyState==4 && self.req.status==200 ){
			self.sonuc();		
		}else{self.hata();}
	}
	this.req.addEventListener("error",function(){self.hata()});
}

ajx.prototype.sonuc=function(){} ;
ajx.prototype.hata=function(){};




ajx.prototype.yolla = function(){
	switch (this.metot){
	case 1:
		this.req.open("get",this.hdf,this.logic);
		this.req.send();
	break;
	case 2:
		this.req.open("POST",this.hdf,this.logic);
		this.req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		this.req.send(this.qry);
	break;
	}
	
}	

var dupload = function (a) {
	var that = this;
	that.dosya = a.dosya;
	that.hedef = a.hedef;
	that.isim= a.isim;
	that.don =a.don;
	that.hata= a.hata;
	that.ajx = new XMLHttpRequest();
	that.fdata = new FormData();
	that.fdata.append(that.isim,that.dosya);
	that.ajx.onreadystatechange = function () {
		
		if(that.ajx.readyState==4 && that.ajx.status==200){
			that.don();		
		}else {
			that.hata();		
		}
	}
	this.ajx.open("POST",this.hedef,true);
	this.ajx.setRequestHeader("enctype","multipart-form-data");
	this.ajx.send(this.fdata);
}
/*dupload.prototype.sonuc=function () {};
dupload.prototype.olumsuz=function () {};
dupload.prototype.yolla= function () {
	this.ajx.open("POST",this.hedef,true);
	this.ajx.setRequestHeader("enctype","multipart-form-data");
	this.ajx.send(this.fdata);
}*/
	
	
	
/*formdan sonuc kutuları çek */
var kutucek = function(kutuisim,isaret)
{
	var a= document.getElementsByName(kutuisim);
	var i;
	var al="";
	for(i=0;i<a.length;i++){
		if(a[i].checked==true){al+=a[i].value+isaret;}	
	}
	
	var uz= (al.length)-1;
	var al2=al.substr(0,uz);
	return al2;
}

/* formdan tüm verileri al*/
var formal=function (formad,ayrac) {
	var a= document.getElementsByName(formad);
	var i;
	var al="";
	for(i=0;i<a.length;i++){
		al+=a[i].value+ayrac;
	}
	var uz= (al.length)-1;
	var al2=al.substr(0,uz);
	return al2;
}





/*formdan sonuc kutuları çek
var kutucek = function(kutuisim,isaret)
{
	var a= document.getElementsByName(kutuisim);
	var i;
	var al="";
	for(i=0;i<a.length;i++){
		if(a[i].checked==true){al+=a[i].value+isaret;}	
	}
	return al;
}*/



