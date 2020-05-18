// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAxwHDj4U_e7JjoC3GX6h7kJeNS00nUvTI",
    authDomain: "hangouts-emote.firebaseapp.com",
    databaseURL: "https://hangouts-emote.firebaseio.com",
    projectId: "hangouts-emote",
    storageBucket: "hangouts-emote.appspot.com",
    messagingSenderId: "643541616245",
    appId: "1:643541616245:web:19612c7ca6560de4059a3c",
    measurementId: "G-DYNKCENQX1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const db = firebase.firestore() 

let seen = new Set();
var USERNAME = ""
var MEETING_ID = "" 
var HREF = window.location.href

//extract meeting id 
function getMeetingID(){
    switch(window.location.hostname){ 
        case "hangouts.google.com":
            var regex = /\/call\/(.*)$/g 
            MEETING_ID = regex.exec(window.location.pathname)["1"]
            break;
        case "meet.google.com":
            var regex = /(?:.*)\/(.*)$/g
            MEETING_ID = regex.exec(window.location.pathname)["1"]
            break;
    }
    console.log("Meeting ID detected: ", MEETING_ID)    
}

//start real-time listener
function setListener(){
    
    if (MEETING_ID == ""){
        console.log("Cannot set listener because the MEETING_ID is not set")
        return
    }

    db.collection("meetings").doc(MEETING_ID).collection("emotes").onSnapshot( snapshot => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data())
            if ( seen.has(doc.id) == false && Date.now() - doc.data()["send_time"] < 5*1000){
                showEmoji(doc.data()["sender"])
                seen.add(doc.id)
            }
        })
    })
}

// post like
function postEmote(sender){
    let data = {
        sender: sender,
        send_time: Date.now()
    }
    db.collection('meetings').doc(MEETING_ID).collection("emotes").add(data)
}

// delete all 
function wipeDB(){
    db.collection("meetings").doc("test-meeting-1").collection("emotes").onSnapshot( snapshot => {
        let batch = db.batch()
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref)
        })
        batch.commit()
    })
}

function showEmoji(name) {
    let div = document.createElement('div')
    div.id = "animate"
    div.style.fontSize = "20px"
    div.style.left = Math.random()*1000 + "px"
    div.style.zIndex = "9000000"
    div.style.position ="absolute"
    div.innerHTML = `<div>👍</div><div>${name}</div>`
    

    document.body.append(div)
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (div.offsetTop <= -100) {
            clearInterval(id);
        } else {
        pos += 2; 
            div.style.bottom = pos + "px";
        }
    }
}

//Main Execution
function main(){

    getMeetingID() 
    setListener()

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'l') {
        console.log("keydetected")
        postEmote(USERNAME)
        }
    })

    chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
                case "updateName":
                    USERNAME = message.content
                    sendResponse(message.content)
                break;
            }
        }
    )
}

// function debug(){
//     console.log(window.location.pathname)
// }

// function pollHref(){
//     if (window.location.href != HREF){ 
//         HREF = window.location.href
//         main()
//     }
//     else{
//         console.log("no changes")
//     }
// }

main()
// setInterval(pollHref, 3000)