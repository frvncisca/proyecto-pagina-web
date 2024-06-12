const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', this.window.scrollY > 80);
});
//Registro 
let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let nameInput = document.getElementById("nameInput");
let nameInput2 = document.getElementById("nameInput2");
let nameInput3 = document.getElementById("nameInput3");
let nameInput4 = document.getElementById("nameInput4");
let nameInput5 = document.getElementById("nameInput5");
let form = document.getElementById("form");
let form1 = document.getElementById("form1");
let title = document.getElementById("title");

signIn.onclick = function(){
    nameInput.style.maxHeight="0";
    nameInput2.style.maxHeight="0";
    nameInput3.style.maxHeight="0";
    nameInput4.style.maxHeight="0";
    nameInput5.style.maxHeight="0";
    form.style.maxHeight="250px";
    title.innerHTML = "Login";
    signUp.classList.add("disable");
    signIn.classList.remove("disable");
    
}

signUp.onclick = function(){
    nameInput.style.maxHeight="60px";
    nameInput2.style.maxHeight="60px";
    nameInput3.style.maxHeight="60px";
    nameInput4.style.maxHeight="60px";
    nameInput5.style.maxHeight="60px";
    form.style.maxHeight="520px";

    title.innerHTML = "Registrarse";
    signUp.classList.remove("disable");
    signIn.classList.add("disable");
}