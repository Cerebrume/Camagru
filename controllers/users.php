<?php
class Users extends Controller{
	protected function Index() {
		header('Location: '.ROOT_URL.'users/login');
	}

	protected function register() {
		$viewmodel = new UserModel();
		if (isset($_SESSION['is_logged_in'])) {
			header('Location: '.ROOT_URL);
		}
		$this->returnView($viewmodel->register(), true);
	}

	protected function login() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->login(), true);
	}

	protected function logout() {
		unset($_SESSION['is_logged_in']);
		unset($_SESSION['user_data']);
		session_destroy();
		header('Location: '.ROOT_URL);
	}

	protected function addPost() {
		if (!isset($_SESSION['is_logged_in'])) {
			header('Location: '.ROOT_URL);
		}
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->addPost(), true);
	}

	protected function verify() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->verify(), true);
	}
}