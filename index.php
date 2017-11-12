<?php
	require_once('config/setup.php');

	require_once('Classes/Bootstrap.php');
	require_once('Classes/Controller.php');
	require_once('Classes/Model.php');

	require_once('Controllers/home.php');
	require_once('Controllers/posts.php');
	require_once('Controllers/users.php');

	require_once('Models/home.php');
	require_once('Models/post.php');
	require_once('Models/user.php');

	$bootstrap = new Bootstrap($_GET);
	$controller = $bootstrap->createController();
	if($controller){
		$controller->executeAction();
	}
?>