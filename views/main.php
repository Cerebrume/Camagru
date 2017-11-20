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
	<nav class="navbar">
		<div class="container">
			<div class="header">
				<ul class="header__nav nav-left">
					<li><a href="<?php echo ROOT_URL; ?>">Home</a></li>
					<li><a href="<?php echo ROOT_URL; ?>shares">Shares</a></li>
				</ul>

				<ul class="header__nav nav-right">
					<li><a href="<?php echo ROOT_URL; ?>users/login">Login</a></li>
					<li><a href="<?php echo ROOT_URL; ?>users/register">Register</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<?php require($view); ?>
	<script src="assets/js/app.js"></script>
	<script src="assets/js/filters.js"></script>
</body>
</html>