# 24. Closer

### 클로저란

- 함수와 그 함수가 선언된 렉시컬 환경과의 조합
- 중첩된 이너 함수에서 외부 함수를 계속 참조하고 있기 때문에 종료되어도 사라지지 않음

렉시컬 스코프:
외부 렉시컬 환경, 상위스코프에 대한 참조는 함수 정의가 평가되는 시점에, 함수 정의 위치에 의해 결정된다.

클로저는 내부 정보를 은닉하고, 공개함수(public, 외부)를 통한 데이터 조작을 위해 쓰임

### 캡슐화와 정보은닉:

- 클래스 private 필드 또는 메소드를 사용하는 것과 같은 효과
- 예전엔 private 필드가 없었음 그래서 클로저를 사용

> Quiz
>
> 1. 클로저에 대해 설명해주세요. 어떤 것을 클로저라고 하는지.
> 2. 클로저는 어디에 쓰일까요?

```javascript
// [3] 0,1,2의 출력값을 가질 수 있도록 아래의 코드를 변경해보세요.
var func = [];

for (var i = 0; i < 3; i++) {
  func[i] = function () {
    return i;
  };
}
for (var j = 0; j < 3; j++) {
  console.log(func[j]);
}

// [4] 클로저를 활용한 increase, decrease 기능이 되는 계산기를 만들어보세요.
```

#
# 25. Class

### 클래스란?

- 객체를 손쉽게 만들 수 있는 템플릿

### 객체를 만들 수 있는 방법

1. 생성자 함수
2. 클래스

### 서브 클래스의 인스턴스 생성 과정

1. 서브 클래스의 super 호출
2. 수퍼 클래스의 인스턴스 생성과 This 바인딩
3. 수퍼 클래스의 인스턴트 초기화
4. 서브 클래스 constructor로의 복귀와 this 바인딩
5. 서브클래스의 인스턴스 초기화
6. 인스턴스 반환

```javascript
// Quiz [1]
/**
 * 정직원과 파트타임 직원을 나타낼 수 있는 클래스를 만들어보자.
 * 직원들의 정보: 이름, 부서이름, 한달 근무 시간
 * 매달 직원들의 정보를 이용해서 한달 월급을 계산할 수 있다.
 * 정직원은 시간당 10000원
 * 파트타임 직원은 시간당 8000원
 * 상속을 이용해보기🔥
 */
```

> Quiz  
> [2] 클래스 Constructor에서 return 문을 사용하면 안되는 이유는?  
> [3] private 필드는 상속받은 클래스에서 사용할 수 없다 (O/X)  
> [4] 서브 클래스에서 super를 꼭 호출해야하는 이유는 무엇일까?
#
# 26. ES6 함수의 추가 기능

![함수 구분표](https://velog.velcdn.com/images/chestnut1044/post/e07ab35b-2eff-4129-b4b5-a03d71420cbe/image.png)

### ES6 메서드와 화살표함수는 Non-Contructor 이다!

### 화살표함수는 Lexical This를 가진다.

> Quiz  
> [1] 일반 함수에서 중복된 매개변수 이름 사용이 가능하다.  
> // ex) function(num, num)

```javascript
const base = {
  name: 'Lee',
  sayHi() {
    return `Hi, ${name}`;
  },
};

const derived = {
  __proto__: base,
  sayHi: function () {
    // [2] Syntax Error 이유는??
    return `${super.sayHi()}. How are you doing?`;
  },
};
```
#
# 26. 배열

### 배열 생성 방법

```javascript
// 1
let array = new Array(3);
console.log(array);

// 2
array = new Array(1, 2, 3);
console.log(array);

// 3
array = Array.of(1, 2, 3, 4);
console.log(array);

// 4
const temp = [1, 2, 3, 4, 5];
array = Array.from(temp); // iterable한 모든 것 가능
```

### 일반적으로 배열은 동일한 메모리 크기를 가지며, 이어져있어야한다.

### 하지만 js는 이어져있지 않을 수 있다. 오브젝트와 유사함!

### 덮어씌워지거나 비워질 수 있기 때문에, 배열은 인덱스를 이용해서 추가, 삭제하는 것은 좋지않은 방법❌

배열 메서드

- 새로운 배열을 생성하여 반환하는 메서드
- Array.from, concat, slice, spread, Object.assign
- 기존의 배열을 변경하는 메서드

```javascript
// Quiz

// 퀴즈1: 주어진 배열 안의 딸기 아이템을 키위로 교체하는 함수를 만들기
// 단, 주어진 배열을 수정하지 않도록!
// input: ['🍌', '🍓', '🍇', '🍓']
// output: [ '🍌', '🥝', '🍇', '🥝' ]

// 퀴즈2: 배열1, 배열2 두개의 배열을 전달받아,
// 배열1 아이템중 배열2에 존재하는 아이템만 담고 있는 배열 반환
// input: ['🍌', '🥝', '🍇'],  ['🍌', '🍓', '🍇', '🍓']
// output: [ '🍌', '🍇' ]

// 퀴즈 3
// 5이상(보다 큰)의 숫자들의 평균
const nums = [3, 16, 5, 25, 4, 34, 21];
```
