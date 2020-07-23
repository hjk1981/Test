const example = require('./power_lotto_number');
const { ary, forInRight } = require('lodash');

// setting
const N_NUMBERS = 38;
//const SelectWeight ={countIndex:[8, 20, 38], select:[2, 2, 2]};
const SelectWeight ={countIndex:[4, 10, 19, 28, 34,  38], select:[1, 1,1,1,1,1]};

// get opend number history
const text = example.getText();


// count the number of occurrences of each number
const maxCount = text.number.length;
const startRange = (info) =>{
    const range = [];
    info.forEach(element => {
        const temp = element > maxCount ? maxCount:element; 
        range.push(temp);
    });
    return range;
};

const inputRange = [0, 30];
const range = startRange(inputRange);

// decide the weight of each number
const numberCount = new Array(N_NUMBERS+1).fill(1);
numberCount[0] = 0;
for (let index = range[0]; index < range[1]; index++) {
    for (let j = 2; j < text.number[index].length; j++) {
      // numberCount[text.number[index][j]] += (1+ 0.14*( range[1]- index)); 
       numberCount[text.number[index][j]] += (1);     
    
    }
}

// sort
const sortNumber = [];
for (let index = 0; index < numberCount.length; index++) {
    const obj =[ numberCount[index],index];
    sortNumber.push(obj);
}

sortNumber.sort(function(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }  
});
// delete number 0
delete sortNumber[sortNumber.length-1];

// Sort by high and low
let selectArea = new Array(SelectWeight.countIndex.length);
for (let index = 0; index < SelectWeight.countIndex.length; index++) {
    selectArea[index] = [];
}
for (let index = 0; index < sortNumber.length; index++) {
    for (let i = 0; i < SelectWeight.countIndex.length; i++) {
        if(index < SelectWeight.countIndex[i]){
            selectArea[i].push(sortNumber[index][1]);
            break;
        }        
    }
    // if(index < SelectWeight.countIndex[0]){
    //     selectArea[0].push(sortNumber[index][1]);
    // }
    // else if(index < SelectWeight.countIndex[1]){
    //     selectArea[1].push(sortNumber[index][1]);
    // }
    // else if(index < SelectWeight.countIndex[2]){
    //     selectArea[2].push(sortNumber[index][1]);
    // }
    // else if(index < SelectWeight.countIndex[3]){
    //     selectArea[3].push(sortNumber[index][1]);
    // }
    // else if(index < SelectWeight.countIndex[4]){
    //     selectArea[4].push(sortNumber[index][1]);
    // }
}

// random numbers and select six numbers of these numbers
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
let time = 0;
for (let count = 0; count < 8; count++) {

    const randNumber = [];
    for (let index = 0; index < selectArea.length; index++) {
        shuffle(selectArea[index]);
    }
    for (let index = 0; index < SelectWeight.select.length; index++) {
        for (let i = 0; i < SelectWeight.select[index]; i++) {
            randNumber.push(selectArea[index][i]);
        }
    }
    
    //
    randNumber.sort(function(a, b) {
        if (a === b) {
            return 0;
        }
        else {
            return (a< b) ? -1 : 1;
        }  
    });
   console.log(randNumber);


    // const bingoNumber = randNumber.filter(info=> info === text.number[inputRange[0]-1][2] || 
    //     info === text.number[inputRange[0]-1][3]  || info === text.number[inputRange[0]-1][4]  || info === text.number[inputRange[0]-1][5]  
    //     || info === text.number[inputRange[0]-1][6]  || info ===text.number[inputRange[0]-1][7]  );
    // if(bingoNumber.length >=4){
    //     time++;
    //     console.log(`time: ${time}, ${randNumber}, bingoNumber: ${bingoNumber.length}, hitRate: ${time*100/(count+1)} %`);    

    // }
}


