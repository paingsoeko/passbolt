const passwordInput = document.querySelector(".password-box input"),
copyIcon = document.querySelector(".copy-icon"),
rangeInput = document.querySelector(".range-box input"),
rangeVal = document.querySelector(".slider-value"),
generateBtn = document.querySelector(".generate-button"),
options = document.querySelectorAll(".option input"),
passIndicator = document.querySelector('.pass-indicator'),
list = document.querySelector('.list');


const characters = { // object of letters, numbers & symbols
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = rangeInput.value;

    copyIcon.classList.replace("uil-file-check-alt","uil-copy");

    options.forEach(option => { // looping through each option's checkbox
        if(option.checked) { // if checkbox is checked
            // if checkbox id isn't exc-duplicate && spaces
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                // adding particular key value from character object to staticPassword
                staticPassword += characters[option.id];
            } else if(option.id === "spaces") { // if checkbox id is spaces
                staticPassword += `  ${staticPassword}  `; // adding space at the beginning & end of staticPassword
            } else { // else pass true value to excludeDuplicate
                excludeDuplicate = true;
            }
        }
    });
    for (let i = 0; i < passLength; i++) {
        // getting random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) { // if excludeDuplicate is true
            // if randomPassword doesn't contains the current random character or randomChar is equal 
            // to space " " then add random character to randomPassword else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else { // else add random character to randomPassword
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword; // passing randomPassword to passwordInput value



}






//////HISTORY
let id,LIST;

//get item from local stroage
let data = localStorage.getItem("PWDHIS");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loaddata(LIST);
    console.log(LIST.includes("kjcmlznq"))
}else{
    //  if data isn't empty
    LIST = [];
    id = 0;
}

//load data function user's interface
function loaddata(array){
    array.forEach(function(task){
        tasks(task.id, task.name, task.trash);
        
    });
}

function tasks(id, name, trash){
    if(trash){ return; }

    const task = `<li class="pwd-item">
        <span class="username">invalid</span>
        <span class="password">${name}</span>
        <i class="uil uil-trash action-trash" job="delete" id="${id}"></i>
   

    </li>`;

    const position = "beforeend"

    list.insertAdjacentHTML(position, task);

}

copyIcon.addEventListener('click',()=>{
    const pwdHis = passwordInput.value;
    console.log(pwdHis);
    navigator.clipboard.writeText(passwordInput.value);
   



    console.log(copyIcon.classList.contains("uil-file-check-alt")); 
   

    if(copyIcon.classList.contains("uil-file-check-alt")){
       alert("your already copied");
            
    }else{
        tasks(id, pwdHis, false);
        LIST.push({
            id : id,
            name : pwdHis,
            trash : false
        });
        localStorage.setItem("PWDHIS", JSON.stringify(LIST));
        id++;
        copyIcon.classList.replace("uil-copy","uil-file-check-alt");
    }

    
});



//remove to task
function removeTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "delete"){
        removeTask(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("PWDHIS", JSON.stringify(LIST));
});




const upadatePassIndicator = () => {

    passIndicator.id = rangeInput.value <= 7 ? "weak" : rangeInput.value <= 15 ? "medium" : rangeInput.value <= 23 ? "strong" : "verystrong";
    passwordInput.id = rangeInput.value <= 7 ? "weak" : rangeInput.value <= 15 ? "medium" : rangeInput.value <= 23 ? "strong" : "verystrong";

}

rangeInput.addEventListener('input', ()=>{
    copyIcon.classList.replace("uil-file-check-alt","uil-copy");
    rangeVal.innerHTML = rangeInput.value;
    generatePassword();
    upadatePassIndicator();

});

// copyIcon.addEventListener('click',()=>{
//     navigator.clipboard.writeText(passwordInput.value);
//     copyIcon.classList.replace("uil-copy","uil-file-check-alt");
    
// })
generatePassword();
upadatePassIndicator();
generateBtn.addEventListener('click', generatePassword);



// history

