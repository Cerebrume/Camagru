<div class="">
	<div >
		<div class="img col-6"><img class="side-img" src="<?php echo ROOT_URL. "assets/img/login-img.jpg" ?>" alt=""></div>
		<div class="main_text col-6 col--center">
			<h2>Fill the fields to enter the site</h2>
			<?php Messages::displayMessage(); ?>
			<form id="form-login" action="<?php //echo $_SERVER['PHP_SELF']; ?>" method="post">
				<input type="email" name="email"  id="email" placeholder="sophie@example.com">
				<input type="password" name="password"  id="passwd" placeholder="Password">
				<input type="hidden" name="submit" value="true">
				<input id="submit" class="login" type="submit" value="Login">
				<span class="form-login__or-register">or <a href="<?php echo ROOT_URL. "users/register" ?>">Register</a></span>
			</form>
		</div>
	</div>
</div>
<script src="<?php echo ROOT_URL; ?>assets/js/login_form.js"></script>