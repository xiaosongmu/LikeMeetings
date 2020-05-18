
document.getElementById("submit").addEventListener("click", setName);

function setName(){
    name = document.getElementById("nameField").textContent
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"updateName", content: document.getElementById("nameField").value}, function(response){
            document.getElementById("nameLabel").textContent = response
        });
    });
    
}

