let names = document.getElementById("name");
let email = document.getElementById("email");
let pw = document.getElementById("pw");
let userEmail = document.getElementById("log-email");
let userPass = document.getElementById("log-pw");
let regBtn = document.getElementById("reg-btn");
let logBtn = document.getElementById("log-btn");
let regLink = document.getElementById("href")
let logLink = document.getElementById("hrefs")
let register = document.getElementById("register")
let login = document.getElementById("login")

const store = () => {
    localStorage.setItem("name", names.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", pw.value);
    alert("Registration successful!");
};

const check = () => {
    let storedEmail = localStorage.getItem("email");
    let storedPassword = localStorage.getItem("password");
    if (userEmail.value !== storedEmail || userPass.value !== storedPassword) {
        alert("Please check your email or password");
    } else {
        window.location.href = "cart.html"
    }
};

regBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!email.value || !names.value || !pw.value) {
        alert("please enter your info")
    } else {
        store();
    }
});

logBtn.addEventListener("click", function (e) {
    e.preventDefault();
    check();
});

regLink.addEventListener("click" , function(){
  register.style.display = "none"
  login.style.display = "flex"  
})
logLink.addEventListener("click" , function(){
  register.style.display = "flex"
  login.style.display = "none"  
})