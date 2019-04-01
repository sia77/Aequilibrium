
let land = [1,3,2,3,5,6,5,4,6,1,4];
//let land = [1,2,3,4,5,6,5,4,3,2,1,2];

function getSlopes(arr){

    let num_castle = 0;
    let len = arr.length;
    let slop = [];
    if(arr.length !=0){
        for(i = 0; i<len-1; i++){
        
            if(arr[i] < arr[i+1]){
                slop.push(1);
            }else if(arr[i] > arr[i+1]){
                slop.push(-1);
            }

            if(slop.length >=2){            
                if(slop[i-1] * slop[i] < 0){
                    num_castle++;                    
                }                    
            }
        }        
        num_castle++; //First array item
    }

  	return num_castle;
}

console.log("Number of castle(s): ", getSlopes(land));