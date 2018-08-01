
<div class="container-fluid">
	<div class="row justify-content-center">
			<?php echo var_dump($viewmodel) ?>
			<?php foreach($viewmodel['posts'] as $item) : ?>
				<div class="share col-4" post-id=<?php echo $item['id']; ?>>
					<h3 class="share_user"><?php echo $item['post_user']; ?></h3>
					<?php if ($_SESSION['user_data']['login'] == $item['post_user']) : ?>
						<div>
							<button
								post-id=<?php echo $item['id']; ?>
								class="delete_post btn btn-outline-danger btn-sm"
							>
								Delete Post
							</button>
						</div> 
					<?php endif	?>
					<img class="share_img" src=<?php echo $item['img']; ?> alt="">
					<div class="share_like">
						<svg post-id=<?php echo $item['id']; ?> class="like" enable-background="new 0 0 48 48" version="1.1" viewBox="0 0 50 60" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Expanded"><g><path d="M24,47.001c-0.173,0-0.346-0.045-0.501-0.135c-0.239-0.138-5.913-3.447-11.678-8.778C3.977,30.835,0,23.668,0,16.787    c0-9.275,6.279-13.5,12.113-13.5c4.499,0,9.53,2.572,11.887,8.229c2.357-5.657,7.389-8.229,11.887-8.229    C41.721,3.287,48,7.512,48,16.787c0,6.881-3.977,14.048-11.821,21.301c-5.765,5.331-11.439,8.641-11.678,8.778    C24.346,46.956,24.173,47.001,24,47.001z M12.113,5.287C7.242,5.287,2,8.886,2,16.787C2,30.65,20.674,42.783,24,44.833    c3.323-2.051,22-14.193,22-28.046c0-7.901-5.242-11.5-10.113-11.5c-4.473,0-9.58,3.062-10.905,9.903C24.891,15.66,24.479,16,24,16    s-0.891-0.34-0.982-0.81C21.693,8.35,16.586,5.287,12.113,5.287z"/></g></g></svg>
						<span post-id=<?php echo $item['id']; ?> class="likes_count"></span>
					</div>
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

						<input class="btn btn-primary brn-sm btn-submit-comment" type="button" value="Comment" post-id=<?php echo $item['id']; ?>>
					</div>
					<small class="share_date"><?php echo $item['post_date']; ?></small>
				</div>
			<?php endforeach; ?>
	</div>
	<div class="row justify-content-center">
			<ul data-num-pages="<?php echo $viewmodel['num_pages']; ?>" class="pagination">
			</ul>
	</div>
</div>

<script src="<?php echo ROOT_URL; ?>assets/js/pagination.js"></script>
<script src="<?php echo ROOT_URL; ?>assets/js/delete_post.js"></script>
<script src="<?php echo ROOT_URL; ?>assets/js/add_comment.js"></script>
<script src="<?php echo ROOT_URL; ?>assets/js/add_like.js"></script>
<script src="<?php echo ROOT_URL; ?>assets/js/getComments.js"></script>
<script src="<?php echo ROOT_URL; ?>assets/js/getLikes.js"></script>