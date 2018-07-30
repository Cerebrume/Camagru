<div class="container">
    <div class="row justify-content-center">
        <div class="col-8">
        <div class="card text-center">
            <div class="card-header bg-info">
                User profile info
            </div>
            <div class="card-body">
                <h5 class="card-title">Your login: <?php echo $_SESSION['user_data']['login']?></h5>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
                <a href="#" id="cangeLogin" class="btn btn-primary">Change Login</a>
            </div>
        </div>
        </div>
        <div class="col-12 bg-info">
            
            
        </div>
        <div class="col-12 bg-info">
            Your email: <?php echo $_SESSION['user_data']['email']?>
        </div>

    </div>
</div>