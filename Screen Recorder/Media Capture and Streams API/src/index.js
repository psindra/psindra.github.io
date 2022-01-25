const startDOM= document.getElementById("start");
const stopDOM = document.getElementById("stop");
const videoDOM = document.querySelector("video");
let recorder, stream;

async function startRecording() {
    audioStream = await navigator.mediaDevices.getUserMedia({audio:true});
	screenStream = await navigator.mediaDevices.getDisplayMedia({
		video:	{
            mediaSource: "screen" ,
            frameRate: { ideal: 10}
        },
        audio:true
    });

    let audio = new MediaStream();
    audio.addTrack(audioStream.getTracks()[0]);
	let video = new MediaStream();
    video.addTrack(screenStream.getTracks()[0]);
    

    const audioContext = new AudioContext();
    _video = audioContext.createMediaStreamSource(video);
    _audio = audioContext.createMediaStreamSource(audio);

    combinedStream = audioContext.createMediaStreamDestination();

    _video.connect(combinedStream);
    _audio.connect(combinedStream);

    ////////////////////

    streamFinal = new MediaStream();
    streamFinal.addTrack(screenStream.getTracks()[1]);
    streamFinal.addTrack(combinedStream.stream.getTracks()[0]);

  recorder = new MediaRecorder(streamFinal);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    videoDOM.src = URL.createObjectURL(completeBlob);
  };

  recorder.start();
}

startDOM.addEventListener("click", () => {
  startDOM.setAttribute("disabled", true);
  stopDOM.removeAttribute("disabled");

  startRecording();
});

stopDOM.addEventListener("click", () => {
  stopDOM.setAttribute("disabled", true);
  startDOM.removeAttribute("disabled");

  recorder.stop();
  streamFinal.getVideoTracks()[0].stop();
  /* screenStream.getVideoTracks()[0].stop(); */
  screenStream.getTracks()[0].stop()
  screenStream.getTracks()[1].stop()
  audioStream.getTracks()[0].stop()
  
});
