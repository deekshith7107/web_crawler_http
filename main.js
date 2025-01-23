const {crawler}=require("./crawl.js");


async function main(){

    if(process.argv.length<3){
        console.log("Please provide an url as a command line argument.");
        process.exit(1);
        
    }
    if(process.argv.length>3){
        console.log(process.argv);
        process.exit(1);
        
    }

    let url=process.argv[2];

    
    pages=await crawler(url,url,{});
    


    for(const page of Object.entries(pages)){
        console.log(`link count :${page[1]} on page : ${page[0]}`);
    }
    
    return "crawling is done";
}

main()
.then(res=>{
    console.log(res);
})
.catch(err =>{
    console.log(err.message);
});

