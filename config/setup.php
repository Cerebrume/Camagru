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
			reg_date TIMESTAMP
		);");
		$db->exec($sql);
		$sql .= ("CREATE TABLE IF NOT EXISTS POSTS (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(255) NOT NULL,
			img VARCHAR(255),
			post_date TIMESTAMP
		);");
		$db->exec($sql);
	} catch (PDOException $e) {
		echo '1Connection failed: ' . $e->getMessage();
	}
	$db = NULL;
?>