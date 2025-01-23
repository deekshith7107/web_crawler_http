const{normalizeURL,getAllUrls}=require("./crawl.js");


const {test,expect} = require('@jest/globals');


//test for normalizing url

test('Valid url ',()=>{
    const input='some'

    const actual=normalizeURL(input)
    const expected='enter valid url'

    expect(actual).toEqual(expected)

})
test('normalize with case insensitive',()=>{
    const input1='HTTP://EXAMPLE.COM/PATH'
    const input2='http://example.com/path'

    const actual1=normalizeURL(input1)
    const actual2=normalizeURL(input2)

    expect(actual1).toEqual(actual2)
})

test('normalize with added slash',()=>{
    const input='http://example.com/path/'
    const actual=normalizeURL(input)
    const expected='http://example.com/path'

    expect(actual).toEqual(expected)
})





//test for getting all urls

test('get all urls',() => {

    const htmlbody=
    `
    <html>
        <body>
            <a href="http://example.com/path1">
                link1
            </a>
            <a href="http://example.com/path1/path2">
                link1
            </a>
        </body>
    </html>
    `

    const baseURL='http://example.com'
    const actual=getAllUrls(htmlbody,baseURL);
    const expected=['http://example.com/path1','http://example.com/path1/path2']
    expect(actual).toEqual(expected)
})

test('get all urls with relative urls',() => {
    const htmlbody=
    `
    <html>
        <body>
            <a href="path2">
                link1
            </a>
            <a href="path2/path3">4
                link1
            </a>
        </body>
    </html>
    `
    const baseURL='http://example.com'
    const actual=getAllUrls(htmlbody,baseURL);
    const expected=['http://example.com/path2', 'http://example.com/path2/path3']
    expect(actual).toEqual(expected)

})

