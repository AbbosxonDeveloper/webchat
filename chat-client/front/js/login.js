let getToken = localStorage.getItem('token')
login_form.onsubmit = async(event) => {
    event.preventDefault()

    let response = await fetch('/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: usernameInput.value,
            password: passwordInput.value
        })
    })

    let userData = {
        username: usernameInput.value,
        contact: "998909534403"
    }

    let login = await response.json()
    localStorage.setItem('token', login.token) || []
    localStorage.setItem('user', JSON.stringify(userData))

    console.log(login)
    console.log(login.token)
}