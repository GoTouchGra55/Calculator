const display = document.querySelector(".display-text");
const buttons = document.querySelectorAll(".button");
let current = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.value;

    if (value === "AC") {
      current = "";
      display.textContent = 0;

    } else if (value === "DEL") {
      current = current.slice(0, -1);
      display.textContent = current || 0;

    } else if (value === "%") {
      // Only apply percent to last number
      const match = current.match(/(\d+\.?\d*)$/);
      if (match) {
        const percentValue = parseFloat(match[0]) / 100;
        current = current.slice(0, -match[0].length) + percentValue;
        display.textContent = current;
      }

    } else if (value === ".") {
      const parts = current.split(/[\+\-\*\/]/); // split on operators
      const lastPart = parts[parts.length - 1];
      if (!lastPart.includes(".")) {
        current += ".";
        display.textContent = current;
      }

    } else if (value === "=") {
      try {
        // Evaluate the expression safely
        let result = eval(current);
        if (!Number.isInteger(result)) {
          result = result.toFixed(2); // limit to 2 decimal places
        }
        current = String(result);
        display.textContent = current;

      } catch {
        display.textContent = "Error";
        current = "";
      }

    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
      // Prevent adding multiple operators in a row
      if (current !== "" && !/[+\-*/]$/.test(current)) {
        current += value;
        display.textContent = current;
      }

    } else {
      current += value;
      display.textContent = current;
    }
  });
});
