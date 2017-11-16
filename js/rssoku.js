function convert(str)
{
   str = str.replace(/&lt;/g,"<");
  str = str.replace(/&gt;/g, ">");
  return str;
}
function msj(stil,mesaj){
	elm('mesaj').innerHTML='';
	elm('mesaj').style.display=stil;
	elm('mesaj').innerHTML=mesaj;
}

function rssal(adr){
	msj('block',adr+' loading...');
	var rss=new ajx();
	rss.metot=1;
	//rss.logic=false;
	rss.hdf='rssjson/'+adr;
	
	var b=''; //conteiner for each rss feed
	rss.sonuc=function () {
		msj('block',adr+' loading...');
		//alert(rss.req.responseText);
		var a=JSON.parse(rss.req.responseText);
		var key=Object.keys(a);
		if(key[0]=='err'){
			
			msj("block",a.err);
			setTimeout(function(){msj('none',"");},2000);
		}else{
			elm('right').innerHTML=""; //clean right side
			var desc=[]
			for(var i=0;i<a.length;i++){
				
				b+="<div class= 'feed'>";
				b+="<div class='title'>"+a[i].baslik+"</div>";
				b+="<div class='desc'>"+convert(a[i].description)+"</div>";
				b+="<div class='link'> <span>share</span> : "+a[i].link+"</div>";
				b+="</div>";
			}
			
			elm("right").innerHTML=b;

			setTimeout(function(){msj('none','');},1000);
		}
	}
rss.yolla();
rss.hata=function(){
	msj('block','connection failed');
	setTimeout(function(){msj('none'),''},2000);

}
}

function listeal(){
	liste=new ajx();
	ls="";
	liste.hdf='rsslistmanage.php';
	liste.logic=false;
	liste.sonuc=function(){
		 ls+=liste.req.responseText;

	}

	liste.yolla();
}
function listebas(){
	elm("titles").innerHTML='';
	var list=JSON.parse(ls);
	var a=Object.keys(list);
	var lst='';
	for (var i=0;i<a.length;i++)
	{
		lst+="<div onclick='event.stopPropagation();rssal(\""+a[i]+"\")'>"+a[i]+"</div>";
	}
	elm('titles').innerHTML=lst;

	


}