// This file contains the functions that communicate with the Skill Swap API.
const API_BASE_URL = 'http://localhost:3000/api';

// Get all skills from the backend.
async function fetchSkills() {
  const response = await fetch(API_BASE_URL + '/skills');

  if (!response.ok) {
    throw new Error('Could not load skills. Please check that the backend is running.');
  }

  const data = await response.json();

  // Some APIs return the list directly and others put it inside a skills property.
  if (Array.isArray(data)) {
    return data;
  }

  return data.skills || data.data || [];
}

// Send a new skill to the backend.
async function createSkill(skillData) {
  const response = await fetch(API_BASE_URL + '/skills', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(skillData)
  });

  if (!response.ok) {
    throw new Error('Could not add the skill. Please try again.');
  }

  return response.json();
}

// Make the API functions available to script.js in the browser.
window.apiService = {
  fetchSkills: fetchSkills,
  createSkill: createSkill
};
