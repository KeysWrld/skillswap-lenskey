// Keep the skills received from the API in this array.
let allSkills = [];

// Get an element from the page.
const skillsList = document.getElementById('skills-list');
const statusMessage = document.getElementById('status-message');
const categoryFilter = document.getElementById('category-filter');
const skillForm = document.getElementById('skill-form');

// Use the shared helper functions from skills-utils.js.
const filterSkillsByCategory = window.SkillUtils.filterSkillsByCategory;

// Display skills on the page.
function displaySkills(skills) {
  skillsList.innerHTML = '';

  if (!skills || skills.length === 0) {
    skillsList.innerHTML = '<p>No skills found. Try another category or add a skill.</p>';
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
    skillsList.appendChild(card);
  });
}

// Load the skills from the backend API.
async function loadSkills() {
  statusMessage.textContent = 'Loading skills...';

  try {
    allSkills = await window.apiService.fetchSkills();
    updateCategoryOptions(allSkills);
    displaySkills(allSkills);
    statusMessage.textContent = 'Skills loaded successfully.';
  } catch (error) {
    statusMessage.textContent = error.message;
    skillsList.innerHTML = '<p>Start the backend server to view available skills.</p>';
  }
}

// Add categories to the filter dropdown.
function updateCategoryOptions(skills) {
  const currentValue = categoryFilter.value;
  const categories = [];

  skills.forEach(function(skill) {
    const category = skill.category || 'Other';
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });

  categoryFilter.innerHTML = '<option value="All">All categories</option>';

  categories.sort().forEach(function(category) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  if (categories.includes(currentValue)) {
    categoryFilter.value = currentValue;
  }
}

// Filter skills when the dropdown changes.
categoryFilter.addEventListener('change', function() {
  const selectedCategory = categoryFilter.value;
  const filteredSkills = filterSkillsByCategory(allSkills, selectedCategory);
  displaySkills(filteredSkills);
});

// Show all skills when the button is clicked.
document.getElementById('show-all-button').addEventListener('click', function() {
  categoryFilter.value = 'All';
  displaySkills(allSkills);
});

// Submit the new skill form to the API.
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

// Load skills after the page is ready.
loadSkills();
