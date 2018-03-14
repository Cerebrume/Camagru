<?php
	class Posts extends Controller{
		protected function Index(){
			$viewmodel = new PostModel();
			$this->returnView($viewmodel->Index(), true);
		}

		protected function add() {
			$vievmodel = new PostModel();
			$this->returnView($vievmodel->add(), true);
		}

		protected function comment() {
			$vievmodel = new PostModel();
			$this->returnView($vievmodel->comment(), false);
		}

		protected function getcomments() {
			$vievmodel = new PostModel();
			$this->returnView($vievmodel->getcomments(), false);
		}

		protected function like() {
			$vievmodel = new PostModel();
			$this->returnView($vievmodel->like(), false);
		}

		protected function getLikes() {
			$vievmodel = new PostModel();
			$this->returnView($vievmodel->getLikes(), false);
		}
	}