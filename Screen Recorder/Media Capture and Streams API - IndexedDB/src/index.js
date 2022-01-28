const startDOM= document.getElementById("start");
const stopDOM = document.getElementById("stop");
const videoDOM = document.querySelector("video");
const playlistDOM = document.querySelector("#playlist");
let recorder, stream, finalStreamBlob;
const chunks = [];
let idb;  // indexedDB

window.onload = ()=> {
  const idb_request = indexedDB.open("polyys",1);
  idb_request.onupgradeneeded = ()=>{
    idb = idb_request.result
    console.info("Create", idb);
    const objectStore = idb.createObjectStore("historicoScreenRecording", {autoIncrement:true});
    console.info(objectStore);
  }
  // 
  idb_request.onsuccess = ()=>{
    idb = idb_request.result;
    console.log("OPEN",idb);
    let historicoVideosKeys = idb.transaction("historicoScreenRecording")
            .objectStore("historicoScreenRecording").getAllKeys();
    let historicoVideos = idb.transaction("historicoScreenRecording")
            .objectStore("historicoScreenRecording").getAll();

    historicoVideos.onsuccess = ()=> {
      let historicoDom = document.createElement("span");
      historicoDom.style.marginTop = '10px'
      if (historicoVideos.result.length>0){
        historicoDom.innerHTML += "Anteriores: <br>";
        historicoVideos.result.forEach((result, i) =>{
            let url = URL.createObjectURL(result);
            historicoDom.innerHTML += `<a href=${url} download="${historicoVideosKeys.result[i]}">${url} ** ${historicoVideosKeys.result[i]}</a>
            <a href="#" onclick="videoDOM.src='${url}';videoDOM.controls = 'controls';">⏫</a><br>`;
        });
        playlistDOM.insertAdjacentElement('afterend',historicoDom);
        
      } // fin if
    } // fin historicoVideos.onsuccess
  } // fin  idb_request.onsuccess
} //fin window.onload

// 

async function startRecording() {
  try {
    audioStream = await navigator.mediaDevices.getUserMedia({audio:true});
    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video:	{
              mediaSource: "screen"
        /* ,
              frameRate: { ideal: 10} */
          },
          audio:true
      });
      
          let audio = new MediaStream();
          audio.addTrack(audioStream.getTracks()[0]);
        let video = new MediaStream();
          video.addTrack(screenStream.getTracks()[0]);
          
      
          const audioContext = new AudioContext();
          _video = audioContext?.createMediaStreamSource(video);
          _audio = audioContext.createMediaStreamSource(audio);
      
          combinedAudioStream = audioContext.createMediaStreamDestination();
      
          _video.connect(combinedAudioStream);
          _audio.connect(combinedAudioStream);

  } catch (error) {
    alert("permitir microfono y captura de pantalla CON sonido");
    console.log(error)
    stopDOM.click();
    return;
  }

    ////////////////////

    streamFinal = new MediaStream();
    streamFinal.addTrack(screenStream.getTracks()[1]);
    streamFinal.addTrack(combinedAudioStream.stream.getTracks()[0]);

  recorder = new MediaRecorder(streamFinal, {mimeType:'video/webm;codecs=H264'});
  console.log(recorder.mimeType);

  /* const chunks = []; */
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => { // la función debe estar aquí, porque sino no lee "chunks" fuera de este scope 🤷🏻‍♂️
    console.log("onstop");
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    videoDOM.src = URL.createObjectURL(completeBlob);
    videoDOM.controls = "controls"
    /* playlistDOM.innerHTML += `<a href=${videoDOM.src}>${videoDOM.src}</a><button style="height:20px;font-size: 10px" onclick="videoDOM.src = ${videoDOM.src}">⬆</button><br>`; */
    playlistDOM.innerHTML += `<a href=${videoDOM.src} download="${new Date().toLocaleString('sv')}">${videoDOM.src} - ${new Date().toLocaleString('sv')}</a>
                              <a href='#' onclick="videoDOM.src = '${videoDOM.src}';
                              videoDOM.controls = 'controls';">🔝</a><br>`;
    idb.transaction("historicoScreenRecording", 'readwrite').objectStore("historicoScreenRecording").add(completeBlob, new Date().toLocaleString('sv'));
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

  recorder?.stop();

  /* screenStream.getVideoTracks()[0].stop(); */
  audioStream?.getTracks()[0]?.stop()
  screenStream?.getTracks()[0]?.stop()
  screenStream?.getTracks()[1]?.stop()
  streamFinal?.getVideoTracks()[0]?.stop();
  
});
