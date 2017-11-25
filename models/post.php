<?php

class PostModel extends Model{
	public function Index(){
		$this->query('SELECT * FROM posts ORDER BY post_date DESC');
		$rows = $this->resultSet();
		return $rows;
	}

	public function add() {
		//if ($_SESSION['is_logged_in'] != True) return;
		$post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
		//print_r($post);
		//echo $_SESSION['login'];
		//print_r($post);
		if (isset($post['img']) && $_SESSION['is_logged_in']) {
			$this->query('INSERT INTO posts (title, post_user, img ) VALUES(\'test\', :user, :img)');
			$this->bind(":user", "user");
			$this->bind(":img", $post['img']);
			$this->execute();
			if($this->stmt->lastInsertId()) {
				echo "Good job";
				return;
			}
			
		}
		
		return ;
	}
}