
<div class="content">

	<div class="wrapper">
		<div class="row">
			<div class="col-6">
				<div class="camera-canvas">
					<video id="video" width="640" height="480" autoplay></video>
					
					<canvas id="canvas" width="640" height="480"></canvas>
				</div>
			</div>
			<div class="col-6">
				<form action="" method="post">
					<input type="file" name="file" id="file">
					<label for="desc">Comment:</label>
					<textarea style="resize:none;" name="desc" id="desc" cols="20" rows="3" maxlength="70"></textarea>
					<button id="snap">Snap Photo</button>
				</form>
				
			</div>
			
			
		</div>
	</div>
</div>

<script src="<?php echo ROOT_URL; ?>assets/js/app.js"></script>
<script src="<?php echo ROOT_URL; ?>assets/js/filters.js"></script>