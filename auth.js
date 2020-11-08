// signup

const signForm = document.querySelector('#signup-form')
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