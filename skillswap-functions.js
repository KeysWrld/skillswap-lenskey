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

// Find skills that match the user's category and maximum price.
function matchSkillsToUser(userNeeds, skills) {
  return skills.filter(function(skill) {
    const matchesCategory = skill.category === userNeeds.category;
    const matchesPrice = Number(skill.price) <= Number(userNeeds.maxPrice);

    return matchesCategory && matchesPrice;
  });
}

module.exports = {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser

};
