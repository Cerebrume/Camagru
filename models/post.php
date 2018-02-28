<?php
class PostModel extends Model{
	public function Index(){
		$this->query('SELECT * FROM posts ORDER BY post_date DESC');
		$rows = $this->resultSet();
		return $rows;
	}

	public function add() {

		$post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
		
		if ($_SESSION['is_logged_in']) {
			
			if (isset($post['submit_img'])) {				
				try {
					$this->query('INSERT INTO posts (post_user, post_desc, img) VALUES(:user, :title, :img)');
					$this->bind(":title", $post['desc']);
					$this->bind(":user", $_SESSION['user_data']['login']);
					$this->bind(":img", $post['img'], PDO::PARAM_LOB);
					$this->single();
				} catch (PDOException $e) {
					echo 'Connection failed: ' . $e->getMessage();
				}
				
				
				if ($this->dbh->lastInsertId()) {
					header('Location: '.ROOT_URL.'posts/');
				}
			}
			
		}
		else {
			header("Location: ". ROOT_URL);
			return;
		}
		
		
		return ;
	}

}