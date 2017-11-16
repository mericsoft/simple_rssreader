<?php
ob_start( );
header("content-type: application/json;charset=utf-8");
header("Cache-Control: no-cache, must-revalidate");
error_reporting(0);

	$listfile=fopen("rsstree.txt",'rb');
	$oku=fread($listfile,filesize('rsstree.txt'));
	$liste=json_decode($oku,TRUE); //it's toois impotant true param to turn array
	fclose($listfile);
	
	
	// if the variable "ad" is exist or it is in the array 'liste' 
	if(isset($_GET["ad"]) && array_key_exists($_GET["ad"], $liste)){
		$adr=$liste[$_GET["ad"]];
		
		try{
			/*$ch = curl_init();
			curl_setopt_array($ch, Array(
			CURLOPT_URL            => $adr,
			CURLOPT_USERAGENT      => 'spider',
			CURLOPT_TIMEOUT        => 120,
			CURLOPT_CONNECTTIMEOUT => 30,
			CURLOPT_RETURNTRANSFER => TRUE,
			CURLOPT_ENCODING       => 'UTF-8',
			CURLOPT_SSL_VERIFYPEER=> FALSE
			)); //there is no rule to use post
			$data = curl_exec($ch); 
			
			curl_close($ch); we put this block here if you whish to use*/
			
			$data = file_get_contents($adr);
			$reg1="/<item(.*)item>/s";  //prepare to get the block of first item to last item element
			$reg2="/<title>(.+?)<\/title>/s"; // prepare to have an array of title elements
			$reg3="/<link>(.+?)<\/link>/s"; // prepare to have an array of link elements
			$reg4 ="/<description>(.+?)<\/description>/s"; // prerpare to have an arary of descriptions
			$silreg="/<!\[CDATA\[|\]\]>|\r|\n/"; // we aim to delete all the cdata tags
			preg_match_all($reg1, $data, $sonuc); // get the block 'item'
			//print_r($sonuc);
			
			if(count($sonuc[0])>0){ // if there is a 'item' block
				$itemsnc=$sonuc[0][0];
				$itemsnc=preg_replace($silreg,"", $itemsnc);  //clean the list from CDATA
				$itemsnc=preg_replace("/\"/","'",$itemsnc);
				
				//echo $itemsnc;
				preg_match_all($reg2, $itemsnc, $titles); //get the titles

				preg_match_all($reg3, $itemsnc, $links); //get the links
				preg_match_all($reg4, $itemsnc,$descs); // get the decsriptions

				// echo  the results as a json format // 
				$bas= '[';
				$itmsay=count($titles[1])<10 ? count($titles[1]):10;
				for($i=0;$i<$itmsay;$i++){

					$bas.= '{"baslik": "'.$titles[1][$i].'","link": "'.$links[1][$i].'","description":"'.$descs[1][$i].'"},';
				}
				$bas.= ']';
				$bas=substr_replace($bas, "", count($bas)-3,1);
				//$bas=preg_replace("/&lt(.+)&gt/s", "", $bas);

				echo $bas;
		
		
			}else{echo " {\"err\":\"invalid format or net problem\"}";}	
		}catch(Exception $e){
			echo '{"err":"There is somethig wrong!}"'; 
		}
	} else{
		echo '{"err":"null or invalid adress"}';
	}
	ob_end_flush();
?>
