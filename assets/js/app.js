
"use strict";

var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var take_pic = document.getElementById('snap');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var img;
var desc = document.getElementById('desc');

function sendPic(img) {
	var http = new XMLHttpRequest();

	http.open('POST', '', true);

	http.onreadystatechange = function () {
		if (this.readyState != 4) return;

		if (this.status == 200) {
			console.log("THIS: " + this.responseText);
		}
		else {
			console.log( "Status: " + http.status + ': ' + http.statusText );
		}
	}
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("submit_img=true" + "&desc=" + desc + "&img=" + encodeURIComponent(img));
	alert("submit_img=true" + "&desc=" + desc + "&img=" + encodeURIComponent(img));
}

function snapshot() {
	if (localMediaStream) {
		ctx.drawImage(video, 0, 0, 640, 480);
		img = convertCanvasToImage(canvas);
		sendPic(img);
		//alert(img.src);

	}

}

function convertCanvasToImage(canvas) {
	var image;
	image = canvas.toDataURL("image/png");
	return image;
}

snap.addEventListener('click', snapshot, false);

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({video: true})
		.then(function(stream){
		video.srcObject = stream;
		video.play();
		localMediaStream = stream;
	});
}



