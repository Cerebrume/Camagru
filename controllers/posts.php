<?php
	class Posts extends Controller{
		protected function Index(){
			$viewmodel = new ShareModel();
			$this->returnView($viewmodel->Index(), true);
		}
	}