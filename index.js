

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

const paginationCreator = async (curPage) => {
    let payload = await fetch(`https://pinterest-clone-restful-api.herokuapp.com/api/Posts/getAllPosts/${curPage}/`)
        .then(
            (res) => {
                return res.json();
            }
        )
    payload = payload.payload
    let paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    for (let i = 1; i <= payload.pages; i++) {
        let li = document.createElement('li');
        li.classList.add('page-item');
        let temp;
        if (i == curPage) {
            temp = document.createElement('span');
            li.classList.add('active')
        } else {
            temp = document.createElement('button');
            temp.onclick = () => { paginationCreator(i) }
        }
        temp.classList.add('page-link');
        temp.innerText = i;
        li.appendChild(temp);
        paginationDiv.appendChild(li);
    }
    let photos = getPhotos2(payload.posts);
    const cards = await createCardsArray(photos);
    displayPhotos(cards);
    init();
}

const loadPhotos = async () => {
    paginationCreator(1);
    displayMostPopular();
    init();
}
loadPhotos();