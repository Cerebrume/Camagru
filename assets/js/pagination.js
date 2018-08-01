(function() {
    const paginationUl = document.querySelector('.pagination');
    const numberPages = paginationUl.getAttribute('data-num-pages');
    const baseUrl = document.URL;
    if (numberPages === '0') return;
    function makeUrl(url, endpoint) {
        let newUrl = url.split('/');
    
        return `http://${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/${endpoint}`
    }

    function createElement(name, attributes = {}) {
        const elem = document.createElement(name);
        
        for( let name in attributes) {
            elem.setAttribute(name, attributes[name])
        }
        
        return elem
    }
    for (let i = 0; i < numberPages; i++) {
        let li = createElement('li', {'class': 'page-item'});
        let url = makeUrl(baseUrl, i);
        let a = createElement('a', {'href': url, 'class': 'page-link'});
        a.append(i + 1);
        li.appendChild(a);
        paginationUl.appendChild(li);
    }
})()