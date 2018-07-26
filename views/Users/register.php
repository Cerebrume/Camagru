<div class="wrapper">
	<div class="row">
		<div class="img col-6"><img class="side-img" src="<?php echo ROOT_URL; ?>assets/img/register-img.jpg" alt=""></div>
		<div class="main_text col-6 col--center">
			<h2>Fill the fields for registration</h2>
			<?php Messages::displayMessage(); ?>
			<form id="form-register" action="<?php //echo $_SERVER['PHP_SELF']; ?>" method="post">
				<input type="text" name="login" id="login" placeholder="Sophie">
				<input type="email" name="email"  id="email" placeholder="sophie@example.com">
				<input type="password" name="password"  id="passwd" placeholder="Password">
				<input type="hidden" name="submit" value="true">
				<input id="submit" class="register" type="submit" value="Register">
			</form>
		</div>
	</div>
</div>
<script src="<?php echo ROOT_URL; ?>assets/js/register_form.js"></script>



