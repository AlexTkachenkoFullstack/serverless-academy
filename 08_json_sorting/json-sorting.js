const axios = require("axios");
const urlList=[
'https://jsonbase.com/sls-team/json-793',
'https://jsonbase.com/sls-team/json-955',
'https://jsonbase.com/sls-team/json-231',
'https://jsonbase.com/sls-team/json-931',
'https://jsonbase.com/sls-team/json-93',
'https://jsonbase.com/sls-team/json-342',
'https://jsonbase.com/sls-team/json-770',
'https://jsonbase.com/sls-team/json-491',
'https://jsonbase.com/sls-team/json-281',
'https://jsonbase.com/sls-team/json-718',
'https://jsonbase.com/sls-team/json-310',
'https://jsonbase.com/sls-team/json-806',
'https://jsonbase.com/sls-team/json-469',
'https://jsonbase.com/sls-team/json-258',
'https://jsonbase.com/sls-team/json-516',
'https://jsonbase.com/sls-team/json-79',
'https://jsonbase.com/sls-team/json-706',
'https://jsonbase.com/sls-team/json-521',
'https://jsonbase.com/sls-team/json-350',
'https://jsonbase.com/sls-team/json-64'
]

let totalTrue=0;
let totalFalse=0;

async function fetch(list){
    for(const url of urlList){
    let errorCouner=0;    
    await getResponse(url, errorCouner)
    }
    console.log("Found True values:", totalTrue,",\n"+"Found False values:", totalFalse)
}

function findIsDone(data, url){
    if(data && typeof data==='object' && !Array.isArray(data)){
    for(const key in data){
            if(data[key].hasOwnProperty('isDone')){
                console.log(`[Success] ${url}: isDone - `, data[key].isDone)
                countIsDone(data[key].isDone)
            }else{
                findIsDone(data[key], url)
            }
    }
    }}

async function getResponse(url, errorCounter){
    try{
    const respons= await axios(url);
        if(respons?.data?.isDone){
            console.log(`[Success] ${url}: isDone - `, respons.data.isDone)
            countIsDone(respons.data.isDone)
        }else{
            findIsDone(respons.data, url)
        }
    }catch(error){
        if(errorCounter<3){
            errorCounter++
            await getResponse(url, errorCounter)
            return
        }
        console.log('[Fail]', url,': The endpoint is unavailable')
    }
}

function countIsDone(value){
    switch(value){
        case true:
            totalTrue++
            break 
        case false:
            totalFalse++
            break
        default:return      
    }   
}

fetch(urlList)

