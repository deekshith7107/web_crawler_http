

const {JSDOM}=require('jsdom');




async function crawler(baseURL, curUrl,pages){
    
    const baseobj=new URL(baseURL);
    const curobj=new URL(curUrl);

    if(baseobj.hostname!==curobj.hostname){
        return pages;
    }

    const normalize_url=normalizeURL(curUrl);

    if(pages[normalize_url]>0){
        pages[normalize_url]++;
        return pages;
    }

    pages[normalize_url]=1;

    

    


    try{
        const res=await fetch(normalize_url);

        if(res.status>399){
            // console.log(`error: ${res.status} ,on pages :${curUrl}`);
            return pages;
        }

        const headers = res.headers.get('content-type');

        if(!headers.includes('text/html')){
            // console.log(`Non-html page: ${curUrl}`);
            return pages;
        }


        const body=await res.text();

        const urls=getAllUrls(body,normalize_url);

        for(const url of urls){
            pages=await crawler(normalize_url,url,pages);

        }
        
        return pages;


    }
    catch(e){
        
        console.log(`Error processing page: ${curUrl} ,Found ${e.message}`);
        
        return pages;
    }

}

function getAllUrls(htmlBody,baseURL){
    
    
    const dom=new JSDOM(htmlBody,{contentType:"text/html"});
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
        // console.log(urlobj.href.toString().toLowerCase());
        const url=urlobj.href.toString().toLowerCase()

        if(url.endsWith('/')){
            return url.slice(0,-1)
        }
        return url;

    }catch(e){
        // console.log(e.message);
        return 'enter valid url'
    }
}



module.exports={
    normalizeURL,
    getAllUrls,
    crawler,
}