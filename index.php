<?php
	require_once('config/setup.php');
	class User {
		public $login;

		public validPass(){

		}
	}
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
	<script src="assets/js/filters.js"></script>
</body>
</html>