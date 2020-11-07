const cafeList = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form')

// create elements and render to DOM
function renderCafe(doc) {
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    let cross = document.createElement('div')

    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name
    city.textContent = doc.data().city
    cross.textContent = 'x'

    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)

    cafeList.appendChild(li)

    cross.addEventListener('click', (e)=>{
        e.stopPropagation()
        let id = e.target.parentElement.getAttribute('data-id')
        db.collection('cafe').doc(id).delete()
        cafeList.innerHTML = ''
        init()
    })
}

function init() {
    // get data using snapshot
    db.collection('cafe').get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
            renderCafe(doc);
        });
    })
}

// using where to filter data
function loadByCity(city) {
    db.collection('cafe').where('city', '==', city).get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
            renderCafe(doc);
        });
    })
}

// listen to form submit
form.addEventListener('submit', (e)=>{
    e.preventDefault()

    // add data using a form
    db.collection('cafe').add({
        name: form.name.value,
        city: form.city.value,
    })

    form.name.value = ''
    form.city.value = ''
    cafeList.innerHTML = ''
    init()
})

window.addEventListener('load', ()=> init())