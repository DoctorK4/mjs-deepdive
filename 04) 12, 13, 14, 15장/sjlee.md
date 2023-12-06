# 12. 함수

자바스크립트 엔진은 생성된 함수를 호출하기 위해 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고, 거기에 함수 객체를 할당한다.  
즉, 함수는 함수 이름으로 호출하는 것이 아니라 함수 객체를 가리키는 식별자로 호출하는 것.

> **Quiz**  
> [1] Function 생성자 함수로 생성한 함수는 Closer를 생성하지 않는다. 그렇다면 Arrow 함수는?  
> [2] Arrow 함수는 arguments 객체를 생성하지 않는다. (O/X)

- 순수함수: 외부 상태 변경❌, 외부 상태 의존❌
- 고차함수: 매개변수를 통해 콜백함수를 전달받은 함수

```javascript
// 이 함수는 괜찮은걸까?
function changeName(obj) {
  obj.name = 'Bob';
  return obj;
}
```
```javascript
// 이 함수는 괜찮은걸까?
function changeName(obj) {
  return {...obj, name:'Bob'};
}
```

### 함수형 프로그래밍이 등장한 이유는?

- 순수함수와 외부함수의 조합을 통해 외부상태를 변경하는 부수효과를 최소화해서 불변성을 지향하는 프로그래밍. 변수 사용을 억제하거나 생명주기를 최소화해서 상태 변경을 피해 오류를 최소화하기 위함!

# 13. 스코프

스코프란? 식별자가 유효한 범위

> **Quiz**  
> [3] 하위 스코프에서 선언한 변수를 상위 스코프에서 참조할 수 있다. (O/X)  
> [4] 스코프 체인은 렉시컬 환경을 양방향으로 연결한 것이다. (O/X)

### 렉시컬 스코프(Lexical Scope)

Lexical은 '어휘'라는 뜻을 가지고 있다. 프로그래밍에서는 이 어휘를 코드로 볼 수 있는데, 함수의 정의가 평가되는 시점에 상위 스코프가 정적으로 결정되는 환경을 렉시컬 스코프 환경이라고 한다.

> **Quiz**  
> [5] 렉시컬 스코프는 어디서 호출되었는지에 따라 상위 스코프가 결정된다. (O/X)

# 14. 전역변수의 문제점

> **Quiz**  
> [6] 전역 변수를 지역 변수로 바꾸기 위해 적용할 수 있는 방법은?   
> [11] 왜 지역 변수를 사용해야할까?

즉시 실행함수는 지역 스코프를 만들어준다. 하지만 IIFE는 스코프에 변화를 만들어내기에 주의해서 사용해야한다.

1. 함수 밖이기에 break나 continue 명령어를 사용할 수 없다.
2. this나 arguments 변수 참조시 익명함수는 이를 다르게 해석한다.

### 아래는 지역 변수 스코프를 만들기 위해 즉시 실행 함수 표현식을 사용해야하는 이유를 알려주는 예시 중 하나이다. (Closer에 대한 이해가 필요!)

```javascript
function wrapElements(a) {
  var result = [],
    i,
    n;
  for (i = 0, n = a.length; i < n; i++) {
    result[i] = function () {
      return a[i];
    };
  }
  return result;
}
var wrapped = wrapElements([10, 20, 30, 40, 50]);
var f = wrapped[0];
f(); // ?
```

이것을 어떻게 바꿀 수 있을까?

```javascript
function wrapElements(a) {
  var result = [],
    i,
    n;
  for (i = 0, n = a.length; i < n; i++) {
    (function () {
      var j = i;
      result[i] = function () {
        return a[j];
      };
    })();
  }
  return result;
}
var wrapped = wrapElements([10, 20, 30, 40, 50]);
var f = wrapped[0];
f(); // ?
```

i의 값이 매번 함수가 생성되고 난 뒤 변하기 때문.

# 15. let, const 키워드와 블록 레벨 스코프

```javascript
// var가 안좋은 이유

// 1. 변수 선언하는 키워드 없이 선언 & 할당이 가능함
// 선언인지, 재할당인지 구분이 어려움
something = 'st';
console.log(something); // 가능

// 2. 중복 선언이 가능함
var poo = 'poo';
var poo = 'poo';
console.log(poo);

// 3. 블록 레벨 스코프 안됌
var apple = '사과';
{
  var apple = 'apple';
}
console.log(apple); // apple 출력됌, 호이스팅

// 4. 함수 레벨 스코프만 지원
function example() {
  var dog = 'dog';
}
console.log(dog); // error
```
> **Quiz**  
> [7] let, const, class는 호이스팅 되지 않는다. (O/X)  
> [8] 그 이유는 무엇인가?  
> [9] const는 재할당이 금지되어있다. (O/X)  
> [10] var는 함수 단위 스코프이다. 블록 스코프가 지원되는 예외 상황은?
