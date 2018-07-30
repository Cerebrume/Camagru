<?php

	class Messages {
		public static function setMessage($text, $type) {
			if ($type == 'error') {
				$_SESSION['errorMessage'] = $text;
			}
			else {
				$_SESSION['successMessage'] = $text;
			}
		}

		public static function displayMessage() {
			if (isset($_SESSION['errorMessage'])) {
				echo '<div class="alert-custom alert-danger">' .$_SESSION['errorMessage'] . "</div>";
				unset($_SESSION['errorMessage']);
			}
			if (isset($_SESSION['successMessage'])) {
				echo '<div class="alert-custom alert-success">' . '<p>' .$_SESSION['successMessage'] . '</p>'. "</div>";
				unset($_SESSION['successMessage']);
			}
		}
	}

?>