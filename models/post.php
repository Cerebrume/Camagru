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
		//print_r($_SESSION);
		
		if (isset($post['submit_img']) && $_SESSION['is_logged_in']) {
			print_r($_SESSION);
			$this->query('INSERT INTO posts (title, post_user, img) VALUES(:title, :user, :img)');
			$this->bind(":title", $_SESSION['user_data']['id']);
			$this->bind(":user", $_SESSION['user_data']['login']);
			$this->bind(":img", $post['img'], PDO::PARAM_LOB);
			
			$this->execute();
			
			if ($this->dbh->lastInsertId()) {
				header('Location: '.ROOT_URL.'posts/');
			}
		}
		
		
		return ;
	}
}