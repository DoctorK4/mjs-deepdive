## (20장) Strict Mode

- **Strict Mode 정의**:
  - JavaScript의 Strict Mode는 ES5부터 도입된 기능으로, 코드를 더 엄격하게 실행하여 잠재적인 오류를 줄이는 데 도움을 준다.
  - 이는 개발자가 더 안전하고 최적화된 코드를 작성할 수 있게 만든다.

- **암묵적 전역 방지**:
  - Strict Mode를 사용하면, 자바스크립트 엔진은 더 이상 선언되지 않은 변수에 자동으로 전역 객체의 프로퍼티를 생성하지 않는다.
  - 따라서 암묵적 전역 변수를 사용하려 할 때 ReferenceError가 발생하게 된다.
  - 이는 변수 사용의 명확성을 강화하고 실수를 방지한다.

- **적용 방법**:
  - Strict Mode를 적용하려면, 스크립트의 시작 부분이나 함수의 시작 부분에 `"use strict";`를 추가한다.
  - 전역에 추가할 경우 전체 스크립트에 적용되며, 함수 내부에 추가할 경우 해당 함수와 그 내부 함수에만 적용된다.

- **전역 적용의 문제점**:
  - 전역에 Strict Mode를 적용하는 것은 외부 서드파티 라이브러리와의 호환성 문제로 인해 피해야 한다.
  - 대신 즉시 실행 함수를 사용하여 스코프를 구분하고, 그 내부에서 Strict Mode를 적용하는 것이 좋다.

- **함수 단위 적용의 문제점**:
  - 함수마다 Strict Mode를 적용하는 것은 바람직하지 않다.
  - 함수 내부에서만 Strict Mode가 적용되고 외부 컨텍스트에는 적용되지 않으면 문제가 발생할 수 있다.

- **Strict Mode에서 발생하는 오류들**:
  - **암묵적 전역**: 선언하지 않은 변수를 사용하려 하면 ReferenceError가 발생.
  - **변수, 함수, 매개변수 삭제**: `delete` 연산자로 이들을 삭제하려고 하면 SyntaxError가 발생.
  - **매개변수 이름의 중복**: 함수에서 같은 이름의 매개변수를 사용하려 하면 SyntaxError가 발생.
  - **with문 사용**: Strict Mode에서는 `with`문을 사용할 수 없으며, 사용하려고 하면 SyntaxError가 발생.

- **Strict Mode 적용에 의한 변화**:
  - **일반 함수의 this**: Strict Mode에서 일반 함수를 호출할 때 `this` 값은 `undefined`로 바인딩. 이는 일반 함수에서 `this`를 사용할 필요가 없다는 점을 반영.
  - **arguments 객체**: Strict Mode에서는 함수 매개 변수에 전달된 인수를 변경해도 `arguments` 객체에 반영되지 X. 이는 `arguments` 객체와 매개변수 사이의 연결을 끊어, 예측 가능한 코드 작성을 돕는다.
 
<br>

## (20장) Strict Mode 퀴즈
 
### 퀴즈 1
Strict Mode에서 선언하지 않은 변수에 값을 할당하려고 할 때 JavaScript는 어떻게 반응하는지?

#### 답변
1. ReferenceError 발생
2. TypeError 발생
3. 변수가 정상적으로 생성
4. 아무런 반응이 없음

### 퀴즈 2
"Strict Mode"를 스크립트에 어떻게 적용하는지?

#### 답변
1. "strict mode";를 스크립트 상단에 추가
2. "use strict";를 스크립트 상단에 추가
3. "use strict";를 스크립트나 함수의 시작 부분에 추가
4. "strict";를 스크립트 상단에 추가

### 퀴즈 3
Strict Mode에서 일반 함수를 호출했을 때 `this` 값은 무엇인가?

#### 답변
1. 전역 객체 (window)
2. 함수 자체
3. undefined
4. null

### 퀴즈 4
Strict Mode에서 `delete` 연산자로 지역 변수를 삭제하려고 할 때 어떤 오류가 발생하는지?

#### 답변
1. ReferenceError
2. SyntaxError
3. TypeError
4. RangeError

### 정답
1. **1. ReferenceError 발생**
2. **3. "use strict";를 스크립트나 함수의 시작 부분에 추가**
3. **3. undefined**
4. **2. SyntaxError**

<br>

---

<br>

## (21장) 자바스크립트 빌트인 객체

- **자바스크립트 객체의 종류**:
  - **표준 빌트인 객체**: ECMAScript 사양에 정의된 객체들로, 실행 환경과 관계없이 사용 가능하며, 애플리케이션 전역의 공통 기능을 제공한다.
  - **호스트 객체**: ECMAScript 사양에는 없지만, 특정 실행 환경에서 제공하는 객체들이다.
  - **사용자 정의 객체**: 사용자가 직접 정의한 객체들이다.

- **표준 빌트인 객체**:
  - 자바스크립트는 약 40여 개의 표준 빌트인 객체를 제공한다.
  - Object, Number, Boolean, Function, Array, RegExp, Date, Math, Promise, Map/Set 등이 포함된다.
  - 대부분의 표준 빌트인 객체들은 생성자 함수로서 인스턴스를 생성할 수 있으며, 프로토타입 메서드와 정적 메서드를 제공한다.
  - 반면, Math, Reflect, JSON 같은 일부 객체는 정적 메서드만 제공한다.

- **원시값과 래퍼 객체**:
  - 문자열, 숫자, 불리언과 같은 원시값에는 String, Number, Boolean 등의 생성자 함수가 존재한다.
  - 이는 원시값을 객체처럼 사용할 수 있도록 엔진이 일시적으로 해당 원시값을 관련 객체로 변환해주기 때문이다.
  - 래퍼 객체는 원시값을 객체처럼 사용할 때 임시로 생성되는 객체이며, 처리가 끝나면 원래의 원시값으로 돌아가고 객체는 가비지 컬렉션의 대상이 된다.
  - null과 undefined는 래퍼 객체를 생성하지 않는다.

- **전역 객체**:
  - 전역 객체는 코드 실행 전 자바스크립트 엔진에 의해 생성되는 특수한 객체로, 최상위 객체이다.
  - 브라우저 환경에서는 `window`, Node.js 환경에서는 `global`로 불린다.
  - 전역 객체는 Object, Number, Boolean, Function, Array, RegExp, Date, Math, Promise 등과 같은 표준 빌트인 객체를 포함한다.
  - 실행 환경에 따라 추가적인 프로퍼티와 메서드를 가질 수 있다. 예를 들어, 브라우저 환경에서는 Web API를, Node.js 환경에서는 Node.js 고유의 API를 제공한다.
  - `var` 키워드로 선언한 전역 변수와 함수, 그리고 암묵적 전역은 전역 객체의 프로퍼티가 되지만, `let`과 `const`로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.

- **빌트인 전역 프로퍼티와 함수**:
  - **빌트인 전역 프로퍼티**: Infinity, NaN, undefined 등과 같이 애플리케이션 전역에서 사용하는 값들을 제공한다.
  - **빌트인 전역 함수**: eval, isFinite, isNaN, parseFloat, parseInt, encodeURI/decodeURI, encodeURIComponent/decodeURIComponent 등 전역 객체의 메서드로서, 애플리케이션 전역에서 호출 가능하다.

- **암묵적 전역**:
  - 전역 객체의 프로퍼티로 추가되어 전역 변수처럼 동작하는 것을 의미한다.
  - 하지만 변수 호이스팅이 발생하지 않으며, delete 연산자로 삭제할수 있다.
  - 반면, `var` 키워드로 선언한 전역 변수는 삭제할 수 없다. 

<br>

## (21장) 자바스크립트 빌트인 객체 퀴즈

### 퀴즈 1
자바스크립트에서 "표준 빌트인 객체"란 무엇인가?

#### 답변
1. ECMAScript 사양에 정의되지 않은 객체
2. 사용자가 직접 정의한 객체
3. 자바스크립트 실행 환경에서 추가로 제공하는 객체
4. ECMAScript 사양에 정의된 객체

### 퀴즈 2
래퍼 객체가 생성되는 상황은 언제인가?

#### 답변
1. 객체를 생성할 때 항상
2. 원시값을 객체처럼 사용할 때
3. 함수를 호출할 때
4. 변수를 선언할 때

### 퀴즈 3
`isNaN` 함수는 어떤 경우에 사용되는가?

#### 답변
1. 문자열을 숫자로 변환할 때
2. 유한수인지 검사할 때
3. 전달받은 인수가 NaN인지 검사할 때
4. 문자열을 부동 소수점 숫자로 변환할 때

### 정답
1. **4. ECMAScript 사양에 정의된 객체**
2. **2. 원시값을 객체처럼 사용할 때**
3. **3. 전달받은 인수가 NaN인지 검사할 때**

<br>

---

<br>

## (22장) this 키워드

- **this 키워드 정의**:
  - `this`는 자신이 속한 객체나 생성할 인스턴스를 가리키는 자기 참조 변수이다.
  - JavaScript 엔진에 의해 암묵적으로 생성되며, 함수 호출 방식에 따라 그 값이 동적으로 결정된다.

- **함수 호출 방식과 this 바인딩**:
  - 함수 호출 방식에는 일반 함수 호출, 메서드 호출, 생성자 함수 호출, Function.prototype.apply/call/bind 메서드에 의한 간접 호출 등이 있다.
  - 이들 각각의 호출 방식은 `this` 바인딩, 즉 `this`에 바인딩될 값이 다르게 설정된다.

- **일반 함수 호출**:
  - 일반 함수로 호출된 모든 함수 내부의 `this`에는 전역 객체가 바인딩된다.
  - 이는 메서드와 내부 함수(중첩 함수 또는 콜백 함수)의 `this`가 일치하지 않을 수 있다는 것을 의미한다.
  - 해결 방법으로는 `this`를 변수에 할당하거나, Function.prototype.apply/call/bind 메서드를 사용하거나, 화살표 함수를 사용할 수 있다.

- **메서드 호출**:
  - 메서드 내부의 `this`에는 메서드를 호출한 객체가 바인딩된다.
  - 여기서 중요한 점은 메서드가 소유한 객체가 아니라, 메서드를 호출한 객체에 `this`가 바인딩된다는 것이다.

- **생성자 함수 호출**:
  - 생성자 함수 내부의 `this`에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

- **Function.prototype.apply/call/bind 메서드에 의한 간접 호출**:
  - apply, call, bind 메서드는 함수의 `this` 바인딩을 명시적으로 지정할 수 있게 해준다.
  - apply와 call은 함수를 호출하면서 특정 객체를 `this`에 바인딩한다. apply는 인수를 배열로, call은 리스트 형식으로 전달한다.
  - bind 메서드는 함수를 호출하지 않고, `this` 바인딩이 교체된 새로운 함수를 반환한다. 이는 `this` 불일치 문제를 해결하는 데 유용하다.

<br>

## (22장) this 키워드 퀴즈

### 퀴즈 1
메서드 내부에서 `this`가 가리키는 것은 무엇인가?

#### 답변
1. 항상 전역 객체
2. 메서드를 호출한 객체
3. 메서드를 소유한 객체
4. 항상 undefined

### 퀴즈 2
일반 함수 호출에서 `this`에 바인딩되는 것은 무엇인가?

#### 답변
1. 전역 객체
2. 호출한 함수 자체
3. 함수가 속한 객체
4. undefined

### 퀴즈 3
`Function.prototype.bind` 메서드의 주요 사용 목적은 무엇인가?

#### 답변
1. 함수를 즉시 호출하기 위함
2. 함수의 this 바인딩을 명시적으로 설정하기 위함
3. 함수에 인수를 미리 넘기기 위함
4. 함수를 복제하기 위함

### 퀴즈 4
생성자 함수에서 `this`가 가리키는 것은 무엇인가?

#### 답변
1. 생성자 함수 자체
2. 생성자 함수가 생성할 인스턴스
3. 전역 객체
4. 호출한 객체

### 정답
1. **2. 메서드를 호출한 객체**
2. **1. 전역 객체**
3. **2. 함수의 this 바인딩을 명시적으로 설정하기 위함**
4. **2. 생성자 함수가 생성할 인스턴스**

<br>

---

<br>

## (23장) 실행 컨텍스트

- **소스코드의 타입**:
  - ECMAScript는 소스코드를 전역 코드, 함수 코드, eval 코드, 모듈 코드로 구분한다.
  - 각 타입은 실행 컨텍스트 생성에 영향을 미친다.

- **소스코드의 평가와 실행**:
  - 소스코드는 평가와 실행의 두 단계로 처리된다.
  - 평가 단계에서 실행 컨텍스트를 생성하고, 변수와 함수 선언문을 먼저 처리한다.
  - 실행 단계에서는 선언문을 제외한 코드가 실행되고, 실행 결과는 스코프에 등록된다.

- **실행 컨텍스트의 역할**:
  - 실행 컨텍스트는 스코프, 식별자, 코드 실행 순서를 관리한다.
  - 모든 식별자는 스코프에 등록되며, 스코프 체인을 통해 식별자 검색이 가능하다.
  - 실행 컨텍스트 스택을 통해 코드 실행 순서가 관리된다.

- **실행 컨텍스트 스택**:
  - 실행 컨텍스트 스택은 코드 실행 순서를 관리한다.
  - 스택의 최상위에 있는 실행 컨텍스트는 현재 실행 중인 코드를 나타낸다.

- **렉시컬 환경**:
  - 렉시컬 환경은 식별자와 바인딩된 값, 상위 스코프 참조를 기록한다.
  - 실행 컨텍스트는 `LexicalEnvironment`와 `VariableEnvironment`로 구성된다.

- **실행 컨텍스트의 생성과 식별자 검색 과정**:
  - 실행 컨텍스트의 생성은 코드 실행 전에 이루어진다.
  - 식별자 결정을 위해 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색한다.

- **실행 컨텍스트와 블록 레벨 스코프**:
  - `var`로 선언된 변수는 함수 레벨 스코프를 따른다.
  - `let`과 `const`로 선언된 변수는 블록 레벨 스코프를 따르며, 코드 블록 내에서 별도의 렉시컬 환경이 생성될 수 있다.

<br>

## (23장) 실행 컨텍스트 퀴즈

### 퀴즈 1
함수 코드의 실행 컨텍스트가 관리하는 스코프의 유형은 무엇인가?

#### 답변
1. 전역 스코프
2. 지역 스코프
3. 블록 레벨 스코프
4. 모듈 스코프

### 퀴즈 2
실행 컨텍스트의 '렉시컬 환경' 컴포넌트는 무엇을 담당하는가?

#### 답변
1. 함수 호출 순서
2. 식별자와 바인딩된 값, 상위 스코프 참조의 관리
3. 비동기 코드 관리
4. 메모리 할당

### 퀴즈 3
`var` 키워드로 선언한 변수의 스코프 유형은 무엇인가?

#### 답변
1. 블록 레벨 스코프
2. 함수 레벨 스코프
3. 모듈스코프
4. 전역 스코프

### 퀴즈 4
전역 코드의 실행 컨텍스트가 관리하는 것은 무엇인가?

#### 답변
1. 지역 변수와 함수
2. 모듈 내 변수와 함수
3. 전역 변수와 함수
4. eval 코드

### 정답
1. **2. 지역 스코프**
2. **2. 식별자와 바인딩된 값, 상위 스코프 참조의 관리**
3. **2. 함수 레벨 스코프**
4. **3. 전역 변수와 함수**
