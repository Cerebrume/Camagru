<div class="container">
    <div class="row justify-content-center">
        <div class="col-8">
            <div class="card text-center">
                <div class="card-header">
                    User profile info
                </div>
                <div class="card-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 mb-3 mt-3">
                                <h5 class="card-title">Your login:
                                    <b>
                                        <?php echo $_SESSION['user_data']['login']?>
                                    </b>
                                </h5>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="New login" id="newLogin">
                                    <div class="invalid-feedback invalid-feedback-newLogin">
                                        Login should be at least 6 symbols.
                                    </div>
                                    <div class="valid-feedback valid-feedback-newLogin">
                                        Looks good! Login changed.
                                    </div>
                                </div>
                                <a id="cangeLogin" class="btn btn-primary text-light" onclick="return changeLogin()">Change Login</a>
                            </div>
                            <div class="col-12 mb-3 mt-3">
                                <h5 class="card-title">Your Email:
                                    <b>
                                        <?php echo $_SESSION['user_data']['email']?>
                                    </b>
                                </h5>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="New email">
                                </div>
                                <a href="#" id="cangeEmail" class="btn btn-primary">Change Email</a>
                            </div>
                            <div class="col-12 mb-3 mt-3">
                                <h5 class="card-title">Change Password:</h5>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="currentPasswd" placeholder="Current password">
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="newPasswd" placeholder="New password">
                                </div>
                                <a id="cangeLogin" class="btn btn-primary">Change Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?php echo ROOT_URL; ?>assets/js/profile.js"></script>