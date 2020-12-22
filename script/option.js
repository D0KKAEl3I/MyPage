//option
let optionMenu = document.getElementsByClassName('option-menu')[0]
let option = optionMenu.getElementsByClassName('option')
let options = [];

for (let i = 0; i < option.length; i++) {
    let op = option[i].getElementsByTagName('li')
    for (let j = 0; j < op.length; j++) {
        options.push(op[j])
    }
}

for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', active)
}

function active(event) {
    let element = event.srcElement;
    let parent = element.parentNode;
    for (let child = 0; child < parent.children.length; child++) {
        parent.children[child].classList.remove('active')
    }
    element.classList.add('active')
}

let openbtn = optionMenu.getElementsByClassName('open')[0]
openbtn.addEventListener('click', showOptionMenu)
function showOptionMenu() {
    if (optionMenu.style.bottom == '50px') {
        optionMenu.style.bottom = '-330px';
        openbtn.style.transform = ''
    }
    else {
        optionMenu.style.bottom = '50px'
        openbtn.style.transform = 'rotate(180deg)'
    }
}