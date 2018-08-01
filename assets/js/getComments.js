(function() {
    const shares = document.getElementsByClassName("share");
    const baseUrl = document.URL;
    function makeUrl(url, endpoint) {
        let newUrl = url.split('/');
    
        return `http://${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/${endpoint}`
    }
    const url = (makeUrl(baseUrl, 'getcomments'));
    fetch(url)
        .then(res => res.json())
        .then(addedCommentsToPosts)
        .catch(e => console.log(e));

    function addedCommentsToPosts (comments) {
        for (let i = 0; i < shares.length; i++) {
            let postId = shares[i].getAttribute('post-id');
            for(let j = 0; j < comments.length; j++) {
                if (postId == comments[j]['comment_post_id']) {
                    var c_user = comments[j]['comment_user'];
                    var c_desc = comments[j]['comment_desc'];
                    var p = document.createElement('p');
                    p.setAttribute('comment-id', comments[j]['id']);
                    p.classList.add('comments-item');
                    p.innerText = c_user + ": " +  c_desc;
                    shares[i].querySelector('.comments').appendChild(p);
                }
            }
        }
    }
})()
