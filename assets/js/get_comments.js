
var comments = null;

function getComments() {

	var http = new XMLHttpRequest();
	var str = null;
	var url = "/posts/getcomments";
	http.open('POST', url, true);

	http.onreadystatechange = function () {
		if (this.readyState != 4) return;

		if (this.status == 200) {
			
			str = JSON.parse(this.responseText);
			comments = str;
			if (comments) {
				for (let i = 0; i < shares.length; i++) {
					id = shares[i].getAttribute('post-id');
					for(let j = 0; j < comments.length; j++) {
						if (id == comments[j]['comment_post_id']) {
							var c_user = comments[j]['comment_user'];
							var c_desc = comments[j]['comment_desc'];
							var p = document.createElement('p');
							p.setAttribute('comment-id', comments[j]['id']);
							p.classList.add('comments-item');
							p.innerText = c_user + ": " +  c_desc;
							shares[i].childNodes[7].appendChild(p);
						}
					}
				}
			}
		}
		else {
			console.log( "Status: " + http.status + ': ' + http.statusText );
		}
	}

	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("");
	return str;
}

var shares = document.getElementsByClassName("share");
getComments();


var likes = null;
var likes_count = document.getElementsByClassName('likes_count');
var is_liked = null;

function getLikes() {

	var http = new XMLHttpRequest();
	var str = null;
	var number_likes = 0;
	var url = "http://localhost/Camagru/posts/getLikes";
	http.open('POST', url, true);

	http.onreadystatechange = function () {
		if (this.readyState != 4) return;

		console.log(fetch('http://localhost/Camagru/posts/getLikes'));		
		if (this.status == 200) {
			
			str = JSON.parse(this.responseText);
			likes = str;
			if (likes) {
				var user = document.getElementsByClassName('profile__username')[0].innerText.toLowerCase();
				
				for (let i = 0; i < likes_count.length; i++) {
					post_id = likes_count[i].getAttribute('post-id');
					for(let j = 0; j < likes.length; j++) {
						
						if (post_id == likes[j]['like_post_id']) {
							number_likes++;
							
						}
						if (user == likes[j]['like_user'].toLowerCase() && (post_id == likes[j]['like_post_id'])) {
							let liked = document.querySelector('.like[post-id="'+ post_id + '"]');
							liked.setAttribute('disbled', true);
							liked.classList.add('liked');
						}

					}
					// insert likes number
					likes_count[i].innerText = number_likes;
					number_likes = 0;
					
				}
			}
		}
		else {
			console.log( "Status: " + http.status + ': ' + http.statusText );
		}
	}

	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send("");
	return str;
}

getLikes();


