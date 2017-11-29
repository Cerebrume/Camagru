<div class="wrapper">
	<?php foreach($viewmodel as $item) : ?>
		<div class="well">
			<h3><?php echo $item['title']; ?></h3>
			<img src=<?php echo $item['img']; ?> alt="" srcset="">
			<small><?php echo $item['post_date']; ?></small>
			
		</div>
	<?php endforeach; ?>
</div>