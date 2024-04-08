const testVariables = ["Gideon", "Ojieh", "Edet", "Adelaja"];

const taget = testVariables.find(testVariable => testVariable.slice(0, 1) === "G" );
console.log(taget);

const target = testVariables.find( testVariable => {
    const val = testVariable.slice(0, 1) === "E" 
    return val;
   
});

console.log(target);


const artistsByGenre = {
    jazz: ["Miles Davis", "John Coltrane"],
    rock: {
      classic: ["Bob Seger", "The Eagles"],
      hair: ["Def Leppard", "Whitesnake", "Poison"],
      alt: {
        classic: ["Pearl Jan", "The Killers"],
        curent: ["Joywave", "Sir Sly"],
      },
    },
    unclassified: {
      new: ["caamp", "Neil Young"],
      classic: ["Seal", "Morcheeba", "Chris Stapleton"],
    },
  };


  


 



  const getArtistNames = (dataObj) => {
    console.log(Object.keys(dataObj));
    Object.keys(dataObj).forEach((key) => {
        console.log("This is " + key);
        
      if (Array.isArray(dataObj[key])) {
        
        return (dataObj[key]).forEach((artist) => {
           console.log(artist);
        });
      }
      getArtistNames(dataObj[key]);
    });
    
  };
  
 //getArtistNames(artistsByGenre);


//  const fib = (num, arr = [0, 1]) => {
//    if(num <= 2) return arr;
//    const [nextTolast, last] = arr.slice(-2);
//    console.log(arr.slice(-2));
//    return fib(num -=1, [...arr, (nextTolast + last)]);
//  }

//  console.log(fib(8)); 

const fib = (num, array = [0, 1]) => {
  if (num <= 2) return array;
  const [nextToLast, last] = array.slice(-2);
  return fib(num - 1, [...array, nextToLast + last]);
};

//console.log(fib(8));

const fibPos = (num) =>{
  let arr = [0,1]

  for(let i=1; i<=num; i++){
      const [nextToLast, last] = arr.slice(-2);
      arr.push(nextToLast + last);
  }
  return arr;
}

//console.log(fibPos(8));


const fiboFunc = (num) => {
  let arr = [0, 1];

  while(num > 2){
    const [nextToLast, last] = arr.slice(-2);
    arr.push(nextToLast + last);
    num -= 1;

  }

  return arr;
}

//console.log(fiboFunc(8));




const names = ["Gideon", "Ojieh", "Edet", "Adelaja"];

 const func = () => {
   const target = names.filter(name => name !== "jjhh")
   console.log(target);
 }

 func()


