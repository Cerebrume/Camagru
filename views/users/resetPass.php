<div class="container-fluid">
	<div class="row justify-content-center align-items-center">
		<div class="img col-3"><img class="side-img" src="<?php echo ROOT_URL. "assets/img/login-img.jpg" ?>" alt=""></div>
		<div class="main_text offset-1 col-3">
			<h2>Fill the fields to cahnge your password</h2>
			<form id="form-forgot" name="resetPass" method="post">
                <div class="input-group input-group-lg">
                    <div class="input-group">
                        <input type="password" class="form-control" id="newPasswd" placeholder="New password">
                    </div>
                    <div class="input-group">
                        <input type="password" class="form-control" id="newPasswdConfirm" placeholder="New password again">
                        <div class="invalid-feedback invalid-feedback-newPass">
                            Invalid values. Password sholud contain at least 3 uppercase, 3 lowercase letters and numbers. Passwords should match.
                        </div>
                    </div>
                </div>
                <input type="hidden" name="forgotPassword" value="true">
                <div class="btn-group btn-group-lg" role="group">
                    <input id="submit-changePass" class="login-btn btn btn-primary btn-lg" type="submit" value="Change password">
                </div>
			</form>
		</div>
	</div>
</div>
<script src="<?php echo ROOT_URL; ?>assets/js/forgotpass_change.js"></script>