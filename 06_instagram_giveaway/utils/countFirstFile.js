function countFirstFile(list){
    const firstFile=([...new Set(list[0])])
    const counter={};
    firstFile.forEach(item=>counter[item]=1)
    for(let i=1; i<list.length; i++){
        list[i].forEach(item=>{
            if(counter[item]){
                counter[item]++
            }
        })
    }
    return counter
}

module.exports=countFirstFile