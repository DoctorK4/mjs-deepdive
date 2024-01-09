# 28. Number

- 생성자 함수로 생성시에 초기값은 0

### 프로퍼티

- Number.EPSILON
- NUMBER.MAX_VALUE
- NUMBER.MIN_VALUE
- NUMBER.MAX_SAFE_INTEGER
- NUMBER.MIN_SAFE_INTEGER
- NUMBER.POSITIVE_INFINITY
- NUMBER.NEGATIVE_INFINITY
- NUMBER.NaN

### 메서드

- Number.isFinite
- Number.isInteger
- Number.isNaN
- Number.isSafeInteger
- Number.prototype.toExponential (그룹연산자 사용)
- Number.prototype.toFixed
- Number.prototype.toPrecision
- Number.prototype.toString

```js
// Number
Number.EPSILON; // 0과 1사이에 나타낼수있는 가장 작은 숫자

const num = 0.1 + 0.2 - 0.2; // 예상: 0.1
console.log(num); // 0.1000000000003;
// 2진수를 10진수로 다시 변환하는 과정에서 나타나는 문제, 정확하게 부동소수점까지 계산되지 않음
// 그래서 아래와 같이 함수로 만들어서 정확한 값을 비교할 수 있음
function isEqual(original, expected) {
  return Math.abs(original - expected) < Number.EPSILON;
}

const num1 = 1;
const num2 = new Number(1);
console.log(typeof num1); // number
console.log(typeof num2); // object

// 지수표기법 (매우 크거나 작은 숫자를 표기할 떄 사용, 10의 n승으로 표기)
const num3 = 102;
console.log(num3.toExponential());

// 반올림
const num4 = 1234.12;
console.log(num4.toFixed());
console.log(num4.toLocaleString('ar-EG'));

// 원하는 자릿수까지 유효하도록 반올림
num4.toPrecision(5); // 1234.1
num4.toPrecision(4); // 1234
num4.toPrecision(2); // 전체 자릿수 표기가 안될때는 지수표기법
```

> Quiz  
> [1] Number.isNaN과 isNaN의 차이는 무엇일까?  
> [2] Number.prototype.toFixed()와 Math.round()의 차이는?
#
# 29. Math

```js
// 오일러 상수
Math.E;
// 원주율
Math.PI;

// 절대값
Math.abs(-10);
// 소수점 이하룰 무조건 올림
Math.ceil(1.2); //2
// 소수점 이하를 버림
Math.floor(1.2); //1
// 소수점 이하를 반올림
Math.round(1.2); // 1
Math.round(1.7); // 2
// 정수만 반환
Math.trunc(1.2314); // 1

//최대, 최소
Math.max(1, 2);
Math.min(-1, 3, 4);

// 거듭제곱, 제곱근
Math.pow(3, 2); // 9
Math.sqrt(9); // 3

// random 값
Math.random();
// 1~10
Math.floor(Math.random() * 10 + 1);
```

- Math.random은 안전할까?
  - [관련 읽을 거리](https://stackoverflow.com/questions/5651789/is-math-random-cryptographically-secure)
#
# 30. Date

- 날짜와 시간 정보를 밀리초(/ms)로 나타내는 빌트인 객체
- 기준시간 1970년 1월 1일 0시 Greenwich Mean Time

```js
console.log(new Date());
console.log(new Date('Jun 5, 2022'));
console.log(new Date('2022-12-17T03:24:00'));

const now = new Date();
console.log(Date.now());
console.log(Date.parse('2022-12-17T03:24:00'));
console.log(now.toDateString());
console.log(now.toLocalString('ko-KR'));
```

> QUIZ  
> [1] console.log(new Date(20,05)); // 날짜는?
#
# 31. RegExp

- /.../g 임의의 3자리 문자
- /A{1,2}/g 'A'가 최소 한번, 최대 두번
- /A{1,}/g, /A+/g, /A?/g 'A'가 한 번 이상
- /A|B/, /[AB]/ A 또는 B
- [A-Za-z0-9_] \w -> 반대 \W
- [0-9] \d -> 반대 \D

> QUIZ  
> [1] [^0-9]와 /^\d/의 차이는?  
> [2] 이메일 regEx를 만들어보자.  
> [3] 핸드폰 번호(01012345678)를 -(010-1234-5678)으로 바꾸어주는 함수를 만들어보자.
#
# 32. String

### 프로퍼티

- length

### 메서드

- indexOf
- search (실패할 경우 -1)
- includes
- startsWith
- endsWith
- charAt
- substring
- slice
- toUpperCase
- toLowerCase
- trim
- repeat
- replace
- split

#
# 33. Symbol

- ES6에서 도입된 7번째 데이터 타입으로 변경 불가능한 원시 타입의 값
- 다른 값과 절대 중복되지 않는 유일무이한 값

```js
const s1 = Symbol.for('mySymbol');
Symbol.keyFor(s1); // mySymbol
```

### Well-known Symbol
- 자바스크립트가 기본 제공하는 빌트인 심벌값
- Symbol.iterator
#
# 34. Iterable

### 이터러블 프로토콜

- Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 Symbol.iterator를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환하는 프로토콜

### 이터레이터 프로토콜

- next 메서드를 소유하며, next 메서드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 프로토콜

유사배열객체에는 Symbol.iterator가 없기 떄문에 for...of 문으로 순회할 수 없다.  
이때 사용가능한 방법, Array.from() 이용하여 배열로 바꾸어 준다.

## 제너레이터

```js
// generator
function* mutipleGenerator() {
  for (let i = 0; i < 10; i++) {
    yield i ** 2;
  }
}

const multi = mutipleGenerator();
let next = multi.next();
console.log(next.value, next.done);

// 값을 무한히 생성할 수 있다.
// yield로 원하는 값을 value로 반환한다.
```

#

```js
> QUIZ
> [1] 최댓값을 받아 2배씩 올라가는 iterable 객체를 만들어보세요.
```
#
# 35,36. Spread & Destructuring

```js
// destructuring
const [x, y, z = 0] = [1, 3, 5];
console.log(x, y, z);

// spreading
const prop = {
  name: 'Button',
  styles: {
    size: 20,
    color: 'black',
  },
};

function changeColor({ styles: { color } }) {
  console.log(color);
}
```
#
# 37. Set과 Map

## Set

- Set 객체는 중복되지 않는 유일한 값들의 집합
- 배열과 유사하지만 아래의 차이가 있다.
  - 동일한 값 ❌
  - 순서보장 ❌
  - 인덱스 접근 ❌

### 요소 확인, 추가, 삭제

- .size
- .add() //chaining ⭕️
- .has()
- .delete() // chaining ❌- 반환값 boolean
- .clear()

### 집합

- .intersection()
- .union()
- .difference()
- .isSuperset()

## Map

- Map은 키와 값의 쌍으로 이루어진 컬렉션
- 객체와 유사하지만 아래의 차이가 있다.
  - 키로 모든 값 사용가능
  - Iterable ⭕️
  - size로 개수 확인

### 요소 확인, 추가, 삭제

- .size
- .set()
- .get()
- .delete()
- .clear()

```js
//set
const set = new Set([1, 2, 3]);
console.log(set);

console.log(set.size);

// map
const map = new Map([['name', 'suzy']]);
console.log(map.get('name'));

// QUIZ
// [1] 주어진 배열에서 중복을 제거 하라
const fruits = ['🍌', '🍎', '🍇', '🍌', '🍎', '🍑'];

// [2] 주어진 두 세트의 공통된 아이템만 담고 있는 세트 만들어라
const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([1, 2, 3]);
```

