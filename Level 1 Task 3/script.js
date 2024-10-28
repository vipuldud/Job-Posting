document.addEventListener('DOMContentLoaded', function () {
    let display = document.getElementById('display');
    let buttons = Array.from(document.querySelectorAll('.btn'));
    let currentInput = ''; // Stores the full input (numbers + operators)
    let operatorPressed = false; // To track if an operator was pressed last

    // Loop through each button to add click event
    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            let value = event.target.dataset.value; // Get the button value (number/operator)

            // Clear the display if 'C' is pressed
            if (event.target.id === 'clear') {
                currentInput = '';
                display.innerText = '0';
                operatorPressed = false;
            } 
            // Handle the '=' (equals) button
            else if (event.target.id === 'equals') {
                try {
                    // Evaluate the input expression when '=' is pressed
                    currentInput = eval(currentInput).toString();
                    display.innerText = currentInput;
                    operatorPressed = false; // Allow new input after calculation
                } catch (error) {
                    display.innerText = 'Error';
                }
            } 
            // Append clicked button value (numbers/operators) to the input
            else {
                // If the button is an operator and the last input was also an operator, ignore it
                if (['+', '-', '*', '/'].includes(value)) {
                    if (operatorPressed) {
                        return; // Prevent multiple operators from being entered in a row
                    } else {
                        operatorPressed = true; // Mark that an operator was pressed
                    }
                } else {
                    operatorPressed = false; // Reset flag if a number is pressed
                }

                // Update the display and input string
                if (display.innerText === '0' && !['+', '-', '*', '/'].includes(value)) {
                    display.innerText = value; // Overwrite '0' with first number
                } else {
                    display.innerText += value; // Append the value to the display
                }

                // Append the clicked value (number/operator) to the currentInput string
                currentInput += value;
            }
        });
    });
});
