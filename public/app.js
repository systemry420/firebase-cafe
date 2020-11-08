const cafeList = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form')

// grab nav elements
const logoutLinks = document.querySelectorAll('.logged-out')
const loginLinks = document.querySelectorAll('.logged-in')

const setupUI = (user) =>{
    if(user){
        loginLinks.forEach(item => item.style.display = 'block')
        logoutLinks.forEach(item => item.style.display = 'none')
    }
    else {
        loginLinks.forEach(item => item.style.display = 'none')
        logoutLinks.forEach(item => item.style.display = 'block')
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    let modals = document.querySelectorAll('.modal')
    M.Modal.init(modals)

})

// create elements and render to DOM
function renderCafe(data) {
    if(data.length > 0) {
        cafeList.innerHTML = ''
        data.forEach(doc =>{
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
        
            name.addEventListener('click', (e)=>{
                const val = e.target.innerText
                e.target.innerHTML = `<form onsubmit="editData(${e.target.parentElement.getAttribute('data-id')})"><input type="text" value='${val}' /></form>`
            })
        })
    }
    else {
        cafeList.innerHTML = '<h5>you cant see this :)</h5>'
    }

}

function init() {
    // get data using snapshot
    db.collection('cafe').onSnapshot((snapshot)=>{
            renderCafe(snapshot.docs);
    }, err => console.log(err.message))
}

// using where to filter data
function loadByCity(city) {
    db.collection('cafe').where('city', '==', city).get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
            renderCafe(doc);
        });
    })
}

// use orderBy()
function orderByName() {
    db.collection('cafe').orderBy('name').get().then((snapshot)=>{
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
    // cafeList.innerHTML = ''
    // init()
})

// update data
function editData(id, n) {
    e.preventDefault()
    db.collection('cafe').doc(id).update({
        name: n
    })
}

// window.addEventListener('load', ()=> init())