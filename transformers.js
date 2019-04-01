const type = ['Autobot', 'Decepticon'];
const specialName = ["Optimus Prime", "Predaking"];
//let alphabet = [];

var Decepticons = [];
var Autobots = [];
var num_battles = 0;


class Utility{
    //Alphabet generation
    static genListOfAlphabet(charA, charZ) {
        var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    }

    static nameGenerator(){
        let alphabet = this.genListOfAlphabet('a', 'z');
		return  alphabet[this.getRandInt(0, alphabet.length-1)].toUpperCase() +
				alphabet[this.getRandInt(0, alphabet.length-1)] +
				alphabet[this.getRandInt(0, alphabet.length-1)] +
				alphabet[this.getRandInt(0, alphabet.length-1)];
    }

    static getRandInt(min, max){
		min = Math.ceil(min);
	  	max = Math.floor(max);
	  	return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static sortArrayOfObj(arr, field){
        arr.sort((obj1,obj2) => obj2[field] - obj1[field]);
    }
}

class Transformer {

	constructor(min, max, typeMin, typeMax){
		this.strength = Utility.getRandInt(min, max);
		this.intelligence =Utility.getRandInt(min, max);
		this.speed = Utility.getRandInt(min, max);
		this.endurance = Utility.getRandInt(min, max);
		this.rank = Utility.getRandInt(min, max);
		this.courage = Utility.getRandInt(min, max);
		this.firepower = Utility.getRandInt(min, max);
		this.skill = Utility.getRandInt(min, max);
		this.type = type[Utility.getRandInt(typeMin, typeMax)];
		this.overalRating = this.overalRating();
		this.name = Utility.nameGenerator();
        this.result = "";        
    }

    overalRating(){
		return (this.strength + this.intelligence + this.speed + this.endurance + this.firepower);
	}
}

function createTransformers(num){
    
	for(i=0 ; i < num ; i++){
        oneTransformer = new Transformer(1, 10, 0, 1);

		if(oneTransformer.type == type[0] ){
			if(oneTransformer.name == specialName[0]){
				oneTransformer.name = specialName[0];
			}
			Autobots.push(oneTransformer);
		}else{
			if(oneTransformer.name == specialName[1]){
				oneTransformer.name = specialName[1];
			}
			Decepticons.push(oneTransformer);
		}
    }

    Utility.sortArrayOfObj(Autobots, "rank");
    Utility.sortArrayOfObj(Decepticons, "rank");
	
}

function unleashHell(){
    let i = 0;

	if(Autobots.length == 0) {
        Autobots.forEach((element) => {element.result = 'loss'});
        Decepticons.forEach((element) => {element.result = 'win'});		
	}else if(Decepticons.length == 0){
        Autobots.forEach((element) => {element.result = 'win'});
        Decepticons.forEach((element) => {element.result = 'loss'});		
	}else{
		num_of_possible_fights = (Autobots.length > Decepticons.length )? Decepticons.length : Autobots.length;
		
		for(i; i<num_of_possible_fights ; i++ ){
			/*
			In the event either of the above face each other (or a duplicate of each other), 
			the game immediately ends with all competitors destroyed
			*/
			if( Autobots[i].name == specialName[0] && 
				Decepticons[i].name == specialName[1] ){
					Autobots.forEach((element) => {element.result = 'loss';})
					Decepticons.forEach((element) => {element.result = 'loss';})                    
                    break;				
			}

            // Any Transformer named Optimus Prime or Predaking wins his fight automatically regardless of
            // any other criteria

			if(Autobots[i].result == "" && Decepticons[i].result == ""){ //To prevent an override of battle result...

				if(Autobots[i].name == specialName[0] ){
					Autobots[i].result = "win";
                    Decepticons[i].result = "loss";
                    continue;
				}

				if(Decepticons[i].name == specialName[1]){
					Autobots[i].result = "loss";
                    Decepticons[i].result = "win";
                    continue;                    
                }
			}

			if(Autobots[i].result == "" && Decepticons[i].result == ""){

				// If any fighter is down 4 or more points of courage and 3 or more points of strength 
                // compared to their opponent, the opponent automatically wins                
                
                if  ((Autobots[i].courage - Decepticons[i].courage) >=4 &&
                     (Autobots[i].strength - Decepticons[i].strength) >=3
                ){
                    Autobots[i].result = "win";
                    Decepticons[i].result = "loss";
                    continue;
                }
                else if(
                    (Decepticons[i].courage - Autobots[i].courage ) >=4 &&
                     (Decepticons[i].strength - Autobots[i].strength ) >=3
                ){
					Autobots[i].result = "loss";
                    Decepticons[i].result = "win";
                    continue;
                }               
			}

			if(Autobots[i].result == "" && Decepticons[i].result == ""){
				// If one of the fighters is 3 or more points of skill above their opponent, they win
				if( (Autobots[i].skill - Decepticons[i].skill)>=3){
					Autobots[i].result = "win";
                    Decepticons[i].result = "loss";
                    continue;                    
                }
                else if( (Decepticons[i].skill - Autobots[i].skill )>=3 ){
					Autobots[i].result = "loss";
                    Decepticons[i].result = "win";
                    continue;
                }
			}

			if(Autobots[i].result == "" && Decepticons[i].result == ""){
				if((Autobots[i].overalRating - Decepticons[i].overalRating)>0 ){
					Autobots[i].result = "win";
                    Decepticons[i].result = "loss";
                    continue;                    
                }
                else if( (Autobots[i].overalRating - Decepticons[i].overalRating)<0 ){
					Autobots[i].result = "loss";
                    Decepticons[i].result = "win";
                    continue;                    
                }else{  // In case of a tie
                    Autobots[i].result = "loss";
                    Decepticons[i].result = "loss";
                    continue;
                }                
			}		

		}
    }
    
    return i; //fight battles.

}

function displayResult(num_of_battles){

    let winingTeam = "";
    let losingTeam = "";
    let winnersName = "";
    let survivorsName = "";

    const autobotsResult = Autobots.reduce((result, el) => {
        if (el.result == 'win') { result[0].push(el.name) }        
        if (el.result == '') {result[1].push(el.name)}
        return result;
        }, [[],[]]);

    const decepticonsResult = Decepticons.reduce((result, el) => {
        if (el.result == 'win') { result[0].push(el.name) }        
        if (el.result == '') {result[1].push(el.name)}
        return result;
        }, [[],[]]);

    if(autobotsResult[0].length > decepticonsResult[0].length ){
        winingTeam = "Autobots";
        losingTeam = "Decepticons";
        winnersName = autobotsResult[0].join(", ");
        if(decepticonsResult[1].length !=0){
            survivorsName = decepticonsResult[1].join(", ");
        }else{
            survivorsName = "No Survivors!"
        }
        
    }else if(autobotsResult[0].length < decepticonsResult[0].length){
        winingTeam = "Decepticons";
        losingTeam = "Autobots";
        winnersName = decepticonsResult[0].join(", ");
        if(autobotsResult[1].length != 0){
            survivorsName = autobotsResult[1].join(", ");
        }else{
            survivorsName = "No Survivors!"
        }
        
    }else{
        winingTeam = "It's a tie as a group"; //Not enough instruction on to handle this situation the best...
        losingTeam = "It's a tie as a group"; 
    }    

    console.log(num_of_battles + " Battle(s)");
    console.log("Wining Team ("+ winingTeam  +"): ", winnersName );
    console.log("Survivors from the losing team ("+ losingTeam +"): ", survivorsName);   

}

/*
a. The number of battles
b. The winning team
c. The surviving members of the losing team
*/

;(function(){

    createTransformers(15);
	displayResult(unleashHell());

})();