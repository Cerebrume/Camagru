
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



var offsetX=canvas.offsetLeft;
var offsetY=canvas.offsetTop;
var isDragging = false;
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var canMouseX = 0;
var	canMouseY = 0;

/*
** Canvas mouse handlers
*/

function handleMouseDown(e){
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// set the drag flag
	isDragging=true;
  }

  function handleMouseUp(e){
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// clear the drag flag
	isDragging=false;
  }

  function handleMouseOut(e){
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// user has left the canvas, so clear the drag flag
	isDragging=false;
  }

  function handleMouseMove(e){
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// if the drag flag is set, clear the canvas and draw the image
	if(isDragging){
		
		ctx.drawImage(currentPic,canMouseX-128/2,canMouseY-120/2,150,150);
	}
  }

canvas.addEventListener('mousedown', handleMouseDown, false);
canvas.addEventListener('mouseup', handleMouseUp, false);
canvas.addEventListener('mousemove', handleMouseMove, false);
canvas.addEventListener('mouseout', handleMouseOut, false);


// end of mouse handlers for canvas

function convertURIToImageData(URI) {
	return new Promise(function(resolve, reject) {
		if (URI == null) return reject();
	
		var image = new Image();
		image.addEventListener('load', function() {
		resolve();
	  }, false);
	  image.src = URI;
	  preview__container.appendChild(image);
	});
  }

function create_preview (img_src) {
	preview.style.display = 'block';
	convertURIToImageData(img_src);

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
	btn_close.addEventListener('click', function () {
		preview.style.display = 'none';
		while (preview__container.firstChild) {
			preview__container.removeChild(preview__container.firstChild);
		}
	});
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

var faces = document.getElementsByClassName('face-preset');
var currentPic = null;
for (let i = 0; i < faces.length; i++) {
	faces[i]
	.addEventListener('click', e => {
		
		currentPic = e.target;
		
	});
}


function snapshot() {
	if (localMediaStream) {
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(currentPic, canMouseX - 128/2, canMouseY - 128/2, 150, 150);
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
video.addEventListener('play', timerCallback, false);


if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({video: true})
		.then(function(stream){
		video.srcObject = stream;
		video.play();
		localMediaStream = stream;
	});
}


function timerCallback() {
    if (video.paused || video.ended) {
      return;
    }
    computeFrame();
    setTimeout(function() {
        timerCallback();
      }, 20);
  };

function computeFrame() {
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	if (currentPic) {
		ctx.drawImage(currentPic, canMouseX -128/2, canMouseY - 128/2, 150, 150);
	}
}
