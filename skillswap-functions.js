// Filter the skills so only the selected category is shown.
function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(function(skill) {
    return skill.category === category;
  });
}

module.exports = {
  filterSkillsByCategory
};
