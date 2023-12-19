# Strict Mode

strict 모드 적용시, 발생시킬 수 있는 에러

1. 선언하지 않은 변수 참조
2. 변수, 함수, 매개변수 delete 연산자 사용
3. 매개 변수 이름의 중복
4. with문 사용

### with문은?

```javascript
with (Math) {
  let a = PI * 10;
  let b = cos(PI) * 10;
}
// 위처럼 프로퍼티에 쉽게 접근 할 수 있도록 하는 메서드
```

🚫 deprecated,
금지된 이유는 무엇일까?

- 변수 스코프와 객체 네임스페이스 사이의 충돌을 야기
- 본문의 모든 변수를 찾기위해 객체의 프로토타입 체인을 탐색해서 속도가 느려짐  
  => destructuring 또는 지역 변수를 사용하여 해결할 수 있으나, 성능과 가독성에 좋지않기에 사용하지않는다.

> Quiz  
> [1] strictMode 적용시, 일반 함수의 this는?

```javascript
//[2]
function(a){
    'use strict';
    a=2;
    console.log(arguments); // 출력값은?
}(1);
```
#
# 빌트인 객체

### Wrapper 객체

```javascript
const str = 'hello';

console.log(str.length);
console.log(str.toUpperCase());
```

위와 같이 원시값임에도 불구하고, 객체처럼 프로퍼티에 접근하거나 메서드를 호출 할 수 있는 이유는 래퍼 객체때문이다.

#

### eval 함수

- eval 함수는 기존의 스코프를 런타임 시에 동적으로 수정하는 막강한 기능의 함수이다.
- 대부분의 함수는 자신이 선언된 스코프에만 접근할 수 있지만,
  eval은 자신이 호출된 시점의 전체 스코프에 접근할 수 있다.
- 이렇듯 외부의 호출자가 프로그램의 스코프를 변경할 수 있기에 보안 측면에서 금지되어 있다.

```javascript
var x = 'global';
function test() {
  var x = 'local';
  return eval('x');
}
test(); // local
```

#### 🧐 하지만 그럼에도 불구하고 써야한다면?

간접적인 eval 호출을 사용한다면 지역적 스코프로의 모든 접근을 잃게할 수 있다.

```javascript
var x = 'global';
function test() {
  var x = 'local';
  var f = eval;
  return f('x'); // 간접적 eval
  // return (0,eval)('x'); 동일한 간접적 eval 호출법
}
test(); // global
```

#

> Quiz  
> [1] 원시값이 있는데도 문자열, 숫자, 불리언 객체를 생성하는 표준 빌트인 생성자 함수가 존재하는 이유는 무엇일까?  
> [2] null과 undefined의 래퍼 객체는?  
> [3] encodeURI와 encodeURIComponent의 차이는?
#
# this

### this는 자신이 속한 객체 혹은 생성할 인스턴스를 가르키는 자기 참조 변수이다.

> 호출방식에 의해 동적으로 결정된다!
>
> 또한, 일반 함수로 호출된 모든 함수 내부의 this에는 전역 객체가 바인딩된다.  
>  (use strict적용 시, undefined)

### 커링함수에는 bind를 사용하라

- 커링함수: 함수의 인자를 부분집합으로 바인딩하는 기법

```javascript
function getURL(protocol, domain, path) {
  return protocol + '://' + domain + '/' + path;
}
const url = paths.map(getURL(null, 'http', 'test.com'));
```

#

> Quiz  
> [1] call과 apply 메서드의 차이는?  
> [2] call, apply와 bind의 차이는?

<details>
<summary>
[3] 함수에 명시적으로 this를 바인딩 할 수 있는 방법 3가지는?
</summary>
<p>
<div>
1. map, forEach같은 고차함수를 사용   
</div>
<div>
2. apply, call, bind 메서드를 사용   
</div>
<div>
3. 화살표함수를 사용
</div>
</p>
</details>
#
# 실행 컨텍스트

⭐️ ECMA script의 소스코드 타입

1. 전역코드
2. 함수코드
3. eval코드
4. 모듈코드

### 실행 컨텍스트란?

- 소스코드를 실행하는데 필요한 환경을 제공하고, 코드의 실행 결과를 실제로 관리하는 영역
- 식별자와 스코프 => **렉시컬 환경**
- 코드 실행 순서 => **실행 컨텍스트 스택**

#

### Lexical Environmnet?

- 스코프를 생성하여 식별자로 키를 등록하고, 식별자에 바인딩된 값을 관리
- 즉, 스코프와 식별자를 관리하는 영역.

### 전역 코드 평가 순서

1. 전역 실행 컨텍스트 생성 Global Execution Context
2. 전역 렉시컬 환경 생성 Global Lexical Environment  
   2.1. 전역 환경 레코드 생성 Global Environment Record  
    2.1.1. 객체 환경 레코드 Object Environmnet Record  
    2.1.2. 선언적 환경 레코드 Declarative Environment Record  
   2-2. this 바인딩  
   2.3. 외부 렉시컬 환경에 대한 참조 결정 Outer Lexical Reference

### 함수 코드 평가 순서

1. 함수 실행 컨텍스트 생성 Function Execution Context
2. 함수 렉시컬 환경 생성 {func} Lexical Environment  
   2.1 함수 환경 레코드 생성 Function Environment Record  
   2.2 this 바인딩  
   2.3 외부 렉시컬 환경에 대한 참조 결정 Outer Lexical Reference

#

> Quiz.  
> [1] 아래 코드의 렉시컬 환경을 도식화하시오.

```javascript
var x = 1;
const y = 2;

function foo(a) {
  var x = 3;
  const y = 4;

  function bar(b) {
    const z = 5;
    console.log(a + b + x + y + z);
  }
  bar(10);
}
foo(20);
```

> [2] 블록 레벨 스코프는 독립적인 렉시컬 환경을 생성한다. (O/X)  
> [3] 렉시컬 영역의 변수는 참조가 되고 있어도, 실행 컨텍스트 스택에서 종료되면 함께 삭제된다. (O/X)
