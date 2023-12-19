# 퀴즈 모아보기

## 16장 프로퍼티 어트리뷰트 

<details>
<summary> 1. 

일반 객체의 `__proto__`는 ( 데이터 / 접근자 ) 프로퍼티이다.

함수 객체의 prototype은 ( 데이터 / 접근자 ) 프로퍼티다. 
</summary>
<div markdown="1">
<br/>
> 정답 : 접근자, 데이터
</div>
</details>
<br/>

### 2. 객체 변경 방지 메서드 구분하기

| 구분 | 메서드 | 확인 메서드| 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리뷰트 재정의 |
|----------|---|---|---|----|----|----|----|
| 객체 ?? | Object.preventExtensions | Object.is____ | ? | ? | ? | ? | ? |
| 객체 ?? | Object.seal | Object.is____ | ? | ? | ? | ? | ? |
| 객체 ?? | Object.freeze | Object.is____ | ? | ? | ? | ? | ? |

## 17장 생성자 함수에 의한 객체 생성

1. 다음중 constructor와 non-constructor인 것을 구분하시오.
- 클래스
- 함수 선언문
- 화살표 함수
- 함수 표현식
- 메서드
- 객체의 프로퍼티 키에 정의되어 할당된 함수
```js
const obj = {
  x: function() {...}
};
```

2. new.target의 역할과 무엇을 가리키는지 설명하시오. 

3. non-constructor 함수 객체를 생성자 함수처럼 호출하면 에러가 발생한다. (O, X)

4. 생성자 함수의 인스턴스 생성 과정에서, this 외의 값을 인스턴스가 명시적으로 반환할 수 없다. (O, X)

## 18장 함수와 일급 객체

<details>
<summary>1. 다음 중 함수 객체가 갖는 프로퍼티가 아닌 것은 ? <br/>
<br/>
  a. name <br/>
  b. __proto__ <br/>
  c. iterator <br/>
  d. arguments<br/>
  e. length

</summary>
<div markdown="1">
<br/>
> 정답 : C
<br/>
</details>
<br/>

<details>
<summary>2. 다음 중 ES5와 ES6가 다르게 동작하는 프로퍼티는? 어떻게 다른지도 설명하시오. <br/>
<br/>
  a. name <br/>
  b. __proto__ <br/>
  c. iterator <br/>
  d. arguments<br/>
  e. length

</summary>
<div markdown="1">
<br/>
> 정답 : a
<br/>
- 익명 함수 표현식의 경우 ES5에서는 빈문자열을 값으로 갖는다. ES6에서는 함수 객체를 가리키는 식별자를 값으로 갖는다.
</details>
<br/>

<details>
<summary>3. 다음 중 ES6에서 표준이 아닌 프로퍼티는? <br/>
<br/>
a. caller <br/>
b. __proto__ <br/>
c. iterator <br/>
d. arguments<br/>
e. length

</summary>
<div markdown="1">
<br/>
> 정답 : a, d
<br/>
</details>
<br/>

<details>
<summary>4. 함수 객체의 length 프로퍼티는 인자의 개수 값이다.(O, X)</summary>
<div markdown="1">
<br/>
> 정답 : X 
<br/>
파라미터 (매개변수)의 개수입니다. 
arguments 객체의 length가 인자의 개수를 가리킵니다.
</div>
</details>
<br/>

## 19장 프로토타입

<details>
<summary>1. 자바스크립트는 public, private, protected 등을 사용할 수 있는 프로토타입 기반 객체지향 프로그래밍 언어이다. (O, X)</summary>
<div markdown="1">
<br/>
> 정답 : X
<br/>
자바스크립트에서 public, private, protected 키워드는 사용할 수 없다.
타입스크립트에서는 가능하다.
</div>
</details>
<br/>

<details>
<summary>2. 인스턴스가 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 추가하면, 프로토타입 프로퍼티를 덮어쓰면서 인스턴스 프로퍼티로 추가한다. (O, X)</summary>
<div markdown="1">
<br/>
> 정답 : X
<br/>

</div>
</details>
<br/>

<details>
<summary>3. 프로토타입의 프로퍼티의 변경 또는 삭제는 불가능하다. (O, X) </summary>
<div markdown="1">
<br/>
> 정답 : X
<br/>
하위 객체를 통해 변경 또는 삭제가 허용되지 않을 뿐, 직접 접근한다면 가능하다.
</div>
</details>
<br/>

<details>
<summary>4. constructor로 연결되어있지 않아도 instanceof 연산자에서 true를 반환할 수 있다. (O, X)</summary>
<div markdown="1">
<br/>
> 정답 : O
<br/>
</div>
</details>
<br/>

<details>
<summary>5. Object.create 메서드로 직접 상속을 구현할 때의 주의점에 대해 말해주세요.  </summary>
<div markdown="1">
<br/>

  - 매개변수에 null을 넣으면 프로토타입 체인 종점에 위치하는 객체를 생성할 수 있다. 
  - 이로 인해 빌트인 메서드가 실행되지 않고 에러가 발생할 수 있음
  - Object.prototype.hasOwnProperty.call~ 과 같이 호출하는것을 권장한다.
<br/>

</div>
</details>
<br/>


# 토론 & 이야기 해볼 거리

## 1. 프로토타입 vs `__proto__` vs Object.prototype vs prototype 프로퍼티 vs [[Prototype]]

> 잘 구분하고 계신가요? 

## 2. 코테에서는 for...in...을 가끔 사용하는데, 다른 분들은 어떻게 하고 계신가요?

> (배열) for...of와의 차이, 그리고 그에 대한 생각과 의견?

## 3. P.256 예제 Node.js에서 같이 실행해보기

```js
function foo(func) {
  return func();
}

function bar() {
  return `caller :` + bar.caller;
}

console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar()); // caller : null
```
