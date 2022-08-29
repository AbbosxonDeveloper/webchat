register_form.onsubmit = async event => {
    event.preventDefault()

    let response = await fetch("/register", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameInput.value,
            password: passwordInput.value,
            repeat_password: passwordInput.value,
            gender: "male",
            contact: TelInput.value
        })
    })


    let user = await response.json()
    response.headers = {
        token: user.token,
        'Content-type': "application/json"
    }
    let userData = {
        id: user.id,
        username: usernameInput.value,
        contact: TelInput.value
    }

    window.localStorage.setItem('user', JSON.stringify(userData))
    window.localStorage.setItem('token', user.token)
    console.log(user.id)

    let token = localStorage.getItem('token')
    console.log(Boolean(token))
    if (token) {
        alert('success')
        go_chat.className = 'btn btn-dark py-3'
    }
}



let changePassType = false

showButton.onclick = evt => {
    changePassType = true
    passwordInput.type = 'text'
    showButton.onclick = () => {
        changePassType = false
        passwordInput.type = 'password'
    }
}