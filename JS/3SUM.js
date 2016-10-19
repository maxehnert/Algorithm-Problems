const threeSUM = (nums) => {
  var result = []

  if (nums === null || nums.length < 3) {
    return result
  }

  nums.sort((a, b) => a- b)

  for (var i = 0; i < nums.length - 2; i++) {
    if (i === 0 || nums[i] > nums[i - 1]) {
      var j = i + 1
      var k = nums.length - 1

      while (j < k) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          var l = []

          l.push(nums[i])
          l.push(nums[j])
          l.push(nums[k])

          result.push(l)

          j++
          k--

          while (j < k && nums[j] === nums[j - 1]) {
            j++
          }

          while (j < k && nums[k] === nums[k + 1]) {
            k--
          }
        } else if (nums[i] + nums[j] + nums[k] < 0) {
          j++
        }else {
          k--
        }
      }
    }
  }

  return result
}

threeSUM([-1, 0, 1, 2, -1, -4]) // [[-1, -1, 2], [-1, 0, 1]]
