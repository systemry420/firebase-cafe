const signForm = document.querySelector('#signup-form')

// signup
signForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    // get user info
    const email = signForm['signup-email'].value
    const password = signForm['signup-password'].value

    // signup the user
    auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close()
        signForm.reset()
    })


})

// logout
const logout = document.querySelector('#logout')
logout.addEventListener('click', e =>{
    e.preventDefault()
    auth.signOut().then(()=>{
        console.log('Logged out');
    })
})