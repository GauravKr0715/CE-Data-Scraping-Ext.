// function alertMethod(){
//     alert("hello");
// }

var mainTitle, description, imgURL;

var imgsrc = [];

let scrapedData;
chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(request, sender, sendResponse) {
    if (request.message === "start") {

         let mtitle = document.getElementsByTagName('title');
            mainTitle = mtitle[0].innerHTML;

       
        let content = document.getElementsByTagName('p');
        for(let i = 0; content[i]!=null; i++){
            if(content[i].innerHTML.length > 100){
                description = content[i].innerHTML;
                break;
            }
        }
    
        let img = document.getElementsByTagName('img');
        let j = 0;
        for(let i = 0; img[i]!= null; i++) {
            if(img[i].width > 450)
                if(img[i].height > 300){
                    //console.log(img[i]);
                    imgsrc.push(img[i].src);
                    console.log(imgsrc[j]);
                    j++;
                }
        }
      

        imgURL = getRandomImgUrl(imgsrc);
        //alert(imgURL);

                
            // let url = message.link;

           


            // mainTitle = "Some example title of the Blog - someBlogger";
           

            

            // description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis arcu malesuada magna vestibulum, eu venenatis dolor faucibus. Donec semper et urna at dignissim. Nam volutpat finibus urna ut tincidunt. Donec sed turpis erat. Donec suscipit elit ut augue accumsan gravida sed at urna. Phasellus at risus nibh. Fusce at erat a nisl placerat vestibulum. Curabitur ac augue id odio ullamcorper congue. Nulla ut enim vitae erat aliquam fringilla id eget sem. Quisque nec congue elit. Quisque sodales, turpis et fermentum laoreet, ex diam fringilla ipsum, ultrices aliquet quam turpis at nibh. Nulla id volutpat nisi, ut posuere nibh. Morbi ullamcorper diam ac neque lobortis, quis tempor felis mattis. Quisque tempus odio quis urna volutpat, aliquam porta lectus ultrices.";

            // imgsrc = "https://www.somewebsite.com/images/default.png";

            
            
            let scrapedData = {
                "mainTitle" : mainTitle,
                "description" : description,
                "imgsrc" : imgURL
            };
            //alert("content.js reached!!");
            console.log(scrapedData);

            // chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            //     console.log(tabs[0].url);
            // })
            
            chrome.runtime.sendMessage({type: "sendData", data: scrapedData});

            

            
            
            // // console.log(url);
            // console.log(mainTitle);
            // console.log(imgsrc);
            // console.log(description);


        
            

    };

    // if(request.message === "updateImg"){
        
    //     let imgURL = getRandomImgUrl(imgsrc);

    //     scrapedData["imgsrc"] = imgURL;

    //     chrome.runtime.sendMessage({type: "sendData", data: scrapedData});


    // };
};

function start(){
    alert(mainTitle + "\n\n" +  description + "\n\n" +  imgsrc);
}


function getRandomImgUrl(imagesrcs) {
    let rannum = Math.floor(Math.random() * imagesrcs.length);
    let IMGURL = imagesrcs[rannum];
    return IMGURL;
}

// function test(){
//     alert("hello");
//     document.getElementById("bId").value = mainTitle;
// }
