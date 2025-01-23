

const {JSDOM}=require('jsdom');

function getAllUrls(htmlBody,baseURL){
    const dom=new JSDOM(htmlBody);
    const urls=new Set();

    const linkelements=dom.window.document.getElementsByTagName('a');
    for(const element of linkelements){
        
        const url=element.href;
        if(!url)continue;

        try {

            const absoluteurl=new URL(url,baseURL).href;

            urls.add(absoluteurl);
        }
        catch(e){
            return 'enter valid url';
        }

        
    }
    return Array.from(urls);

}



function normalizeURL(urlstring) {
    try{
        const urlobj=new URL(urlstring);
        console.log(urlobj.href.toString().toLowerCase());
        const url=urlobj.href.toString().toLowerCase()

        if(url.endsWith('/')){
            return url.slice(0,-1)
        }
        return url;

    }catch(e){
        console.log(e.message);
        return 'enter valid url'
    }
}



module.exports={
    normalizeURL,
    getAllUrls,
}