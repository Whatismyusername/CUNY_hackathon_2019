// Web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAxMVPw2JwvnWQCtP-7s2UXIyIKv_KN3eM",
    authDomain: "cuny-hackathon-2019.firebaseapp.com",
    databaseURL: "https://cuny-hackathon-2019.firebaseio.com",
    projectId: "cuny-hackathon-2019",
    storageBucket: "cuny-hackathon-2019.appspot.com",
    messagingSenderId: "310571746497",
    appId: "1:310571746497:web:a05757d9aacdf880da0040",
    measurementId: "G-077HS3XNKE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var firebaseRef = firebase.database().ref();

var username;
var password;
$('document').ready(function(){
    $('#message').hide();
    
    firebaseRef.on('value', snapshot => {
        $('#loginBtn').click(function(){
            username = $('#username').val();
            password = $('#password').val();
            if(hash(password) === snapshot.child(username).child('password').val()){
                localStorage.setItem('username', username);
                localStorage.setItem('password', password)
                console.log('log in!')
                window.location.replace("../profile/index.html");
            } else{
                $('#message').show();
            }
        })
    })
    
    $('body').click(function(){
        $('#message').fadeOut();
    })
    
})

function hash(str){
    let hash = 0;
    if(str == 0){
        return hash;
    }
    for(var i = 0; i < str.length; i++){
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

