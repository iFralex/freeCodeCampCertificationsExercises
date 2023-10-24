//////////////////////////////////
/*
|| See the certification: https://www.freecodecamp.org/certification/iFralex/javascript-algorithms-and-data-structures ||

===== REQUESTS FOR THE EXERCISE =====

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit |	Amount
Penny	| $0.01 (PENNY)
Nickel | $0.05 (NICKEL)
Dime | $0.1 (DIME)
Quarter | $0.25 (QUARTER)
Dollar | $1 (ONE)
Five Dollars | $5 (FIVE)
Ten Dollars | $10 (TEN)

Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/
//////////////////////////////////

function checkCashRegister(price, cash, cid) {
  let _cid = [...cid]
  cid = cid.reverse()
  let div = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]
  for (let i = div.length - 1; i >= 0; i--)
    if (cid[i][1] == 0) {
      cid.splice(i, 1)
      div.splice(i, 1)
    }
  let d = cash - price
  if (d > cid.reduce((_s, _a) => _s + _a[1], 0))
    return { status: "INSUFFICIENT_FUNDS", change: [] }
  let arr = []
  for (; d >= 0;) {
    d = Math.round(d * 100) / 100
    if (cid.length == 0)
      break;
    for (let i = 0; i < cid.length; i++) {
      if (cid[i][1] - d < 0) {
        arr.push([cid[i][0], (cid[i][1] > d ? d : cid[i][1])])
        d -= cid[i][1]
        console.log("y ", cid[i], d)
        cid.splice(i, 1)
        div.splice(i, 1)
        break
      }
      else {
        let n = cid[i][1] / div[i]
        console.log(n, cid[i][1], div[i])
        console.log("1aaaaa ", cid, d)
        for (let _i = 2; _i <= n; _i++)
          if (div[i] * _i > d && div[i] * (_i - 1) <= d) {
            arr.push([cid[i][0], div[i] * (_i - 1)])
            d -= (div[i] * (_i - 1))
            break
          }
          else if (div[i] * _i == d) {
            d = 0
            arr.push([cid[i][0], div[i] * _i])
            break
          }
        //console.log("2aaaaa ", cid, i)
        cid.splice(i, 1)
        div.splice(i, 1)
        break
      }
    }
  }
  console.log(arr.reduce((a, b) => a + b[1], 0), _cid.reduce((a, b) => a + b[1], 0))
  if (d == 0 && arr.reduce((a, b) => a + b[1], 0) != _cid.reduce((a, b) => a + b[1], 0))
    return { status: "OPEN", change: arr }
  else if (d != 0)
    return { status: "INSUFFICIENT_FUNDS", change: [] }

  return { status: "CLOSED", change: _cid }
}

//console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))

//console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))