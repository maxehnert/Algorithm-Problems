test('arranges babccab to acbbbca', () => {
  const arrangePalindrome = require('../JS/arrange-palindrome')
  expect(arrangePalindrome('babccab')).toBe('acbbbca')
})

test('abca isnt a palindrome, returns -1', () => {
  const arrangePalindrome = require('../JS/arrange-palindrome')
  expect(arrangePalindrome('abca')).toBe(-1)
})
