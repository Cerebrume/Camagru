<?php
class HomeModel extends Model{
	public function Index(){
		if (isset($_SESSION['is_logged_in'])) {
			header("Location: ". ROOT_URL. "posts");
		}
		return;
	}
}
?>