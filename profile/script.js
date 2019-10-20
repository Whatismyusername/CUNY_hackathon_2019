var username = localStorage.getItem('username');
var password = localStorage.getItem('password');

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
let mode = 'visitor';
$('document').ready(function(){
    $('#editor').hide();
    

    firebaseRef.on('value', snapshot =>{
        toVisitor(snapshot);
        $('#orgName').html(snapshot.child(username).child('organizationName').val());

        $('#changeMode').unbind('click');
        $('#changeMode').click(function(){
            console.log('Change Mode!')
            
            $('#editor').toggle();
            $('#visitor').toggle();
            if(mode === 'visitor'){
                mode = 'editor';
                $('#changeMode').html('Switch to Visitor Mode');
                toEditor(snapshot);
                $('#serviceInput').show();
                $('#requirementInput').show();
                $('#saveR').show();
                $('#saveS').show();
            }else if(mode === 'editor'){
                mode = 'visitor';
                $('#changeMode').html('Switch to Editor Mode');
                toVisitor(snapshot);
            }
            $('#changeMode').prop('disabled', true);
            setTimeout(function(){
                $('#changeMode').prop('disabled', false);
            }, 500);
        })

        $('#saveR').click(function(){
            if($('#requirementInput').val() != ''){
                firebaseRef.child(username).child('data').child('requirement').push({
                    'requirement': $('#requirementInput').val()
                })
                $('#requirementInputDiv').append('<li>' + $('#requirementInput').val() + '</li>');
                $('#requirementInput').val('');
                
            }
        
            
            $('#requirementInput').hide();
            $('#saveR').hide();
        })
        $('#saveS').click(function(){
            if($('#serviceInput').val() != ''){
                firebaseRef.child(username).child('data').child('service').push({
                    'service': $('#serviceInput').val()
                })
                $('#serviceInputDiv').append('<li>' + $('#serviceInput').val() + '</li>');
                $('#serviceInput').val('');
            }
            
            $('#serviceInput').hide();
            $('#saveS').hide();
        })
        $('#saveM').click(function(){
            firebaseRef.child(username).child('data').update({
                'maxPopulation': $('#maxPopInput').val()
            })
        })
        $('#saveC').click(function(){
            firebaseRef.child(username).child('data').update({
                'currentPopulation': $('#currentPopInput').val()
            })
        })
    })
    
})

function toEditor(snapshot){
    if(snapshot.child(username).child('data').child('currentPopulation').val() != null){
        $('#currentPopInput').val(snapshot.child(username).child('data').child('currentPopulation').val());
    }
    if(snapshot.child(username).child('data').child('maxPopulation').val() != null){
        $('#maxPopInput').val(snapshot.child(username).child('data').child('maxPopulation').val());
    }
    if(snapshot.child(username).child('data').child('service').val() != null){
        let obj = Object.keys(snapshot.child(username).child('data').child('service').val());
        let content = '';
        for(var i = 0; i < obj.length; i++){
            content += ('<li>' + snapshot.child(username).child('data').child('service').child(obj[i]).child('service').val()  + '</ul>');
        }
        
        $('#serviceInputDiv').html(content);
    }
    if(snapshot.child(username).child('data').child('requirement').val() != null){
        let obj = Object.keys(snapshot.child(username).child('data').child('requirement').val());
        let content = '';
        for(var i = 0; i < obj.length; i++){
            content += ('<li>' + snapshot.child(username).child('data').child('requirement').child(obj[i]).child('requirement').val()  + '</li>');
        }
        
        $('#requirementInputDiv').html(content);
    }
}

function toVisitor(snapshot){
    console.log(snapshot)
    if(snapshot.child(username).child('data').child('currentPopulation').val() != null){
        $('#currentPop').html(snapshot.child(username).child('data').child('currentPopulation').val());
    } else{
        $('#currentPop').html('N/A');
    }

    if(snapshot.child(username).child('data').child('maxPopulation').val() != null){
        $('#maxPop').html(snapshot.child(username).child('data').child('maxPopulation').val());
    }else{
        $('#maxPop').html('N/A');
    }

    if(snapshot.child(username).child('data').child('service').val() != null){
        let obj = Object.keys(snapshot.child(username).child('data').child('service').val());
        let content = '';
        for(var i = 0; i < obj.length; i++){
            content += ('<li>' + snapshot.child(username).child('data').child('service').child(obj[i]).child('service').val()  + '</ul>');
        }
        
        $('#serviceDiv').html(content);
    } else{
        $('#serviceDiv').html('N/A');
    }
    
    if(snapshot.child(username).child('data').child('requirement').val() != null){
        let obj = Object.keys(snapshot.child(username).child('data').child('requirement').val());
        let content = '';
        for(var i = 0; i < obj.length; i++){
            content += ('<li>' + snapshot.child(username).child('data').child('requirement').child(obj[i]).child('requirement').val()  + '</li>');
        }
        
        $('#requirementDiv').html(content);
    } else{
        $('#requirementDiv').html('N/A');
    }
}
