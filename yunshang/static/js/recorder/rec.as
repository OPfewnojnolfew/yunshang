package 
{
    import fl.controls.*;
    import flash.display.*;
    import flash.events.*;
    import flash.external.*;
    import flash.net.*;
    import flash.system.*;
    import flash.text.*;
    import org.as3wavsound.*;
    import org.bytearray.micrecorder.*;
    import org.bytearray.micrecorder.encoder.*;
    import org.bytearray.micrecorder.events.*;
	import flash.media.Microphone;
	
    public class rec extends Sprite
    {
        private var recorder:MicRecorder;
        private var player:WavSound;
        private var _state:Number;
        private var _display:TextField;
        private var btn_start:Button;
        private var _file:FileReference;
        private var uploadUrl:String = "http://tljstat.5888.cn/uploadSound.php";
        private var loader:URLLoader;
        private var version:Object = 6;

        public function rec()
        {
            this.recorder = new MicRecorder(new WaveEncoder());
            this._display = new TextField();
            this.btn_start = new Button();
            this._file = new FileReference();
            this.loader = new URLLoader();
            Security.allowDomain("*");
            Security.allowInsecureDomain("*");
            addEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
            this._state = 0;
            if (ExternalInterface.available)
            {
                this._display.text = "Ready " + this.version;
				var _microphone:Microphone; 
				_microphone = Microphone.getMicrophone();
				try{
					if(_microphone==null)
						jsTrace("asTrace", "getMicrophone failed");
					else
						jsTrace("asTrace", "getMicrophone OK!!");
				}catch(e){
					jsTrace("alert", "error");
				}
                jsTrace("asTrace", (Capabilities.isDebugger ? ("Debug") : ("normal")) + "> VERSION: " + Capabilities.version);
                ExternalInterface.addCallback("startAsRecord", this.startRec);
                ExternalInterface.addCallback("stopAsRecord", this.stopRec);
                ExternalInterface.addCallback("uploadAsRecord", this.upload);
				ExternalInterface.addCallback("saveAsRecordFile", this.saveFile);
            }
            else
            {
                this._display.text = "Error " + this.version;
            }
            return;
        }// end function
		
		private function saveFile(){
			try{
				_file.save(this.recorder.output,"record.wav");
			}catch(e){
				jsTrace("asTrace", "saveFile failed(no data) "+e);
			}
		}

        private function startRec(param1:String)
        {
            this.jsTrace("asTrace", "startRec: " + param1 );
            if (this._state != 0)
            {
                return false;
            }
            if (param1 != null)
            {
                this.uploadUrl = param1;
            }
			
            this.recorder.record();
            this._state = 1;
            this.setButtonText();
            return true;
        }// end function

        private function stopRec()
        {
            this.jsTrace("asTrace", "stopRec");
            if (this._state != 1)
            {
                return false;
            }
            this._state = 2;
            this.recorder.stop();
            this.setButtonText();
            return true;
        }// end function

        private function upload()
        {
            if (this._state != 2)
            {
                return false;
            }
            this._state = 3;
            this._display.text = "uploading...";
            var _loc_1:* = new URLRequest(this.uploadUrl);
            _loc_1.method = URLRequestMethod.POST;
			this.recorder.output.compress();
            _loc_1.data = this.recorder.output;
			
            _loc_1.contentType = "application/octet-stream";
            this.loader.dataFormat = URLLoaderDataFormat.BINARY;
            this.loader.addEventListener(Event.COMPLETE, this.completeHandler);
            this.loader.addEventListener(ProgressEvent.PROGRESS, this.progressHandler);
            this.loader.load(_loc_1);
            this.setButtonText();
            return true;
        }// end function

        private function onAddedToStage(event:Event) : void
        {
            this._display.selectable = false;
            stage.align = StageAlign.TOP_LEFT;
            stage.scaleMode = StageScaleMode.NO_SCALE;
            this._display.autoSize = TextFieldAutoSize.LEFT;
            addChild(this._display);
            this.btn_start.x = 0;
            this.btn_start.y = 2;
            this.btn_start.width = 24;
            this._display.x = 26;
            addChild(this.btn_start);
            this.recorder.addEventListener(RecordingEvent.RECORDING, this.onRecording);
            this.recorder.addEventListener(Event.COMPLETE, this.onRecordComplete);
            this.btn_start.label = "-";
            this.btn_start.addEventListener(MouseEvent.CLICK, this.onClickBtn);
            this.setButtonText();
            return;
        }// end function

        private function onClickBtn(event:MouseEvent)
        {
			jsTrace("asTrace", "this._state="+this._state);
            if (this._state == 0)
            {
                this.startRec(this.uploadUrl);
            }
            else if (this._state == 1)
            {
                this.stopRec();
            }
            else if (this._state == 2)
            {
                this.upload();
            }
            return;
        }// end function

        private function setButtonText()
        {
            if (this._state == 0)
            {
                this.btn_start.label = "◎";
            }
            else if (this._state == 1)
            {
                this.btn_start.label = "■";
            }
            else if (this._state == 2)
            {
                this.btn_start.label = "▲";
            }
            else if (this._state == 3)
            {
                this.btn_start.label = "…";
            }
            return;
        }// end function

        private function jsTrace(param1:String, param2:String)
        {
            trace(param1 + " > " + param2);
            try
            {
                ExternalInterface.call(param1, param2);
            }
            catch (e)
            {
            }
            return;
        }// end function

        private function onRecording(event:RecordingEvent) : void
        {
            this._display.text = "Recording since : " + event.time + " ms.";
            this.jsTrace("asTrace", event.time + "");
            this.jsTrace("asRecording", event.time + "");
            return;
        }// end function

        private function onRecordComplete(event:Event) : void
        {
            var event:* = event;
            try
            {
                this._display.text = "Sound recorded.";
                this.jsTrace("asTrace", "onRecordComplete");
            }
            catch (e)
            {
                jsTrace("asTrace", e);
                trace(e);
            }
            this.player = new WavSound(this.recorder.output);
			
            this.player.play();
            return;
        }// end function

        private function completeHandler(event:Event) : void
        {
            this._state = 0;
            this.setButtonText();
            this._display.text = "Ready " + this.version;
            try
            {
                this.jsTrace("asUploadComplete", "Server say: "+this.loader.data);
            }
            catch (e)
            {
            }
            return;
        }// end function

        private function ioErrorHandler(event:IOErrorEvent) : void
        {
            this._state = 0;
            this.setButtonText();
            this.jsTrace("alert", "IOErrorEvent");
            return;
        }// end function

        private function progressHandler(event:ProgressEvent) : void
        {
            try
            {
                trace("progressHandler name=" + event);
            }
            catch (e)
            {
            }
            return;
        }// end function

        private function securityErrorHandler(event:SecurityErrorEvent) : void
        {
            this._state = 0;
            this.setButtonText();
            this.jsTrace("alert", "SecurityErrorEvent");
            return;
        }// end function

    }
}
