'use scrict'

var btn_post = document.getElementsByClassName('post__add-comment');


for (var i = 0; i < btn_post.length; i++) {
    btn_post[i].addEventListener('click', sendComment, false);
}

function sendComment(e) {

	var id = e.target.getAttribute('post-id');
	var selector = id + "-post__comment";
	var comment_elem = document.getElementById(selector);
	var comment = document.getElementById(selector).value;


	if (comment.length <= 0) return;
	var http = new XMLHttpRequest();

	var url = "/posts/comment";
	http.open('POST', url, true);

	http.onreadystatechange = function () {
		if (this.readyState != 4) return;

		if (this.status == 200) {
			var shares = document.getElementsByClassName("share");
			var share_target = null;
			for (let i = 0; i < shares.length; i++) {
				if (shares[i].getAttribute('post-id') == id)
					share_target = shares[i];
			}
			e.target.removeAttribute('disabled');
			e.target.getAttribute('post-id');
			var c_user = document.getElementsByClassName('profile__username')[0].innerText.toLowerCase();
			c_user  = c_user[0].toUpperCase() + c_user.substring(1);
			var c_desc = comment;
			var p = document.createElement('p');
			p.setAttribute('comment-id', e.target.getAttribute('post-id'));
			p.classList.add('comments-item');
			p.innerText = c_user + ": " +  c_desc;
			share_target.childNodes[7].appendChild(p);
		}
		else {
			console.log( "Status: " + http.status + ': ' + http.statusText );
		}
	}
	comment_elem.value = '';
	e.target.setAttribute('disabled', 'true');
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("submit_comment=true" + "&comment_desc=" + comment + "&comment_post_id=" + id);

}


// LIKES

var likes = Array.from(document.getElementsByClassName('like'));

for (let i = 0; i < likes.length; i++) {
	likes[i].addEventListener('click', like, false);
}


// LIKES

function like() {
	if (this.getAttribute('disabled')) return;
	var http = new XMLHttpRequest();
	var post_id = this.getAttribute('post-id');
	this.classList.add('liked');
	this.setAttribute('disabled', 'true');
	let liked = document.querySelector('.likes_count[post-id="'+ post_id + '"]');
	liked.innerHTML = parseInt(liked.innerHTML) + 1;
	this.nextSibling.innerText = likes_count++;
	var url = "http://localhost/Camagru/posts/like";
	http.open('POST', url, true);

	http.onreadystatechange = function () {
		if (this.readyState != 4) return;

		if (this.status == 200) {
			console.log(this.responseText);
		}
		else {
			console.log( "Status: " + http.status + ': ' + http.statusText );
		}
	}

	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("submit_like=true&" + "post_id=" + post_id);
}