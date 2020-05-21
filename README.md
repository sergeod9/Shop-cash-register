# Shop-cash-register

<p>This is my solution to the last project in Free Code Camp, Javascript Algorithms and Data Structures certificate, below are the conditions provided by FCC:</p>
<hr />
<h2>Free Code Camp, JavaScript Algorithms and Data Structures Projects: Cash Register</h2>
<p>
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
</p>
<hr>

<p>So in few words the function takes 3 values, the price, the paid amount, and the available bills and coins in the drawer, the cash in drawer argument is an array of arrays each item of the array has 2 values, the first is a string as "PENNY" or "NICKEL", the second value is the amount available of that bill or coin in dollars, an example :</p>
<code>checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);</code>
