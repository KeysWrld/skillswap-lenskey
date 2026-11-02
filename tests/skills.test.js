const test = require('node:test');
const assert = require('node:assert/strict');

const {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser
} = require('../script.js');

const sampleSkills = [
  { title: 'Web Design', category: 'Technology', price: 25 },
  { title: 'Guitar', category: 'Music', price: 15 },
  { title: 'Python', category: 'Technology', price: 30 }
];

test('filterSkillsByCategory returns only skills in the selected category', function() {
  const result = filterSkillsByCategory(sampleSkills, 'Technology');
  assert.equal(result.length, 2);
  assert.equal(result[0].title, 'Web Design');
});

test('filterSkillsByCategory returns all skills for All', function() {
  const result = filterSkillsByCategory(sampleSkills, 'All');
  assert.equal(result.length, 3);
});

test('calculateTotalCosts adds the skill prices', function() {
  assert.equal(calculateTotalCosts(sampleSkills), 70);
});

test('matchSkillsToUser finds skills that match user interests', function() {
  const result = matchSkillsToUser(sampleSkills, { interests: ['music'] });
  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'Guitar');
});

test('matchSkillsToUser returns no matches when interests do not match', function() {
  const result = matchSkillsToUser(sampleSkills, { interests: ['cooking'] });
  assert.equal(result.length, 0);
});
