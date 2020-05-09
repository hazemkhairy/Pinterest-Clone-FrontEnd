const init = () => {
    $('.carousel').carousel()
    $('[data-toggle="popover"]').popover({
        html: true,
        template: '<div class="popover bg-white rounded-lg" role="tooltip"><div class="arrow"></div><h3 class="popover-header bg-white border-bottom b-5"></h3><div class="popover-body p-0"></div></div>'
    }).on('shown.bs.popover', function () {
        setTimeout(function (a) {
            a.popover('hide');
        }, 3000, $(this));
    });

}

const createRoundButtonWithText = (text) => {
    const div = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('btn', 'm-1', 'btn-light', 'rounded-pill', 'border-0', 'p-1', 'justify-content-center', 'align-items-center');
    const p = document.createElement('p');
    p.classList.add('p-1', 'm-0', 'align-center')
    p.innerHTML = text;
    p.style.fontSize = '110%'
    p.style.fontWeight = "600"
    button.appendChild(p)
    div.appendChild(button);

    div.onclick = (e) => { e.stopPropagation() }
    return div;
}
const createRoundButtonWithImage = (imgPath) => {
    const div = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('btn', 'm-1', 'btn-light', 'rounded-pill', 'border-0', 'p-1', 'justify-content-center', 'align-items-center');
    const img = document.createElement('img');
    img.src = imgPath
    img.classList.add('img')
    img.style.height = '100%'
    img.style.width = '30px'

    button.appendChild(img)
    div.appendChild(button);

    div.onclick = (e) => { e.stopPropagation() }
    return div;
}
const createPopOverEffect = (optionsButton) => {

    const btnGroup = document.createElement('div')
    btnGroup.classList.add('btn-group-vertical', 'w-100', 'btn-light', 'p-0');

    const btnsContent = ['Hide Pin', 'Download image', 'Report Pin'];
    for (let i = 0; i < btnsContent.length; i++) {
        let temp = document.createElement('button');
        temp.classList.add('btn', 'btn-light', 'w-100', 'text-left');
        temp.innerText = btnsContent[i];
        btnGroup.appendChild(temp)
    }

    optionsButton.title = 'This Pin was inspired by your recent activity'
    optionsButton.setAttribute('data-toggle', 'popover')
    optionsButton.setAttribute('data-content', btnGroup.outerHTML)

    return optionsButton
}
const createLowerRow = () => {
    const lowerRow = document.createElement('div');
    lowerRow.classList.add('d-flex', 'flex-row-reverse', 'justify-content-around');
    let optionsButton = createRoundButtonWithImage('./HomePage/threeDots.png');
    optionsButton = createPopOverEffect(optionsButton)
    const shareButton = createRoundButtonWithImage('./HomePage/upload.png');
    const handleButton = createRoundButtonWithText('handle');
    lowerRow.appendChild(optionsButton);
    lowerRow.appendChild(shareButton);
    lowerRow.appendChild(handleButton);
    return lowerRow;
}
const createUpperRow = () => {
    const upperRow = document.createElement('div');
    upperRow.classList.add('d-flex', 'flex-row-reverse');

    const saveButton = document.createElement('button');
    saveButton.classList.add('rounded-pill', 'bg-danger', 'border-0', 'text-white', 'p-2')
    saveButton.textContent = "Save"
    saveButton.style.fontWeight = "600"
    upperRow.appendChild(saveButton);


    saveButton.onclick = (e) => { e.stopPropagation() }
    return upperRow;
}
const createCoverCardDecoration = () => {

    const decoration = document.createElement('div');

    decoration.style.height = "100%"
    decoration.style.width = "100%"
    decoration.classList.add('d-flex', 'flex-column', 'justify-content-between', 'p-2')

    const upperRow = createUpperRow();
    const lowerRow = createLowerRow();


    decoration.appendChild(upperRow);
    decoration.appendChild(lowerRow);
    return decoration;
}

const createCardCover = () => {
    const cardCover = document.createElement('div');
    cardCover.style.backgroundColor = 'rgba(125,125,125,0.3)'
    cardCover.style.visibility = 'hidden'
    cardCover.style.height = "100%"
    cardCover.style.width = "100%"
    cardCover.style.position = "absolute"
    const coverCardDecoration = createCoverCardDecoration()
    cardCover.appendChild(coverCardDecoration);
    return cardCover

}

const createCard = (data) => {
    const card = document.createElement('div');
    card.classList.add('card', 'p-0', 'modifiedCard')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'col-lg-2', 'm-2')

    const cardCover = createCardCover();
    card.onmouseenter = () => { cardCover.style.visibility = 'visible' }
    card.onmouseleave = () => { cardCover.style.visibility = 'hidden' }

    const img = document.createElement('img')
    img.src = data.picture;
    img.classList.add('img');
    img.style.height = '350px'

    card.appendChild(cardCover)
    card.appendChild(img)

    card.onclick = () => { location.href = './postPage.html' + `?ID=${data._id}` }
    return card;

}

const createCardsArray = async (data) => {
    const res = await data.map(d => {
        return createCard(d);
    })
    return res;
}

const displayPhotos = (photos) => {

    const view = document.getElementById('photosGrid');
    view.innerHTML = '';
    photos.forEach(element => {
        view.append(element)

    });
}
const getDivsOfMostPopular = (photos) => {
    const divs = [];
    for (let i = 0; i < photos.length; i++) {
        const container = document.createElement('div');
        container.classList.add('carousel-item', 'd-flex', 'align-items-center');
        const img = document.createElement('img');
        img.classList.add('img-fluid', 'd-block', 'w-100');
        img.src = photos[i].picture;
        img.style.height = '450px';
        container.appendChild(img);
        divs.push(container);
    }
    divs[0].classList.add('active');
    return divs;
}
