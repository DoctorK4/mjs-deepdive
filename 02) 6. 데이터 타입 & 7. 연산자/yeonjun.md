# 모던 자바스크립트 딥다이브

## 6. 데이터 타입
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

-멀티 라인 문자열: JavaScript에서는 일반 문자열은 줄바꿈(개행)을 인식하지 않는다. 일반 문자열 내에서 줄바꿈 등의 공백(white space)을 표현하려면 **백슬래시**(\)로 시작하는 이스케이프 시퀀스(escape sequence)
> 이스케이프 시퀀스의 종류
|:-: |:-: |
| 이스케이프 시퀀스 | 의미 |
|:-- |:-- |
|\0 |Null |
|\b |백스페이스 |
|\f |폼 피드(Form Feed): 프린터로 출력할 경우  
 다음 페이지의 시작 지점으로 이동한다. |
|\n |개행(LF/Line Feed): 다음 행으로 이동한다. |
|\r |개행(CR/Carriage Return): 커서를 처음으로 이동 |
|\t |탭 이동(수평) |
|\v |탭 이동(수직) |
|\uXXXX |유니코드, 예를 들어 '\u0041'은 'A', '\uD55C'는 '한'다. |

## 7. 연산자

### 7-1 산술 연산자