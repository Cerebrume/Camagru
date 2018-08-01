<?php
class PostModel extends Model{
	public function Index(){
		if (!$_SESSION['is_logged_in']) {
			header("Location: ". ROOT_URL);
		}
		$page = isset($_GET['id']) !== 0 ? (int)$_GET['id'] : 0;
		$per_page = 6;
		$_GET['id'] = htmlentities($_GET['id']);
		if(isset($_GET['id']) && is_numeric($_GET['id'])) {
			$page = $_GET['id'];
		}
		$page = $page * $per_page;
		$offset = $page + $per_page;
		$this->query("SELECT * FROM posts ORDER BY post_date DESC LIMIT $per_page OFFSET $offset");
		$rows = $this->resultSet();
		$this->query('SELECT COUNT(*) AS COUNT_POSTS FROM posts');
		$num_pages = $this->single();
		$pages = round($num_pages["COUNT_POSTS"] / $per_page, 0, PHP_ROUND_HALF_DOWN);
		return array("posts" => $rows, "num_pages" => $pages, "page" => $page);
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

	public function notify($whatHappened, $comment_user, $comment_desc, $post_id) {
		try {
			$this->query('SELECT * FROM posts WHERE id=:post_id');
			$this->bind(":post_id", $post_id);
			$rows = $this->single();
			$user = $rows['post_user'];
			$this->query('SELECT * FROM users WHERE login=:username');
			$this->bind(":username", $user);
			$user_data = $this->single();
			$user_email = $user_data['email'];
			if (!$user_data['isReceiveNotifications']) {
				return;
			}
			if ($comment_user === $user_data['login']) {
				return;
			}
		} catch (PDOException $e) {
			return $arrayName = array('Connection failed:' => $e->getMessage());
		}
		$encoding = "utf-8";
		// Set preferences for Subject field
		$subject_preferences = array(
			"input-charset" => $encoding,
			"output-charset" => $encoding,
			"line-length" => 76,
			"line-break-chars" => "\r\n"
		);
		$from_name = 'Camagru';
		$from_mail = 'noreply@Camagru.com';
		$mail_subject = iconv_mime_encode("Subject", "Notification", $subject_preferences);;
		// Set mail header
		$header = "Content-type: text/html; charset=".$encoding." \r\n";
		$header .= "From: ".$from_name." <".$from_mail."> \r\n";
		$header .= "MIME-Version: 1.0 \r\n";
		$header .= "Content-Transfer-Encoding: 8bit \r\n";
		$header .= "Date: ".date("r (T)")." \r\n";
		$header .= iconv_mime_encode("Subject", $mail_subject, $subject_preferences);
		$mail_message = '
		<html>
			<body>
			<h1>'. $whatHappened . '</h1>
			<p>'. $comment_user . ' said: ' . $comment_desc . '</p>';

		$mail_message .= '</body></html>';
		// Send mail
		if (isset($user_email)) {
			$mailSent = mail($user_email, $mail_subject, $mail_message, $header);
		}
		$arrayName = array('notify' => true, "mail_sent" => $mailSent, "user" => $user_data);
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
				$added = $this->execute();
				if ($added) {
					$this->notify("Someone commented your post!", $_SESSION['user_data']['login'], $post['comment_desc'], $post['comment_post_id']);
				}
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
			if (!$post['submit_like']) return array('Added' => false);
			try {
				$this->query('INSERT INTO likes (like_user, like_post_id) SELECT * FROM (SELECT :user, :post_id) AS tmp WHERE NOT EXISTS (SELECT like_user, like_post_id FROM likes WHERE like_user = :user and like_post_id = :post_id) LIMIT 1');
				$this->bind(":user", $_SESSION['user_data']['login']);
				$this->bind(":post_id", $post['post_id']);
				$this->execute();
				return array('Added' => true);
			} catch (PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
			}
		}
		return array('Added' => false);
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
		return array("Likes" => null);
	}

	public function deletePost() {
		if ($_SESSION['is_logged_in']) {
			$post = json_decode(file_get_contents('php://input'), true);
			if (!$post['deletePost']) return array('Delete' => false);
			try {
				$this->query('DELETE FROM posts WHERE id=:post_id AND post_user=:username');
				$this->bind(':post_id', $post['postId']);
				$this->bind(':username', $_SESSION['user_data']['login']);
				$deleted = $this->execute();
				return array("Deleted" => true);
			} catch (PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
			}
		}
		return array("Deleted" => false);
	}
}