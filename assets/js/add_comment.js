'use scrict'

var btn_post = document.getElementsByClassName('post__add-comment');


for (var i = 0; i < btn_post.length; i++) {
    btn_post[i].addEventListener('click', sendComment, false);
}

function sendComment(e) {

	var id = e.target.getAttribute('post-id');
	var selector = id + "-post__comment";
	var comment = document.getElementById(selector).value;


	if (comment.length <= 0) return;
	console.log(comment);
	var http = new XMLHttpRequest();

	http.open('GET', '/projects/Camagru/posts/add_comment', true);

	http.onreadystatechange = function () {
		if (this.readyState != 4) return;

		if (this.status == 200) {
			console.log("THIS: " + this.responseText);
		}
		else {
			console.log( "Status: " + http.status + ': ' + http.statusText );
		}
	}
	
	console.log("submit_comment=true" + "&comment_desc=" + comment + "&comment_post_id=" + id);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send();
	//"submit_comment=true" + "&comment_desc=" + comment + "&comment_post_id=" + id

}
