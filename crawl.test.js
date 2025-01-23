const{normalizeURL}=require("./crawl.js");


const {test,expect} = require('@jest/globals');


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