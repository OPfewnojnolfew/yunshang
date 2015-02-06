<?php 
$data =  $GLOBALS[HTTP_RAW_POST_DATA]; 
if(empty($data)) {     
	$data = file_get_contents('php://input');   
}

if($data){
	$file = fopen(time().'.wav','w');//打开文件准备写入
	$data = gzuncompress($data);
	fwrite($file,$data);//写入 
	fclose($file);//关闭   
	echo "ok~~~";
}else echo 'Failed';