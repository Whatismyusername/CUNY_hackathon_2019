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

$('document').ready(function(){
    
    firebaseRef.on('value', function(snap){

        let orgName = false;
        let orgEmail = false;
        let orgPhone = false;
        let username = false;
        let pw1 = false;
        let pw2 = false;
    
        $('#organizationName').change(function(){
            if($('#organizationName').val().length > 0){
                orgName = true;
                $('#orgName').css('color', 'green');
                $('#orgName').html('Fancy!');
            } else{
                orgName = false;
                $('#orgName').css('color', 'red');
                $('#orgName').html('Hmmm...');
            }
            console.log(orgName);
        });
    
        $('#organizationEmail').change(function(){
            $('#orgEmail').css('color', 'red');
            $('#orgEmail').html('Email....?!');
            orgEmail = false;
            for(var i = 0; i < $('#organizationEmail').val().length; i++){
                if($('#organizationEmail').val()[i] === '@'){
                    $('#orgEmail').css('color', 'green');
                    $('#orgEmail').html('Email!');
                    orgEmail = true;
                } 
            }
            console.log(orgEmail)
        });
    
        $('#organizationPhone').change(function(){
            if($('#organizationPhone').val().length > 0){
                orgPhone = true;
            } else{
                orgPhone = false;
            }
            if($('#organizationPhone').val().length != 10){
                $('#phoneNum').css('color', 'orange');
                $('#phoneNum').html('You entered ' + $('#organizationPhone').val().length + ' digits, double check?')
            } else{
                $('#phoneNum').css('color', 'green');
                $('#phoneNum').html('Got it');
            }
            console.log(orgPhone)
        })
    
        $('#username').change(function(){
            if(snap.hasChild($('#username').val())){
                $('#usernameTaken').css('color', 'red');
                $('#usernameTaken').html($('#username').val() + ' is already taken, please try another username.');
                username = false;
            } else{
                $('#usernameTaken').css('color', 'green');
                $('#usernameTaken').html('You can use this username!');
                username = true;
            }
            if(isNewUsername($('#username').val()) === 'lol'){
                
                username = true;
            } else{
                
                username = false; 
            }
    
            console.log(username)
        })
    
        $('#pw1').change(function(){
            let security = checkSecurityLevel($('#pw1').val());
            $('#securityLevel').html('Your Security Level: ' + security[0] + ' ');
            if(security[1].length > 0){
                $('#securityLevel').append('Try to ')
                for(var i = 0; i < security[1].length; i++){
                    $('#securityLevel').append(security[1][i] + ', ');
                }
                pw1 = false;
            } else{
                $('#securityLevel').append('&#128077; Good to go!');
                pw1 = true;
            }
            if(security[0] <= 2){
                $('#securityLevel').css('color', 'red')
            }else if(security[0] <= 4){
                $('#securityLevel').css('color', 'orange')
            }else{
                $('#securityLevel').css('color', 'green')
            }
            console.log(pw1)
        })
    
        $('#pw2').change(function(){
            if($('#pw1').val() === $('#pw2').val()){
                $('#matchPw').css('color', 'green');
                $('#matchPw').html('Okay');
                pw2 = true;
            } else{
                $('#matchPw').css('color', 'red');
                $('#matchPw').html('Uh-um');
                pw2 = false;
            }
            console.log(pw2)
        })
    
        $('#submitRegistration').click(function(){
            if(orgName && orgEmail && orgPhone && pw1 && pw2){
                let orgNameVal = $('#organizationName').val();
                let orgEmailVal = $('#organizationEmail').val();
                let orgPhoneVal = $('#organizationPhone').val();
                let usernameVal = $('#username').val();
                let passwordVal = hash($('#pw1').val());
    
                firebaseRef.child(usernameVal).set({
                    'password': passwordVal,
                    'organizationName': orgNameVal,
                    'organizationEmail': orgEmailVal,
                    'organizationPhoneNumber': orgPhoneVal
                })

            }
            
        })
    
    })
    
})

function checkSecurityLevel(pw){
    let securityLevel = 0;
    let toDo = [];
    let hasAlpha = false
    let isLengthy = false;
    let hasSpecialLetter = false;
    let hasNumber = false;
    let hasCapital = false;
    if(pw.length > 10){
        isLengthy = true
    }
    for(var i = 0; i < pw.length; i++){
        if($.isNumeric(pw[i])){
            hasNumber = true
        } else if(/^[a-zA-Z()]+$/.test(pw[i])){
            hasAlpha = true
            if(/^[A-Z()]+$/.test(pw[i])){
                hasCapital = true
            }
        } else{
            hasSpecialLetter = true
        }
    }
    if(hasAlpha == false){
        toDo.push('include at least one alphabet');
    } else{
        securityLevel++;
    }
    if(isLengthy == false){
        toDo.push('make it longer');
    } else{
        securityLevel++;
    }
    if(hasSpecialLetter == false){
        toDo.push('include at least one special letter');
    } else{
        securityLevel++;
    }
    if(hasNumber == false){
        toDo.push('include at least one number')
    } else{
        securityLevel++;
    }
    if(hasCapital == false){
        toDo.push('include at least one capital letter')
    } else{
        securityLevel++;
    }
    return [securityLevel, toDo];
}