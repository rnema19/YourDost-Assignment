function findSecondLargest(arr) {
    // use a spreader to store maximum element
    let maxi = Math.max(...arr);
    let secMaxi = -100000;
    // use a simple for loop for comparing the maximum and second maximum element
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element > secMaxi && element < maxi) {
            secMaxi = element
        }
    }
    // return the second maximum element
    return secMaxi;    
}

let arr1 = [1,2,3,4,5,6,7,8,9,10];
let arr2 = [100,102,55,897,1558,3661];

console.log(findSecondLargest(arr1));
console.log(findSecondLargest(arr2));
