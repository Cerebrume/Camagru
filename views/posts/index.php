
<div class="content">
	<div class="wrapper">
		<div class="row--gatters row--space_around">
			<?php foreach($viewmodel as $item) : ?>
				<div class="share col-6 ">
					<h3 class="share_user"><?php echo $item['post_user']; ?></h3>
					<img class="share_img" src=<?php echo $item['img']; ?> alt="" srcset="">
					<p class="share_desc">
					<?php if (strlen($item['post_desc']) > 0) : ?>
							<span class="share_user-desc"><?php echo $item['post_user']. ":"; ?></span>
							<?php echo $item['post_desc']; ?>
					<?php endif ?>
					</p>
					<div class="comments">
						
					</div>
					<div class="comment">
						
						<textarea name="comment" style="resize:none;" maxlength="200" id=<?php $id = $item['id']."-post__comment"; echo $id;?>></textarea>

						<input class="post__add-comment" type="button" value="comment" post-id=<?php echo $item['id']; ?>>
					</div>
					<small class="share_date"><?php echo $item['post_date']; ?></small>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>

<script src="<?php echo ROOT_URL; ?>assets/js/add_comment.js"></script>