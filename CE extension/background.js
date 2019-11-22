// chrome.browserAction.onClicked.addListener(extensionCalled);

// function extensionCalled(tab){
//     let activeTab;
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         var activeTab = tabs[0].url;
//         //console.log(activeTab);
//     });

//     chrome.tabs.sendMessage(tab.id, {"text": "selectContent", "link": activeTab});
// }



let data;
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse){
        switch(message.type){
        case "sendData":
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                //alert(tabs[0].url);
                data["url"] = tabs[0].url;
            });
            data = message.data;
            break;

        case "getData":
            //alert("hello??");
            

            sendResponse(data);
            break; 
        // case "updateImg":
        //     data["imgsrc"] = message.data.imgsrc;       
    }
});