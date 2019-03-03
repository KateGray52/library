// MATCHER	PURPOSE
// toBe()	passed if the actual value is of the same type and value as that of the expected value. It compares with === operator
// toEqual()	works for simple literals and variables;
// should work for objects too
// toMatch()	to check whether a value matches a string or a regular expression
// toBeDefined()	to ensure that a property or a value is defined
// toBeUndefined()	to ensure that a property or a value is undefined
// toBeNull()	to ensure that a property or a value is null.
// toBeTruthy()	to ensure that a property or a value is true
// ToBeFalsy()	to ensure that a property or a value is false
// toContain()	to check whether a string or array contains a substring or an item.
// toBeLessThan()	for mathematical comparisons of less than
// toBeGreaterThan()	for mathematical comparisons of greater than
// toBeCloseTo()	for precision math comparison
// toThrow()	for testing if a function throws an exception
// toThrowError()	for testing a specific thrown exception




// describe("MathUtils", function() {
//     var calc;
//
//     //This will be called before running each spec
//     beforeEach(function() {
//         calc = new MathUtils();
//     });
//
//     describe("when calc is used to peform basic math operations", function(){
//
//         //Spec for sum operation
//         it("should be able to calculate sum of 3 and 5", function() {
//             expect(calc.sum(3,5)).toEqual(8);
//         });
//
//         //Spec for multiply operation
//         it("should be able to multiply 10 and 40", function() {
//             expect(calc.multiply(10, 40)).toEqual(400);
//         });
//
//         //Spec for factorial operation for positive number
//         it("should be able to calculate factorial of 9", function() {
//             expect(calc.factorial(9)).toEqual(362880);
//         });
//
//         //Spec for factorial operation for negative number
//         it("should be able to throw error in factorial operation when the number is negative", function() {
//             expect(function() {
//                 calc.factorial(-7)
//             }).toThrowError(Error);
//         });
//
//     });
// });





describe("Nested Describe Demo", function() {
    beforeEach(function() {
        console.log("beforeEach level 1");
    });
    describe("MyTest level2", function() {
        beforeEach(function() {
            console.log("beforeEach level 2");
        });
        describe("MyTest level3", function() {
            beforeEach(function() {
                console.log("beforeEach level 3");
            });
            it("is a simple spec in level3", function() {
                console.log("A simple spec in level 3");
                expect(true).toBe(true);
            });
            afterEach(function() {
                console.log("afterEach level 3");
            });
        });
        afterEach(function() {
            console.log("afterEach level 2");
        });
    });
    afterEach(function() {
        console.log("afterEach level 1");
    });
});
