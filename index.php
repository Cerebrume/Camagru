<?php
	require_once('config/setup.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Camagru by dkazanov</title>
	<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
	<div class="camera_canvas">
		<video id="video" width="640" height="480" autoplay></video>
		<button id="snap">Snap Photo</button>
		<canvas id="canvas" width="640" height="480"></canvas>
	</div>
	<script src="assets/js/app.js"></script>
	
	<script>
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
	</script>
	<script src="assets/js/filters.js"></script>
</body>
</html>