<div class="container-fluid">
	<div class="row justify-content-center align-items-center">
		<div class="img col-3"><img class="side-img" src="<?php echo ROOT_URL. "assets/img/login-img.jpg" ?>" alt=""></div>
		<div class="main_text offset-1 col-3">
			<h2>Fill the fields to enter the site</h2>
			<?php Messages::displayMessage(); ?>
			<form id="form-register" name="register" action="<?php //echo $_SERVER['PHP_SELF']; ?>" method="post">
			<div class="input-group input-group-lg">
				<div class="input-group-prepend">
					<div class="input-group-text"><img class="input-prepend" src="/Camagru/assets/img/mail-icon.png" alt=""></div>
				</div>
				<input class="form-control" type="email" name="email"  id="email" placeholder="sophie@example.com">
			</div>
			<div class="input-group input-group-lg">
				<div class="input-group-prepend">
					<div class="input-group-text"><img class="input-prepend" src="/Camagru/assets/img/lock-icon.png" alt="lock"></div>
				</div>
				<input class="form-control" type="password" name="password"  id="passwd" placeholder="Password">
			</div>
			<input type="hidden" name="submit" value="true">
			<input id="submit-login" class="login-btn btn btn-primary btn-lg" type="submit" value="Login">
			</form>
		</div>
	</div>
</div>
<script src="<?php echo ROOT_URL; ?>assets/js/login_form.js"></script>