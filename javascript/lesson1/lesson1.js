let sum = function sum(num) {
    let result = num;
    function subSum(number) {
        if (!arguments.length) return result;
        result += number;
        return subSum;
    }
    return subSum;
};

console.log("sum(4)(2)(3)() = 9", sum(4)(2)(3)() === 9);
console.log("sum(0)(0)(6)() = 6", sum(0)(0)(6)() === 6);
console.log("sum(8)() = 8", sum(8)() === 8);
console.log("sum(1)(2)() = 3", sum(1)(2)() === 3);
console.log("sum(4)(2)(3)(1)(11)() = 21", sum(4)(2)(3)(1)(11)() === 21);