// User choice
var user =prompt("Do you choose rock, paper or scissor?")//prompt box for input

if (! user) {
    // User choice was undefined
    document.write("<p>Player 1: no input</p>");
} else {
    // Display user choice
    document.write("<p>Player 1:" + " " + user + "</p>");
}

// Computer choice
var computer = Math.random();//returns floating point random number
if (computer < 0.65) {
    computer = "rock";
} else if(computer <= 0.37) {
    computer = "paper";
} else {
    computer= "scissors";
}

// Display computer choice
document.write("<p>Computer:" + " " + computer + "</p>");

// Compare user choice vs computer choice
var compare = function(choice1,choice2) {
    if (choice1 === choice2) {
        return "It's a tie!";
    }
    if (choice1 === "rock") {
        if (choice2 === "scissors") {
            // rock wins
            return "cheers!! You win!";
        } else {
            // paper wins
            return "You lose! Better luck next time.";
        }
    }
    if (choice1 === "paper") {
        if (choice2 === "rock") {
            // paper wins
            return "cheers!! You win!";
        } else {
            // scissors wins
            return "You lose! Better luck next time.";
        }
    }
    if (choice1 === "scissor") {
        if (choice2 === "rock") {
            // rock wins
            return "You lose! Better luck next time.";
        } else {
            // scissors wins
            return "cheers!! You win!";
        }
    }
};

// Run the compare function
var results = compare(user,computer);

// Display results
document.write(results);