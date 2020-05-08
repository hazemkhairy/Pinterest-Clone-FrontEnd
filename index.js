

const getPosts = async (endpoint) => {
    console.log(endpoint)
    let payload = await fetch(`https://pinterest-clone-restful-api.herokuapp.com/api/Posts/${endpoint}`)
        .then(
            (res) => {
                return res.json();
            }
        )
        console.log(payload)
    return payload;
}

const displayMostPopular = async () => {

    const view = document.getElementById('mostPopular');
    let photos = await getPosts('mostLikedPosts')
    photos = photos.payload.posts
    getDivsOfMostPopular(photos).forEach(element => {
        view.append(element)

    });
}

const paginationCreator = async (curPage) => {
    console.log(curPage)
    let payload = await getPosts(`getAllPosts/${curPage}/`)
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
    const cards = await createCardsArray(payload.posts);
    displayPhotos(cards);
    init();
}

const loadPhotos = async () => {
    await paginationCreator(1);
    await displayMostPopular();
    init();
}
loadPhotos();