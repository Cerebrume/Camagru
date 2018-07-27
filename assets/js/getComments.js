(function() {
    const url = (document.URL + '/getcomments').replace(/([^:]\/)\/+/g, "$1");
    const shares = document.getElementsByClassName("share");

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
