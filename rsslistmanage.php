<?php
$listfile=fopen("rsstree.txt",'r');
	$oku=fread($listfile,filesize('rsstree.txt'));

	$liste=json_decode($oku,TRUE); //it's toois impotant true param to turn array
	fclose($listfile);
	ksort($liste);
	echo json_encode($liste);