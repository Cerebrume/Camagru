
"use strict";

var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var take_pic = document.getElementById('snap');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var img;
var desc = document.getElementById('desc');
var comment = document.getElementById('preview-bg__comment');

var preview = document.getElementById('preview-bg');
var preview__container = document.getElementById('preview-bg__container');

function convertURIToImageData(URI) {
	return new Promise(function(resolve, reject) {
		if (URI == null) return reject();
	
		var image = new Image();
		image.addEventListener('load', function() {
		ctx.width = image.width;
		canvas.height = image.height;
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		resolve();
	  }, false);
	  image.src = URI;
	  preview__container.appendChild(image);
	});
  }

function create_preview (img_src) {
	preview.style.display = 'block';
	convertURIToImageData(img_src)
	.then(response => {
		console.log(response);
	});

	var comment = document.createElement('div');
	comment.classList.add('preview-bg__comment');
	var btn_send = document.createElement('button');
	btn_send.className = 'preview-bg__btn-send';
	var textElem = document.createTextNode('Send');
	btn_send.appendChild(textElem);
	var btn_close = document.createElement('button');
	btn_close.className = 'preview-bg__btn-close';
	var textElem1 = document.createTextNode('Close');
	btn_close.appendChild(textElem1);
	preview__container.appendChild(comment);
	preview__container.appendChild(btn_send);
	preview__container.appendChild(btn_close);

}

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
}

function snapshot() {
	if (localMediaStream) {
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		img = convertCanvasToImage(canvas);
		//sendPic(img);
		create_preview(img);

	}

}

function convertCanvasToImage(canvas) {
	let image;
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


