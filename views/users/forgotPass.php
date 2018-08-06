<div class="container-fluid">
	<div class="row justify-content-center align-items-center">
		<div class="img col-3"><img class="side-img" src="<?php echo ROOT_URL. "assets/img/login-img.jpg" ?>" alt=""></div>
		<div class="main_text offset-1 col-3">
			<h2>Fill the fields to reset your password</h2>
			<form id="form-forgot" name="resetPass" method="post">
                <div class="input-group input-group-lg">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><img class="input-prepend" src="<?php echo ROOT_URL. "/assets/img/mail-icon.png" ?>" alt=""></div>
                    </div>
                    <input class="form-control" type="email" name="email"  id="email" placeholder="sophie@example.com">
                    <div class="valid-feedback valid-feedback-resetPass">
                        Looks good! Check your email!.
                    </div>
                    <div class="invalid-feedback invalid-feedback-email">
                        Enter valid login. For example vasya@gmail.com.
                    </div>
                </div>
                <input type="hidden" name="forgotPassword" value="true">
                <div class="btn-group btn-group-lg" role="group">
                    <input id="submit-reset" class="login-btn btn btn-primary btn-lg" type="submit" value="Reset">
                </div>
			</form>
		</div>
	</div>
</div>
<script src="<?php echo ROOT_URL; ?>assets/js/reset_pass.js"></script>