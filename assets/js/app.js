var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var take_pic = document.getElementById('snap');
var ctx = canvas.getContext('2d');
var localMediaStream = null;

function snapshot() {
	if (localMediaStream) {
	ctx.drawImage(video, 0, 0);
	convertCanvasToImage(ctx);
	}
	var img = convertCanvasToImage(ctx);
	document.appendChild
}

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

snap.addEventListener('click', snapshot, false);

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({video: true})
		.then(function(stream){
		video.src = window.URL.createObjectURL(stream);
		video.play();
		localMediaStream = stream;
	});
}