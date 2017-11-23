<?php
class PostModel extends Model{
	public function Index(){
		$this->query('SELECT * FROM posts ORDER BY post_date DESC');
		$rows = $this->resultSet();
		return $rows;
	}
}