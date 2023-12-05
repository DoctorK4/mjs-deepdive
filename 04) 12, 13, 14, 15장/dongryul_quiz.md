# 퀴즈 모아보기

## 12장 함수

<details>
<summary>1. 함수는 표현식이 아닌 문이기 대문에 변수에 할당할 수 없다. (O, X)</summary>
<div markdown="1">
<br/>
> 정답 : X
<br/>

</div>
</details>
<br/>

<details>
<summary>2. 자바스크립트에서 함수는 일급 객체이다. 일급 객체는 어떤 성질을 갖고 있을까?</summary>
<div markdown="1">
<br/>
> 일급 객체는 값의 성질을 갖는다. 함수가 일급 객체 라는 것은 함수를 값처럼 자유롭게 사용할 수 있다는 의미이다. 
</div>
</details>
<br/>

<details>
<summary>3. 함수 리터럴은 함수 이름을 생략할 수 있다. (O, X)</summary>
<div markdown="1">
<br/>
> 정답 : O
<br/>
함수리터럴은 함수 이름을 생략할 수 있다. 
그러나 함수선언문은 함수 이름을 생략할 수 없다. 
</div>
</details>
<br/>

<details>
<summary>4. 콜백함수란? 고차함수란? </summary>
<div markdown="1">
<br/>
> 콜백 함수 : 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수
<br/>
> 고차 함수 : 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수
</div>
</details>
<br/>

<details>
<summary>5. 즉시 실행 함수는 기명 함수로 선언한다면, 다시 호출할 수 있다. (O, X)</summary>
<div markdown="1">
<br/>
> X
</div>
</details>
<br/>

<details>
<summary>6. 함수 선언문은 코드 최상위 또는 다른 함수 내부에서만 사용할 수 있다. (O, X) </summary>
<div markdown="1">
<br/>
> X
<br/>
ES6 이후 if 나 for문 같은 코드 블록 내에서도 정의할 수 있게 되었음.
</div>
</details>
<br/>

## 13장 

### 1.렉시컬 스코프 
```javascript
function foo() {
  console.log('global foo');
}

function bar() {
  function foo(){
    console.log('local foo');
  }
  foo();
}

bar(); // ???

```

## 14장 

<details>
<summary>1. 전역 변수 사용의 문제점 3가지를 말해주세요.</summary>
<div markdown="1">
<br/>
> 1. 암묵적 결합
<br/>
> 2. 긴 생명주기
<br/>
> 3. 스코프 체인의 종점에 존재
<br/>
> 4. 네임스페이스 오염
</div>
</details>
<br/>

<details>
<summary>2. 전역 변수 사용을 대신할 수 있는 방법 3가지를 말해주세요. </summary>
<div markdown="1">
<br/>
> 1. 즉시실행함수 사용
<br/>
> 2. 네임스페이스 객체 사용
<br/>
> 3. 모듈패턴 사용
<br/>
> 4. ES6 모듈 사용
</div>
</details>
<br/>

## 15장

<details>
<summary>1. let, const 키워드로 선언한 변수는 호이스팅이 일어나지 않는다. (O, X) </summary>
<div markdown="1">
> X
<br/>
(p.213 참고) 호이스팅은 발생한다. 다만, 초기화단계가 분리되어 일어날 뿐.
</div>
</details>
<br/>


## 토론 & 더알아보기
### 1. `new Function` 생성자 함수는 도대체 언제 쓸까?
>그러나 new Function이라는 문법을 사용하면 어떤 문자열도 함수로 바꿀 수 있습니다. 서버에서 전달받은 문자열을 이용해 새로운 함수를 만들고 이를 실행하는 것도 가능합니다.
```javascript
let str = ... 서버에서 동적으로 전달받은 문자열(코드 형태) ...
let func = new Function(str);

func();
```

>서버에서 코드를 받거나 템플릿을 사용해 함수를 동적으로 컴파일해야 하는 경우, 복잡한 웹 애플리케이션을 구현할 때와 같이 아주 특별한 경우에 new Function을 사용할 수 있습니다.

출처 : [https://ko.javascript.info/new-function](https://ko.javascript.info/new-function)

### 2. 정말 함수는 한가지 일만하고 가급적 작게 만들어야할까? 

[유튜브 코딩애플 - 코딩 책 한 권만 읽으면 이렇게 됩니다](https://youtu.be/th7n1rmlO4I?si=5EHKQzbEg5grDUL9)