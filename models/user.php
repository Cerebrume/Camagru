<?php
class UserModel extends Model{
	public function sendVerifMail($email, $login) {
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
		$mail_subject = iconv_mime_encode("Subject", "Verif your acc", $subject_preferences);;
		// Set mail header
		$header = "Content-type: text/html; charset=".$encoding." \r\n";
		$header .= "From: ".$from_name." <".$from_mail."> \r\n";
		$header .= "MIME-Version: 1.0 \r\n";
		$header .= "Content-Transfer-Encoding: 8bit \r\n";
		$header .= "Date: ".date("r (T)")." \r\n";
		$header .= iconv_mime_encode("Subject", $mail_subject, $subject_preferences);

		$bytes = openssl_random_pseudo_bytes(32);
		$hash = bin2hex($bytes);// password_hash($mail . $login, PASSWORD_BCRYPT);
		$mail_message = '
		<html>
			<body>
			<h1>Thanks for signing up!</h1>
		<h2>Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below.</h2>
		<pre> 
		------------------------
		Username: '.$login.'
		Password: password is secure information
		------------------------
		</pre>
		Please click this link to activate your account: ';
		$mail_message .= 'http://localhost' . ROOT_URL . 'users/verify/'.$hash;
		$mail_message .= '</body></html>';
		try {
			$this->query('INSERT INTO verification (login_user, verificationCode) VALUES(:login_user, :verificationCode)');
			$this->bind(":login_user", $login);
			$this->bind(":verificationCode", $hash);
			$this->execute();
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		// Send mail	
		$mailSent = mail($email, $mail_subject, $mail_message, $header);
		if ($mailSent) {
			Messages::setMessage("Check your mail for varification.", "success");
			header("Location: ". ROOT_URL. "users/login");
		}
		else {
			Messages::setMessage("Error sending varification email" . $mailSent, "error");
		}
	}

	public function register() {

		if (isset($_SESSION['is_logged_in'])) {
			header("Location: ". ROOT_URL. "posts");
		}
		$post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
		$passwd = password_hash($post['password'], PASSWORD_BCRYPT);
		if ($post['submit']) {
			

			$this->query('SELECT login FROM users WHERE login=:login');
			$this->bind(":login", $post['login']);
			
			if ($this->resultSet()) {
				Messages::setMessage("User with this login already exist", "error");
				return ;
			}
			$this->query('SELECT email FROM users WHERE email=:email');
			$this->bind(":email", $post['email']);
			if ($this->resultSet()) {
				Messages::setMessage("User with this email already exist", "error");
				return ;
			}

			$this->query('INSERT INTO users (login, email, password) VALUES(:login, :email, :password)');
			$this->bind(":login", $post['login']);
			$this->bind(":email", $post['email']);
			$this->bind(":password", $passwd);
			
			$this->execute();
			if ($this->dbh->lastInsertId()) {
				// send verif mail
				$this->sendVerifMail($post['email'], $post['login']);
			}
		}
		
		return;
	}

	public function login() {
		if (isset($_SESSION['is_logged_in'])) {
			header("Location: ". ROOT_URL. "posts");
		}
		$post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

		if ($post['submit']) {
			$this->query('SELECT * FROM users WHERE email=:email');
			$this->bind(":email", $post['email']);
			$this->execute();
			$result = $this->stmt->fetch(PDO::FETCH_ASSOC);
			$isPasswordCorrect = password_verify($_POST['password'], $result['password']);
			if ($result['isActivated'] !== '1') {
				Messages::setMessage("Verify your account.", "error");
			}
			else if ($isPasswordCorrect && $result) {
				$_SESSION['is_logged_in'] = true;
				$_SESSION['user_data'] = array(
					"id"	=> $result['id'],
					"login"	=> $result['login'],
					"email"	=> $result['email'],
					"notif" => $result['isReceiveNotifications']
				);
				header('Location: '.ROOT_URL.'posts');
			} else {
				Messages::setMessage("No such user found", "error");
			}
		}
		return;
	}

	public function verify() {
		$get = filter_input_array(INPUT_GET, FILTER_SANITIZE_STRING);
		if (isset($get['id'])) {
			try {
				$this->query('SELECT * FROM verification WHERE verificationCode=:id');
				$this->bind(":id", $get['id']);
				$this->execute();
				$result = $this->single();
				if ($result) {

					$this->query('UPDATE users SET isActivated=1 WHERE `login`=:username');
					$this->bind(":username", $result['login_user']);
					$this->execute();
					Messages::setMessage("Email verification completed", "success");
					header("Location: ". ROOT_URL. "users/login");
				}
				else {
					Messages::setMessage("Error while verification account", "error");
					header("Location: ". ROOT_URL. "users/register");
				}
				return;
			}
			catch (PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
			}
		}
		Messages::setMessage("Please verify your account before you can use it.", "success");
		header("Location: ". ROOT_URL. "users/login");
		return;
	}

	public function changeLogin() {
		if (!isset($_SESSION['is_logged_in'])) {
			header("Location: ". ROOT_URL. "users");
		}
		$post = json_decode(file_get_contents('php://input'), true);
		if (isset($post['newLogin']) && isset($post['changeLogin'])) {
			try {
				$this->query('UPDATE users SET login=:newLogin WHERE `login`=:currentLogin');
				$this->bind(":newLogin", $post['newLogin']);
				$this->bind(":currentLogin", $_SESSION['user_data']['login']);
				$this->execute();
				$result = $this->execute();
				$this->query('UPDATE likes SET like_user=:newLogin WHERE like_user=:currentLogin');
				$this->bind(":newLogin", $post['newLogin']);
				$this->bind(":currentLogin", $_SESSION['user_data']['login']);
				$result = $this->execute();
				$this->query('UPDATE comments SET comment_user=:newLogin WHERE comment_user=:currentLogin');
				$this->bind(":newLogin", $post['newLogin']);
				$this->bind(":currentLogin", $_SESSION['user_data']['login']);
				$result = $this->execute();

				$_SESSION['user_data']['login'] = $post['newLogin'];
				return $arrayName = array('Changed' => true);
			}
			catch (PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
				return $arrayName = array('Changed' => false);
			}
		}
	}

	public function changeEmail() {
		if (!isset($_SESSION['is_logged_in'])) {
			header("Location: ". ROOT_URL. "users");
		}
		$post = json_decode(file_get_contents('php://input'), true);
		if (isset($post['newEmail']) && isset($post['changeEmail'])) {
			try {
				$this->query('UPDATE users SET email=:newEmail WHERE email=:currentEmail');
				$this->bind(":newEmail", $post['newEmail']);
				$this->bind(":currentEmail", $_SESSION['user_data']['email']);
				$this->execute();
						
				$_SESSION['user_data']['email'] = $post['newEmail'];
				return $arrayName = array('Changed' => true);
			}
			catch (PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
				return $arrayName = array('Changed' => false);
			}
		}
	}

	public function changePassword() {
		if (!isset($_SESSION['is_logged_in'])) {
			header("Location: ". ROOT_URL. "users");
		}
		$post = json_decode(file_get_contents('php://input'), true);
		if (isset($post['changePassword'])
			&& isset($post['currentPassword'])
			&& isset($post['newPassword'])) {
			try {
				$this->query('SELECT * FROM users WHERE `login`=:username');
				$this->bind(":username", $_SESSION['user_data']['login']);
				$result = $this->single();
				$isPasswordCorrect = password_verify($post['currentPassword'], $result['password']);
				if ($result && $isPasswordCorrect) {
					$passwd = password_hash($post['newPassword'], PASSWORD_BCRYPT);
					/* $this->query('UPDATE users SET `password`=:newPassword WHERE `login`=:username');
					$this->bind(":newPassword", $passwd);
					$this->bind(":username", $_SESSION['user_data']['login']); */
					$this->query('UPDATE users SET password=:newPassword WHERE id=:username');
					$this->bind(":newPassword", $passwd);
					$this->bind(":username", $result['id']);

					$this->execute();
					return $arrayName = array('Changed' => true);
				}
			}
			catch (PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
				return $arrayName = array('Changed' => false);
			}
		}
		return $arrayName = array('Changed' => false);
	}

	public function changeNotif() {
		if (!isset($_SESSION['is_logged_in'])) {
			header("Location: ". ROOT_URL. "users");
		}

		$post = json_decode(file_get_contents('php://input'), true);
		if (isset($post['changeNotif']) && isset($post['value'])) {
			try {
				$value = $post['value'] === true ? '1' : '0';
				$this->query('UPDATE users SET isReceiveNotifications=:notifVal WHERE id=:id');
				$this->bind(":notifVal", $value);
				$this->bind(":id", $_SESSION['user_data']['id']);
				$res = $this->execute();
				$_SESSION['user_data']['notif'] = $post['value'];
				return $arrayName = array('Changed' => true, "ses" => $_SESSION);
			}
			catch (PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
				return $arrayName = array('Changed' => false);
			}
		}
	}

	public function profile() {
		if (!isset($_SESSION['is_logged_in'])) {
			header("Location: ". ROOT_URL. "users");
		}
		$this->query("SELECT * FROM users WHERE `login`=:username");
		$this->bind(':username', $_SESSION['user_data']['login']);
		$result = $this->single();
		
	}
}