let num = [-4, -9, 0, -1, 7, 10];

function getSqrt(nums) {
  let posiNum = nums.map((e) => Math.abs(e));

  let sortedNum = posiNum.sort((a, b) => a - b);

  let sqrtNum = sortedNum.map((f) => (f *= f));

  return sqrtNum;
}

console.log(getSqrt(num));
