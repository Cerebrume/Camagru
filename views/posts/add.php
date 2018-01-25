
<div class="content">
	<div class="wrapper">
		<div class="row">
			<div class="col-6">
				<div class="camera-canvas">
					<video id="video" width="640" height="480" autoplay></video>
					<canvas id="canvas" width="640" height="480"></canvas>
				</div>
			</div>
			<div class="post-add col-6">
					<input class="post-add__file" type="file" name="file" id="file" accept=".png, .jpg, .jpeg">
					<label for="desc">Comment:</label>
					<textarea class="post-add__comment" style="resize:none;" name="desc" id="desc" cols="20" rows="3" maxlength="70"></textarea>
					<button class="post-add__snap" id="snap">Snap Photo</button>
			</div>
			
			
		</div>
	</div>
</div>

<script src="<?php echo ROOT_URL; ?>assets/js/app.js"></script>
<script src="<?php echo ROOT_URL; ?>assets/js/filters.js"></script>