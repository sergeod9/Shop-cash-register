function checkCashRegister(price, cash, cid) {
  const changeArray =[]
  // Calculate remainder
  let remainder = +(cash - price).toFixed(2);
  /* use provided cid to produce an array, were instead of "Penny", 
  "Nickel" were number values compared to dollar are used, and second
  value is the amount of that Currency Unit available (how many bills or coins)*/
  let billsAndCoins = [];
  cid.forEach(item =>{
    switch(item[0]){
      case "PENNY":
            billsAndCoins.push([0.01,item[1]*100]);
            break;
      case "NICKEL": 
            billsAndCoins.push([0.05,item[1]*20]);
            break;
      case "DIME":
            billsAndCoins.push([0.1,item[1]*10]);
            break;
      case "QUARTER":
            billsAndCoins.push([0.25,item[1]*4]);
            break;
      case "ONE":
            billsAndCoins.push([1,item[1]]);
            break;
      case "FIVE":
            billsAndCoins.push([5,item[1]/5]);
            break;
      case "TEN":
            billsAndCoins.push([10,item[1]/10]);
            break;
      case "TWENTY":
            billsAndCoins.push([20,item[1]/20]);
            break;
      case "ONE HUNDRED":
            billsAndCoins.push([100,item[1]/100]);
            break;      
    }
  })
  billsAndCoins.reverse();
  // Calculate sum of all cash in drawer (cid)
  let sumCid = billsAndCoins.reduce((sum, amount) =>{
    return sum + (amount[0]*amount[1]);
  },0);
  // Due to javascript flowed float numbers calculations, the next line is necessary
  sumCid = +sumCid.toFixed(2);


  // return status to CLOSED if amount in cid is equal to remainder
  if(sumCid === remainder){
    return {status: "CLOSED", change: cid}
  }
  // return status to INSUFFICIENT_FUNDS if cid is less than remainder
  if(sumCid < remainder){
      return {status: "INSUFFICIENT_FUNDS", change:[]};
    }
  // Calculate remainder in Currency Units, larger amounts first
  billsAndCoins.forEach(bill=>{
      let billValue = bill[0];
      let availableBills = bill[1]
      // if the remainder is larger than or equals the value of the unit/bill
      if(remainder >= billValue){
          let billsToReturn = Math.floor(remainder/billValue);
          // if enough units available
          let billsDifference = availableBills - billsToReturn;
          if(billsDifference >= 0){
                        // deduct the amount of units from bills and coins array
            availableBills -= billsToReturn;
            // amend changeArray array
            changeArray.push([billValue,+(billsToReturn*billValue).toFixed(2)]);
            // deduct the value from the remainder
            remainder = +(remainder - billsToReturn*billValue).toFixed(2);
          }
          else if (billsDifference <= 0){
            // deduct the amount of available units from remainder
            remainder = +(remainder - billValue*availableBills).toFixed(2);
            // set all available units to changeArray array
            changeArray.push([billValue,+(availableBills*billValue).toFixed(2)]);
            // update the bills and coins array, this bill is out
            bill[1] = 0;//available bills
          }
          // in case not enough available bills to return
          // else{
          //   return {status: "INSUFFICIENT_FUNDS", change:[]};
          // }
      }
  });
  // If after this, there's still some remainder, that means there are not enough bills
  if (remainder > 0){
    return {status: "INSUFFICIENT_FUNDS", change:[]};
  }
  /* now we need to update the changeArray array to have strings for first input
    because that what we need to return, so replace 0.01 by "PENNY" ... etc*/
    changeArray.forEach(item => {
      switch(item[0]){
        case 0.01:
          item[0] = "PENNY";
          break;
        case 0.05:
          item[0] = "NICKEL";
          break;
        case 0.1:
          item[0] = "DIME";
          break;
        case 0.25:
          item[0] = "QUARTER";
          break;
        case 1:
          item[0] = "ONE";
          break;
        case 5:
          item[0] = "FIVE";
          break;
        case 10:
          item[0] = "TEN";
          break;
        case 20:
          item[0] = "TWENTY";
          break;
        case 100:
          item[0] = "ONE HUNDRED";
          break;          
      } 
    })
  // return status to OPEN with the amount in Currency Units
  return {status:"OPEN",change:changeArray};
}
// Test
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
