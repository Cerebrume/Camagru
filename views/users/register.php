<div class="container-fluid">
	<div class="row justify-content-center align-items-center">
		<div class="img col-3"><img class="side-img" src="<?php echo ROOT_URL; ?>assets/img/register-img.jpg" alt=""></div>
		<div class="main_text offset-1 col-3">
			<h2>Fill the fields for registration</h2>
			<?php Messages::displayMessage(); ?>
			<form id="form-register" name="register" action="<?php //echo $_SERVER['PHP_SELF']; ?>" method="post">
			<div class="input-group input-group-lg">
				<div class="input-group-prepend">
					<div class="input-group-text"><img class="input-prepend" src="<?php echo ROOT_URL. "/assets/img/login-icon.png" ?>" alt=""></div>
				</div>
				<input class="form-control" type="text" name="login" id="login" placeholder="Sophie">
				<div class="invalid-feedback invalid-feedback-login">
					Username should be at least 6 chars but not > 26
				</div>
			</div>
			<div class="input-group input-group-lg">
				<div class="input-group-prepend">
					<div class="input-group-text"><img class="input-prepend" src="<?php echo ROOT_URL. "/assets/img/mail-icon.png" ?>" alt=""></div>
				</div>
				<input class="form-control" type="email" name="email"  id="email" placeholder="sophie@example.com">
				<div class="invalid-feedback invalid-feedback-email">
					Enter valid email adress
				</div>
			</div>
			<div class="input-group input-group-lg">
				<div class="input-group-prepend">
					<div class="input-group-text"><img class="input-prepend" src="<?php echo ROOT_URL. "/assets/img/lock-icon.png" ?>" alt="lock"></div>
				</div>
				<input class="form-control" type="password" name="password"  id="passwd" placeholder="Password">
				<div class="invalid-feedback invalid-feedback-password">
					Password sholud contain at least 3 uppercase, 3 lowercase letters and numbers
				</div>
			</div>
			<input type="hidden" name="submit" value="true">
			<input id="submit-register" class="register" type="submit" value="Register">
			</form>
		</div>
	</div>
</div>
<script src="<?php echo ROOT_URL; ?>assets/js/register_form.js"></script>



