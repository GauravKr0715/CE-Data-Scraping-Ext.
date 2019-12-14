
var buttonOnPage = document.getElementById("somebutton");
buttonOnPage.addEventListener("click", test);

var micAccessButton = document.getElementById("micAccess");
// alert(micAccessButton);
micAccessButton.addEventListener("click", openMicPage);


var bTitle = document.getElementById("btitle");
var bURL = document.getElementById("burl");
var bImgURl = document.getElementById("bimgurl");
var bDesc = document.getElementById("bdesc");
var bImg = document.getElementById("BlogThumb");
var bchangeBut = document.getElementById("ranImg");

var picUpload = document.getElementById("uploadPic");
picUpload.addEventListener("change", function(e){
    const file = e.target.files[0];
    const imgnewURL = URL.createObjectURL(file);
    bImg.src = imgnewURL;
    bImgURl.value = imgnewURL;
});


bchangeBut.addEventListener("click", test);
let cliks = 0;

function enableBTN(){
    if(cliks){
        document.getElementById("ranImg").disabled = false;
    }
}




chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    //alert("popup.js reached");
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});

});    

// function RandomIgmGenerate(){

//     chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
//         //alert("popup.js reached");
//         var activeTab = tabs[0];
    
//         chrome.tabs.sendMessage(activeTab.id, {"message": "updateImg"});
    
//     });  

//         chrome.runtime.sendMessage({type: "getData"}, function (dataScraped){
//             //alert(dataScraped.mainTitle);
//             //bTitle.value = dataScraped.mainTitle;
//             bImgURl.value = dataScraped.imgsrc;
//             //bDesc.value = dataScraped.description;
//             //bURL.value = dataScraped.url;
//             bImg.src = dataScraped.imgsrc;
//         });

// }

function openMicPage() {
    //alert("hello?!");
    chrome.runtime.sendMessage({type: "openMicPage"});
}

function test(){
    cliks++;

    enableBTN();
    
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        //alert("popup.js reached");
        var activeTab = tabs[0];
    
        chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
    
    });  

        chrome.runtime.sendMessage({type: "getData"}, function (dataScraped){
            //alert(dataScraped.mainTitle);
            bTitle.value = dataScraped.mainTitle;
            bImgURl.value = dataScraped.imgsrc;
            bDesc.value = dataScraped.description;
            bURL.value = dataScraped.url;
            bImg.src = dataScraped.imgsrc;
        });

        // chrome.runtime.sendMessage({type: "openMicPage"}, function (greeting){
        //     alert("back to home");
        // });

    }



// function Response(dataScraped) {
//     alert(dataScraped.mainTitle);
// }        


// //Wire up event event handlers
// document.addEventListener("DOMContentLoaded", function(event) {
    

//     let paraOnPage = document.getElementById("paratobefilled");
// });

