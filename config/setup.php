<?php
	include('database.php');
	try {
		$db = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "CREATE DATABASE IF NOT EXISTS CAMAGRU;";
		$sql .= "use CAMAGRU;";
		$sql .= ("CREATE TABLE IF NOT EXISTS USERS (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			login VARCHAR(255) NOT NULL,
			email VARCHAR(255),
			password VARCHAR(128),
			reg_date TIMESTAMP
		);");
		$db->exec($sql);
		$sql .= ("CREATE TABLE IF NOT EXISTS POSTS (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			post_user VARCHAR(255) NOT NULL,
			post_desc VARCHAR(255),
			img longtext,
			post_date TIMESTAMP
		);");
		$db->exec($sql);
		$sql = ("CREATE TABLE IF NOT EXISTS COMMENTS (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			comment_user VARCHAR(255) NOT NULL,
			comment_desc VARCHAR(255),
			comment_post_id INT(6),
			comment_date TIMESTAMP
		);");
		$db->exec($sql);
	} catch (PDOException $e) {
		echo '1Connection failed: ' . $e->getMessage();
	}
	$db = NULL;
?>