function checkString(str){
    const str2  = str.split('')
    console.log(str2)
    for (let index = 0; index < str2.length; index++) {
        if (index %2 === 0  ){
            if(str[index] === 'd' || str[index] === 'D'){
                console.log( "The even Index of D is ",index)
            }
        }
       
        
    }
}
checkString("Diddimdr")