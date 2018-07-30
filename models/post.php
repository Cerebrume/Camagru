<?php
class PostModel extends Model{
	public function Index(){
		if (!$_SESSION['is_logged_in']) {
			header("Location: ". ROOT_URL);
		}
		$page = isset($_GET['id']) ? (int)$_GET['id'] : 0;
		$per_page = 6;
		$_GET['id'] = htmlentities($_GET['id']);
		if(isset($_GET['id']) && is_numeric($_GET['id'])) {
			$page = $_GET['id'];
		}
		$page = $page * $per_page;
		$offset = $page + $per_page;
		$this->query("SELECT * FROM posts ORDER BY post_date DESC LIMIT $page,$offset");
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

	public function comment() {
		
		if ($_SESSION['is_logged_in']) {
			$post = json_decode(file_get_contents('php://input'), true);
			if (!$post['submit']) return;
			try {
				$this->query('INSERT INTO comments (comment_user, comment_desc, comment_post_id) VALUES(:user, :post_desc, :id)');
				$this->bind(":user", $_SESSION['user_data']['login']);
				$this->bind(":post_desc", $post['comment_desc']);
				$this->bind(":id", $post['comment_post_id']);
				$rows = $this->execute();
				return  $arrayName = array('Added' => true);
			} catch (PDOException $e) {
				return $arrayName = array('Connection failed:' => $e->getMessage());
			}
		}
		return;
	}

	public function getcomments() {
		if ($_SESSION['is_logged_in']) {
			try {
				$this->query('SELECT * FROM comments ORDER BY comment_date ASC');
				$rows = $this->resultSet();
				return $rows;
			} catch (PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
			}
		}
		
	}

	public function like() {
		if ($_SESSION['is_logged_in']) {
			$post = json_decode(file_get_contents('php://input'), true);
			if (!$post['submit_like']) return;
			try {
				$this->query('INSERT INTO likes (like_user, like_post_id) SELECT * FROM (SELECT :user, :post_id) AS tmp WHERE NOT EXISTS (SELECT like_user, like_post_id FROM likes WHERE like_user = :user and like_post_id = :post_id) LIMIT 1');
				$this->bind(":user", $_SESSION['user_data']['login']);
				$this->bind(":post_id", $post['post_id']);
				$this->execute();
				return $arrayName = array('Added' => true);
			} catch (PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
			}
			return "liked";
		}
	}

	public function getLikes() {
		if ($_SESSION['is_logged_in']) {
			try {
				$this->query('SELECT * FROM likes;');
				$rows = $this->resultSet();
				return $rows;
			} catch (PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
			}
		}
		
	}
}