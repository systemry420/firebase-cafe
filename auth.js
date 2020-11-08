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


// login
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value

    auth.signInWithEmailAndPassword(email, password)
    .then(cred=>{
        console.log("login", cred.user);
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close()
        loginForm.reset()

    })
})