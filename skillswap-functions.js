// Filter the skills so only the selected category is shown.
function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(function(skill) {
    return skill.category === category;
  });
}

// Calculate the total price using an hourly rate and number of hours.
function calculateTotalCosts(hourlyRate, hours) {
  return Number(hourlyRate) * Number(hours);
}

module.exports = {
  filterSkillsByCategory,
  calculateTotalCosts
};
