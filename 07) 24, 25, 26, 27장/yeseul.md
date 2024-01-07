# 24장 클로저

Q. 자바스크립트 엔진은 상위 스코프를 결정할 때 함수를 어디서 호출했는지에 따라 결정한다. (O / X)

<details>

<summary>A</summary> 

X => 호출이 아닌 선언 위치에 따라 상위 스코프 결정

</details>

Q. 클로저 사용의 장점

<details>

<summary>A</summary> 

1. 상태 유지: 클로저는 현재 상태를 기억하고 동적으로 변경되어도 최신 상태를 유지한다.

2. 전역 변수 남용 억제

3. 캡슐화와 정보 은닉

4. 모듈화에 유리

</details>

# 25장 class

Q. class 메서드 3가지

<details>

<summary>A</summary> 

1. constructor(생성자)
2. 프로토타입 메서드
3. 정적 메서드

</details>

Q. class와 생성자 함수의 차이

<details>

<summary>A</summary> 

1. 클래스를 new 연산자 없이 호출하면 에러 발생

2. 클래스 열거 불가

3. 클래스는 항상 strict mode 지정

4. 클래스는 extends와 super 키워드 제공

5. 클래스는 TDZ 영향을 받아 호이스팅이 되지 않는 것처럼 동작

</details>

# 26장 ES6 함수의 추가 기능

Q. ES6부터 함수의 사용 목적에 따라 구분한 세 가지 종류는? 

<details>

<summary>A</summary> 

일반 함수, 메서드, 화살표 함수

</details>

Q. 매개변수 이름 앞에 세개의 점 ...을 붙여 함수에 전달된 인수들의 목록을 배열로 전달 받는 것은?

<details>

<summary>A</summary> 

Rest 파라미터

</details>

# 27 배열

Q. 배열 생성 방법 2가지

<details>

<summary>A</summary> 

1. 배열 리터럴 대괄호[] 사용

2. Array() 생성자 함수 사용

</details>

Q. 배열 요소 삭제 연산자는?

<details>

<summary>A</summary> 

delete

</details>

Q. 

```
const arr = [1, 2, 3];
delete arr[1];
console.log(arr); // Q-1
console.log(arr.length) // Q-2
```

<details>

<summary>A</summary> 

Q-1. [1, empty, 3]

Q-2. 3
delete 연산자는 length 프로퍼티에 영향을 주지 않는다.

</details>

Q. delete 연산자는 length 프로퍼티에 영향을 주지 않아 희소 배열이 된다. 이러한 문제를 해결해 배열의 특정 요소를 완전히 삭제하는 메서드는?

<details>

<summary>A</summary> 

Array.prototype.splice()

```
const arr = [1, 2, 3];
arr.splice(1, 1);
console.log(arr); // [1, 3]
console.log(arr.length) // 2
```

</details>
