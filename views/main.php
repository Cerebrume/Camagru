<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Camagru by dkazanov</title>
	<link rel="stylesheet" href="<?php echo ROOT_PATH; ?>assets/css/style.css">
	<link rel="stylesheet" href="<?php echo ROOT_PATH; ?>assets/css/grid.css">
</head>
<body>
	<nav class="navbar">
		<div class="wrapper">
			<div class="header row">
				<ul class="col-2 col--left header__links">
					<li><a href="<?php echo ROOT_URL; ?>">Home</a></li>
					<li><a href="<?php echo ROOT_URL; ?>posts">Posts</a></li>
				</ul>


				<?php if ($_SESSION['is_logged_in']) : ?>
				<ul class="col-3 col--right header__links">
					<li><a href="<?php echo ROOT_URL; ?>">Welcome, <?php echo $_SESSION['user_data']['login']; ?></a></li>
					<li><a href="<?php echo ROOT_URL; ?>users/logout">Logout</a></li>
				</ul>
				<?php else: ?>
				<ul class="col-2 col--right header__links">
					<li><a href="<?php echo ROOT_URL; ?>users/login">Login</a></li>
					<li><a href="<?php echo ROOT_URL; ?>users/register">Register</a></li>
				</ul>
				<?php endif ?>
			</div>
		</div>
	</nav>
	<?php require($view); ?>

	<footer><p>Created by dkazanov@student.unit.ua. UNIT Factory 2017</p></footer>
</body>
</html>