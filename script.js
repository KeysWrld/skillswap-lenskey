// Keep the skills received from the API in this array.
let allSkills = [];

const skillsList = document.getElementById('skills-list');
const statusMessage = document.getElementById('status-message');
const skillForm = document.getElementById('skill-form');

// Display a group of skills on the page.
function displaySkills(skills, target) {
  target.innerHTML = '';

  if (!skills || skills.length === 0) {
    target.textContent = 'No matching skills found.';
    return;
  }

  skills.forEach(function(skill) {
    const card = document.createElement('article');
    card.className = 'skill-card';

    const title = document.createElement('h3');
    title.textContent = skill.title || skill.name || 'Untitled skill';

    const category = document.createElement('p');
    category.className = 'skill-category';
    category.textContent = skill.category || 'Other';

    const description = document.createElement('p');
    description.textContent = skill.description || 'No description provided.';

    const price = document.createElement('p');
    price.className = 'skill-price';
    const amount = Number(skill.price ?? skill.cost ?? 0);
    price.textContent = amount === 0 ? 'Free' : '$' + amount.toFixed(2);

    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(description);
    card.appendChild(price);
    target.appendChild(card);
  });
}

// Load skills from the backend API.
async function loadSkills() {
  statusMessage.textContent = 'Loading skills...';

  try {
    allSkills = await window.apiService.fetchSkills();
    displaySkills(allSkills, skillsList);
    statusMessage.textContent = 'Skills loaded successfully.';
  } catch (error) {
    statusMessage.textContent = error.message;
    skillsList.textContent = 'Start the backend server to view available skills.';
  }
}

// Filter buttons call the tested filter function.
document.querySelectorAll('.filter-button').forEach(function(button) {
  button.addEventListener('click', function() {
    const category = button.dataset.category;
    const filteredSkills = window.SkillSwapFunctions.filterSkillsByCategory(allSkills, category);
    displaySkills(filteredSkills, skillsList);
  });
});

// Calculate a total cost from the hourly rate and number of hours.
document.getElementById('calculate-button').addEventListener('click', function() {
  const rate = Number(document.getElementById('hourly-rate').value);
  const hours = Number(document.getElementById('hours').value);
  const total = window.SkillSwapFunctions.calculateTotalCosts(rate, hours);
  document.getElementById('cost-result').textContent = 'Total cost: $' + total.toFixed(2);
});

// Match skills using the user's category preference and maximum price.
document.getElementById('find-match-button').addEventListener('click', function() {
  const userNeeds = {
    category: document.getElementById('match-category').value,
    maxPrice: Number(document.getElementById('max-price').value)
  };

  const matches = window.SkillSwapFunctions.matchSkillsToUser(userNeeds, allSkills);
  displaySkills(matches, document.getElementById('match-results'));
});

// Submit a new skill to the backend API.
skillForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const skillData = {
    title: document.getElementById('skill-title').value.trim(),
    category: document.getElementById('skill-category').value.trim(),
    price: Number(document.getElementById('skill-price').value),
    description: document.getElementById('skill-description').value.trim()
  };

  try {
    statusMessage.textContent = 'Adding your skill...';
    await window.apiService.createSkill(skillData);
    skillForm.reset();
    await loadSkills();
    statusMessage.textContent = 'Your skill was added.';
  } catch (error) {
    statusMessage.textContent = error.message;
  }
});

loadSkills();
