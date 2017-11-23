<?php
class UserModel extends Model{
	public function register() {
		$post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
		$passwd = password_hash($post['password'], PASSWORD_BCRYPT);
		if ($post['submit']) {
			$this->query('SELECT * FROM users WHERE login=:login');
			$this->bind(":login", $post['login']);
			if ($this->resultSet()) {
				echo "ERROR LOGIN IS EXISTS";
				return;
			}
			$this->query('SELECT * FROM users WHERE email=:email');
			$this->bind(":email", $post['email']);
			if ($this->resultSet()) {
				echo "ERROR EMAIL IS EXISTS";
				return;
			}

			$this->query('INSERT INTO users (login, email, password) VALUES(:login, :email, :password)');
			$this->bind(":login", $post['login']);
			$this->bind(":email", $post['email']);
			$this->bind(":password", $passwd);
			
			$this->execute();
			
			if ($this->dbh->lastInsertId()) {
				header('Location: '.ROOT_URL.'users/login');
			}
		}
		
		return;
	}

	public function login() {
		$post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

		if ($post['submit']) {
			$this->query('SELECT * FROM users WHERE email=:email');
			$this->bind(":email", $post['email']);
			$this->execute();
			$result = $this->stmt->fetch(PDO::FETCH_ASSOC);
			$isPasswordCorrect = password_verify($_POST['password'], $result['password']);
			if ($isPasswordCorrect) {
				$_SESSION['is_logged_in'] = true;
				$_SESSION['user_data'] = array(
					"id"	=> $result['id'],
					"login"	=> $result['login'],
					"email"	=> $result['email']
				);
				echo 'Login success';
				header('Location: '.ROOT_URL.'posts');
			} else {
				echo 'Incorrect Login';
			}
		}
		return;
	}
}