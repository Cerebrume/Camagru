
<div class="content">
	<div class="wrapper">
		<div class="row--gatters row--space_around">
			<?php foreach($viewmodel as $item) : ?>
				<div class="share col-6 ">
					<h3 class="share_user"><?php echo $item['post_user']; ?></h3>
					<img class="share_img" src=<?php echo $item['img']; ?> alt="" srcset="">
					<p class="share_desc"><span class="share_user-desc"><?php echo $item['post_user']; ?></span> <?php echo $item['post_desc']; ?></p>
					<small class="share_date"><?php echo $item['post_date']; ?></small>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>
