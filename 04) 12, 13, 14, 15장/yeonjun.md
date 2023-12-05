## 12. 함수

```javascript
// Q1. 아래 코드는 함수 선언식인가?
(function test(x, y) {return x + y});

// Q2. 아래 코드에서 에러가 발생하는 원인이 무엇인가?
const test2 = function add(a) {
	return ++a;
}
console.log(add(2)); // Uncaught ReferenceError: add is not defined
```

- Q3. 함수 표현식에 적용되는 호이스팅은 변수 호이스팅인가?
그 이유는 무엇인가?

- Q4. JavaScript 함수에 들어갈 수 있는 최대 갯수와 이상적인 매개변수의 갯수는?

- Q5. 콜백 함수, 중첩 함수의 공통점과 차이점은 무엇인지 얘기하시오.

## 13. 스코프

- **`스코프(scope)`** : 모든 식별자(변수 이름, 함수 이름, 클래스 이름 등)가 자신이 선언한 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위

- **`전역 스코프(global scope)`**: 전역 변수(global scope)가 갖는 스코프. “전역”이란 **코드의 가장 바깥 영역**을 의미하며 전역은 전역 스코프를 만든다. 전역에 선언한 변수는 전역 스코프를 갖는 전역 변수가 된다.

- 전역 변수는 어디서든 참조할 수 있으므로 함수 내부에서도 참조할 수 있다.

- **`지역 스코프(local scope)`**: 지역 변수(local scope)가 갖는 스코프. “지역”이란 **함수 블럭 내부**를 의미하며 지역은 지역 스코프를 만든다. 지역에 변수를 선언하면 지역 스코프를 갖는 지역 변수가 된다.
- 지역 변수는 자신의 지역 스코프와 하위 지역 스코프에서 유효한다.

## 14. 전역 변수의 문제점

```javascript
Q6. 아래 코드에서 console.log(x)에 출력되는 값은 무엇인가요?
let x = 'global';

function foo() {
	let x = 'local';
	console.log(x);
	return x;
}

foo();
console.log(x);
```

- Q7. 전역 변수의 단점은 무엇이고, 이를 해결할 수 있는 방법은 무엇인가?

