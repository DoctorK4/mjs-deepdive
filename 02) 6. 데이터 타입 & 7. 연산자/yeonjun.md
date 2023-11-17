# 모던 자바스크립트 딥다이브

## 6. 데이터 타입
- 데이터 타입(data type/type): **값의 종류**
- JavaScript(ES6 버전 기준)에는 총 **7개의 데이터 타입**(**타입**/**Type**)이 존재한다.
- 7개의 데이터 타입은 다시 **원시 타입**(**primitive type**)과 **객체 타입**(**object type**/**reference type**)으로 나뉘어진다.
- 원시 타입(primitive type): 숫자 타입(number type), 문자열 타입(string type), 불리언 타입(boolean type), undefined 타입, null 타입, 심벌 타입(symbol type)이 여기에 속한다. 원시 타입은 같은 메모리 주소에 저장된 값을 변경할 수는 없고(**immutable value**) 대신 새로운 메모리 주소에 값을 저장한 후 변수에 재할당한다. 이런 원시 타입의 특징을 **불변성**이라고 부른다.
- 심벌 타입은 ES6 버전에서 추가된 원시 타입이다.

- 객체 타입(object type/reference type): 원시 타입을 제외한 모든 타입이 여기에 속한다. 객체 타입은 객체 데이터를 담은 메모리 주소를 변수에 담은 형태를 취한다. 객체를 할당한 변수는 재할당 없이 객체를 직접 변경할 수 있다(**mutable value**)
> [참고_링크1: 문자열과 불변성](https://devowen.com/481#%EB%AC%B8%EC%9E%90%EC%97%B4%EA%B3%BC%20%EB%B6%88%EB%B3%80%EC%84%B1-1)

### 6-1 숫자 타입
- JavaScript는 C, C++, Java처럼 int, float, double 같은 숫자 타입이 아니라 숫자 타입이 number 타입으로 통일되어 있다.
- JavaScript는 2진수, 8진수, 16진수를 표현하기 위한 데이터 타입(타입)을 제공하지 않기 때문에 이들 값을 참조하면 모두 10진수로 해석된다.
```javascript
let integer = 10; // 정수(양의 정수)
let double = 10.12; // 실수
let negative = -20; // 음의 정수

let binary = 0b01000001; // 2진수
let octal = 0o101; // 8진수
let hex = 0x41; // 16진수

// 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); // 65
console.log(octal); // 65
console.log(hex); // 65
console.log(binary === octal); // true
console.log(octal === hex); // true
console.log(binary === hex); // true
``` 

- JavaScript의 숫자 타입은 모두 실수로 처리된다.
```javascript
// 다음에 나오는 숫자 타입은 모두 실수로 처리된다.
console.log(1 === 1.0); // true
console.log(4 / 2); // 2
console.log(3 / 2); // 1.5
```
- JavaScript의 숫자 타입은 다음의 세 가지 특별한 값도 표현할 수 있다.
    - Infinity: 양의 무한대
    - -Infinity: 음의 무한대
    - NaN: 산술 연산 불가(**not-a-number의 약자**)
    (JavaScript 엔진은 NAN 표기를 제외한 값을 식별자로 해석해서 에러를 발생시킨다.)
```javascript
// 숫자 타입의 세 가지 특별한 값
console.log(10 / 0); // Infinity
console.log(10 / -0); // -Infinity
console.log(1 * 'String'); // NaN

// JavaScript는 대소문자를 구별한다.
let x = nan; // ReferenceError: nan is not defined
```

### 6-2 문자열 타입
- 문자열 타입(string type)은 0개 이상의 16비트 유니코드 문자(**UTF-16**)의 집합을 표현할 수 있는 데이터 타입(타입)이다.
- 문자열은 작은따옴표(''), 큰따옴표(""), 백틱(``)으로 텍스트를 감싼다. 백틱 기능은 ES6 버전에서 추가되었다.
```javascript
// 문자열 타입
let string;
string = '문자열'; // 작은 따옴표(가장 일반적인 표기법)
string = "문자열"; // 큰 따옴표
string = `문자열`; // 백틱(ES6 버전에서 추가됨)
```

- 문자열을 따옴표로 감싸는 이유는 키워드나 식별자 같은 토큰과 구분하기 위해서다. 만약 문자열을 따옴표로 감싸지 않는다면 JavaScript 엔진은 키워드나 식별자 같은 토큰으로 인식한다.

- 문자열뿐만 아니라 스페이스같은 공백 문자도 따옴표로 감싸지 않으면 포함시킬 수 없다.

### 6-3 템플릿 리터럴
- **템플릿 리터럴**(**template literal**): 표현식을 사용할 수 있는 문자열 표기법. 멀티라인 문자열(multi-line string), 표현식 삽입(expression interpolation), 태그드 템플릿(tagged template) 등 문자열 처리 기능을 제공한다. 템플릿 리터럴은 소스코드를 실행하면서(런타임) 일반 문자열로 전환되어 처리된다.

- 템플릿 리터럴은 백틱(``)을 사용해 표현한다.
```javascript
let number = 2023;
let template = `{number}년 11월 11일`;

console.log(template); // 2023년 11월 11일
```

-멀티 라인 문자열: JavaScript에서는 일반 문자열은 줄바꿈(개행)을 인식하지 않는다. 일반 문자열 내에서 줄바꿈 등의 공백(white space)을 표현하려면 **백슬래시**(\)로 시작하는 이스케이프 시퀀스(escape sequence)를 사용해야 한다.
> 이스케이프 시퀀스의 종류

|:-- |:-- |
| 이스케이프 시퀀스 | 의미 |
|\0 |Null |
|\b |백스페이스 |
|\f |폼 피드(Form Feed): 프린터로 출력할 경우 다음 페이지의 시작 지점으로 이동한다. |
|\n |개행(LF/Line Feed): 다음 행으로 이동한다. |
|\r |개행(CR/Carriage Return): 커서를 처음으로 이동 |
|\t |탭 이동(수평) |
|\v |탭 이동(수직) |
|\uXXXX |유니코드, 예를 들어 '\u0041'은 'A', '\uD55C'는 '한'다. |

- 줄바꿈(\n)과 들여쓰기(\t)가 적용된 HTML 문자열은 다음과 같이 이스케이프 시퀀스를 사용해 작성한다.
```javascript
let template = '<ul>\n\t<li><a href="#">Home</a></li>\n</ul>';

console.log(template);

/*
출력 결과:
<ul>
    <li><a href="#">Home</a></li>
</ul>
*/

```

- 템플릿 리터럴를 사용하면 이스케이프 시퀀스를 사용하지 않고도 줄바꿈과 모든 공백이 허용된다.

```javascript
let template2 = `<ul>
    <li><a href="#">Home</a></li>
</ul>`;

console.log(template2);

/*
출력 결과:
<ul>
    <li><a href="#">Home</a></li>
</ul>
*/
```
- 표현식 삽입: JavaScript에서는 문자열 연산자 '+'를 사용해 연결할 수 있다. '+' 연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작한다. 문자열이 아닌 다른 타입일 경우 덧셈 연산자로 동작한다. 템플릿 리터럴 내에서는 표현식 삽입(expression interpolation)을 통해 간단히 문자열을 삽입할 수 있다. 이것을 사용하면 문자열 연산자보다 가독성 좋고 간편하게 문자열을 조합할 수 있다.

```javascript
let familyName = 'Yeonjun';
let lastName = 'Jung';

// ES5 버전까지의 문자열 연결
console.log('My name is ' + familyName + ' ' + lastName + '.');
// My name is Yeonjun Jung.

// ES6 표현식 삽입
console.log(`My name is ${familyName} ${lastName}.`);
// My name is Yeonjun Jung.
```
- 템플릿 리터럴에서 표현식을 삽입하려면 ${}으로 표현식을 감싼다. 이때 **표현식의 평가 결과가 문자열이 아니더라도 문자열로 타입이 강제로 변환된다**.

- 백틱이 아닌 따옴표에 표현식을 넣을 경우 문자열로 취급된다.
```javascript
console.log('1 + 2 = ${1 + 2}'); // 1 + 2 = ${1 + 2}
```

### 6-4 불리언 타입
- 불리언 타입(boolean type)의 값은 논리적 참, 거짓을 나타내는 true, false뿐이다.
- 불리언 타입은 참(truthy/참 같은 값)과 거짓(falsy/거짓 같은 값)으로 구분되는 조건에 의해 조건에 의해 프로그램의 흐름을 제어하는 조건문에서 자주 사용한다.

### 6-5 undefined 타입
- undefined의 정의: **아무 값도 할당받지 않는 상태**
- undefined의 값은 undefined가 유일하다.
- var 키워드로 선언한 변수는 암묵적으로 undefined로 초기화된다. JavaScript 엔진이 변수 선언에 의해 확보된 메모리 공간을 처음 할당이 이뤄질 때까지 빈 상태(대부분 garbage value가 들어 있음)로 두지 않는다.
```javascript
var something;
console.log(something); // undefined
```
- undefined 타입에는 undefined 값이 유일하다.
> [참고_링크2: undefined 타입 & null 타입 차이점](https://hanamon.kr/javascript-undefined-null-%EC%B0%A8%EC%9D%B4%EC%A0%90/)

- 다른 프로그래밍 언어와 달리 JavaScript의 undefined('정의되지 않은')에서 말하는 정의는 변수에 값을 할당하여 변수의 실체를 명확히 하는 것을 의미한다.


> * JavaScript의 표준 규범인 **ECMAScript** 사양에서 변수(variable)는 '**선언하다**'라고 표현하고, 함수(function)는 '**정의한다**'라고 표현한다.

### 6-6 null 타입
- null의 정의: **변수에 값이 없다는 것을 의도적으로 명시한 상태(의도적 부재/intentional absence)**
- null 타입의 유일한 값은 null이 유일하다.
- 변수에 null을 할당한다는 것은 변수가 이전에 참조하던 값을 더 이상 참조하지 않겠다는 의미다.
```javascript
let second = 'Yeonjun';

// 이전 참고를 제거. second 변수는 더 이상 'Yeonjun'을 참고하지 않는다.
// 변수의 스코프(참조 범위)를 좁게 만들어 변수 자체를 재빨리 소멸시키는 편이 낫다.
second = null;
```

- 변수에 null을 할당하게 되면 이전에 할당되어 있던 값에 대한 참조(메모리 공간에 접근)를 명시적으로 제거하는 것을 의미한다. 참조가 제거된 메모리 공간은 JavaScript 엔진이 가비지 콜렉션을 수행할 것이다.

- 함수가 유효한 값을 반환할 수 없는 경우 명시적으로 null을 반환하기도 하다. 
```html
<!DOCTYPE html>
<html>
<body>
    <script>
        let element = document.querySelector('.myClass');

        /*
            HTML 요소를 검색해 반환하는 document.querySelector 메서드는 조건에 부합하는 HTML 요소를 검색할 수 없는 경우
            에러 대신 null을 반환한다.
        */
       console.log(element); // null
    </script>
</body>
</html>
```
> [참고_링크2: undefined 타입 & null 타입 차이점](https://hanamon.kr/javascript-undefined-null-%EC%B0%A8%EC%9D%B4%EC%A0%90/)

### 6.7 심벌 타입
- 심벌(symbol)은 ES6 버전에서 추가된 7번째 원시 타입으로, 변경 불가능한 타입의 값이다.
- 심벌 타입의 값은 다른 값과 중복이 불가능한 유일무이한 값이다. 그래서 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용한다.
- 본래 원시 타입들은 리터럴을 통해 값을 생성하지만, 심벌 타입만 유일하게 Symbol 함수를 통해 값을 생성한다.
- Symbol 함수를 통해 생성하는 심벌 값은 외부에 노출되지 않는다.
```javascript
// 심벌 값 생성
let first = Symbol('key');
console.log(typeof first); // symbol

// 객체 생성
let state = {};

// 이름이 충돌할 위험이 없는 유일무이한 값인 심벌을 프로퍼티 키로 사용한다.
state[first] = 'value';
console.log(state[first]); // value
```

### 6.8 객체 타입
- JavaScript에서는 원시 타입을 제외한 모든 데이터의 타입은 객체 타입이다.
- JavaScript는 객체 기반의 언어이며, JavaScript를 이루고 있는 거의 모든 것이 객체라고 볼 수 있다.

### 6.9 데이터 타입의 필요성
- 데이터 타입이 있어야 되는 이유
    - 데이터 타입에 따라 메모리 공간의 크기가 결정되면 불필요하게 메모리 공간을 사용하지 않아도 된다.
    - 메모리 공간에 저장된 값을 참조할 경우 한 번에 읽어들일 때 필요한 메모리 공간의 크기를 정할 수 있다.
    - 메모리에서 읽어 들이 2진수를 어떻게 해석할지 결정할 수 있다.
> 컴파일러 또는 인터프리터는 심벌 테이블(symbol table)이라고 부르는 자료 구조를 통해 식별자를 키로 바인딩된 값의 메모리 주소, 데이터 타입, 스코프 등을 관리한다.
> [참고_링크3: 심벌 테이블](https://ko.wikipedia.org/wiki/%EC%8B%AC%EB%B3%BC_%ED%85%8C%EC%9D%B4%EB%B8%94)

### 6.10 동적 타이핑
- JavaScript는 인터프리터 + 동적 타입 언어(dynamic type/weak type)이다.
    - C언어,C++ 같은 정적 타입 언어(static type/strong type)과 달리 변수를 선언할 때 타입을 선언하지 않는다.
    - JavaScript의 변수(메모리 공간)는 어떠한 데이터 타입의 값이라도 자유롭게 할당할 수 있다.
    - typeof 연산자를 이용하면 피연산자의 데이터 타입을 문자열로 반환할 수 있다.
    - typeof 연산자를 이용해서 반환되는 데이터 타입은 변수에 할당한 값의 데이터 타입을 반환한다.
    - JavaScript는 값을 할당하는 시점에서 데이터 타입이 동적으로 결정된다(**타입 추론**/**type inference**)
    ```javascript
    let foo;
    console.log(typeof foo); // undefined

    foo = 3;
    console.log(typeof foo); // number

    foo = 'yeonjun';
    console.log(typeof foo); // string

    foo = true;
    console.log(typeof foo); // boolean

    foo = null;
    console.log(typeof foo); // null

    foo = Symbol(); // 심벌
    console.log(typeof foo); // symbol

    foo = {}; // 객체
    console.log(typeof foo); // object

    foo = []; // 배열
    console.log(typeof foo); // object

    foo = function () {}; // 함수
    console.log(typeof foo); // function
    ``` 
- 재할당에 의해 변수의 타입은 언제든지 동적으로 변할 수 있다(**동적 타이핑**/**dynamic typing**)
- JavaScript 같은 동적 타입 언어에는 Python, PHP, Ruby, 리스프(Lisp), Perl 등이 있다.
> 트레이드오프(trade-off): 두 개의 정책이나 목표 중 하나를 달성하려고 하면 다른 목표의 달성이 늦어지거나 희생되는 모순적 관계. 예를 들어, 실업률을 줄이면 물가가 상승하고, 물가를 안정시키면 실업률이 높아진다.
- JavaScript의 단점
    - 변수 값이 언제든지 변할 수 있기 때문에 복잡한 프로그램에서는 변수 값을 추적하기 어렵다.
    - 개발자의 의도와 상관없이 JavaScript 엔진에 의해 타입이 자동으로 변환될 수 있어서 오류가 발생하기 쉽다(신뢰성-reliablity이 떨어진다.)
- **JavaScript 변수를 사용할 때 주의 사항**
    - 변수는 꼭 필요한 경우에 한해 제한적으로 사용한다. 변수의 갯수가 많으면 많을수록 오류가 발생할 확률이 높다.
    - 변수의 유효 범위(스코프)는 최대한 좁게 만든다. 변수의 유효 범위가 넓을수록 변수로 인해 오류가 발생할 확률이 높다.
    - 전역 변수는 사용을 지양한다. 어디서든지 참조(접근)/변경 가능한 전역 변수는 의도치 않게 값이 변경될 가능성이 높고 다른 코드에 영향을 줄 가능성도 높다. 전역변수로 인해 프로그램의 복잡성이 증가하고 처리 흐름을 추적하기 어렵게 만들고, 오류가 발생할 경우 오류의 원인을 특정하기 어렵게 만든다.
    - 변수보다는 상수를 사용해 값의 변경을 억제한다.
    - 변수 이름은 변수의 목적이나 의미를 파악할 수 있도록 네이밍한다. 변수 이름뿐 아니라 모든 식별자(변수, 함수, 클래스명 등)는 존재 이유를 파악할 수 있는 적절한 이름으로 지어야 한다. 특히, 식별자의 범위가 넓을수록 명확한 이름을 명명해야 한다. 개발자의 의도를 나타내는 명확한 네이밍은 코드를 이해하기 쉽게 만들고, 이는 협업과 생산성 향상에 도움을 준다.
> *인상깊은 점: 코드는 잘 동작하는 것도 중요하지만 그에 못지 않게 중요한 것이 가독성이다. 가독성이 떨어지는 코드는 협업에 방해를 줘서 생산성과 팀의 사기를 떨어트린다.
## 7. 연산자

### 7-1 산술 연산자