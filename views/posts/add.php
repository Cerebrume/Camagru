<div class="container-fluid no-select">
	<div class="row justify-content-center">
		<div class="col-xl-5 col-lg-6 col-md-12">
			<div class="camera-canvas d-flex flex-column align-items-center justify-content-center">
				<video id="video" width="480px" height="480px" autoplay></video>
				<canvas id="canvas" width="480px" height="480px"></canvas>
				<div class="camera-images container">
					<div class="row justify-content-center">
						<div class="col-4 col-sm-3">
							<img class="face-preset" src="<?php echo ROOT_URL; ?>assets/img/preset2-img.png" alt="" srcset="">
						</div>
						<div class="col-4 col-sm-3">
							<img class="face-preset" src="<?php echo ROOT_URL; ?>assets/img/preset3-img.png" alt="" srcset="">
						</div>
						<div class="col-4 col-sm-3">
							<img class="face-preset" src="<?php echo ROOT_URL; ?>assets/img/preset4-img.png" alt="" srcset="">
						</div>
						<div class="col-4 col-sm-3">
							<img class="face-preset" src="<?php echo ROOT_URL; ?>assets/img/preset5-img.png" alt="" srcset="">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="post-add d-flex flex-column align-items-start col-xl-3 col-lg-3 col-md-10 col-sm-10 col-10">
			<h3 class="file-h3">Chose photo from folder:</h3>
			<div class="input-group mb-3">
				<div class="custom-file">
					<input type="file" class="post-add__file custom-file-input" id="file" name="file" accept=".png, .jpg, .jpeg">
					<label class="custom-file-label" for="inputGroupFile01">Choose file</label>
				</div>
			</div>
			<div class="input-group">
			<button type="button" class="btn btn-outline-secondary removeImg">Remove img</button>
				</div>

				<h3 class="comment-h3">Add comment:</h3>
				<div class="input-group">
					<textarea class="form-control post-add__comment" aria-label="With textarea" maxlength="50"></textarea>
				</div>
				<button class="post-add__snap btn btn-primary mt-3" id="snap">Snap Photo</button>
		</div>
	</div>
</div>

<div class="modal fade container-fluid" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">That's how it'll looks.</h5>
        <button type="button" class="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body d-flex flex-column">
				<div class="preview-img-container">
        	<img class="preview-img" alt="preview" width="100%">
				</div>
				<div class="preview-comment">
					<span>
						<b><?php echo $_SESSION['user_data']['login']; ?>:</b>
						<span class="preview-comment-text"></span>
					</span>
				</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary closeBtn">Close</button>
        <button type="button" class="btn btn-primary shareBtn">Share picture</button>
      </div>
    </div>
  </div>
</div>

<!-- <script src="<?php echo ROOT_URL; ?>assets/js/app.js"></script> -->
<script src="<?php echo ROOT_URL; ?>assets/js/canvas.js"></script>
