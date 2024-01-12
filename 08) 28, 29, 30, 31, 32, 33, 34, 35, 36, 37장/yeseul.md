# 28장 Number

Q.
```
Number.isFinite(null); // 1

isFinite(null); // 2 
```

<details>

<summary>A</summary> 

1. false => Number.isFinite는 인수를 숫자로 암묵적 타입 변환X

2. true => isFinite는 인수를 숫자로 암묵적 타입 변환O


</details>

Q.
```
Number.isNaN(undefined); // 1

isNaN(undefined) // 2
```

<details>

<summary>A</summary> 

1. false => Number.isNaN은 인수를 숫자로 암묵적 타입 변환X

2. true => isNaN은 인수를 숫자로 암묵적 타입 변환O

</details>

# 29장 Math

Q.
```
Math.round(1.6); // 1

Math.ceil(1.4); // 2

Math.floor(1.6); // 3
```

<details>

<summary>A</summary> 

1. 2 => 반올림
2. 2 => 올림
3. 1 => 내림

</details>

Q. 위의 소수점 제거 함수를 사용해서 programmers 문제를 풀어보장~! 홧탱~! 홧탱~!

머쓱이네 피자가게는 피자를 두 조각에서 열 조각까지 원하는 조각 수로 잘라줍니다. 피자 조각 수 slice와 피자를 먹는 사람의 수 n이 매개변수로 주어질 때, n명의 사람이 최소 한 조각 이상 피자를 먹으려면 최소 몇 판의 피자를 시켜야 하는지를 return 하도록 solution 함수를 완성해보세요.


입출력 예 #1

10명이 7조각으로 자른 피자를 한 조각 이상씩 먹으려면 최소 2판을 시켜야 합니다.

입출력 예 #2

12명이 4조각으로 자른 피자를 한 조각 이상씩 먹으려면 최소 3판을 시켜야 합니다.

```
function solution(slice, n) {
  var answer = 0;
  return answer;
}
```

<details>

<summary>A</summary> 

```
function solution(slice, n) {
    return Math.ceil(n / slice);
}
```

</details>

# 30장 Date

Q. 아래의 코드를 1월로 나타내는 방법

```
new Date('2024/01/08').getMonth(); // ?
```

<details>

<summary>A</summary> 

+1 => Date 객체의 월을 나타내는 0 ~ 11의 정수를 반환한다. 1월은 0, 12월은 11이다.

</details>

# 31장 RegExp

Q. 대소문자를 구별하지 않고 전역을 검색하는 플래그는?

<details>

<summary>A</summary> 

i Igrore case
g Global

</details>

# 32장 String

Q. 특정 요소의 인덱스 반환 메서드는?

<details>

<summary>A</summary> 

indexOf

</details>

Q. alphabet 매개변수로 주어진 문자열을 대문자는 소문자로 소문자는 대문자로 반환하는 코드를 만드러 주세용~!

```
function solution(alphabet) {
  var answer = '';
  return answer;
}

console.log(solution('OmLeT')); // oMlEt
console.log(solution('EgG')); // eEg

```

<details>

<summary>A</summary> 

```
function solution(alphabet) {
   return [...alphabet].map(x => x === x.toUpperCase() ? x.toLowerCase() : x.toUpperCase()).join('');
}

console.log(solution('OmLeT')); // oMlEt
console.log(solution('EgG')); // eEg
```

</details>

# 33장 7번째 데이터 타입 Symbol

Q. Symbol 함수를 호출하여 생성하고, 다른 값과 절대 중복되지 않는 유일무이한 값은?

<details>

<summary>A</summary> 

Symbol

</details>

# 34장 이터러블

Q. 빌트인 이터러블 4가지

<details>

<summary>A</summary> 

Array
String
Map
Set
TypedArray
arguments
DOM 컬렉션

</details>

# 35장 스프레드 문법

Q. 아래 코드에서 arr의 최대 값 출력 방법은?

```
const arr = [1, 2, 3];

console.log(Math.max(arr)); // NaN
```

<details>

<summary>A</summary> 

```
const arr = [1, 2, 3];

console.log(Math.max(...arr)); // 3
```

</details>

# 36장 디스트럭처링 할당

Q. 
```
const [0, 1, 2] = [x, y, z];
console.log(1, 2) // ?
```

<details>

<summary>A</summary> 

SyntaxError: Invalid destructuring assignment target

=> 배열 디스트럭처링 할당 대상(할당문의 우변)은 이터러블이어야 한다.

그래서 이거 혹시 해결 방법 아시는 분? ㅇㅅㅇ?

</details>

# 37장 Set과 Map

Q. 

```
const set = new Set([1, 2, 3, 4]);
console.log(set.has(1)); // 1
console.log(set.has(7)); // 2
```

<details>

<summary>A</summary> 

1. true
2. false

set 객체에 특정 요소가 존재하는지 확인하려면 Set() 메서드를 사용하고, 불리언 값으로 반환한다.

</details>


