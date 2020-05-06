

const getPhotos = (limit = 5) => {
    const ret = [];

    for (let i = 0; i < limit; i++) {
        let temp = { url: 'https://robohash.org/' + Math.random() * 10000, name: i.toString() };
        ret.push(temp);
    }

    return ret;
}
const getPhotos2 = (posts) => {
    const ret = [];

    for (let i = 0; i < posts.length; i++) {
        let temp = { ...posts[i], url: posts[i].picture };
        ret.push(temp);
    }

    return ret;
}
const displayMostPopular = () => {

    const view = document.getElementById('mostPopular');
    const photos = getPhotos(5)
    getDivsOfMostPopular(photos).forEach(element => {
        view.append(element)

    });
    init();
}

const loadPhotos = async () => {
    const photos = getPhotos(20);
    const cards = await createCardsArray(photos);
    displayPhotos(cards);
    displayMostPopular();
    init();
}
loadPhotos();


const paginationCreator = async (curPage) => {
    console.log('page ' + curPage)
    let payload = await fetch(`https://pinterest-clone-restful-api.herokuapp.com/api/Posts/getAllPosts/${curPage}/`)
        .then(
            (res) => {
                return res.json();
            }
        )
    payload = payload.payload
    console.log(payload)
    let maxPages = payload.pages;
    let paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    for (let i = 1; i <= maxPages; i++) {
        let li = document.createElement('li');
        li.classList.add('page-item');
        if (i == curPage) {
            li.classList.add('active')
            let span = document.createElement('span');
            span.classList.add('page-link');
            span.innerText = curPage;
            li.appendChild(span);
        } else {
            let button = document.createElement('button');
            button.classList.add('page-link');
            button.innerText = i;
            button.onclick = () => { paginationCreator(i) }
            li.appendChild(button);
        }
        console.log(li)
        paginationDiv.appendChild(li);
    }
    let photos = getPhotos2(payload.posts);
    const cards = await createCardsArray(photos);
    displayPhotos(cards);
    init();
}
paginationCreator(1);
