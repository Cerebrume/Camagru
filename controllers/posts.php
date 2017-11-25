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
	}