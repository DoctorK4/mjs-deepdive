## 16. 프로퍼티 어트리뷰트

#### 16.1 내부 슬롯과 내부 메서드

> 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티<sup>pseudo property</sup>와 의사 메서드<sup>pseudo method</sup>의 개념을 araboza.  
>
>   
>
> ECMAScript 사양에 등장하는 이중 대괄호 ([[ ... ]])로 감싼 이름들이 내부 슬롯과 내부 메서드다.
>
>   
>
> 내부 슬롯과 내부 메서드는 <ins>자바스크립트 엔진의 내부 로직</ins>이므로 원칙적으로 자바스크립트는 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다. 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.  
>
>   
>
> ex) 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는다. 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 원칙적으로 직접 접근할 수 없지만 [[Prototype]] 내부 슬롯의 경우, \_\_proto\_\_를 통해 간접적으로 접근할 수 있다.

```javascript
const o = {};

// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로직접 접근할 수 없다.
o.[[Prototype]] // -> Uncaught SyntaxError: Unexpected token '['
// 단, 일부 내부 슬롯과 내부 메서드에 한하여 가접적으로 접근할 수 있는 수단을 제공하기는 한다.
o.__proto__ // -> Object.prototype
```

  

#### 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

> 자바스크립트 엔진은 프로퍼티를 생성할 때 <ins>프로퍼티의 상태</ins>를 나타내는 <ins>프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.</ins>  
>
>   
>
> 프로퍼티의 상태란?
>
> - 프로퍼티의 값<sup>value</sup>
> - 값의 갱신 가능 여부<sup>writable</sup>
> - 열거 가능 여부<sup>enumerable</sup>
> - 재정의 가능 여부<sup>configurable</sup>
>
>   
>
> 프로퍼티 어트리뷰트란?
>
> 자바스크립트 엔진이 관리하는 내부 상태 값<sup>meta-property</sup>인 <strong>내부 슬롯</strong> [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]이다.  
>
> 따라서, 프로퍼티 어트리뷰트에 직접 접근할 수 없지만, Object.getOwnPropertyDescriptor메서드를 사용하여 간접적으로 확인할 수는 있다.  
>
>   
>
> ```javascript
> const person = {
>   name: 'Lee'
> };
> 
> // 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
> console.log(Object.getOwnPropertyDescriptor(person, 'name');
> // {value: "Lee", writable: true, enumerable: true, configurable: true}
> ```
>
>   
>
> 인수 전달
>
> - 객체의 참조 전달
> - 프로퍼티 키를 문자열로 전달
>
>   
>
> 반환
>
> - 프로퍼티 어트리뷰트 정보를 제공하는 <ins>프로퍼티 디스크립터<sup>PropertyDescriptor</sup> 객체</ins>를 반환한다.  
> - 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 undefined가 반환된다.
>
>   
>
>
> ```  javascript
> const person = {
>   name: 'Lee'
> };
> 
> // 프로퍼티 동적 생성
> person.age = 20;
>   
> // 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
> console.log(Object.getOwnPropertyDescriptors(person));
> /*
> {
>   name: {value: "Lee", writable: true, enumerable: true, configurable: true},
>   age: {value: 20, writable: true, enumerable: true, }
> }
> */
> ```

#### 16.3 데이터 프로퍼티와 접근자 프로퍼티

- 데이터 프로퍼티<sup>data property</sup>

  키와 값으로 구성된 일반적인 프로퍼티다. 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티다.

- 접근자 프로퍼티<sup>accessor property</sup>

  자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수<sup>accessor function</sup>로 구성된 프로퍼티다.

  

> - 데이터 프로퍼티
>
> 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다.  
>
> | 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                         |
> | ------------------- | ----------------------------------- | ------------------------------------------------------------ |
> | [[Value]]           | value                               | - 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값이다.<br/>- 프로퍼티 키를 통해 프로퍼티 값을 변경하면 [[Value]]에 값을 재할당한다. 이때 프로퍼티가 없으면 프로퍼티를 동적 생성하고 생성된 프로퍼티의 [[Value]]에 값을 저장한다. |
> | [[Writable]]        | writable                            | - 프로퍼티 값의 변경 가능 여부를 나타내며 불리언 값을 갖는다.<br />- [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다. |
> | [[Enumerable]]      | enumerable                          | - 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다.<br />[[Enumerable]]의 값이 false인 경우 해당 프로퍼티는 for...in문이나 Object.keys 메서드 등으로 열거할 수 없다. |
> | [[Configurable]]    | configurable                        | - 프로퍼티의 재정의 가능 여부를 나타내며 불리언 값을 갖는다.<br />- [[Configurable]]의 값이 false인 경우 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지된다. 단, [[Writable]]이 true인 경우 [[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용된다. |
>
> ​    
>
> ```javascript
> const person = {
>   name: 'Lee'
> };
> 
> // 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 취득한다.
> console.log(Object.getOwnPropertyDescriptor(person, 'name'));
> // {value: "Lee", writable: true, enumerable: true, configurable: true}
> ```
>
>   
>
> - 접근자 프로퍼티
>
> 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 <ins>접근자 함수</ins>로 구성된 프로퍼티다.  
>
> | 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                         |
> | ------------------- | ----------------------------------- | ------------------------------------------------------------ |
> | [[Get]]             | get                                 | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수다. 즉, 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다. |
> | [[Set]]             | set                                 | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수다. 즉, 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 [[Set]]의 값, 즉 setter 함수가 호출되고 그 결과가 프로퍼티 값으로 저장된다. |
> | [[Enumerable]]      | Enumerable                          | 데이터 프로퍼티의 [[Enumerable]]과 같다.                     |
> | [[Configurable]]    | Configurable                        | 데이터 프로퍼티의 [[Configurable]]과 같다.                   |
>
>   
>
> 접근자 함수는 getter/setter 함수라고도 부른다. 접근자 프로퍼티는 getter와 setter 함수를 모두 정의할 수도 있고 하나만 정의할 수도 있다.  
>
> ```javascript
> const person = {
>   // 데이터 프로퍼티
>   firstName: 'Ungmo',
>   lastName: 'Lee',
>   
>   // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
>   // getter 함수
>   get fullName() {
>     return `${this.firstName} ${this.lastName}`;
>   },
>   // setter 함수
>   set fullName(name) {
>     // 배열 디스트럭처링 할당
>     [this.firstName, this.lastName] = name.split(' ');
>   }
> };
> 
> // 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
> console.log(person.firstName + ' ' + person.lastName); // Ungmo Lee
> 
> // 접근자 프로퍼티를 통한 프로퍼티 값의 저장
> // 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
> person.fullName = 'Heegun Lee';
> console.log(person);// {firstNameL "Heegun", lastName: "Lee"}
> 
> // 접근자 프로퍼티를 통한 프로퍼티 값의 참조
> // 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
> console.log(person.fullName);
> 
> // firstName은 데이터 프로퍼티다.
> // 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]
> // 프로퍼티 어트리뷰트를 갖는다.
> let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
> console.log(descriptor);
> // {value: "Heegun", writable: true, enumerable: true, configurable: true}
> 
> // fullName은 접근자 프로퍼티다.
> // 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]]
> descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
> console.log(descriptor);
> // {get: f, set: f, enumerable: true, configurable: true}
> ```
>
>   
>
> 내부 슬롯/메서드 관점에서 설명  
>
> 접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면 내부적으로 [[Get]] 내부 메서드가 호출되어 다음과 같이 동작한다.  
>
> 1. 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키는 문자열 또는 심벌이어야 한다. 프로퍼티 키 "fullName"은 문자열이므로 유효한 프로퍼티 키다.
> 2. 프로토타입 체인에서 프로퍼티를 검색한다. person 객체에서 fullName 프로퍼티가 존재한다.
> 3. 검색된 fullName 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다. fullName 프로퍼티는 접근자 프로퍼티다.
> 4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수를 호출하여 그 결과를 반환한다. 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값은 Object.getOwnPropertyDescriptor 메서드가 반환하는 프로퍼티 디스크립터<sup>PropertyDescriptor</sup>객체의 get 프로퍼티 값과 같다.
>
>   
>
> 프로토타입이란?  
>
> 프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체다. 프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메서드를 상속한다. 프로토타입 객체의 프로퍼티나 메서드를 상속받은 하위 객체는 자신의 프로퍼티 또는 메서드인 것처럼 자유롭게 사용할 수 있다.  
>
>   
>
> 프로토타입 체인이란?  
>
> 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조를 말한다. 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례대로 검색한다.  
>
>   
>
> 접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법  
>
> ```javascript
> // 일반 객체의 __proto__는 접근자 프로퍼티다.
> Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
> // {get: f, set: f, enumerable: false, configurable: true}
> 
> // 함수 객체의 prototype은 데이터 프로퍼티다.
> Object.getOwnPropertyDescriptor(function() {}, 'prototype');
> // {value: {...}, writable: true, enumerable: false, configurable: false}
> ```

  

#### 16.4 프로퍼티 정의

> 프로퍼티 정의란 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티 어트리뷰트를 재정의하는 것을 말한다.  
>
> `Object.defineProperty` 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다. 인수로는 객체의 참조와 데이터 프로퍼티의 키인 문자열, 프로퍼티 디스크립터 객체를 전달한다.  
>
>   
>
> ``` javascript
> const person = {};
> 
> // 데이터 프로퍼티 정의
> Object.defineProperty(person, 'firstName', {
>   value: 'Ungomo',
>   writable: true,
>   enumerable: true,
>   configurable: true
> });
> 
> Object.defineProperty(person, 'lastName', {
>   value: 'Lee'
> });
> 
> let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
> console.log('firstName', descriptor);
> // firstName {value: "Ungmo", writable: true, enumerable: true, configurable: true}
> 
> // 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
> descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
> console.log('lastName', descriptor);
> // lastName {value: "Lee", writable: false, enumerable: false, configurable: false}
> 
> // [[Enumerable]]의 값이 false인 경우
> // 해당 프로퍼티는 for...in 문이나 Object.keys 등으로 열거할 수 없다.
> // lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않는다.
> console.log(Object.keys(person)); // ["firstName"]
> 
> // [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
> // lastName 프로퍼티는 [[Writable]]의 값이 false이므로 값을 변경할 수 없다.
> // 이때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
> person.lastName = 'Kim';
> 
> // [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 삭제할 수 없다.
> // lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제할 수 없다.
> // 이때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
> delete person.lastName;
> 
> // [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 재정의할 수 없다.
> // Object.defineProperty(person, 'lastName', { enumerable: true });
> // Uncaught TypeError: Cannot redefine property: lastName
> 
> descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
> console.log('lastName', descriptor);
> // lastName {value: "Lee", writable: false, enumerable: false, configurable: false}
> 
> // 접근자 프로퍼티 정의
> Object.defineProperty(person, 'fullName', {
>   // getter 함수
>   get() {
>     return `${this.firstName} ${this.lastName}`;
>   },
>   set() {
>     [this.firstName, this.lastName] = name.split(' ');
>   },
>   enumerable: true,
>   configurable: true
> });
> 
> descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
> console.log('fullName', descriptor);
> // fullName {get: f, set: f, enumerable: true, configurable: true}
> 
> person.fullName = 'Heegun Lee';
> console.log(person); // {firstName: "Heegun", lastName: "Lee"}
> ```
>
>   
>
> Object.defineProperty 메서드로 프로퍼티를 정의할 때 프로퍼티 디스크립터 객체의 프로퍼티를 일부 생략할 수 있다.  
>
> 프로퍼티 디스크립터 객체에서 생략된 어트리뷰트는 다음과 같이 기본값이 적용된다.  
>
> | 프로퍼티 디스크립터 객체의 프로퍼티 | 대응하는 프로퍼티 어트리뷰트 | 생략했을 때의 기본값 |
> | ----------------------------------- | ---------------------------- | -------------------- |
> | value                               | [[Value]]                    | undefined            |
> | get                                 | [[Get]]                      | undefined            |
> | set                                 | [[Set]]                      | undefined            |
> | writable                            | [[Writable]]                 | false                |
> | enumerable                          | [[Enumerable]]               | false                |
> | configurable                        | [[Configurable]]             | false                |
>
> Object.defineProperty 메서드는 한번에 하나의 프로퍼티만 정의할 수 있다. <strong>Object.defineProperties 메서드를 사용하면 여러개의 프로퍼티를 정의할 수 있다.</strong>  

#### 16.5 객체 변경 방지

> 객체는 변경 가능한 값이므로 재할당 없이 직접 변경할 수 있다. 즉, 프로퍼티를 추가하거나 삭제할 수 있고, 프로퍼티 값을 갱신할 수 있으며, Object.defineProperty 또는 Object.defineProperties 메서드를 사용하여 프로퍼티 어트리뷰트를 재정의할 수도 있다.  
>
> 자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공한다. 객체 변경 방지 메서드들은 객체의 변경을 금지하는 강도가 다르다.   
>
> | 구분           | 메서드                   | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 (갱신) | 프로퍼티 어트리뷰트 재정의 |
> | -------------- | ------------------------ | ------------- | ------------- | ---------------- | ----------------------- | -------------------------- |
> | 객체 확장 금지 | Object.preventExtensions | X             | O             | O                | O                       | O                          |
> | 객체 밀봉      | Object.seal              | X             | X             | O                | O                       | X                          |
> | 객체 동결      | Object.freeze            | X             | X             | O                | X                       | X                          |
>
>   
>
> - 객체 확장 금지
>
> Object.preventExtensions 메서드는 객체의 확장을 금지한다.  
>
> 프로퍼티는 프로퍼티 동적 추가와 Object.defineProperty 메서드로 추가할 수 있다. 이 두 가지 추가 방법이 모두 금지된다.  
>
> <i>확장이 가능한 객체인지 여부는 Object.isExtensible 메서드로 확인할 수 있다.</i>  
>
>   
>
> - 객체 밀봉
>
> Object.seal  메서드는 객체를 밀봉한다.  
>
> 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지를 의미한다.  
>
> <i>밀봉된 객체인지 여부는 Object.isSealed 메서드로 확인할 수 있다.</i>  
>
>   
>
> - 객체 동결
>
> Object.freeze 메서드는 객체를 동결한다.  
>
> 프로퍼티 추가 및 삭제와 프롶티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의미한다.  
>
> <i>동결된 객체인지 여부는 Object.isFrozen 메서드로 확인할 수 있다.</i>  
>
>   
>
> 지금까지 메서드들은 얕은 변경 방지<sup>shallow only</sup>로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지는 못한다. 따라서 Object.freeze 메서드로 객체를 동결하여도 중첩 객체까지 동결할 수 없다.  
>
> 객체의 중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 한다.  
>
> ```
> function deepFreeze(target) {
>   // 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결한다.
>   if (target && typeof target === 'object' && !Object.isFrozen(target)) {
>     Object.freeze(target);
>     /*
>       모든 프로퍼티를 순회하며 재귀적으로 동결한다.
>       Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환한다.
>       forEach 메서드는 배열을 순회하며 배열의 각 요소에 대하여 콜백 함수를 실행한다.
>     */
>     Object.keys(target).forEach(key => deepFreeze(traget[key]));
>   }
>   return target;
> }
> ```



---



## 생성자 함수에 의한 객체 생성

#### 17.1 Object 생성자 함수

>  new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈 객체를 생성한 이후 프로퍼티 또는 메서드를 추가하여 객체를 완성할 수 있다.  
>
> ```javascript
> // 빈 객체의 생성
> const person = new Object();
> 
> // 프로퍼티 추가
> person.name = 'Lee';
> person.sayHello = function() {
>   console.log('Hi! My name is ' + this.name);
> };
> 
> console.log(person); // {name: "Lee", sayHello: f}
> person.sayHello(); // Hi! My name is Lee
> ```
>
> 객체 리터럴을 사용하는 것이 더 간편하다.  

#### 17.2 생성자 함수

>- 객체 리터럴에 의한 객체 생성 방식의 문제점  
>
>  객체 리터럴에 의한 객체 생성 방식은 단 하나의 객체만 생성한다. => 비효율적이다.
>
>- 생성자 함수에 의한 객체 생성 방식의 장점
>
>  객체를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.  
>
>  ```javascript
>  // 생성자 함수
>  function Circle(radius) {
>    // 생성자 함수 내부 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
>    this.radius = radius;
>    this.getDiameter = function() {
>      return 2 * this.radius;
>    };
>  }
>  
>  // 인스턴스의 생성
>  const circle1 = new Circle(5); // 반지름이 5인 Circle 객체를 생성
>  const circle2 = new Circle(10); // 반지름이 10인 Circle 객체를 생성
>  
>  console.log(circle1.getDiameter()); // 10
>  console.log(circle2.getDiameter()); // 20
>  
>  // new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다.
>  // 즉, 일반 함수로서 호출된다.
>  const cricle3 = Circle(15);
>  
>  // 일반 함수로서 호출된 Circle은 반환문이 없으므로 암묵적으로 undefined를 반환한다.
>  console.log(circle3); // undefined
>  
>  // 일반 함수로서 호출된 Circle 내의 this는 전역 객체를 가리킨다.
>  console.log(radius); // 15
>  ```
>
>  
>
>- this
>
>  객체 자신을 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수<sup>self-referencing variable</sup>다.  
>
>  this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
>
>  | 함수 호출 방식       | this가 가리키는 값(this 바인딩)        |
>  | -------------------- | -------------------------------------- |
>  | 일반 함수로서 호출   | 전역 객체                              |
>  | 메서드로서 호출      | 메서드를 호출한 객체(마침표 앞의 객체) |
>  | 생성자 함수로서 호출 | 생성자 함수가 (미래에) 생성할 인스턴스 |
>
>```javascript
>// 함수는 다양한 방식으로 호출될 수 있다.
>function foo() {
>  console.log(this);
>}
>
>// 일반적인 함수로서 호출
>// 전역 객체는 브라우저 환경에서는 window, Node.js 환경에서는 global을 가리킨다.
>foo(); // window
>
>const obj = { foo }; // ES6 프로퍼티 축약 표현
>
>// 메서드로서 호출
>obj.foo(); // obj
>
>// 생성자 함수로서 호출
>const inst = new foo(); // inst
>```
>
>  
>
>- 생성자 함수의 인스턴스 생성 과정
>
>  - 생성자 함수의 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로서 동작하여 <ins>인스턴스를 생성</ins>하는 것과 <ins>생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)</ins>하는 것이다.  
>
>  - this에 프로퍼티를 추가하고 필요에 따라 전달될 인수를 프로퍼티의 초기값으로서 할당하여 인스턴스를 초기화한다.  
>
>  - 자바스크립트 엔진은 암묵적인 처리를 통해 인스턴스를 생성하고 반환한다.  
>
>  1. 인스턴스 생성과 this 바인딩
>     - 암묵적으로 빈 객체가 생성된다. 이 빈 객체가 바로 (아로 완성되지는 않았지만) 생성자 함수가 생성한 인스턴스다.
>     - 그리고 암묵적으로 생성된 빈 객체, <ins>즉 인스턴스는 this에 바인딩된다.</ins>
>     - 이 처리는 함수 몸체의 코드가 한 줄씩 실행되는 런타임 이전에 실행된다.
>     - <i>`바인딩`이란 식별자와 값을 연결하는 과정을 의미한다. 예를 들어, 변수 선언은 변수 이름(식별자)과 확보된 메모리 공간의 주소를 바인딩하는 것이다. this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다)와 this가 가리킬 객체를 바인딩하는 것이다.</i>
>  2. 인스턴스 초기화
>     - 생성자 함수에 기술되어 있는 코드가 한 줄씩 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.
>     - 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티나 메서드를 추가하고 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당한다.
>  3. 인스턴스 반환
>     - 생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
>     - 만약 this가 아닌 다른 객체를 명시적으로 반환하면 this가 반환되지 못하고 return 문에 명시한 객체가 반환된다.
>     - 하지만 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환된다.
>
>  생성자 함수 내부에서 명시적으로 this가 아닌 다른 값을 반환하는 것은 생성자 함수의 기본 동작을 훼손한다. 따라서 생성자 함수 내부에서 return 문을 반드시 생략해야 한다.  
>
>​    
>
>- 내부 메서드 [[Call]]과 [[Construct]]
>
>  함수는 객체이므로 일반 객체<sup>ordinary object</sup>와 동일하게 동작할 수 있다. <mark>함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있기 때문이다.</mark>  
>
>  
>
>...
>
>









---

## Quiz

> 1. question) ES8에서 Object.getOwnPropertyDescriptor의 달라진 스펙은?  
>
>    answer) Object.getOwnPropertyDescriptor 메서드는 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환하지만, ES8에서 도입된 Object.getOwnPropertyDescriptor 메서드는 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립트 객체들을 반환한다.   
>
> 2. question) 생성자 함수가 new 연산자 없이 호출되는 것을 방지하기 위해 사용하는 컨벤션 1개, 패턴 2개
>
>    answer) 파스칼 케이스 컨벤션, new.target, 스코프 세이프 생성자 패턴
>
> 3. question) 일반 객체에는 없는 함수 객체의 고유의 데이터 프로퍼티
>
>    answer) arguments, caller, length, name, prototype
>
> 

  

