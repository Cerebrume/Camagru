var likes = Array.from(document.getElementsByClassName('like'));

for (let i = 0; i < likes.length; i++) {
	likes[i].addEventListener('click', like, false);
}


// LIKES

function like(e) {
    if (this.getAttribute('disabled')) return;
    
	var post_id = this.getAttribute('post-id');
    const url = (document.URL + '/like').replace(/([^:]\/)\/+/g, "$1");
    
    fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		body: JSON.stringify({
			submit_like: true,
			post_id: post_id
		})
	})
	.then(res => res.text())
	.then(addLikeToDom)
    .catch(e => console.log(e))
    

    function addLikeToDom() {
        const likes_count = document.getElementsByClassName('likes_count');

        let currentLikes = null;
       
        for(let i = 0; i < likes_count.length; i++) {
            if (likes_count[i].getAttribute('post-id') === post_id) {
                currentLikes = likes_count[i];
                break;
            }
        }
        return currentLikes.innerHTML = parseInt(currentLikes.innerHTML) + 1
    }
}