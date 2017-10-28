<?php
	require_once('database.php');
	
	try {
		$db = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
		 $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "CREATE DATABASE IF NOT EXISTS CAMAGRU;";
		$sql .= "use CAMAGRU;";
		$sql .= ("CREATE TABLE IF NOT EXISTS USERS (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			login VARCHAR(30) NOT NULL,
			email VARCHAR(50),
			reg_date TIMESTAMP
		);");
		$db->exec($sql);
		echo "SUCCESS";
	} catch (PDOException $e) {
		echo 'Connection failed: ' . $e->getMessage();
	}
	$db = NULL;
?>