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
		$this->returnView($viewmodel->verify(), false);
	}

	protected function profile() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->profile(), true);
	}

	protected function changeLogin() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->changeLogin(), false);
	}

	protected function changeEmail() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->changeEmail(), false);
	}

	protected function changePassword() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->changePassword(), false);
	}

	protected function changeNotif() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->changeNotif(), false);
	}

	protected function forgotPass() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->forgotPass(), true);
	}

	protected function resetPassRequest() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->resetPassRequest(), false);
	}

	protected function resetPass() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->resetPass(), true);
	}

	protected function restorePass() {
		$viewmodel = new UserModel();
		$this->returnView($viewmodel->restorePass(), false);
	}
}