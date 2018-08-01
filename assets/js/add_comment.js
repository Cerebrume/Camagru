'use scrict'

var btn_post = document.getElementsByClassName('btn-submit-comment');


for (var i = 0; i < btn_post.length; i++) {
    btn_post[i].addEventListener('click', sendComment, false);
}


function sendComment(e) {

	let id = e.target.getAttribute('post-id');
	let selector = id + "-post__comment";
	let comment = document.getElementById(selector).value;
	let comment_elem = document.getElementById(selector);

	if (comment.length <= 0) return;

	const url = (document.URL + '/comment').replace(/([^:]\/)\/+/g, "$1");

	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		body: JSON.stringify({
			submit: true,
			comment_desc: comment,
			comment_post_id: id
		})
	})
	.then(res => res.text())
	.then(res => console.log(res))
	.catch(e => console.log(e))
	addCommentToDom()

	function addCommentToDom (res) {
		var shares = document.getElementsByClassName("share");
		var share_target = null;
		for (let i = 0; i < shares.length; i++) {
			if (shares[i].getAttribute('post-id') == id)
				share_target = shares[i];
		}
		var c_user = document.getElementsByClassName('profile__username')[0].innerText.toLowerCase();
		c_user  = c_user[0].toUpperCase() + c_user.substring(1);
		var c_desc = comment;
		var p = document.createElement('p');
		p.setAttribute('comment-id', e.target.getAttribute('post-id'));
		p.classList.add('comments-item');
		p.innerText = c_user + ": " +  c_desc;
		share_target.querySelector('.comments').appendChild(p);
		comment_elem.value = '';
	}
}
