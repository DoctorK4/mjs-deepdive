## 20. strict mode

#### 20.1 strict mode란?

> ES5부터 strict mode(엄격 모드)가 추가되었다. strict mode는 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.  
>
> ESLint 같은 린트 도구를 사용해도 strict mode와 유사한 효과를 얻을 수 있다.  

#### 20.2 strict mode의 적용

> 전역의 선두 또는 함수 몸체의 선두에 `'use strict';`를 추가한다.

#### 20.3 전역에 strict mode를 적용하는 것은 피하자

> 전역에 적용한 strict mode는 스크립트 단위로 적용된다.

#### 20.4 함수 단위로 strict mode를 적용하는 것도 피하자

> 일관성 있게 모든 함수에 strict mode를 적용하는 것이 바람직하지만 번거로운 일이다.
>
> 따라서, strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.  

#### 20.5 strict mode가 발생시키는 에러

> 1. 암묵적 전역
>
>    <ins>선언하지 않음 변수를 참조하면 ReferenceError가 발생한다.</ins>
>
> 2. 변수, 함수, 매개변수의 삭제
>
>    <ins>delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생한다.</ins>
>
> 3. 매개변수 이름의 중복
>
>    <ins>중복된 매개변수 이름을 사용하면 SyntaxError가 발생한다.</ins>
>
> 4. with 문의 사용
>
>    <ins>with문을 사용하면 SyntaxError가 발생한다.</ins>

#### 20.6 strict mode 적용에 의한 변화

> 1. 일반 함수의 this
>
>    <ins>strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다.</ins> 
>
> 2. arguments 객체
>
>    <ins>매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.</ins>

  

---

  

## 21 빌트인 객체

#### 21.1 자바스크립트 객체의 분류

> 자바스크립트 객체 3분류  
>
> 1. 표준 빌트인 객체
>
>    ECMAScript 사양에 정의된 객체를 말하며, 애플리케이션 전역의 공통 기능을 제공한다.
>
> 2. 호스트 객체
>
>    ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행 환경에서 추가로 제공하는 객체를 말한다.
>
> 3. 사용자 정의 객체
>
>   

#### 21.2 표준 빌트인 객체

> Object, String, Number, Boolean, Symbol, Date, Math, RegExp, Array, Map/Set, WeakMap/WeakSet, Function, Promise, Reflect, Proxy, JSON, Error 등 40여 개의 표준 빌트인 객체  
>
> Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수 객체다.  
>
> 생성자 함수 객체인 표준 빌트인 객체는 프로토타입 메서드와 정적 메서드를 제공하고 생성자 함수 객체가 아닌 표준 빌트인 객체는 정적 메서드만 제공한다.  
>
> 생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체다.  

#### 21.3 원시값과 래퍼 객체

> 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼<sup>wrapper object</sup>라 한다.  
>
> ex) 문자열에 대해 마침표 표기법으로 접근하면 그 순간 래퍼 객체인 String 생성자 함수의 인스턴스가 생성되고 <strong>문자열은 래퍼 객체의 \[\[StringData\]\] 내부 슬롯에 할당된다.</strong>  
>
> 그 후 래퍼 객체의 처리가 종료되면 래퍼 객체의 \[\[StringData\]\] 내부 슬롯에 할당된 원시값으로 원래의 상태, 즉 식별자가 원시값을 갖도록 되돌리고 래퍼 객체는 가비지 컬렉션의 대상이 된다.   
>
> 문자열 래퍼 객체인 String 생성자 함수의 인스턴스는 String.prototype의 메서드를 상속받아 사용할 수 있다.  

#### 21.4 전역 객체

> 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체  
>
> 브라우저 환경: window(또는 self, this, frames)  
>
> Node.js 환경: global  
>
> 전역 객체는 계층적 구조상 어떤 객체에도 속하지 않은 모든 빌트인 객체(표준 빌트인 객체와 호스트 객체)의 최상위 객체다. 어떤 객체의 프로퍼티도 아니며 객체의 계층적 구조상 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소유한다는 것을 말한다.  
>
> let이나 const 키워드로 선언한 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드)내에 존재하게 된다.  
>
> > 21.4.1 빌트인 전역 프로퍼티
>
>  	1. Infinity
>  	2. NaN
>  	3. undefined
>
> > 21.4.2 빌트인 전역 함수
>
> 1. eval
> 2. isFinite
> 3. isNaN
> 4. parseFloat
> 5. parseInt
> 6. encodeURI / decodeURI
> 7. encodeURIComponent / decodeURIComponent
>
> > 21.4.3 암묵적 전역

  

---

  

## 22. this

#### 22.1 this 키워드

> 동작을 나타내는 메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다. 이때 메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 <ins>자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.</ins>  
>
> 생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다.  
>
> <strong>this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수<sup>self-referencing variable</sup>다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.</strong>  
>
> 단, this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.  

####  22.2 함수 호출 방식과 this 바인딩

> this 바인딩(this에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.  
>
> - 렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.
>
>   함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프<sup>lexical scope</sup>는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. <ins>하지만 this 바인딩은 함수 호출 시점에서 결정된다.</ins>
>
>   
>
> 함수를 호출하는 방식 4가지
>
> - 일반 함수 호출
> - 메서드 호출
> - 생성자 함수 호출
> - Function.prototype.apply/call/bind 메서드에 의한 간접 호출
>
> ```javascript
> // this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
> const foo = function() {
>   console.dir(this);
> };
> 
> // 동일한 함수도 다양한 방식으로 호출할 수 있다.
> 
> // 1. 일반 함수 호출
> // foo 함수를 일반적인 방식으로 호출
> // foo 함수 내부의 this는 전역 객체 window를 가리킨다.
> foo(); // window
> 
> // 2. 메서드 호출
> // foo 함수를 프로퍼티 값으로 할당하여 호출
> // foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다.
> const obj = { foo };
> obj.foo(); // obj
> 
> // 3. 생성자 함수 호출
> // foo 함수를 new 연산자와 함께 생성자 함수로 호출
> // foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다.
> new foo(); // foo {}
> 
> // 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
> // foo 함수 내부의 this는 인수에 의해 결정된다.
> const bar = { name: 'bar' };
> 
> foo.call(bar); // bar
> foo.apply(bar); // bar
> foo.bind(bar)(); // bar
> ```
>
>   
>
> > 22.2.1 일반 함수 호출
>
> 기본적으로 this에는 전역 객체<sup>global object</sup>가 바인딩된다.
>
> 전역 함수는 물론이고 중첩 함수를 일반 함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩된다.  
>
> strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다.  
>
> <ins>메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.</ins>  
>
> <ins>콜백 함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩된다. </ins>  
>
> 이처럼 일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩된다.  
>
>   
>
> `중첩 함수` 또는 `콜백 함수`는 외부 함수를 돕는 `헬퍼 함수의 역할`을 하므로 외부 함수의 일부 로직을 대신하는 경우가 대부분이다. <mark>하지만 외부 함수인 메서드와 중첩 함수 또는 콜백 함수의 this가 일치하지 않다는 것은 중첩 함수 또는 콜백 함수를 헬퍼 함수로 동작하기 어렵게 만든다.</mark>  
>
> 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법은 다음과 같다.  
>
> ```javascript
> var value = 1;
> 
> const obj = {
>   value: 100,
>   foo() {
>     // this 바인딩(obj)을 변수 that에 할당한다.
>     const that = this;
>     
>     // 콜백 함수 내부에서 this 대신 that을 참조한다.
>     setTimeout(function() {
> 	  console.log(that.value); // 100
> 	}, 100);
>   }
> };
> 
> obj.foo();
> ```
>
>   
>
> 위 방법 이외에도 자바스크립트 this를 명시적으로 바인딩할 수 있는 Function.prototype.apply, Function prototpye.call, Function.prototype.bind 메서드를 제공한다.    
>
> ```javascript
> 다var value = 1;
> 
> const obj = {
>   value: 100,
>   foo() {
>     // 콜백 함수에 명시적으로 this를 바인딩한다.
>     setTimeout(function() {
>       console.log(this.value);
>     }.bind(this), 100);
>   }
> };
> 
> obj.foo();
> ```
>
>   
>
> 화살표 함수를 사용해서 this 바인딩을 일치시킬 수도 있다.  
>
> ```javascript
> var value = 1;
> 
> const obj = {
>   value: 100,
>   foo() {
>     // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
>     setTimeout(() => console.log(this.value), 100);
>   }
> };
> 
> obj.foo();
> ```
>
>   
>
> > 22.2.2 메서드 호출
>
> 메서드를 호출할 때 메서드 이름 앞의 마침표(.) 연산자 앞에 기술한 객체가 바인딩된다.  
>
>   
>
> > 22.2.3 생성자 함수 호출
>
> 생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다.  
>
>   
>
> > 22.2.4 Function.prototype.apply / call / bind 메서드에 의한 간접 호출
>
> apply, call, bind 메서드는 Function.prototype의 메서드다. 즉, 이들 메서드는 모든 함수가 상속받아 사용할 수 있다.  
>
> <strong>Function.prototype.apply</strong>, <strong>Function.prototype.call</strong> 메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.  
>
> ```javascript
> /**
>  * 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
>  * @param thisArg - this로 사용할 객체
>  * @param argArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
>  * @returns 호출된 함수의 반환값
>  */
> Function.prototype.apply(thisArg[, argsArray]);
> 
> /**
>  * 주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
>  * @param thisArg - this로 사용할 객체
>  * @param arg1, arg2, ... - 함수에게 전달할 인수 리스트
>  * @returns 호출된 함수의 반환값
>  */
> Function.prototype.call(thisArg[, args1[, args2[, ...]]]);
> ```
>
>   
>
> <strong>apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다.</strong>  
>
> <mark>apply와 call 메서드의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우다. arguments  객체는 배열이 아니기 때문에 Array.prototype.slice 같은 배열의 메서드를 사용할 수 없으나 apply와 call 메서드를 이용하면 가능하다.</mark>  
>
> ```javascript
> function convertArgsToArray() {
>   console.log(arguments);
>   
>   // arguments 객체를 배열로 변환
>   // Array.prototype.slice를 인수 없이 호출하면 배열의 복사본을 생성한다.
>   const arr = Array.prototype.slice.call(arguments);
>   // const arr = Array.prototype.slice.apply(arguments);
>   console.log(arr);
>   return arr;
> }
> 
> convertArgsToArray(1, 2, 3); // [1, 2, 3]
> ```
>
>   
>
> Function.prototype.bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않는다. 다만 첫 번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환한다.  
>
> ```javascript
> function getThisBinding() {
>   return this;
> }
> 
> // this로 사용할 객체
> const thisArg = { a: 1 };
> 
> // bind 메서드는 첫 번째 인수로 전달한 thisArg로 this 바인딩이 교체된
> // getThisBinding 함수를 새롭게 생성해 반환한다.
> console.log(getThisBinding.bind(thisArg));
> // bind 메서드는 함수를 호출하지 않으므로 명시적으로 호출해야 한다.
> console.log(getThisBinding.bind(thisArg)());
> ```
>
>   
>
> <strong>bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.</strong>  
>
> > 요랬는데
>
> ```javascript
> const person = {
>   name: 'Lee',
>   foo(callback) {
>     setTimeout(callback, 100);
>   }
> };
> 
> person.foo(function() {
>   console.log(`Hi! my name is ${this.name}.`); // Hi! my name is .
>   // 일반 함수로 호출된 콜백 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
>   // 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
> })
> ```
>
> > 요래됐슴당
>
> ```javascript
> const person = {
>   name: 'Lee',
>   foo(callback) {
>     // bind 메서드로 callback 함수 내부의 this 바인딩을 전달
>     setTimeout(callback.bind(this), 100);
>   }
> };
> 
> person.foo(function() {
>   console.log(`Hi! my name is ${this.name}.`); // Hi! my name is .
> });
> ```

  

---

  

## 23. 실행 컨텍스트

자바스크립트의 동작 원리를 담고 있는 핵심 개념이다.  

#### 23.1 소스코드의 타입

> ECMAScript 사양은 소스코드(ECMAScript code)를 4가지 타입으로 구분한다.  
>
> 4가지 타입의 소스코드는 `실행 컨텍스트`를 생성한다.  
>
> | 소스코드의 타입 | 설명                                                         |
> | --------------- | ------------------------------------------------------------ |
> | 전역 코드       | 전역에 존재하는 소스코드를 말한다. 전역에 정의된 함수. 클래스 등의 내부 코드는 포함되지 않는다. |
> | 함수 코드       | 함수 내부에 존재하는 소스코드를 말한다. 함수 내부에 중첩된 함수, 클래스 등의 내부 코드는 포함되지 않는다. |
> | eval 코드       | 빌트인 전역 함수인 eval 함수에 인수로 전달되어 실행되는 소스코드를 말한다. |
> | 모듈 코드       | 모듈 내부에 존재하는 소스코드를 말한다. 모듈 내부의 함수, 클래스 등의 내부 코드는 포함되지 않는다. |
>
> 
>
> <ins>소스코드(실행 가능한 코드)를 4가지 타입으로 구분하는 이유는 타입에 따라 실행 컨텍스트를 생성하는 과정과 관리 내용이 다르기 때문이다.</ins>  
>
> 1. 전역 코드
>
>    - 전역 변수를 관리하기 위해 최상위 스코프인 전역 스코프를 생성해야 한다.
>    - `var 키워드로 선언된 전역 변수`와 `함수 선언문으로 정의된 전역 함수`를 전역 객체의 프로퍼티와 메서드로 바인딩하고 참조하기 위해 전역 객체와 연결되어야 한다.
>
> 2. 함수 코드
>    - 지역 스코프를 생성하고 지역 변수, 매개변수, arguments 객체를 관리해야 한다.
>    - <ins>생성한 지역 스코프를 전역 스코프에서 시작하는 스코프 체인의 일원으로 연결해야 한다.</ins>  
>
> 3. eval 코드
>    - strict mode에서 자신만의 독자적인 스코프를 생성한다.
>
> 4. 모듈 코드
>    - 모듈별로 독립적인 모듈 스코프를 생성한다.  

#### 23.2 소스코드의 평가와 실행

> 모든 소스코드는 실행에 앞서 `평가 과정`을 거치며 코드를 실행하기 위한 `준비`를 한다.  
>
> 다시 말해, 자바스크립트 엔진은 소스코드를 2개의 과정, 즉 `소스코드의 평가`와 `소스코드의 실행` 과정으로 나누어 처리한다.  
>
> - 소스코드 평과 과정
>   - 실행 컨텍스트 생성
>   - <mark>변수, 함수 등의 선언문만 먼저 실행하여 생성된 변수나 함수 식별자를 키로 신행 컨텍스트가 관리하는 스코프(렉시컬 환경의 `환경 레코드`)에 등록한다.</mark>
> - 소스코드 평과 과정이 끝나면
>   - 비로소 선언문을 제외한 소스코드가 순차적으로 실행되기 시작한다. 즉, 런타임이 시작된다.
>   - 이때 소스코드 실행에 필요한 정보, 즉 변수나 함수의 참조를 실행 컨텍스트가 관리하는 스코프에서 검색해서 취득한다.
>   - 변수값의 변경 등 소스코드의 실행 결과는 다시 실행 컨텍스트가 관리하는 스코프에 등록된다.  

#### 23.3 실행 컨텍스트의 역할

> 1. 전역 코드 평가
> 2. 전역 코드 실행
> 3. 함수 코드 평가
> 4. 함수 코드 실행
>
> (위의 자세한 내용들은 책을 통해서...)
>
> 이처럼 코드가 실행되려면 다음과 같이 스코프, 식별자, 코드 실행 순서 등의 관리가 필요하다.  
>
> 1. 선언에 의해 생성된 모든 식별자(변수, 함수, 클래스 등)를 스코프를 구분하여 등록하고 상태 변화(식별자에 바인딩된 값으 변화)를 지속적으로 관리할 수 있어야 한다.
> 2. 스코프는 중첩 관계에 의해 스코프 체인을 형성해야 한다. 즉, 스코프 체인을 통해 상위 스코프로 이동하며 식별자를 검색할 수 있어야 한다.
> 3. 현재 실행 중인 코드의 실행 순서를 변경(예를 들어, 함수 호출에 의한 실행 순서 변경)할 수 있어야 하며 다시 되돌아갈 수도 있어야 한다.
>
> 이 모든 것을 관리하는 것이 바로 실행 컨텍스트다. <strong>실행 컨텍스트는 소스코드를 실행하는 데 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역이다.</strong>  
>
> <strong>실행 컨텍스트는 식별자(변수, 함수, 클래스 등의 이름)를 등록하고 관리하는 스코프와 코드 실행 순서 관리를 구현한 내부 메커니즘으로, 모든 코드는 실행 컨텍스트를 통해 실행되고 관리된다.</strong>  
>
> 식별자와 스코프는 실행 컨텍스트의 `렉시컬 환경`으로 관리하고 코드 실행 순서는 `실행 컨텍스트 스택`으로 관리한다.  

#### 23.4 실행 컨텍스트 스택

> 자바스크립트 엔진은 먼저 전역 코드를 평가하여 `전역 실행 컨텍스트`를 생성한다.  
>
> 그리고 함수가 호출되면 함수 코드를 평가하여 `함수 실행 컨텍스트`를 생성한다.  
>
> 이때 생성된 실행 컨텍스트는 스택 자료구조로 관리된다. 이를 `실행 컨텍스트 스택`이라고 부른다.  
>
> > 예제 23-03
>
> 1. 전역 코드의 평가와 실행
> 2. 전역 함수 foo 코드의 평가와 실행
> 3. 중첩 함수 bar 함수 코드의 평가와 실행
> 4. foo 함수 코드로 복귀
> 5. 전역 코드로 복귀
>
> 





1. 기본적으로 strict mode가 적용되는 곳?

> ES6에서 도입된 `클래스`와 `모듈`

  

2. 외부 서드파티 라이브러리를 사용하는 경우 non-strict mode인 경우도 있기 때문에 전역에 strict mode를 적용하는 것은 바람직하지 않다. 이를 해결하는 방법?

> 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.  

  

3. 책에서 String, Number, Boolean 생성자 함수를 new 연산자와 함께 호출하여 문자열, 숫자 불리언 인스턴스를 생성할 필요가 없으면 권장하지 않는 이유.

> 자바스크립트 엔진이 primitive타입 변수에 마침표 표기법으로 접근하는 순간 래퍼 객체로 처리한다.

  

4. 어떤 방식으로 생성한 객체의 경우가 메서드 내부에서 메서드 자신이 속한 객체를 가리키는 식별자를 참조할 수 있을까요?

> 객체 리터럴 방식으로 생성한 객체  
>
> 객체 리터럴은 변수에 할당되기 직전에 평가된다. 따라서 메서드가 호출되는 시점에는 이미 객체 리터럴의 평가가 완료되어 객체가 생성되었고 식별자에 생성된 객체가 할당된 후다.  
>
> 하지만, 자기 자신이 속한 객체를 재귀적으로 참조하는 방식은 일반적이지 않으며 바람직하지도 않다.  

  

5. 일반 함수 내부에서 this는 ?를 가리키고, strict mode가 적용되면 ?를 가리킨다.

> window, undefined

  

6.  외부 함수인 메서드와 중첩 함수 또는 콜백 함수의 this가 일치하지 않는다는 것은 중첩 함수 또는 콜백 함수를 헬퍼 함수로 동작하기 어렵게 만든다. 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드 this 바인딩과 일치시키기 위한 방법은?

> 1. 외부 함수에서 지역변수에 this를 할당한다.
> 2. Function.prototype.[apply|call|bind]
> 3. 화살표 함수 => 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.   

  

7. 

```javascript
https://jinhyukoo.github.io/web/2021/04/10/useDebounce.html
https://github.com/uidotdev/usehooks
https://github.com/toss/slash/blob/main/packages/react/react/src/hooks/useDebounce.ts#L3
https://gist.github.com/Yawenina/390e29db9dd16bf87ad7623959e61543
- state를 debounce하는 또 다른 state를 만드는 것은 비효율적
1. 렌더링이 여러번 됨
2. 연쇄적인 변화방법을 사용하고 있기에 로직을 파악하기가 힘들어짐
3. 실질적인 목적은 debounce value를 만드는 것이 아닌 거기서 파생되는 동작(함수의 실행)을 debounce 처리하는 것
- 따라서 바로 함수 자체를 debounce 하는 것이 효율적

ssot
```



8. apply와 call 메서드는 대표적인 용도

> arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우다.  
>
> arguments 객체는 배열이 아니기 때문에 Array.prototype.slice 같은 배열 메서드를 사용할 수 없으나 apply와 call 메서드를 이용하면 가능하다.  
>
> ```javascript
> function convertArgsToArray() {
>   console.log(arguments);
>   
>   // arguments 객체를 배열로 변환
>   // Array.prototype.slice를 인수 없이 호출하면 배열의 복사본을 생성한다.
>   const arr = Array.prototype.slice.call(arguments);
>   // const arr = Array.prototype.slice.apply(arguments);
>   console.log(arr);
>   return arr;
> }
> 
> convertArgsToArray(1, 2, 3); // [1, 2, 3]
> ```
>



9. 함수 코드내에 console.log 메서드를 호출하게 되면 일어나게 되는 과정

> 스코프 체인을 통해 console을 찾고, 전역 객체의 프로퍼티에서 console을 찾게된다.

  

