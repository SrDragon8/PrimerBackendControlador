const sum = (num1, num2) => {
    return num1 + num2;
};

const sum3 = (num1, num2, num3) => {
    const  result = sum(num1, num2);
    return result + num3;
};

module.exports = {
    sum
}