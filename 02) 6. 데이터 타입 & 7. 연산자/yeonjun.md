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

| 이스케이프 시퀀스 | 의미 |
|:-- |:-- |
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


> JavaScript의 표준 규범인 **ECMAScript** 사양에서 변수(variable)는 '**선언하다**'라고 표현하고, 함수(function)는 '**정의한다**'라고 표현한다.

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

### 6-7 심벌 타입
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

### 6-8 객체 타입
- JavaScript에서는 원시 타입을 제외한 모든 데이터의 타입은 객체 타입이다.
- JavaScript는 객체 기반의 언어이며, JavaScript를 이루고 있는 거의 모든 것이 객체라고 볼 수 있다.

### 6-9 데이터 타입의 필요성
- 데이터 타입이 있어야 되는 이유
    - 데이터 타입에 따라 메모리 공간의 크기가 결정되면 불필요하게 메모리 공간을 사용하지 않아도 된다.
    - 메모리 공간에 저장된 값을 참조할(접근할) 경우 한 번에 읽어들일 때 필요한 메모리 공간의 크기를 정할 수 있다.
    - 메모리에서 읽어 들이 2진수를 어떻게 해석할지 결정할 수 있다.
> 컴파일러 또는 인터프리터는 심벌 테이블(symbol table)이라고 부르는 자료 구조를 통해 식별자를 키로 바인딩된 값의 메모리 주소, 데이터 타입, 스코프 등을 관리한다.

> [참고_링크3: 심벌 테이블](https://ko.wikipedia.org/wiki/%EC%8B%AC%EB%B3%BC_%ED%85%8C%EC%9D%B4%EB%B8%94)

### 6-10 동적 타이핑
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
> 인상깊은 점: 코드는 잘 동작하는 것도 중요하지만 그에 못지 않게 중요한 것이 가독성이다. 가독성이 떨어지는 코드는 협업에 방해를 줘서 생산성과 팀의 사기를 떨어트린다.
## 7. 연산자

### 7-1 산술 연산자
- 산술 연산자(arithmetic operator): **피연산자를 대상으로 수학적 계산을 수행해 새로운 값을 만드는 연산자**
- 산술 연산자를 통해 연산이 불가능한 경우 **NaN**을 반환한다.
> NaN(Not-a-Number): 숫자 타입으로 연산이 불가능한 데이터를 의미한다. NaN 표기법은 JavaScript 고유의 표기법이 아니라 IEEE(국제 전기전자공학자협회)에서 컴퓨터 부동소수점 표기를 규정한 IEEE 754에서 나온 것이다.

> [참고_링크4: NaN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/NaN)

> [참고_링크5: IEEE_754](https://ko.wikipedia.org/wiki/IEEE_754)

- 산술 연산자는 피연산자의 갯수에 따라 이항 산술 연산자와 단항 산술 연산자로 구분할 수 있다.
    - 이항 산술 연산자(binary arithmetic operator): **2개의 피연산자를 산술 연산하여 숫자 값을 만드는 연산자**
    > 이항 산술 연산자의 종류

    | 이항 산술 연산자 | 의미 | 부수 효과 | 
    | :-: | :-: | :-: |
    | + | 덧셈 | X |
    | - | 뺄셈 | X |
    | * | 곱셈 | X |
    | / | 나눗셈 | X |
    | % | 나머지 | X |
    ```javascript
    5 + 2; // 7
    5 - 2; // 3
    5 * 2; // 10
    5 / 2; // 2.5
    5 % 2; // 1
    ```

    - 단항 산술 연산자(unary arithmetic operator): **1개의 피연산자를 산술 연산하여 숫자 값을 만드는 연산자**
    > 단항 산술 연산자의 종류

    | 단항 산술 연산자 | 의미 | 부수 효과 | 
    | -:- | -:- | -:- |
    | ++ | 증가 | O |
    | -- | 감소 | O |
    | + | 특별한 효과가 없다. | X |
    | - | 양수를 음수로, 음수를 양수로 반전한 값을 반환한다. | X |

    - 단항 산술 연산자에서 **증가/감소 연산자는 피연산자의 값을 변경하는 부수 효과(side effect)가 있다(암묵적 할당)**
    ```javascript
    let a = 1;

    // 증가(++) 연산자는 피연산자의 값을 변경하는 암묵적 할당이 이뤄진다.
    a++; // a = a + 1;
    console.log(a); // 2

    // 감소(--) 연산자는 피연산자의 값을 변경하는 암묵적 할당이 이뤄진다.
    a--; // a = a - 1;
    console.log(a); // 1
    ```

    - 증가/감소 연산자는 위치에 따라 연산 과정이 달라진다.
        - 피연산자 앞에 위치한 **전위 증가/감소 연산자**(**prefix increment/decrement operator**)는 먼저 피연산자의 값을 증가/감소시킨 후, 다른 연산을 수행한다.
        - 피연산자 뒤에 위치한 **후위 증가/감소 연산자**(**postfix increment/decrement operator**)는 먼저 다른 연산을 수행한 후, 피연산자의 값을 증가/감소시킨다.
    ```javascript
    let foo = 5;
    let result;

    // 선할당 후증가(postfix increment operator)
    result = foo++;
    console.log(result, foo); // 5 6

    // 선증가 후할당(prefix increment operator)
    result = ++foo;
    console.log(result, foo); // 7 7

    // 선할당 후감소(postfix decrement operator)
    result = foo--;
    console.log(result); // 7 6

    //  선감소 후할당(prefix decrement operator)
    result = --foo;
    console.log(result); // 5 5
    ```

    - + 단항 연산자는 피연산자에 특별한 효과를 주지 않지만 숫자 타입이 아닌 피연산자에 적용할 경우 해당 피연산자를 숫자 타입으로 변환하여 반환한다.
    ```javascript
    let test = '1';
    // 문자열을 숫자로 타입 변환한다.
    console.log(+test); // 1
    // 부수 효과는 없다.
    console.log(test); // "1"

    // 불리언 값을 숫자 값으로 타입 변환한다.
    test = true;
    console.log(+test); // 1
    // 부수 효과는 없다.
    console.log(test); // true

    test = false;
    console.log(+test); // 0
    // 부수 효과는 없다.
    console.log(test); // false

    // 숫자가 아닌 문자열은 숫자로 타입 변환할 수 없으므로 NaN(Not-a-Number)을 반환한다.
    test = 'Hi';
    console.log(+test); // NaN
    // 부수 효과는 없다.
    console.log(test); // 'Hi'
    ```

    - - 단항 연산자는 피연산자의 부호를 반전한 값을 반환한다. + 단항 연산자와 마찬가지로 숫자 타입이 아닌 피연산자에 적용할 경우 해당 피연산자를 숫자 타입으로 변환하여 반환한다.
    ```javascript
    // 부호를 반전한다.
    console.log(-(-10)); // 10

    // 문자열 숫자로 타입 변환한다.
    console.log(-'0b0101'); // 5

    // 불리언 값을 숫자로 타입 변환한다.
    console.log(-true); // -1

    // 문자열은 숫자로 타입 변환할 수 없으므로 NaN을 반환한다.
    console.log(-'Hello'); // NaN
    ```

    - 1개 이상의 피연산자가 문자열일 경우 + 연산자가 문자열 연결 연산자로 동작한다. + 연산자가 아닌 이항 연산자나 피연산자가 모두 숫자 타입일 경우 산술 연산자로 동작한다.
    ```javascript
    // 문자열 연결 연산자
    console.log('1' + 2); // "12"

    // true에 숫자 값을 더할 경우 1로 타입이 변환된다.
    console.log(23 + true); // 24

    // false는 0으로 타입 변환된다.
    console.log(-1 + false); // -1

    // null은 0으로 타입 변환된다.
    console.log(2 + null); // 2

    // undefined는 숫자로 타입 변환되지 않는다.
    console.log(+undefined); // NaN
    console.log(34.5 + undefined); // NaN
    ```

    - JavaScript 엔진은 개발자의 의도와는 상관없이 암묵적으로 타입을 자동으로 변환한다. 이것을 **암묵적 타입 변환**(**implicit coercion**) 또는 **타입 강제 변환**(**type coercion**)이라고 한다. 

### 7-2 할당 연산자
- 할당 연산자(assignment operator): **우항에 있는 피연산자의 평가 결과(값)를 좌항에 있는 변수에 할당하는 연산자**
- 할당 연산자는 좌항의 변수에 값을 할당하므로 변수 값이 변하는 부수 효과가 있다.
> 할당 연산자의 종류

| 할당 연산자 | 예 | 동일 표현 | 부수 효과 | 
| :-: | :-: | :-: | :-: |
| = | x = 5 | x = 5 | O |
| += | x += 5 | x = x + 5 | O |
| -= | x -= 5 | x = x - 5 | O |
| *= | x *= 5 | x = x * 5 | O |
| /= | x /= 5 | x = x / 5 | O |
| %= | x %= 5 | x = x % 5 | O |

```javascript
let x;

x = 10;
console.log(x); // 10

x += 5; // x = x + 5;
console.log(x); // 15

x -= 5; // x = x - 5;
console.log(x); // 10

x *= 5; // x = x * 5;
console.log(x); // 50

x /= 5; // x = x / 5;
console.log(x); // 10

x %= 5; // x = x % 5;
console.log(x); // 0

let str = 'My name is ';

// 문자열 연결 연산자
str += 'Yeonjun'; // str = str + "Yeonjun";
console.log(str); // "My name is Yeonjun"

```

- 할당문은 값으로 평가되는 표현식인 문으로서 할당된 값으로 평가된다.
```javascript
let a;
let b;
let c;

// 연쇄 할당. 오른쪽에서 왼쪽으로 진행
// 1) c = 0 : 0으로 평가된다.
// 2) b = 0 : 0으로 평가된다.
// 3) a = 0 : 0으로 평가된다.
a = b = c = 0;

console.log(a, b, c); // 0 0 0
```

### 7-3 비교 연산자
- 비교 연산자(comparison operator): **좌항과 우항의 피연산자를 비교한 다음 그 결과를 불리언 값으로 반환하는 연산자**. 비교 연산자는 if 문이나 for 문과 같은 제어문의 조건식에서 주로 사용한다.

- 동등/일치 비교 연산자
    - 동등 비교 연산자(loose equally operator)와 일치 비교 연산자(strict equally operator)는 좌항과 우항의 피연산자가 같은 값으로 평가되는 비교해 불리언 값을 반환한다.
    - 동등 비교 연산자는 느슨한 비교(**loose**)를 하지만 일치 비교 연산자는 엄격한 비교(**strict**)를 한다.
    > 동등/일치 비교 연산자의 종류

    | 비교 연산자 | 의미 | 사례 | 설명 | 부수 효과 | 
    | :-: | :-: | :-: | :-- | :-: |
    | == | 동등 비교 | x == y | x와 y의 값이 같음 | X |
    | === | 일치 비교 | x === y | x와 y의 값과 타입이 같음 | X |
    | != | 부동등 비교 | x != y | x와 y의 값이 다름 | X |
    | !== | 불일치 비교 | x !== y | x와 y의 값과 타입이 다름 | X |

    - 동등 비교(==) 연산자는 **좌항과 우항의 피연산자를 비교할 때 먼저 암묵적 타입 변환을 통해 타입을 일치시킨 후 같은 값인지 비교한다**. 따라서 좌항과 우항의 피연산자가 타입은 다르더라도 암묵적 타입 변환 후에 같은 값일 수 있다면 true를 반환한다.
    ```javascript
    // 동등 비교
    console.log(5 == 5); // true

    // 타입이 달라도 암묵적 타입 변화를 통해 타입을 일치시키면 동등하다.
    console.log(5 == '5'); // true
    ```
    
    - 동등 비교 연산자는 편리한 경우도 있지만 결과를 예측하기 어렵고 실수할 가능성이 높다.
    ```javascript
    // 다음에 나오는 예제는 안티 패턴이므로 이해하지 못해도 무방하다.
    console.log('0' == ''); // false
    console.log(0 == ''); // true
    console.log(0 == '0'); // true
    console.log(false == 'false'); // false
    console.log(false == '0'); // true
    console.log(false == null); // false
    console.log(false == undefined); // false
    ```

    > 안티 패턴(anti-pattern): 가독성, 성능, 유지보수 등에 부정적인 영향을 줄 수 있어 사용을 지양하는 패턴

    - 일치 비교(===) 연산자는 **좌항과 우항의 피연산자가 타입도 같고 값도 같은 경우에 한하여 true를 반환한다**. 일치 비교 연산자는 동등 비교 연산자와 다르게 좌항과 우항의 피연산자를 비교할 때 암묵적 타입 변환을 하지 않는다.
    - 단 NaN은 서로 일치하지 않는 유일한 값이다.
    ```javascript
    // 일치 비교
    console.log(5 === 5); // true
    
    // 값과 타입이 모두 같은 경우나 true를 반환한다. 
    console.log(5 === '5'); // false

    // NaN은 자신과 일치하지 않는 유일한 값이다.
    console.log(NaN === NaN); // fasle
    ```

    - Number.isNaN 함수는 지정한 값이 NaN인지 확인하고 그 결과를 불리언 값으로 반환한다.
    ```javascript
    console.log(Number.isNaN(NaN)); // true
    console.log(Number.isNaN(10)); // false
    console.log(Number.isNaN(1 + undefined)); // true    
    ```

    - JavaScript에서는 양의 0과 음의 0이 있는데 이들을 비교하면 true를 반환한다.
    ```javascript
    // 양의 0과 음의 0의 비교, 일치 비교/동등 비교 모두 결과는 true다.
    console.log(0 === -0); // true
    console.log(0 === 0); // true
    ```

    - 양의 0과 음의 0, NaN과 NaN의 비교를 정확히 하기 위해서는 Object.is 메서드를 사용한다.
    ```javascript
    // Object.is 메서드는 ES6 버전에서 도입된 정적 메서드이다.
    // 인수로 비교할 값들을 들어간다.
    console.log(Object.is(-0, 0)); // false
    console.log(Object.is(NaN, NaN)); // true
    ```

    - 부동등 비교 연산자(!=)와 불일치 비교 연산자(!==)는 각각 동등 비교(==) 연산자와 일치 비교(===) 연산자의 반대 개념이다.
    ```javascript
    // 부동등 비교 연산자는 두 피연산자들의 값이 다르면 true를 반환하고 타입 상관없이 값이 같으면 false를 반환함
    console.log(5 != 8); // true
    console.log(5 != 5); // false
    console.log(5 != '5'); // false
    
    // 불일치 비교 연산자에서는 두 피연산자들의 값 또는 타입이 다르면 true을 반환하고 반대의 경우 false를 반환함
    console.log(5 !== 8); // true
    console.log(5 !== 5); // false
    console.log(5 !== '5'); // true
    ```

- 대소 관계 비교 연산자
    - 대소 관계 비교 연산자는 **피연산자의 크기를 비교하여 불리언 값을 반환한다**.
    > 대소 관계 비교 연산자의 종류

    | 대소 관계 비교 연산자 | 예제 | 설명 | 부수 효과 | 
    | :-: | :-: | :-: | :-: |
    | > | x > y | x가 y보다 크다. | X |
    | < | x < y | x가 y보다 작다. | X |
    | >= | x >= y | x가 y보다 크거나 같다. | X |
    | <= | x <=> y | x가 y보다 작거나 같다. | X |

    ```javascript
    console.log(5 > 0); // true
    console.log(5 > 5); // false
    console.log(5 >= 5); // true
    console.log(5 <= 5); // true
    ```

### 7-4 삼항 조건 연산자
- 삼항 조건 연산자(ternary operator): **조건식의 평가 결과에 따라 반환할 값을 결정하는 연산자**. JavaScript의 유일한 삼항 연산자이며, 부수 효과는 없다.
- 삼항 조건 연산자는 첫 번째 피연산자가 true로 평가되면 두 번째 피연산자를 반환하고, 첫 번째 피연산자가 false로 평가되면 세 번째 피연산자를 반환한다. 즉, 삼항 조건 연산자는 **두 번째 피연산자 또는 세 번째 피연산자로 평가되는**(**값이 반환되는**) **표현식**이라고 볼 수 있다.
```javascript
/*
조건식 ? 조건식이 true일 때 반환할 값 : 조건식이 false일 때 반환할 값
*/
let score = 90;
let result = score >= 60 ? 'pass' : 'fail';
// 조건식에서 score 변수에 저장된 값이 60점보다 높거나 같을 경우 'pass'가 출력되고
// 아닐 경우 'fail'이 출력된다.
// 현재 score 변수에 저장된 값이 90점이므로 'pass'가 출력될 것이다.

console.log(score); // 
```
- 첫 번째 피연산자 => 조건식(불리언 타입의 값으로 평가될 표현식)
- 조건식의 평가 결과가 불리언 값이 아닐 경우 불리언 값으로 암묵적 타입 변환된다.
```javascript
let x = 2;

// 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
let result = x % 2 ? '홀수' : '짝수';

console.log(result); // 짝수
```

- 삼항 조건 연산자의 첫 번째 피연산자가 조건식이기 때문에 if...else문으로 바꿀 수 있지만 삼항 조건 연산자와 달리 if...else문은 값처럼 사용할 수 없다.
```javascript
let x = 10;

// if...else 문은 표현식이 아닌 문이다. 따라서 값처럼 사용할 수 없다.
let result = if ( x % 2 ) { result = '홀수'; } else { result = '짝수'; };
console.log(result);
// SyntaxError: Unexpected token 'if'

let result;

if ( x % 2 ) result = '홀수';
else  result = '짝수';

console.log(result); // 짝수
```

### 7-5 논리 연산자
- 논리 연산자(logical operator): **우항과 좌항의 피연산자(부정 논리 연산자의 경우 우항의 피연산자)를 논리 연산하는 연산자**.
> 논리 연산자의 종류

| 논리 연산자 | 의미 | 부수 효과 |
| :-: | :-: | :-: |
| &#124; &#124; | 논리합(OR) | X |
| && | 논리곱(AND) | X |
| ! | 부정(NOT) | X |
