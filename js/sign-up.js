// function displayLabel(input,){
//     let label = input.parentElement.getElementsByClassName('input-label')[0];
//     if(input.value!=='') label.classList.add('input-label-active');
//     else label.classList.remove('input-label-active');
// }
// (function(){
//     let inputs = document.querySelectorAll('input');
//     inputs.forEach(function(input){
//         input.addEventListener('focusout',function(event){
//             let label = event.target.parentElement.getElementsByClassName('input_label')[0];
//             console.log(label);
//             if(input.value!=='') {
//                 label.classList.add('input-label-active');
//                 alert(true);
//             }
//             // else label.classList.remove('input-label-active');
//             else alert(false);
//         })
//     })
// }())
(function(){
    setInterval(function tg(){
        let now = new Date();
        let clockHTML = document.getElementsByClassName('clock')[0];
        clockHTML.innerHTML = `${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`;
    },1000);
}())
function checkInput(input, type) {
    let check = null;
    let text = input.value;
    let inputName = input.placeholder;
    let iconValid = input.parentNode.getElementsByClassName('iconValid')[0];
    let err = input.parentNode.getElementsByClassName('error')[0];
    if (type === 'name') {
        if (!/\w/.test(text) || /\d/.test(text)) {
            check = false;
            err.innerHTML = "";
            err.innerHTML = '*Vui Lòng Nhập Đúng ' + inputName + ' Của Bạn';
        } else {
            check = true;
            err.innerHTML = "";
        }
    } else if (type === 'email') {
        let re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(text)) {
            check = true;
            err.innerHTML = "";
        }
        else {
            check = false;
            err.innerHTML = "";
            err.innerHTML = '*Vui Lòng Nhập Đúng ' + inputName + ' Của Bạn';
        }
    } else if (type === 'password') {
        check = text.length >= 8;
        check ? err.style.color = 'green' : err.style.color = 'red';
    }
    if (check) {
        setBottomColor(input, true);
        iconValid.style.display = 'block';
    } else {
        setBottomColor(input, false);
        iconValid.style.display = 'none';
    }
    displayButton();
}

// function checkPass(input){
//     // let iconValid = input.parentNode.getElementsByClassName('iconValid')[0];
//     if(input.value.length<8) {
//         input.parentNode.getElementsByClassName('error')[0].style.color = 'red';
//         // setBottomColor(input,false);
//         // iconValid.style.display = 'none';
//
//     }
//     else {
//         input.parentNode.getElementsByClassName('error')[0].style.color = 'gray';
//         // setBottomColor(input,true);
//         // iconValid.style.display = 'block';
//
//     }
// }
let birthday = new Date();
function checkDate() {
    let error = document.getElementById('bd-error');
    let inputs = document.getElementById('birth-day').getElementsByTagName('input');
    let iconValid = document.getElementById('birth-day').getElementsByClassName('iconValid')[0];
    let day = inputs[0].valueAsNumber;
    let month = inputs[1].valueAsNumber - 1;
    let year = inputs[2].valueAsNumber;
    let date = new Date();
    let checkDate = day > 0 && day < 32;
    if (checkDate) {
        setBottomColor(inputs[0], true);
        error.style.color = 'green';

    } else {
        setBottomColor(inputs[0], false);
        error.style.color = 'red';
    }
    let checkMonth = month >= 0 && month < 12;
    date.setMonth(month, day);
    if (!checkMonth) {
        setBottomColor(inputs[1], false);
        error.style.color = 'red';
    } else if (!(date.getDate() === day && date.getMonth() === month)) {
        setBottomColor(inputs[0], false);
        error.style.color = 'red';
        setBottomColor(inputs[1], true);
    } else {
        setBottomColor(inputs[1], true);
        error.style.color = 'green';
    }
    let checkYear = year > 1900 && year <= 2007;
    if (checkYear) {
        setBottomColor(inputs[2], true);
        error.style.color = 'green';

    } else {
        setBottomColor(inputs[2], false);
        error.style.color = 'red';

    }
    if (checkDate && checkMonth && checkYear) {
        date.setFullYear(year, month, day);
        if (!(date.getDate() === day && date.getMonth() === month)) {
            setBottomColor(inputs[0], false);
            error.style.color = 'red';
        } else {
            birthday = date;
            iconValid.style.display = 'block';
        }
    }

}

function setBottomColor(input, check) {
    if (check) {
        input.style.borderBottomColor = "green";
        input.style.borderBottomWidth = '1.5px';
        input.setAttribute('data-valid', true);
    } else {
        input.style.borderBottomColor = "red";
        input.style.borderBottomWidth = '1.5px';
        input.setAttribute('data-valid', false);
    }
}

function displayButton() {
    let btn = document.getElementsByClassName('form-btn')[0];
    const inputs = document.getElementsByTagName('input');
    let check = 0;
    for (let input of inputs) {
        if (input.getAttribute('data-valid') === 'true') {
            check ++;
        } else check --;
    }
    check ===10 ? btn.disabled = false : btn.disabled = true;
}


