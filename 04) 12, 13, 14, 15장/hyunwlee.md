## 12. 함수

>일련의 과정을 문<sup>statement</sup>으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것이다.  

  

#### 함수를 사용하는 이유

- 코드의 재사용
  - 유지보수의 편의성
  - 코드의 신뢰성
- 코드의 가독성  

---

  

#### 함수 리터럴

>자바스크립트의 함수는 객체 타입의 값이다.

```javascript
var f = function add(x, y) {
  return x + y;
};
```

> 일반 객체는 호출할 수 없지만 함수는 호출할 수 있다.

---

  

#### 함수 정의

함수의 정의방식  

- 함수 선언문

```javascript
function add(x, y) {
  return x + y;
}
```

- 함수 표현식

```javascript
var add = function(x, y) {
  return x + y;
}
```

- Function 생성자 함수

```javascript
var add = new Function('x', 'y', 'return x + y');
```

- 화살표 함수(ES6)

```javascript
var add = (x, y) => x + y;
```



> <mark>함수 선언문이 평가되면 식별자가 암묵적으로 생성되고 함수 객체가 할당된다.</mark>

  

### 함수 선언문

> 함수 리터럴은 함수 이름을 생략할 수 있으나 함수 선언문은 함수 이름을 생략할 수 없다.  
>
> <mark>함수 선언문은 <strong>표현식이 아닌 문</strong>이다.  </mark>

  

<mark>함수 선언문이 만약 표현식인 문이라면 완료 값 undefined 대신 표현식이 평가되어 생성된 함수가 출력되어야 한다. in console.  </mark>

> <strong>표현식인 문</strong>은 값으로 평가될 수 있는 문
>
> <strong>표현식이 아닌 문</strong>은 값으로 평가될 수 없는 문

  

```javascript
// 함수 선언문은 표현식이 아닌 문이므로 변수에 할당할 수 없다.
// 하지만 함수 선언문이 변수에 할당되는 것처럼 보인다. 
var add = function add(x, y) {
  return x + y;
};

// 함수 호출
console.log(add(2, 5));
```

이렇게 동작하는 이유는 `자바스크립트 엔진`이 코드의 문맥에 따라 동일한 함수 리터럴을 1) `표현식이 아닌 문`인 `함수 선언문`으로 해석하는 경우와 2) `표현식인 문`인 `함수 리터럴 표현식`으로 해석하는 경우가 있기 때문이다.  

  

> `함수 선언문`은 함수 이름을 생략할 수 없다는 점을 제외하면 함수 리터럴과 형태가 동일하다.

  

#### 기명함수 (익명함수)

```javascript
// 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석된다.
// 함수 선언문에서는 함수 이름을 생략할 수 없다.
function foo() {
  console.log('foo');
}

foo(); // foo

// 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석된다.
// 함수 리터럴에서는 함수 이름을 생략할 수 있다.
(function bar() {console.log('bar');});
bar(); // ReferenceError: bar is not defined
```

함수 리터럴(foo)은 `함수 선언문`으로 해석된다.  

<mark>하지만, 그룹 연산자() 내에 있는 함수 리터럴(bar)은 함수 선언문으로 해석되지 않고 함수 리터럴 표현식으로 해석된다.</mark>  

그룹 연산자의 피연산자는 값으로 평가될 수 있는 표현식이어야 한다.  

  

함수 선언문으로 생성된 foo는 호출할 수 있으나 함수 리터럴 표현식은 생성된 bar는 호출할 수 없다.  

- 이유
  - <mark><strong>`함수 이름`은 함수 몸체 내에서만 참조할 수 있는 식별자다.</strong></mark>
  - <mark>함수 몸체 외부에서는 함수 이름으로 함수를 참조할 수 없으므로 함수 몸체 외부에서 함수 이름으로 함수를 호출할 수 없다는 의미이다.</mark>

foo는 함수 몸체 내부에서만 유효한 식별자인 함수 이름이므로 foo로 함수를 호출할 수 없어야 한다.  

foo라는 이름으로 함수를 호출하려면 foo는 함수 이름이 아니라 함수 객체를 가리키는 식별자여야 한다.  

사실 foo는 자바스크립트 엔진이 암묵적으로 생성한 식별자다.  

  

<mark><strong>자바스크립트 엔진은 생성된 함수를 호출하기 위해 이름과 동일한 이름의 식별자를 암묵적으로 생성하고, 거기에 함수 객체를 할당한다.</strong></mark>  

  

```javascript
// 이렇게
var add = function add(x, y) {
  return x + y;
};

console.log(add(2, 5));
```

함수는 함수 이름으로 호출하는 것이 아니라 함수 객체를 가리키는 식별자로 호출한다.  

  

### 함수 표현식

> 자바스크립트의 함수는 객체 타입의 값이다. === 일급 객체다.
>
> 함수 리터럴로 생성한 함수 객체를 변수에 할당한 것이다.

```javascript
// 함수 표현식
var add = function(x, y) {
  return x + y;
};

console.log(add(2, 5));
```

  

```  javascript
// 기명 함수 표현식
var add = function foo(x, y) {
  return x + y;
};

// 함수 객체를 가리키는 식별자로 호출
console.log(add(2, 5));
  
// 함수 이름으로 호출하면 ReferenceError가 발생한다.
// 함수 이름은 함수 몸체 내부에서만 유효한 식별자다.
console.log(foo(2, 5)); // ReferenceError: foo is not defined
```

  

<mark>함수 선언문은 `표현식이 아닌 문`이고 함수 표현식은 `표현식인 문`이다.</mark>   

  

#### 함수 생성 시점과 함수 호이스팅

```javascript
// 함수 참조
console.dir(add); // f add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function(x, y) {
  return x - y;
}
```

함수 선언문으로 정의한 함수는 함수 선언문 이전에 호출할 수 있다.  

그러나 함수 표현식으로 정의한 함수 표현식 이전에 호출할 수 없다.  

<mark>함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수의 생성 시점이 다르기 때문이다.</mark>  

  

함수 선언문으로 함수를 정의하면 런타임 이전에 함수 객체가 먼저 생성된다. 그리고 자바스크립트 엔진은 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고 생성된 함수 객체를 할당한다.  

`이처럼 함수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징을 함수 호이스팅`<sup>function hoisting</sup>`이라고 한다.`  

vs.  

함수 표현식으로 함수를 정의하면 함수 호이스팅이 발생하는 것이 아니라 <ins>변수 호이스팅이 발생한다.</ins>  

함수 표현식 이전에 함수를 참조하면 undefined로 평가된다. 따라서 이때 함수를 호출하면 undefined를 호출하는 것과 마찬가지이므로 타입 에러<sup>TypeError</sup>가 발생한다. 따라서 함수 표현식으로 정의한 함수는 반드시 함수 표현식 이후에 참조 또는 호출해야 한다.  

  

함수 선언문 대신 함수 표현식을 권장한다.    

함수 호이스팅은 함수를 호출하기 전에 반드시 함수를 선언해야 한다는 당연한 규칙을 무시하기 때문에  

  

### Function 생성자 함수

> Function 생성자 함수에 매개변수 목록과 함수 몸체를 문자열로 전달하면서 new 연산자와 함께 호출하면 함수 객체를 생성해서 반환한다. 사실 new 연산자 없이 호출해도 결과는 동일하다.  

  

Function 생성자 함수로 함수는 클로저<sup>closure</sup>를 생성하지 않는 등, 함수 선언문이나 함수 표현식으로 생성한 함수와 다르게 동작한다.  

```javascript
var add1 = (function() {
  var a = 10;
  return function(x, y) {
    return x + y + a;
  }
}());
  
console.log(add1(1, 2)); // 13

var add2 = (function() {
  var a = 10;
  return new Function('x', 'y', 'return x + y + a');
}());

console.log(add2(1, 2)); // ReferenceError: a is not defined
```

  

### 화살표 함수  

> ES6에서 도입된 화살표 함수<sup>arrow function</sup>는 function키워드 대신 화살표<sup>fat arrow</sup> `=>`를 사용해 좀 더 간략한 방법으로 함수를 선언할 수 있다. 화살표 함수는 항상 익명 함수로 정의한다.  
>
> 표현만 간략한 것이 아니라 내부 동작 또한 간략화되어있다.  

화살표 함수를 더 공부하게 된다면 배우는 내용 

- 생성자를 사용할 수 없음
- 기존 함수와 this 바인딩 방식이 다름
- prototype 프로퍼티가 없음
- arguments 객체를 생성하지 않음



### 함수 호출

> 함수가 호출되면 함수 몸체 내에서 암묵적으로 매개변수가 생성되고 일반 변수와 마찬가지로 undefined로 초기화된 이후 인수가 순서대로 할당된다.
>
> 매개변수의 스코프(유효 범위)는 함수 내부다.
>
> 모든 인수, 초과된 인수마저도 암묵적으로 arguments 객체의 프로퍼티로 보관된다.  



### 인수 확인

> 1. 자바스크립트 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.
> 2. 자바스크립트는 동적 타입 언어다. 따라서 자바스크립트 함수는 매개변수의 타입을 사전에 지정할 수 없다.

따라서 자바스크립트의 경우 함수를 정의할 때 적절한 인수가 전달되었는지 확인할 필요가 있다.  

```javascript
function add(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    // 매개변수를 통해 전달된 인수의 타입이 부적절한 경우 에러를 발생시킨다.
    throw new TypeError('인수는 모두 숫자 값이어야 합니다.');
  }
  return x + y;
}

console.log(add(2)); // TypeError: 인수는 모두 숫자 값이어야 합니다.
console.log(add('a', 'b')); // TypeError: 인수는 모두 숫자 값이어야 합니다.
```

> 인수가 전달되지 않은 경우 `단축 평가`를 사용해 매개변수에 기본값을 할당하는 방법도 있다.  
>
> ES6에서 도입된 매개변수 기본값을 사용도 가능하다.

  

### 매개변수의 최대 개수

> 이상적인 함수는 한 가지 일만 해야 하며 가급적 작게 만들어야 한다.

  

### 반환문

> 함수 호출은 표현식이다.

  

### 참조에 의한 전달과 외부 상태의 변경

> 원시 값은 값에 의한 전달<sup>pass by value</sup>, 객체는 참조에 의한 전달<sup>pass by reference</sup>방식으로 전달된다.  
>
> 매개변수도 함수 몸체 내부에서 변수와 동일하게 취급되므로 매개변수 또한 타입에 따라 값에 의한 전달, 참조에 의한 전달 방식을 그대로 따른다.

```javascript
// 매개변수 primitive는 원시 값을 전달받고, 매개변수 obj는 객체를 전달받는다.
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = 'Kim';
}

// 외부 상태
var num = 100;
var person = { name: 'Lee' };

console.log(num); // 100
console.log(person); // {name: "Lee"}

// 원시 값은 값 자체가 복사되어 전달되고 객체는 참조 값이 복사되어 전달된다.
changeVal(num, person);

// 원시 값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // {name: "kim"}
```

함수가 외부 상태를 변경하면 상태 변화를 추적하기 어려워진다.  

객체의 변경을 추적하려면 옵저버<sup>Observer</sup>패턴 등을 통해 객체를 참조를 공유하는 모든 이들에게 변경 사실을 통지하고 이에 대처하는 추가 대응이 필요하다.  

해결책

- 객체를 불변 객체로 만들어 사용하는 것이다.
  - 객체의 방어적 복사를 통해 원본 객체를 완전히 복제, 즉 깊은 복사를 통해 새로운 객체를 생성하고 재할당을 통해 교체한다.
  - 외부 상태를 변경하지 않고 외부 상태에 의존하지도 않는 함수를 <mark>순수 함수</mark>라 한다.



### 다양한 함수의 형태

1. 즉시 실행 함수  

> 즉시 실행 함수는 함수 이름이 없는 익명 함수를 사용하는 것이 일반적이다.
>
> 기명 즉시 실행 함수도 사용할 수 있다.
>
> 하지만 그룹 연산자(...) 내의 기명 함수도 함수 선언문이 아니라 함수 리터럴로 평가되며 함수 이름은 함수 몸체에서만 참조할 수 있는 식별자이므로 즉시 실행 함수를 다시 호출할 수는 없다.
>
> 변수나 함수 이름의 충돌을 방지할 수 있다.  

2. 재귀 함수
3. 중첩 함수

> 함수 내부에 정의된 함수를 `중첩 함수` 또는 `내부 함수`라 한다.
>
> 그리고 중첩 함수를 포함하는 함수는 외부 함수라 부른다.
>
> 중첩 함수는 외부 함수 내부에서만 호출할 수 있다.
>
> 일반적으로 중첩 함수는 자신을 포함하는 외부 함수를 돕는 `헬퍼 함수`의 역할을 한다.

4. 콜백 함수

> 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백 함수라고 하며, 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 고차함수라고 한다.  
>
> 고차 함수는 콜백 함수를 자신의 일부분으로 합성한다.
>
> 고차 함수는 매개변수를 통해 전달받은 콜백 함수의 호출 시점을 결정해서 호출한다.  
>
> 다시 말해, 콜백 함수는 고차 함수에 의해 호출되며 이때 고차 함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다.
>
> <strong>콜백 함수를 익명 함수 리터럴로 정의하면서 곧바로 고차 함수에 전달하면 고차 함수가 호출될 때마다 콜백 함수가 생성된다.</strong>



### 순수 함수와 비순수 함수

> 순수함수  
>
> - 어떤 외부 상태에도 의존하지 않고 오직 매개변수를 통해 함수 내부로 전달된 인수에게만 의존해 값을 생성해 반환한다. (외부 상태에는 전역 변수, 서버 데이터, 파일, Console, DOM 등이 있다.)
> - 일반적으로 최소 하나 이상의 인수를 전달받는다.
> - 인수를 변경하지 않는 것이 기본이다. 즉, 인수의 불변성을 유지한다.
>
> - 함수의 외부 상태를 변강하지 않는다.
>
> 비순수 함수
>
> - 외부 상태를 변경하는 부수 효과가 있다.



## 스코프

> 모든 식별자(변수 이름, 함수 이름, 클래스 이름 등)는 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정 된다. 이를 스코프라 한다. 즉, 스코프는 식별자가 유효한 범위를 말한다.
>
> 식별자를 검색할 때 사용하는 규칙

자바스크립트 엔진은 코드를 실행할 때 코드의 문맥<sup>context</sup>을 고려한다.  

"코드가 어디서 실행되며 주변에 어떤 코드가 있는지"를 렉시컬 환경<sup>lexical environment</sup>이라고 부른다. 즉, 코드의 문맥<sup>context</sup>은 렉시컬 환경으로 이뤄진다. 이를 구현한 것이 "실행 컨텍스트이며, 모든 코드는 실행 컨텍스트에서 평가되고 실행된다."

let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.  



#### 스코프의 종류

- 전역
  - 코드의 가장 바깥 영역
- 지역
  - 함수 몸체 내부
  - 자신의 지역 스코프와 하위 지역 스코프에서 유효하다.



#### 스코프 체인

- 변수를 참조할 때 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 이동하며 선언된 변수를 검색<sup>identifier resolution</sup>을 한다.  

- 스코프 체인은 실행 컨텍스트의 레시컬 환경을 단방향으로 연결<sup>chaining</sup>한 것이다. 전역 렉시컬 환경은 코드가 로드되면 곧바로 생성되고 함수의 렉시컬 환경은 함수가 호출되면 곧바로 생성된다.



#### 스코프 체인에 의한 변수 검색

- 상위 스코프에서 유효한 변수는 하위 스코프에서 자유롭게 참조할 수 있지만, 하위 스코프에서 유효한 변수를 상위 스코프에서 참조할 수 없다.

#### 스코프 체인에 의한 함수 검색



### 함수 레벨 스코프

- 코드 블록이 아닌 함수에 의해서만 지역 스코프가 생성된다는 의미이다.
- C나 자바 등을 비롯한 대부분의 프로그래밍 언어는 함수 몸체만이 아니라 모든 코드 블록(if, for, while, try/catch 등)이 지역 스코프를 만든다. 이러한 특성을 `블록 레벨 스코프`라 한다.
- 하지만, var키워드로 선언된 변수는 오로지 `함수의 코드 블록(함수 몸체)`만을 지역 스코프로 인정한다.

```javascript
var x = 1;

if (true) {
  // var 키워드로 선언된 변수는 함수의 코드 블록(함수 몸체)만을 지역 스코프로 인정한다.
  // 함수 밖에서 var 키워드로 선언된 변수는 코드 블록 내에서 선언되었다 할지라도 모두 전역 변수다.
  // 따라서 x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
  // 이는 의도치 않게 변수 값이 변경되는 부작용을 발생시킨다.
  var x = 10;
}

console.log(x); // 10
```

  

### 렉시컬 스코프

- 세상에는 함수의 상위 스코프를 결정하는 데에 동적 스코프(함수를 어디서 호출했는지에 따라)와 렉시컬 스코프(함수를 어디서 정의했는지에 따라)가 존재한다.

- 자바스크립트는 렉시컬 스코프를 따르므로 함수를 어디서 호출했는지가 아니라 함수를 어디서 정의했는지에 따라 상위 스코프를 결정한다. 함수가 호출된 위치는 상위 스코프 결정에 어떠한 영향도 주지 않는다. 즉, 함수의 상위 스코프는 언제나 자신이 정의된 스코프다.





---

quiz 1 - 함수 선언문, 함수 표현식

- 함수 선언문과 함수 표현식 차이점과 어느 것을 더 선호하는지 말씀해 주세요.

ans 2

- 함수 선언문 대신 함수 표현식을 권장한다.    

  함수 호이스팅은 함수를 호출하기 전에 반드시 함수를 선언해야 한다는 당연한 규칙을 무시하기 때문이다.  

  

quiz 2 - 참조에 의한 전달과 외부 상태의 변경, 매개변수의  최대 개수  

- 객체를 인수로 사용하는 경우 프로퍼티 키만 정확히 지정하면 매개변수의 순서를 신경 쓰지 않아도 된다는 장점이 있다. 알고있는 단점은?

ans  2

- 함수 외부에서 함수 내부로 전달한 객체를 함수 내부에서 변경하면 함수 외부의 객체가 변경되는 부수 효과<sup>side effect</sup>가 발생한다는 것이다.



quiz 3 

- 콜백 함수가 생성되는 기준? (feat: 함수 타입 prop 참조 동일성 유지 in useCallback of react hooks)

ans 3

- 고차 함수가 호출될 때마다 (자식 컴포넌트)

---

  

