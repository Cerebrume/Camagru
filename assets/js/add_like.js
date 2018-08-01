var likes = Array.from(document.getElementsByClassName('like'));

for (let i = 0; i < likes.length; i++) {
	likes[i].addEventListener('click', like, false);
}


// LIKES

function like(e) {
    if (this.getAttribute('disabled')) return;
    
    var post_id = this.getAttribute('post-id');
    const baseUrl = document.URL;
    function makeUrl(url, endpoint) {
        let newUrl = url.split('/');
    
        return `http://${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/${endpoint}`
    }
    const url = (makeUrl(baseUrl, 'like'));
    
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
	.then(res => console.log(res))
    .catch(e => console.log(e))
    addLikeToDom();
    this.setAttribute('disabled', true);
    this.classList.add('liked');
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