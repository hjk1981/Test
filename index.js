const example = require('./prizenumber');
const { ary, forInRight } = require('lodash');

// setting
const N_NUMBERS = 38;
const SelectWeigh ={countIndex:[8,30,38], select:[2,2,2]};

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

const inputRange = [0, 60];
const range = startRange(inputRange);

// decide the weight of each number
const numberCount = new Array(N_NUMBERS+1).fill(1);
numberCount[0] = 0;
for (let index = range[0]; index < range[1]; index++) {
    for (let j = 2; j < text.number[index].length; j++) {
        numberCount[text.number[index][j]] += (index - range[0] + 1);     
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
let selectArea = new Array(SelectWeigh.countIndex.length);
for (let index = 0; index < SelectWeigh.countIndex.length; index++) {
    selectArea[index] = [];
}
for (let index = 0; index < sortNumber.length; index++) {
    for (let i = 0; i < SelectWeigh.countIndex.length; i++) {
        if(index < SelectWeigh.countIndex[i]){
            selectArea[i].push(sortNumber[index][1]);
            break;
        }        
    }
    // if(index < SelectWeigh.countIndex[0]){
    //     selectArea[0].push(sortNumber[index][1]);
    // }
    // else if(index < SelectWeigh.countIndex[1]){
    //     selectArea[1].push(sortNumber[index][1]);
    // }
    // else if(index < SelectWeigh.countIndex[2]){
    //     selectArea[2].push(sortNumber[index][1]);
    // }
    // else if(index < SelectWeigh.countIndex[3]){
    //     selectArea[3].push(sortNumber[index][1]);
    // }
    // else if(index < SelectWeigh.countIndex[4]){
    //     selectArea[4].push(sortNumber[index][1]);
    // }
}

// random numbers and select six numbers of these numbers
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
const randNumber = [];
for (let index = 0; index < selectArea.length; index++) {
    shuffle(selectArea[index]);
}
for (let index = 0; index < SelectWeigh.select.length; index++) {
    for (let i = 0; i < SelectWeigh.select[index]; i++) {
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

