
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
}