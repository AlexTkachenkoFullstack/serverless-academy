const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

function getData() {
    readline.question('Enter words or numbers separated by spaces:', (data) => {
    if (data === 'exit') {
        console.log('Goodbye. Come back again');
        process.exit()
    }
    sortByСhoice(data.split(' '));
  });
}

function sortByСhoice(data) {
  
    readline.question('What operation to do with words and numbers: \n1.Sort words alphabetically; \n2.Show numbers from lesser to greater; \n3.Show numbers from bigger to smaller; \n4.Display words in ascending order by number of letters in the word; \n5.Show only unique words; \n6.Display only unique values from the set of words and numbers entered by the user. \nSelect (1-6) or enter "exit" and press ENTER:', (option)=>{
      let result;
      switch(option){
        case '1':
          result=[...data].filter(item=>isNaN(item)).sort((a,b)=>a.localeCompare(b));
          break;
        case '2':
          result=[...data].filter(item=>!isNaN(item)).sort((a,b)=>a-b);
          break;
        case '3':
          result=[...data].filter(item=>!isNaN(item)).sort((a,b)=>b-a);
          break;
        case '4':
          result=[...data].filter(item=>isNaN(item)).sort((a,b)=>a.length-b.length);
          break;
        case '5':
          result=data.filter((item, index, array)=>isNaN(item) && index===array.indexOf(item));
          break;
        case '6':
          result=data.filter((item, index, array)=>index===array.indexOf(item));
          break;
        case 'exit':
          console.log('Goodbye. Come back again');
          process.exit()
        default:
          result='You entered an incorrect option' 
      }
      console.log(result);
      getData();
    })
}

getData();
