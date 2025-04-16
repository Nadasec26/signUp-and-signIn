var regName = document.querySelector("#regName");
var regEmail = document.querySelector("#regEmail");
var regPassword = document.querySelector("#regPassword");
var signup = document.querySelector(".signup");
var login = document.querySelector(".login");
var regAlert = document.querySelector("#regAlert");

var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");
var signin = document.querySelector(".signin");
var register = document.querySelector(".register")

var logout = document.querySelector("#logout");

var list = [];

if(localStorage.getItem("res") != null){
    list = JSON.parse(localStorage.getItem("res"));
}
var currentUser = JSON.parse(localStorage.getItem("currentUser"));  
if (currentUser) {
  showHome(currentUser.name);  
} 
// register
signup.addEventListener("click", function(){
    var data = {
        name : regName.value.trim(),
        email : regEmail.value.trim(),
        password : regPassword.value.trim(),
    }

    if (!data.name || !data.email || !data.password) {
        showMessage(regAlert, "All inputs are required");
        return;
    }

    var isExist = false;
    for (var i = 0; i < list.length; i++) {
        if (list[i].email === data.email) {
            isExist = true;
            break;
        }
    }

    if (isExist) {
        showMessage(regAlert, "Email is already registered");
        return;
    }

    list.push(data);
    localStorage.setItem("res", JSON.stringify(list));
    clearInputs();
    showlogin();
})
// login 
signin.addEventListener("click" , function(){
    var email = loginEmail.value;
    var password = loginPassword.value;

    if (!email || !password) {
                showMessage(loginAlert, "Please enter both email and password");
                return;
            }
        
            var user = null;
            for(var i = 0; i < list.length; i++){
                if(list[i].email === email && list[i].password === password){
                    user = list[i];
                    break;
                }
            }
        
            if(user){
                localStorage.setItem("currentUser", JSON.stringify(user));
                showHome(user.name);
            } else {
                showMessage(loginAlert, "Email or password is incorrect");
            }
})


//logout 
logout.addEventListener("click",function(){
    localStorage.removeItem("currentUser");
    location.reload();
})

function clearInputs(){
    regName.value = "";
    regEmail.value = "";
    regPassword.value = "";
    regAlert.classList.add("d-none");
}

login.addEventListener("click", function(){
    showlogin();
})
function showlogin(){
    document.querySelector("#loginSection").classList.replace("d-none", "d-block");
    document.querySelector("#registerSection").classList.add("d-none");
}

register.addEventListener("click", function(){
    document.querySelector("#registerSection").classList.replace("d-none", "d-block");
    document.querySelector("#loginSection").classList.add("d-none");
})


function showHome(name) {
    document.querySelector("#registerSection").classList.add("d-none");
    document.querySelector("#loginSection").classList.add("d-none");
    document.querySelector("#homeSection").classList.remove("d-none");
    document.querySelector("#welcome").textContent = `Welcome, ${name}!`;
}

function showMessage(ele, msg) {
    ele.textContent = msg;
    ele.classList.remove("d-none");
}

