#! /usr/bin/env node
import inquirer from "inquirer";
// Initialize user balance and pin code
let myBalance = 50000;
let myPin = 2321;
// Print welcome message
console.log("Welcome to ISHA's ATM machine");
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Enter your pin code:"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log("Pin is correct, login successfully");
    console.log(`Current account balance is ${myBalance}`);
    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance", 'Fast Cash']
        },
    ]);
    if (operationAnswer.operation === "Withdraw Amount") {
        let amountAnswer = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "Enter the amount to withdraw:"
            },
        ]);
        if (amountAnswer.amount > myBalance) {
            console.log("Insufficient Balance");
        }
        else {
            myBalance -= amountAnswer.amount;
            console.log(`${amountAnswer.amount} withdrawn successfully`);
            console.log(`Your remaining balance is: ${myBalance}`);
        }
    }
    else if (operationAnswer.operation === "Check Balance") {
        console.log(`Your current Balance is: ${myBalance}`);
    }
    else if (operationAnswer.operation === "Fast Cash") {
        let fastCash = await inquirer.prompt([
            {
                name: "cashAns",
                type: "list",
                message: "Choose amount you want to withdraw quickly",
                choices: [500, 1000, 5000, 10000]
            }
        ]);
        myBalance -= fastCash.cashAns;
        console.log(`Your remaining balance is: ${myBalance}`);
    }
}
else {
    console.log("Pin is incorrect, Try again");
}
