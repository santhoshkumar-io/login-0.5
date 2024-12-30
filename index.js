'use strict'
import 'bootstrap/dist/css/bootstrap.min.css';

class LoginController {
    constructor() {

    }
    validateUser = async (username, password) => {
        try {
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            if (response.status !== 200) {
                const { message } = await response.json()
                throw message
            }
            const jsonData = await response.json();
            sessionStorage.setItem("accessToken", jsonData.accessToken);
            document.location = './dashboard/dashboard.html';
        } catch (error) {
            this.displayErrorMessage(error);
        }
    };
    displayErrorMessage(err) {
        const errorMessage = document.getElementById("error");
        errorMessage.textContent = err;
        console.log(errorMessage)
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const loginCon = new LoginController();
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
        document.location = './dashboard/dashboard.html'
        return
    }
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await loginCon.validateUser(loginForm.uname.value, loginForm.password.value);
    });
    loginForm.uname.addEventListener('input', () => {
        const regex = /^[a-z0-9]+$/;
        if (!regex.test(loginForm.uname.value)) {

            loginCon.displayErrorMessage("Username can only contain lowercase letters and numbers!");
        } else {
            loginCon.displayErrorMessage("");

        }
    });

});


