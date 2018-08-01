(function() {
    const btnsDelete = document.getElementsByClassName('delete_post');

    for (const btn of btnsDelete) {
        btn.addEventListener('click', deletePost);
    }
    const baseUrl = document.URL;
    function deletePost() {
        const postId = this.getAttribute('post-id');

        function makeUrl(url, endpoint) {
            let newUrl = url.split('/');
        
            return `http://${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/${endpoint}`
        }
        const url = (makeUrl(baseUrl, 'deletePost'));
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                deletePost: true,
                postId: postId
            })
        })
        .then(res => res.text())
        .then(deletePostInDom)
        .catch(e => console.log(e))
        
        function deletePostInDom() {
            const posts = document.getElementsByClassName('share');
            console.log(posts);
            for (const post of posts) {
                if (post.getAttribute('post-id') === postId) {
                    post.remove();
                    return;
                }
            }
        }
    }
})()