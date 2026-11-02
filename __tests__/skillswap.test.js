const {
  filterSkillsByCategory
} = require('../skillswap-functions');

const skills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 }
];

describe('filterSkillsByCategory', () => {
  test('filters skills by the selected category', () => {
    expect(filterSkillsByCategory(skills, 'Programming')).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'Web Development', category: 'Programming', price: 25 }
    ]);
  });

  test('returns all skills when the category is All', () => {
    expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
  });

  test('returns an empty array when there are no matching skills', () => {
    expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
  });
});

const {
  calculateTotalCosts
} = require('../skillswap-functions');

describe('calculateTotalCosts', () => {
  test('calculates costs using different hourly rates and hours', () => {
    expect(calculateTotalCosts(20, 2)).toBe(40);
    expect(calculateTotalCosts(25, 1)).toBe(25);
  });

  test('handles free sessions and zero hours', () => {
    expect(calculateTotalCosts(0, 3)).toBe(0);
    expect(calculateTotalCosts(20, 0)).toBe(0);
  });

  test('calculates decimal hours correctly', () => {
    expect(calculateTotalCosts(25, 1.5)).toBe(37.5);
  });
});
