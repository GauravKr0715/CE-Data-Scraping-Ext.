let start = document.getElementById('btnStart');

let audioSaved = document.getElementById('savedAudio');
        
        
        let constraintObj = { 
            audio: true, 
            video: false
        }; 

        let recState = 0;

        const uploadAudio = document.getElementById('uploadAudio');
        //alert(uploadAudio);
      
        uploadAudio.addEventListener('change', function(e) {
          const file = e.target.files[0];
          const url = URL.createObjectURL(file);
          // Do something with the audio file.
          audioSaved.src = url;
        });
        
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
            navigator.mediaDevices.getUserMedia = function(constraintObj) {
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraintObj, resolve, reject);
                });
            }
        }else{
            navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                devices.forEach(device=>{
                    console.log(device.kind.toUpperCase(), device.label);
                    //, device.deviceId
                })
            })
            .catch(err=>{
                console.log(err.name, err.message);
            })
        }
        navigator.mediaDevices.getUserMedia(constraintObj)
        .then(function(mediaStreamObj) {
            //connect the media stream to the first video element
            // let audio = document.querySelector('audio');
            // if ("srcObject" in audio) {
            //     audio.srcObject = mediaStreamObj;
            // } else {
            //     //old version
            //     audio.src = window.URL.createObjectURL(mediaStreamObj);
            // }
            
            // audio.onloadedmetadata = function(ev) {
            //     //show in the video element what is being captured by the webcam
            //     audio.play();
            // };
            
            //add listeners for saving video/audio
            
            // let stop = document.getElementById('btnStop');
            let audioSaved = document.getElementById('savedAudio');
            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let chunks = [];
            
            start.addEventListener('click', (ev)=>{

                if(!recState){
                    recState++;
                    start.src = "https://img.icons8.com/windows/32/000000/stop-circled--v1.png";
                    mediaRecorder.start();
                    console.log(mediaRecorder.state);
                }
                else{
                    recState = 0;
                    start.src = "https://img.icons8.com/carbon-copy/100/000000/microphone.png"
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                }
            })
            // stop.addEventListener('click', (ev)=>{
            //     mediaRecorder.stop();
            //     console.log(mediaRecorder.state);
            // });
            mediaRecorder.ondataavailable = function(ev) {
                chunks.push(ev.data);
            }
            mediaRecorder.onstop = (ev)=>{
                let blob = new Blob(chunks, { 'type' : 'audio/mp3;' });
                chunks = [];
                let videoURL = window.URL.createObjectURL(blob);
                audioSaved.src = videoURL;
            }
        })
        .catch(function(err) { 
            console.log(err.name, err.message); 
        });
        
        /*********************************
        getUserMedia returns a Promise
        resolve - returns a MediaStream Object
        reject returns one of the following errors
        AbortError - generic unknown cause
        NotAllowedError (SecurityError) - user rejected permissions
        NotFoundError - missing media track
        NotReadableError - user permissions given but hardware/OS error
        OverconstrainedError - constraint video settings preventing
        TypeError - audio: false, video: false
        *********************************/
    