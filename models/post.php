<?php
class PostModel extends Model{
	public function Index(){
		$this->query('SELECT * FROM posts');
		$rows = $this->resultSet();
		return $rows;
	}
}