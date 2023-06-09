class Login extends HTMLElement{
    constructor(){
        super();
    }
    // login function to login user or show error message
    async login(e){
        e.preventDefault();
        // get form data from login form
        let formData = {
            "emailUsername": document.getElementById("loginUsername").value,
            "password": document.getElementById("loginPassword").value,
        }
        // validate login form
        if (!validLoginForm(formData)) {
            return false;
        };
        // convert username and password to base64 encoded string and add to headers
        const credentials = `${formData.emailUsername}:${formData.password}`;
        const encodedCredentials = new TextEncoder().encode(credentials);
        const base64Credentials = fromByteArray(encodedCredentials);
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64Credentials);
        headers.append('Content-Type', 'application/json');
        // send login request to 01.gritlab signin endpoint
        try {
            const response = await fetch('https://01.gritlab.ax/api/auth/signin', {
                method: 'POST',
                headers: headers,
            })
            // if response is ok, save jwt token to localstorage and reload page
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('jwt', data);
                // go to dashboard
                location.reload();
            } else {
                throw new Error('HTTP status code: ' + response.status);
            }
        }
        catch (error) {
            // if response is not ok, show error message at login form
            let loginErr = document.getElementById('loginUsernameErrMsg')
            if (loginErr) {
                loginErr.innerHTML = "Wrong username/email or password";;
            }
        }
    }
    // render login form
    connectedCallback() {
        this.render();
        this.addEventListener('submit', this.login);
    };
    disconnectedCallback() {};
    render() {
        this.innerHTML = `
        <div class = "loginPage" id="loginPage">
        <!--LEFT-->
        <div class="container__left">
            <div class="main__logo-title">
                <a href="" class="mainlogo__link" id="mainlogo">
                    <h1>My intrack</h1> <br>
                </a>
            </div>
        </div>
        <!--RIGHT-->
        <div class="container__right">
            <!------------------------------------LOGIN FORM----------------------------------->
            <form class="form" id="login">
                <!--title-->
                <h1 class="form__title">Login</h1>
                <!--<div class="form__message form__message--error" id="loginErrorMessage"></div>-->
        
                <div class="form__input-group">
                    <!--username-->
                    <!--   <h2>Username</h2> -->
                    <div class="form__input-error-message" id="loginUsernameErrMsg"></div>
                    <input type="text" class="form__input" autofocus placeholder="Username or Email" name="loginUsername" id="loginUsername" required>
                </div>
    
                <div class="form__input-group">
                    <!--password-->
                    <!-- <h2>Password</h2> -->
                    <div class="form__input-error-message" id="loginPasswordErrMsg"></div>
                    <input type="password" class="form__input" autofocus placeholder="Password" id="loginPassword" name="loginPassword" required>
                    
                </div>
    
                <!--submit button-->
                <input type="submit" class="form__button" id="loginSubmit" value="Submit">
            </form>
        </div>`
    }
}

// function to convert byte array to base64 encoded string  
function fromByteArray(uint8array) {
    return btoa(String.fromCharCode.apply(null, uint8array));
}

customElements.define("login-page", Login);

// function to validate login form and show error messages if empty
function validLoginForm(formData){
    const usernameErrMsg = document.getElementById("loginUsernameErrMsg")
    const passwordErrMsg = document.getElementById("loginPasswordErrMsg")
    let valid = {
        username: true,
        password: true,
    }
    
    // check if username is empty
    if (formData.username == ""){
        usernameErrMsg.classList.add("form__input-error-message");
        usernameErrMsg.innerHTML = "Username is required";
        valid.username = false;
    } else {
    // else username is valid
        usernameErrMsg.classList.remove("form__input-error-message");
        usernameErrMsg.innerHTML = "";
        valid.username = true;
    }

    // check if password is empty
    if (formData.password == ""){
        passwordErrMsg.classList.add("form__input-error-message");
        passwordErrMsg.innerHTML = "Password is required";
        valid.password = false;
    } else {
    // else password is valid
        passwordErrMsg.classList.remove("form__input-error-message");
        passwordErrMsg.innerHTML = "";
        valid.password = true;
    }
    
    // if all booleans are true, return true, else return false
    if (valid.username == false || valid.password == false){
        return false;
    } else {
        return true;
    }
}
