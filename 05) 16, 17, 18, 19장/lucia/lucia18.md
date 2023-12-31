# 18. 함수와 일급 객체

## 18.1 일급 객체
- 무명의 리터럴로 생성할 수 있다
- 런타임 생성이 가능하다
- 변수나 자료구조에 저장할 수 있다
- 함수의 매개변수에 전달할 수 있다
- 함수의 반환값으로 사용할 수 있다
- 자바스크립트의 함수는 다음 조건을 모두 만족하므로 일급객체다
- 함수를 객체와 동일하게 사용할 수 있다
- 런타임에 함수 객체로 평가된다
  - 함수 객체는 일반 객체와 다르게 호출 가능하며, 고유의 프로퍼티를 소유한다는 차이점이 있다

## 18.2 함수 객체의 프로퍼티
- console.dir을 이용해 함수 객체의 내부를 알 수 있다
- Object.getOwnPropertyDescriptors 메서드로 확인해보면, arguments, caller, length, name, prototype 프로퍼티가 모두 함수 객체의 고유 프로퍼티인 것을 확인 할 수 있다
- 하지만 proto는 접근자 프로퍼티이며, 함수 객체 고유의 프로퍼티가 아니라 Object.prototype 객체의 프로퍼티를 상속받은 것이다

### 18.2.1 arguments 프로퍼티
- 함수 객체의 arguments 프로퍼티 값은 argument 객체
  - 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체
  - 함수 내부에서 지역 변수처럼 사용 (함수 외부에서 참조 불가능)
- 함수 정의 시, 선언한 매개변수는 함수 몸체 내부에서 변수와 동일하게 취급
- 함수 몸체 내에서 암묵적으로 매개변수가 선언 : undefined로 초기화 -> 인수 할당
- 선언된 매개 변수보다 인수를 적게 전달한 경우, undefined로 초기화된 상태를 유지
- 인수를 더 많이 작성한 경우, 암묵적으로 argument 객체의 프로퍼티로 보관
- arguments 객체의 callee 프로퍼티는 호출되어 arguments 객체를 생성한 함수 (자기 자신)을 가리키고, length 프로퍼티는 인수의 개수를 나타낸다
- arguments 객체의 Symbol(Symbol.iterator)프로퍼티
  - 순회 가능한 자료구조인 이터러블로 만들기 위한 프로퍼티
- 선언된 매개변수의 개수와 함수를 호출할 때 전달하는 인수의 개수를 확인하지 않는 자바스크립트의 특성으로 인해 발생하는 오류를 막기 위해 arguments의 length 프로퍼티에 따라 달리 작동하도록 함수를 정의할 필요가 있다
  - 특히 가변 인자 함수를 구현할 때 arguments.length를 사용하는 것이 유용하다
- arguments 객체는 유사배열객체
  - 배열 메서드를 사용하는 경우 에러 발생
  - 따라서 배열 배서드를 사용하고 싶다면, Function.prototype.call , Function.prototype.apply 를 사용해 간접 호출 해야함 
  - 이런 번거로움을 해결하기 위해 ES6에서는 Rest 파라미터를 도입

### 18.2.2 caller 프로퍼티
- ECMAScript 사양에 포함되지 않는 비표준 프로퍼티
- 함수 객체의 caller 프로퍼티는 함수 자신을 호출한 함수를 가리킨다

### 18.2.3 length 프로퍼티
- 함수를 정의할 때 선언한 매개변수의 개수
- arguments.length (넘겨받은 인자의 개수) != 함수 객체의 length (매개 변수의 개수)

### 18.2.4 name 프로퍼티
- ES5와 ES6에서 동작을 다르게 하므로 주의해야 한다
  - 익명함수표현식
    - es5 : 빈 문자열
    - es6 : 함수 객체를 가리키는 식별자

### 18.2.5 __proto__ 접근자 프로퍼티
- 모든 객체는 [[Prototype]] 이라는 내부 슬롯을 갖는데, 이는 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다
- hasOwnProperty
  - 인수로 전달받은 프로퍼티키가 객체 고유의 프로퍼티인 경우에만 true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false 반환

### 18.2.6 prototype 프로퍼티
- 생성자 함수로 호출할 수 있는 함수 객체(Constructor)만이 소유하는 프로퍼티
- 호출할 수 없는 경우(non-constructor)에는 prototype 프로퍼티가 없음
