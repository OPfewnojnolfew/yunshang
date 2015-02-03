<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN" xml:lang="zh-CN">
		<head>
		<title>rec</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<style type="text/css" media="screen">
html, body {
	height: 100%;
	background-color: #ffffff;
}
body {
	margin: 0;
	padding: 0;
	overflow: hidden;
}
#flashContent {
	width: 100%;
	height: 100%;
}
</style>
		</head>

		<body>
    <script type="text/javascript">
<?php
echo 'var rd='.time().';
';
?>

	function getSWFObject(movieName)
	  {
	   if(document[movieName])
	   {
		return document[movieName];
	   }else if(window[movieName]){
		return window[movieName]; 
	   }else if(document.embeds && document.embeds[movieName]){
		return document.embeds[movieName];
	   }else{
		return document.getElementById(movieName);
	   }
	  }
	  function $(id){return document.getElementById(id);}
	  function startAsRecord(){
		  $('btn1').onclick=stopAsRecord;
		  $('btn1').value = "完成";
		  swapFlash(true);
		  getSWFObject("FlashID").startAsRecord("uploadSound.php");
	 }
	  function stopAsRecord(){
		  $('btn1').onclick=uploadAsRecord;
		  $('btn1').value = "上传";
		  getSWFObject("FlashID").stopAsRecord();
		  $('btn2').disabled = false;
	 }
	 function uploadAsRecord(){
		 $('btn1').onclick=startAsRecord;
		  $('btn1').value = "开始";
		  getSWFObject("FlashID").uploadAsRecord();
	 }
	 function saveAsRecordFile(){
//		 swapFlash(true);
		  getSWFObject("FlashID").saveAsRecordFile();
	 }
	 function asUploadComplete(){
		 //可以在php把上传的文件名
		 asRecording("上传完成"+(arguments.length>0?arguments[0]:''));
	}
	function asTrace(){
		 //可以在php把上传的文件名
		 $('show').innerHTML =("Trace："+(arguments.length>0?arguments[0]:'')+" ms")+"<br/>";
	}
	function asRecording(){
		swapFlash(false);
		 //可以在php把上传的文件名
		 $('show1').innerHTML =(""+(arguments.length>0?arguments[0]:'')+" ms");
	}
	var swap_ct = 2;
	function swapFlash(showFlash){
		swap_ct++;
		if(showFlash)
			$('flash_div').style.zIndex = swap_ct;
		else
			$('flash_mask').style.zIndex = swap_ct;
	}
	</script> 
    <div style="width:100%; margin:0 auto">
	    <div style="width: 900px; margin:0 auto; background-color:#CCC; position:relative">
        	<div id="flash_mask" style="z-index:2; position:absolute; top: 0px; left: 0px; width:100%;height:200px;background-color:#099">
                <span id="show1"></span><br />
                <input type="button" value="开始" id="btn1" onclick="startAsRecord();"><br />    
                <input type="button" value="保存为文件" disabled="disabled" id="btn2" onclick="saveAsRecordFile();">         
                <span id="show"></span>
            </div>
            <div id="flash_div" style="z-index:1; position:absolute; top: 0px; left: 0px">
            <script language="javascript">
			if(navigator.appName.indexOf("MSIE")>-1){
				document.write('\
				<object id="FlashID" name="FlashID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="215" height="140">\
					<PARAM NAME="_cx" VALUE="3175">\
					<PARAM NAME="_cy" VALUE="1058">\
					<PARAM NAME="FlashVars" VALUE="">\
					<PARAM NAME="Src" VALUE="rec.swf?'+Math.random()+'">\
					<PARAM NAME="wmode" VALUE="opaque">\
					<param name="allowScriptAccess" value="sameDomain" />\
				</object>');
			}else{
				document.write('\
				<object id="FlashID" name="FlashID" type="application/x-shockwave-flash" data="rec.swf?'+Math.random()+'" width="215" height="140">\
					<param name="movie" value="rec.swf?'+Math.random()+'" />\
					<param name="quality" value="high" />\
					<param name="bgcolor" value="#ffffff" />\
					<param name="play" value="true" />\
					<param name="loop" value="true" />\
					<param name="wmode" value="opaque" />\
					<param name="scale" value="showall" />\
					<param name="menu" value="true" />\
					<param name="devicefont" value="false" />\
					<param name="salign" value="" />\
					<param name="allowScriptAccess" value="sameDomain" />\
					\
					<a href="http://www.adobe.com/go/getflash">\
					<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="获得 Adobe Flash Player" />\
					</a>\
				</object>');
			}
            </script>
            </div>
        </div>
    </div>
</body>
</html>
