const readline = require("readline");//inbuild library used to take input form the keyboard and show output in the terminal

const rl = readline.createInterface({//it creates a communication channel between the user and machine
  input: process.stdin,//tell node to take input from the keyboard
  output: process.stdout//show output in the terminal
});

let todos = [];

function showMenu() {
  console.log("\nChoose an option:");
  console.log("1. Add Todo");
  console.log("2. View Todos");
  console.log("3. Delete task");
  console.log("4. Exit");

  rl.question("Enter choice: ", (choice) => {
    if (choice === "1") {
      rl.question("Enter a new todo: ", (todo) => {
        todos.push(todo);
        console.log("Added ✅");
        showMenu();
      });
    } else if (choice === "2") {
      console.log("\nYour Todos:");
      todos.forEach((todo, i) => {
        console.log(`${i + 1}. ${todo}`);
      });
      showMenu();
    } else if (choice === "4") {
      console.log("Goodbye 👋");
      rl.close();
    } else if (choice === "3"){
        rl.question("Which task do you want to remove: ", (c) => {
            const index = parseInt(c) - 1;
            if(index>todos.length){
              console.log("The task does not exist");
            }
            else{
              const removed = todos.splice(index, 1);
              console.log(`🗑️ Removed: ${removed[0]}`);
            }
            showMenu();
        });
    }
    else {
      console.log("Invalid choice. Try again.");
      showMenu();
    }
  });
}

showMenu();
