# 20장 strict mode

Q. strict mode에서 선언하지 않은 변수를 참조하면?

<details>

<summary>A</summary> 

ReferenceError 발생

</details>

Q. strict mode에서 delete 연산자로 변수 함수 매개변수를 삭제하면?

<details>

<summary>A</summary> 

SyntaxErrpr 발생

</details>

# 21장 빌트인 객체

Q.

```
const num = 0.5;
console.log(num.toFixed(), typeof num.toFixed()); // 1
console.log(num, typeof num); // 2
```

<details>

<summary>A</summary> 

1. 1 string
2. 0.5 'number'

일시적으로 원시값을 연관된 객체로 변환. 이때 생성되는 객체를 래퍼 객체라 한다.

</details>

Q. 빌트인 전역 프로퍼티 3가지.

<details>

<summary>A</summary> 

Infinity, NaN, undefined

</details>

Q.

```
var x = 5;
function foo () {
  y = 10;
}
foo();

console.log(window.x); // 1
console.log(window.y); // 2

delete x;
delete y;

console.log(window.x); // 3
console.log(window.y); // 4
```

<details>

<summary>A</summary> 

1. 5
2. 10
3. 5 => 전역 변수는 프로퍼티지만 delete 연산자로 삭제할 수 없다.
4. undefined 

</details>

# 22장 this

Q. this 바인딩은 함수의 선언에 의해 동적으로 결정된다. (O / X)

<details>

<summary>A</summary> 

X => 선언이 아닌 호출에 따라 결정

</details>

Q. 동적 방식이 아닌 정의 시점에 상위 스코프의 this를 가리키는 방식으로 정적인 방식에 의해 this가 결정되는 함수는?

<details>

<summary>A</summary> 

화살표 함수

</details>

Q. 

```
function Food(name) {
  this.name = name;
}
 
var omlet = Food('omlet');

console.log(omlet); // ?

```

<details>

<summary>A</summary> 

undefined => new 연산자 없이 호출하면 생성자 함수가 아닌 일반 함수의 호출로 omlet에는 반환문이 없으므로 암묵적으로 undefined를 반환한다. 

</details>

# 23장 실행 컨텍스트

Q. 

```
let lamp = 'OFF';
function goTo2F() {
  let lamp = 'ON';
  console.log(lamp); // 1

  function goTo3F() {
    let pet = 'puppy';
    console.log(pet); // 2
    console.log(lamp); // 3
    console.log(corona); // 4
  }
  goTo3F();
}
goTo2F();

console.log(lamp); // 5
```

<details>

<summary>A</summary> 

1. ON
2. puppy
3. ON
4. ReferenceError
5. OFF

</details>


