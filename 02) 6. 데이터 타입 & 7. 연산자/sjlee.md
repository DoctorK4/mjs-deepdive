# 6. 데이터 타입
### ES6의 7개의 데이터 타입
- 원시 타입
  - 변경불가능한 값 
  - **number, string, boolean, null, undefined, symbol**
- 객체 타입
  - **function, object, class, array** 등

### undefined
자바스크립트는 선언과 정의의 구분이 모호하다.   
=> **선언과 동시에 정의**가 이뤄지기 때문인데, 그래서 초기값이 할당되지 않은 상태가 undefined!

### null
null 은 변수에 **값이 없다는 것을 의도적으로 명시**할 때 사용한다.   
HTML 요소를 검색할 수 없는 경우, Error 대신 null이 반환된다.   
(💡 그래서 React.useRef에서 초기값을 null로 사용한 것!)

 ### Symbol
 ❓궁금한 점  
 유일무이, 충돌할 위험성 제로 -> 그렇게 좋은데 왜 다 안쓸까?

### 원시타입과 객체타입의 차이
``` javascript
// 원시 타입은 값이 복사되어 전달된다.
let a = 1;
let b = a; // 여기서 b는 1이라는 값이 복사되어 전달된다.
a = 3;
console.log(a); // 3
console.log(b); // 1
```

``` javascript
// 객체 타입은 참조값(메모리주소, 레퍼런스)가 복사되어 전달된다.
let apple = { name: 'apple', kind: 'fruit', owner: 'sjlee' };
let orange = apple; // 0x1234와 같은 참조값이 복사된다.

orange.name = 'orange'; // 그 참조값의 값이 변경이 되었기에 apple도 변경된 값을 가르킨다.
console.log(apple.name); // orange
console.log(orange.name); //orange
```

### js는 동적타입언어
 자바스크립트는 선언이 아닌 할당에 의해 타입이 결정된다.(타입추론)   
 **동적 타입 언어를 쓸 때, 주의해야할 점**
 1. 변수는 제한적으로 사용, 최소한으로 유지
 2. 스코프는 최대한 좁게
 3. 전역변수는 최대한 사용하지❌
 4. const 상수를 사용하자
 5. 이름을 정성껏 짓자

   
# 7. 연산자

### 암묵적 타입 변환, 타입 강제 변환 예시
```
'1' + 1 = '11'
1 + true = 2
1 + false = 1
1 + null = 1
+undefined = NaN
```

### == 와 === 의 차이는? (동등비교, 일치비교)
- 동등 비교는 암묵적 타입 변환을 통해 타입을 일치시킨 다음에 비교한다.
- 일치 비교는 타입까지 비교한다.

### 자기 자신과 같지 않은 유일한 값은? 
- NaN
- 그렇다면 어떻게 NaN임을 알 수 있을까? => Number.isNaN
- Object.is(객체버전)

### null의 typeof는 null을 반환하지 않고 object를 반환한다
- 그럼 어떻게 null임을 확인할 수 있나? => === 일치 연산자 사용!
