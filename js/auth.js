function signUp() {
    let userData = {};
    userData.ho = document.querySelector('input[name="ho"]').value;
    userData.ten = document.querySelector('input[name="ten"]').value;
    userData.email = document.querySelector('input[name="email"]').value;
    userData.password = document.querySelector('input[name="password"]').value;
    userData.gender = document.querySelector('input[type="radio"]:checked').value;

    auth.createUserWithEmailAndPassword(userData.email, userData.password)
    .then((success) => {
        var user = firebase.auth().currentUser;
        var uid;
        if(user!=null){
            uid = user.uid;
            user.updateProfile({
                displayName: userData.ho + " " + userData.ten,
                // gender: userData.gender,
            })
        }
        let p = document.createElement('p');
        let timer = 4; // time in second
        let count = setInterval(function () {
            if(timer>0){timer--;
        p.innerHTML = `Bạn sẽ được chuyển hướng về trang chủ trong ${timer}s`;
    }
            }, 1000);
        
        swal('Tạo tài khoản thành công', {
            content: p,
            icon: 'success',
            button: false,
        });
        setTimeout(function () {
            window.location.replace('../index.html');
        }, 3000);
        
        // var firebaseRef = firebase.firebase().ref();

        // firebase.child(uid).set(userData);
        // swal('', 'Ban da dang ki tai khoan thanh cong, tiep tuc mua sam tren trang web.','success').then((value)=>{
        
        // });
    }).catch((error)=>{
        let errorCode = error.code;
        var errorMessage = error.message;
        swal({
            type: 'error',
            title: errorCode,
            text: errorMessage,
        })
    });
}
function signIn() {
    let signinForm = document.querySelector('#sign-in-form');
    let email = signinForm['sign-in-email'].value;
    let password = signinForm['sign-in-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((success) => {
        let p = document.createElement('p');
        let timer = 4; // time in second
        let count = setInterval(function () {
            if(timer>0){timer--;
        p.innerHTML = `Bạn sẽ được chuyển hướng về trang chủ trong ${timer}s`;
    }
            }, 1000);
        // p.innerHTML = `Bạn sẽ được chuyển hướng về trang chủ trong ${timer}s`;
        
        swal('Đăng nhập thành công', {
            content: p,
            icon: 'success',
            button: false,
        });
        setTimeout(function () {
            window.location.replace('../index.html');
        }, 3000);
        
    }).catch((error) => {
        let errorCode = error.code;
        var errorMessage = error.message;
        swal({
            icon: 'error',
            title: errorCode,
            text: errorMessage,
        })
    });
}
