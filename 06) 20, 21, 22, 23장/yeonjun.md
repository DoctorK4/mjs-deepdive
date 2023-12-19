## 20. strict mode
```javascript
function foo() {
	x = 10;
}

foo();

// x 변수에 암묵적 전역이 발생함
console.log(x); // 10
```

- **`암묵적 전역(implicit global)` : JavaScript 엔진이 암묵적으로 전역 객체에 특정 프로퍼티를 동적으로 생성해서 마치 전역 변수처럼 사용할 수 있는 현상.** 개발자의 의도와 상관없는 오류를 발생시키기 때문에 사용을 var, let, const를 이용해서 변수를 먼저 선언해야 한다.

- **`strict mode`** : JavaScript 코드에 문법 규칙을 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 JavaScript 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시키는 JavaScript 기능이다. 클래스와 모듈에서는 해당 기능이 기본적으로 적용된다.

- ESLint 같은 JavaScript 문법 분석 도구 라이브러리를 이용하면 strict mode와 비슷한 기능을 사용할 수 있다.

- strict mode를 적용하려면 코드 최상단(전역 몸체) 또는 함수 블록 최상단에 ‘ ”use strict”; ’를 추가한다. 코드 최상단에서 해당 문구를 추가하면 해당 스크립트 전체에 strict mode가 적용되고, 함수 블록 최상단에 적용하면 해당 함수와 중첩 함수에만 strict mode가 적용된다.

- 코드 최상단 또는 함수 블록 최상단에 ‘ ”use strict”; ’을 적용시키지 않으면 strict mode가 작동하지 않는다.

```javascript
'use strict';

function foo() {
	x = 10;
}

foo();

console.log(x); // ReferenceError: x is not defined

function foo2() {
'use strict';
	y = 10;
}
foo2();

console.log(y); // ReferenceError: y is not defined
```

- 외부 서드 파티 라이브러리를 사용하거나 함수 외부 환경에 strict mode가 적용되지 않은 코드가 있을 수 있기 때문에 전역이나 함수 블록 안에 strict mode를 사용하기 보다는 즉시 실행 함수 최상단에 ‘ ”use strict”; ’을 선언하는 것을 권장한다.

```javascript

(function sample() {
	'use strict';
	x = 10;

	console.log(x); // ReferenceError: x is not defined
}());

```

- strict mode가 발생시키는 에러
    - 암묵적 전역 ⇒ 선언하지 않은 변수를 참조하면 ‘ReferenceError’가 발생한다.
    - 변수, 함수, 매개변수를 삭제 ⇒ delete 연산자로 변수, 함수, 매개변수를 삭제하면 ‘SyntaxError’가 발생한다.
    ```javascript
    
    (function () {
	'use strict';
	
	let x = 1;
	delete x; // SyntaxError: strict 모드에서는 식별자에 대해 'delete'를 호출할 수 없다.
	
	function test(a) {
		    delete a; // SyntaxError: strict 모드에서는 식별자에 대해 'delete'를 호출할 수 없다.
	}
	    delete test; // SyntaxError: strict 모드에서는 식별자에 대해 'delete'를 호출할 수 없다.
    }());

    ```

    - 매개변수 이름의 중복 ⇒ 중복된 매개변수 이름을 사용하면 ‘SyntaxError’가 발생한다.
    ```javascript
    
    (function () {
	'use strict';

	// SyntaxError: Duplicate parameter name not allowed in this context
	function test(y, y) {
		return y + y;
	}
        console.log(test(2, 3));
    }());

    ```

    - with 문의 사용
        - **`with`**: with문 이후에 오는 구문을 위해 스코프 체인에 매개변수로 받는 객체를 추가하는 구문
        - 동일한 객체의 프로퍼티를 반복할 때 객체 이름을 생략할 수 있어서 코드가 간단해지지만 성능과 가독성이 떨어질 수 있다는 단점이 있다.
        - strict mode에서 with문을 사용할 경우 ‘SyntaxError’가 발생한다.
    ```javascript
    
    /*
    with문 형식

    with(반복될 객체){
        뒤에 오게될 메서드 또는 객체요소
    }
    */

    (function () {
        'use strict';

        let obj = { x: 1 };
        
        // SyntaxError: Strict mode code may not include a with statement
        // 'with'문은 strict 모드에서 사용할 수 없다.
        with(obj){
            console.log(x);
        }
    }());

    ```

- strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 연결된다.
```javascript

(function () {
	'use strict';

		function test() {
        console.log(this); // undefined
    }
    test();

    function Foo() {
        console.log(this); // Foo
    }
    new Foo();
}());

```

- strict mode에서 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.
```javascript

(function (a) {
	'use strict';

	// 매개변수에 전달된 인수를 재할당하여 변경
    a = 2;

  // 변경된 인수가 arguments 객체 반영되지 않는다.
  console.log(arguments); // {0:1, callee: (...), length: 1, ...}
}(1));

```


## 21. 빌트인 객체
> Q1. 전역 객체의 특징은?
> Q2.

```javascript
        
        var x = 10;

        function foo() {
            // 선언하지 않은 식별자에 값을 할당
            test = 40.5; // window.test = 40.5;
            console.log(x + test);
        }

        foo(); // 50.5

        console.log(window.x); // 10
        console.log(window.test); // 40.5

        delete x; // 
        delete test; // 

        console.log(window.x); // 
        console.log(window.test); // 다음 코드에서 delete 연산자를 사용하면  어떤 값이 찍히나?

```
 


- 자바스크립트 객체의 분류
    - 표준 빌트인 객체(standard built-in objects/native objects/global objects):
    JavaScript의 표준인 ECMAScript 사양에 정의된 객체를 말하며, 애플리케이션 전역의 공통 기능을 제공한다. 표준 빌트인 객체는 JavaScript 실행 환경(브라우저 또는 Node.js)과 상관없이 언제 어디서든 사용할 수 있으며, 전역 객체의 프로퍼티로서 제공한다.
    
    - 호스트 객체(host objects): ECMAScript 사양에 정의되지 않았지만 JavaScript 실행 환경(런타임 환경)에서 추가로 제공되는 객체를 말한다.
    *브라우저 환경 ⇒ DOM, XMLHttpRequest,Web Storage 등의 Web API
    *Node.js ⇒ Node.js 고유의 호스트 API

    - 사용자 정의 객체(user-defined objects): 사용자가 직접 생성한 객체를 말한다. 생성자 함수, 객체 리터럴, Object 생성자 함수, 생성자 함수, Object.create 메서드, 클래스(ES6 버전)를 통해 사용자 정의 객체를 만들 수 있다.

- 표준 빌트인 객체
    - JavaScript 표준 빌트인 객체에는 총 40여 개의 표준 빌트인 객체를 가지고 있다.

    - Math, Reflect, JSON을 제외하고는 생성자 함수로 객체를 만들 수 있다.

    - 표준 빌트인 객체 중에서 생성자 함수를 만들 수 있는 객체는 **프로토타입 메서드와 정적 메서드를 제공**하고 Math/Reflect/JSON 같이 생성자 함수를 만들 수 없는 객체는 **정적 메서드만 제공한다**.

    - 생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의  prototype에 바인딩된 객체다.
    ```javascript

    // String 생성자 함수로 String 인스턴스 생성
    const strObj = new String('Jung'); // String {'Jung'}

    console.log(Object.getPrototypeOf(strObj) === String.prototype);
    // String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype이다.
    // true
    
    ```

    - 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체는 다양한 기능의 빌트인 프로토타입 메서드를 제공한다.

- 래퍼 객체
    - **`래퍼 객체(wraaper object)`**: 문자열, 숫자, 불리언 타입에 대해 일반 객체처럼 마침표 표기법(대괄호 표기법)을 생성하는 **임시 객체**

    - 원시 타입인 문자열, 숫자, 불리언 값의 경우 이들 원시값에 대해 마치 객체처럼 마침표 표기법으로 접근하면 JavaScript 엔진이 일시적으로 원시값을 연관된 객체로 변환해 준다.

    - JavaScript 엔진은 래퍼 객체를 프로퍼티로 접근하거나 메서드를 호출한 이후에는 다시 원시값으로 되돌린다.

    - 생성자 함수의 인스턴스인 래퍼 객체는 String.prototype, Number.prototype, Boolean.prototype의 프로퍼티 또는 메서드를 상속받아 사용할 수 있다.

    - 래퍼 객체의 처리가 종료되면 래퍼 객체의 [[StringData]], [[NumberData]], [[BooleanData]] 내부 슬롯에 할당된 원시값으로 원래의 상태, 즉 식별자가 원시값을 갖도록 되돌리고 래퍼 객체는 GC(가비지 컬렉션)에 의해 메모리에 반환된다.

    - 래퍼 객체 생성, 소멸 과정
        - 변수를 생성하고 문자열, 숫자, 불리언 타입 원시값을 할당한다.

        - 문자열 또는 숫자, 불리언 값에 대해 마침표 표기법으로 접근하면 래퍼 객체인 String 생성자 함수 또는 Number 생성자 함수, Boolean 생성자 함수의 인스턴스가 생성된다.

            - 숫자는 [[NumberData]], 문자열은 [[StringData]], 불리언은 [[BooleanData]] 내부 슬롯 각각에 래퍼 객체가 할당된다.

        - 래퍼 객체의 처리가 종료되면 래퍼 객체의 [[StringData]], [[NumberData]], [[BooleanData]] 내부 슬롯에 할당된 원시값을 되돌리고 래퍼 객체는 GC 대상이 된다.

    - Symbol 타입도 String, Number, Boolean 타입처럼 래퍼 객체를 생성할 수 있지만 다른 타입들과는 달리 Symbol 함수를 통해 래퍼 객체를 생성하다.

    - null, undefined 값을 객체처럼 마침표 표기법으로 접근하면 에러가 발생한다.

- 전역 객체
    - **`전역 객체(global object)`**: 코드 평가 단계에서 JavaScript 엔진에 의해 첫 번째로 생성되는 객체이며, 어떤 객체에도 속하지 않은 **최상위 객체**다.

    - 전역 객체는 JavaScript 환경에 따라 용어가 다르다.
        - 브라우저 ⇒ window 또는 self, this, frames

        - Node.js 환경 ⇒ global

    - ES11 버전(ECMAScript2020)부터는 브라우저 환경과 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일한 식별자인 **`globalThis`** 가 도입되었다. 웬만한 최신 브라우저에서는 지원되지만 IE 브라우저에서는 호환되지 않는다.

    > [참고 링크](https://caniuse.com/?search=globalthis)

- 전역 객체 자신은 어떤 객체의 프로퍼티도 아니며 객체의 계층적 구조상 표준 빌트인 객체와 호스트 객체, var 키워드로 선언한 전역 변수/암묵적 전역/전역 함수를 프로퍼티로 갖는다.
```javascript

// var 키워드로 선언한 변수
var foo = 1;
console.log(window.foo); // 1

// 선언하지 않은 변수에 값을 할당한 암묵적 전역.
// 암묵적 전역은 전역 변수가 아니라 전역 객체의 프로퍼티다.
obj = 30; // window.obj = 30;
console.log(window.obj); // 30

// 전역 함수
function sample(a, b) { return a + b; }
console.log(window.sample(3, 4)); // 7

```

- 전역 객체의 특징
    - 전역 객체는 개발자가 의도적으로 생성할 수 없기 때문에 전역 객체를 생성할 수 있는 생성자 함수가 없다.

    - 전역 객체의 프로퍼티를 참조할 때 window(또는 global)를 생략할 수 있다.
    ```javascript
    
    console.log(window.parseInt('2')); // 2

    console.log(parseInt('3.5')); // 3

    console.log(window.parseInt === parseInt); // true

    ```

    - let이나 const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. let이나 const 키워드로 선언한 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드) 내에 존재하게 되서 전역 객체의 프로퍼티가 될 수 없다.

    - 브라우저 환경의 모든 JavaScript 코드는 하나의 전역 객체 window를 공유한다.  HTML 파일에 여러 개의 script 태그로 코드를 분리해도 하나의 전역 객체 window로 공유된다.

- 빌트인 전역 프로퍼티(built-in global property)
    - 빌트인 전역 프로퍼티는 전역 객체의 프로퍼티를 의미하며 스크립트 전역(또는 애플리케이션 전역)에서 사용하는 값을 제공한다.

    - **`Infinity`** 프로퍼티: 무한대를 나타내는 숫자값 Infinity를 갖는다.
    ```javascript

    console.log(window.Infinity === Infinity);

    // 양의 무한대
    console.log(3/0); // Infinity
    // 음의 무한대
    console.log(-3/0); // -Infinity
    // Infinity는 숫자값이다.
    console.log(typeof Infinity); // number
    
    ```

    - **`NaN`** 프로퍼티: 숫자가 아닌(Not-a-Number) 값을 나타내는 숫자 타입 NaN을 갖는다. **`Number.NaN`** 프로퍼티와 같다.
    ```javascript
    
    console.log(window.NaN); // NaN

    console.log(Number(';;')); // NaN
    console.log(1 * 'string'); // NaN
    console.log(typeof NaN); // true

    ```

    - **`undefined`** 프로퍼티: 원시 타입 undefined은 빌트인 전역 프로퍼티이기도 하다.
    ```javascript
    
    console.log(window.undefined); // undefined

    var test;
    console.log(test); // undefined
    console.log(typeof undefined); // undefined
    
    ```

- 빌트인 전역 함수(built-in global function)
    - 빌트인 전역 함수는 전역 객체의 메서드이며 스크립트 전역(또는 애플리케이션 전역)에서 호출할 수 있는 함수를 제공합니다.

    - **`eval`** : JavaScript 코드를 나타내는 문자열을 인수로 전달 받아 실행하는 빌트인 전역 함수다. 전달 받은 문자열 값이 표현식이라면 문자열 값을 런타임에 평가하여 값을 생성하고, 전달 받은 문자열 값이 표현식이 아닌 문(선언문, 제어문 등)이라면 eval 함수는 문자열 값을 런타임에 실행한다. 문자열 값이 여러 개의 문으로 이뤄져 있다면 모든 문을 실행한다.
        - MDN에서는 해킹 위험성 때문에 사용을 지양하고 있다.

    - **`isFinite`** : 전달 받은 인수가 유한한 숫자값이면 true를 반환하고, 무한한 숫자값이거나 숫자값이 아닐 경우(NaN) false를 반환한다.
        - ‘isFinite(null);’은 true를 반환한다. 이것은 null을 숫자로 변환하여 검사를 수행했기 때문이다. null은 falsy(false인 값)로 취급되서 숫자로 변환하면 0이 된다.
        ```javascript
        
        isFinite(0); // true
        isFinite(2e64); // true
        isFinite('10'); // true

        // 인수가 무한한 숫자값이나 NaN으로 평가되는 값이라면 false를 반환한다.
        isFinite(Infinity); // false
        isFinite(-Infinity); // false
        isFinite(NaN); // false
        isFinite('Hi'); // false
        isFinite('2023/12/18'); // false
        isFinite(sd); // false

        // null isFinite 함수에서는 true로 취급된다.
        isFinite(null); // true

        ```

    - **`isNaN`** : 전달 받은 인수가 숫자값인지 아닌지 검사하여 그 결과를 true 또는 false 값으로 반환한다. 전달 받은 인수의 타입이 숫자가 아닐 경우 숫자로 타입을 변환한 후 검사를 수행한다.
    ```javascript
    
    // 전달 받은 인수가 NaN일 경우 true, 숫자값일 경우 false를 반환한다.

    // 숫자
    isNaN(NaN); // true
    isNaN(10); // false

    // 문자열
    isNaN('bla'); // true: 'bla' => NaN
    isNaN('10'); // false: '10' => 10
    isNaN(''); // false: '' => 0
    isNaN(' '); // false: ' ' => 0

    // 불리언
    isNaN(true); // false: true => 1
    isNaN(null); // false: null => 0

    // undefined
    isNaN(undefined); // true: undefined => NaN

    // 객체
    isNaN({}); // true: {} => NaN

    // date 객체
    isNaN(new Date()); // false: new Date() => Number
    isNaN(new Date().toString()); // true: String => NaN

    ```

    - **`parseFloat`** : 전달 받은 문자열 인수를 부동 소수점 숫자(실수/floating point number)로 해석하여(parsing) 반환한다.
    ```javascript
    
    // 문자열을 부동 소수점 숫자로 해석하여 반환한다.
    parseFloat('3.14'); // 3.14

    // 공백으로 구분된 문자열은 첫 번째 문자열만 변환된다.
    parseFloat('34 45 66'); // 34
    parseFloat('40 years'); // 40

    // 첫 번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환한다.
    parseFloat('He was 40'); // NaN

    // 앞뒤 공백은 무시된다.
    parseFloat(' 60 '); // 60

    ```

    - **`parseInt`** : 전달 받은 문자열 값을 정수(**integer**)로 해석하여 반환한다.
        - 전달 받은 인수가 문자열이 아니면 문자열로 변환한 다음, 정수로 해석하여 변환한다.

        - parseInt의 두 번째 인수로 기수(수를 나타내는 데 기초가 되는 수/2~36)를 전달할 수 있다. 기수를 지정하면 첫 번째 인수로 전달된 값을 해당 기수의 숫자로 해석하여 반환한다. 기수를 생략하면 첫 번째 인수로 전달된 값을 10진수로 해석하여 반환한다.

        - 기수를 지정하여 10진수 값을 해당 기수의 문자열로 변환하여 반환하고 싶을 때는 **`Number.prototype.toString`** 메서드를 사용한다.

        - parseInt의 두 번째 인수로 기수를 지정하지 않더라도 첫 번째 인수로 전달된 문자열이 ‘0x’ 또는 ‘0X’처럼 기수 리터럴로 시작하면 해당 기수의 숫자로 해석하여 10진수 정수로 반환한다. 단, 이것은 2진수 리터럴과 8진수 리터럴은 해당이 안되고 16진수 리터럴만 적용된다.

        - 첫 번째 인수로 전달한 문자열의 두 번째 문자부터 해당 진수를 나타내는 문자나 숫자와 마주치면 이 문자와 계속되는 문자들은 전부 무시되며 해석된 정수값만 반환한다.

        - parseFloat 함수와 마찬가지로 문자열인 숫자값이 공백으로 구분되면 첫 번째 문자열만 반환되고, 첫 번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환한다. 그리고 인수의 앞뒤 공백은 무시된다.
        ```javascript
        
        // 기수를 지정하면 첫 번째 인수로 전달된 값을 해당 기수의 숫자로 해석하여 
        // 10진수로 반환한다.
        // 기수를 생략하면 첫 번째 인수로 전달된 값을 10진수로 해석하여 반환한다.
        parseInt('10'); // 10
        parseInt('10', 2); // 2
        parseInt('10', 8); // 8
        parseInt('10', 16); // 16

        // 기수를 지정하여 10진수 값을 해당 기수의 문자열로 변환하여 반환하고 싶을 때는 
        // Number.prototype.toString 메서드를 사용한다.
        let x = 20;

        x.toString(2); // 10100
        parseInt(x.toString(2), 2) // 20

        // '0x' 또는 '0X'로 시작하는 리터럴이라면 16진수로 해석하여 10진수로 반환한다.
        parseInt('0xd2'); // 210
        // 위 코드와 같다.
        parseInt('d2', 16); // 210

        // 2진수 리터럴(0b로 시작)과 8진수 리터럴(ES6에서 도입/0o로 시작)은
        // 0 이후가 무시된다.
        parseInt('0b11'); // 0
        parseInt('0o11'); // 0

        ```
    - **`encodeURI`**/**`decodeURI`**
        - **`encodeURI`** : 완전한 URI(Uniform Resource Identifier)를 문자열로 전달받아 이스케이프 처리를 위해 인코딩하는 빌트인 전역 함수
            - URI의 구성 요소
            ```javascript

            // 완전한 URI
            const uri = 'https://example.com?name=정연준&job=programmer&developer';
            const uri2 = 'https://www.mydomain.com:80/docs/search?category=javascript&lang=ko#intro';
            
            ```

            - ‘https’: **`scheme`**(스키마/사용할 프로토콜)

            - ‘example.com’, ‘www.mydomain.com’: **`domain`**(도메인/웹 페이지, 이미지, 동영상 등의 파일이 위치한 웹 서버, 도메인 또는 IP)

            - ‘80’: **`:port`** (웹 서버에 접속하기 위한 통로/:80, :443, :3000)

            - ‘/docs/search’: **`/path`** (웹 서버의 루트 디렉토리부터 웹 페이지, 이미지, 동영상 등의 파일이 위치까지의 경로)

            - ‘?name=정연준&job=programmer&developer’, ‘?category=javascript&lang=ko’: **`?query`** (리소스의 형식 범위를 좁히기 위한 추가 요청/파라미터/쿼리 스트링)

            - ‘#intro’: **`#fragment`** (URI가 지정하는 특정 컨텐츠를 가리키기 위한 값)

            - 이스케이프 처리: 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 집합으로 변환하는 것이다. 단, 알파벳/0~9의 숫자/- _ . ! ~ * ‘ () 특수 문자는 이스케이프 처리에서 제외된다.

        - **`decodeURI`** : 인코딩된 URI를 인수로 전달받아 이스케이프 처리 이전으로 디코딩하는 빌트인 전역 함수
        ```javascript
        
        const uri = 'https://example.com?name=정연준&job=programmer&developer';
        const uri2 = 'https://www.mydomain.com:80/docs/search?category=자바스크립트&lang=한글#intro';

        let enc = encodeURI(uri);
        console.log(enc); // https://example.com?name=%EC%A0%95%EC%97%B0%EC%A4%80&job=programmer&developer

        let dec = decodeURI(enc);
        console.log(dec); // https://example.com?name=정연준&job=programmer&developer

        let enc2 = encodeURI(uri2);
        console.log(enc2); // https://www.mydomain.com:80/docs/search?category=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8&lan
        // g=%ED%95%9C%EA%B8%80#intro

        let dec2 = decodeURI(enc2);
        console.log(dec2); // https://www.mydomain.com:80/docs/search?category=자바스크립트&lang=한글#intro

        ```

    - **`encodeURIComponent`**/**`decodeURIComponent`**
        - **`encodeURIComponent`** : URI 구성 요소(**component**)를 인수로 전달받아 인코딩하는 함수다.
            - 쿼리 스트링 구분자로 사용되는 =, ?, &까지 인코딩한다.

            - encodeURI 함수에서는 인수로 전달된 문자열을 완전한 URI로 간주하기 때문에 =, ?, &은 인코딩하지 않는다.

        - **`decodeURIComponent`** : 인수로 전달 받은 URI 구성 요소를 디코딩한다.
        ```javascript

        // URI의 쿼리 스트링
        let uriComp = 'category=자바스크립트&lang=한글';

        let enc = encodeURIComponent(uriComp);
        console.log(enc); // category%3D%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%26lang%3D%ED%95%9C%EA%B8%80

        let dec = decodeURIComponent(enc);
        console.log(dec); // category=자바스크립트&lang=한글

        enc = encodeURI(uriComp);
        console.log(enc); // category=%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8&lang=%ED%95%9C%EA%B8%80

        dec = decodeURI(enc);
        console.log(dec); // category=자바스크립트&lang=한글
        
        ```

    - 암묵적 전역(implicit global)
        - **`암묵적 전역(implicit global)`** : JavaScript 엔진이 선언하지 않고 할당한 변수를 전역 객체의 프로퍼티로 동적 생성하는 현상

        - 암묵적 전역으로 생성된 변수는 전역 객체의 프로퍼티로 취급되어 delete 연산자로 삭제가 가능하다.
        ```javascript
        
        var x = 10;

        function foo() {
            // 선언하지 않은 식별자에 값을 할당
            test = 40.5; // window.test = 40.5;
            console.log(x + test);
        }

        foo(); // 50.5

        console.log(window.x); // 10
        console.log(window.test); // 40.5

        delete x; // 전역 변수는 삭제되지 않는다.
        delete test; // 프로퍼티는 삭제된다.

        console.log(window.x); // 10
        console.log(window.test); // undefined

        ```


## 22. this

## 23. 실행 컨텍스트