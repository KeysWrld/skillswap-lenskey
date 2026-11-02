// Helper functions used by the Skill Swap page and its tests.

function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(function(skill) {
    return (skill.category || 'Other').toLowerCase() === category.toLowerCase();
  });
}

function calculateTotalCosts(skills) {
  return skills.reduce(function(total, skill) {
    return total + Number(skill.price ?? skill.cost ?? 0);
  }, 0);
}

function matchSkillsToUser(skills, user) {
  const interests = user.interests || [];
  const userCategories = interests.map(function(item) {
    return String(item).toLowerCase();
  });

  return skills.filter(function(skill) {
    const category = String(skill.category || '').toLowerCase();
    const title = String(skill.title || skill.name || '').toLowerCase();

    return userCategories.some(function(interest) {
      return category.includes(interest) || title.includes(interest);
    });
  });
}

// Share the functions with the browser and Node.js tests.
if (typeof window !== 'undefined') {
  window.SkillUtils = {
    filterSkillsByCategory: filterSkillsByCategory,
    calculateTotalCosts: calculateTotalCosts,
    matchSkillsToUser: matchSkillsToUser
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    filterSkillsByCategory: filterSkillsByCategory,
    calculateTotalCosts: calculateTotalCosts,
    matchSkillsToUser: matchSkillsToUser
  };
}
