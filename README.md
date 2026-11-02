# Skill Swap

A Skill Swap web application built with HTML, CSS, and JavaScript.

## Features

- Load and add skills through the Skill Swap backend API.
- Filter skills by category.
- Calculate session cost using an hourly rate and number of hours.
- Find matching skills based on category preference and maximum price.

## Run the project

1. Install Node.js.
2. Run `npm install` in this project folder.
3. Start the Skill Swap backend API on port 3000.
4. Open `index.html` with VS Code Live Server.

## Run the tests

Run `npm test` to run the Jest unit tests in `__tests__/skillswap.test.js`.

The tests cover:
- `filterSkillsByCategory(skills, category)`
- `calculateTotalCosts(hourlyRate, hours)`
- `matchSkillsToUser(userNeeds, skills)`
