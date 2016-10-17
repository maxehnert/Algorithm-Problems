test('Finds the first word in the array when the alphabetical order restarts', () => {
  const arrayRotation = require('../JS/array-rotation')
  expect( arrayRotation([
      'ptolemaic',
      'retrograde',
      'supplant',
      'undulate',
      'xenoepist',
      'yweewr',
      'yyyyy',
      'zasd',
      'asymptote',
      'babka',
      'banoffee',
      'engender',
      'karpatka',
      'othellolagkage',
  ])).toBe('asymptote')
})
