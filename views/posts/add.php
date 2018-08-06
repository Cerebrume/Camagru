
<div class="container-fluid no-select">
	<div class="row justify-content-center">
		<div class="col-5">
			<div class="camera-canvas">
				<video id="video" width="480" height="480" autoplay></video>
				<canvas id="canvas" width="480" height="480"></canvas>
				<div class="camera-images container-fluid">
					<div class="row">
						<div class="col-2">
							<img class="face-preset" src="<?php echo ROOT_URL; ?>assets/img/preset2-img.png" alt="" srcset="">
						</div>
						<div class="col-2">
							<img class="face-preset" src="<?php echo ROOT_URL; ?>assets/img/preset3-img.png" alt="" srcset="">
						</div>
						<div class="col-2">
							<img class="face-preset" src="<?php echo ROOT_URL; ?>assets/img/preset4-img.png" alt="" srcset="">
						</div>
						<div class="col-2">
							<img class="face-preset" src="<?php echo ROOT_URL; ?>assets/img/preset5-img.png" alt="" srcset="">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="post-add col-5">
			<h3 class="file-h3">CHOSE PHOTO FROM FOLDER:</h3>
				<input class="post-add__file" type="file" name="file" id="file" accept=".png, .jpg, .jpeg">
				<h3 class="comment-h3">YOUR COMMENT:</h3>
				<textarea class="post-add__comment" style="resize:none;" name="desc" id="desc" cols="20" rows="3" maxlength="70"></textarea>
				<button class="post-add__snap" id="snap">Snap Photo</button>
		</div>
	</div>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        .asdasdasdasd
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<!-- <script src="<?php echo ROOT_URL; ?>assets/js/app.js"></script> -->
<script src="<?php echo ROOT_URL; ?>assets/js/canvas.js"></script>
