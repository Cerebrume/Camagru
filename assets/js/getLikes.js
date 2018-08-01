(function() {
    const baseUrl = document.URL;
    function makeUrl(url, endpoint) {
        let newUrl = url.split('/');
    
        return `http://${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/${endpoint}`
    }
    const url = (makeUrl(baseUrl, 'getLikes'));
    fetch(url)
        .then(res => res.json())
        .then(addLikesToPosts)
        .catch(e => console.log(e));

    function addLikesToPosts (likes) {
        let user = document.getElementsByClassName('profile__username')[0].innerText.toLowerCase();
        
        let likes_count = document.getElementsByClassName('likes_count');
        let number_likes = 0;

        for (let i = 0; i < likes_count.length; i++) {
            let postId = likes_count[i].getAttribute('post-id');
            for(let j = 0; j < likes.length; j++) {
                
                if (postId == likes[j]['like_post_id']) {
                    number_likes++;
                }
                if (user == likes[j]['like_user'].toLowerCase() && (postId == likes[j]['like_post_id'])) {
                    let liked = document.querySelector('.like[post-id="'+ postId + '"]');
                    liked.setAttribute('disabled', true);
                    liked.classList.add('liked');
                }

            }
            // insert likes number
            likes_count[i].innerText = number_likes;
            number_likes = 0;
        }
    }
})()
