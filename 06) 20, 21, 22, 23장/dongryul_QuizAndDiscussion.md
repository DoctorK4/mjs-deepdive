# 20장 strict mode

## 1. with 문은 무엇이고 언제 쓸까? 

```js
// BEFORE
x = Math.cos(3 * Math.PI) + Math.sin(Math.LN10) 
y = Math.tan(14 * Math.E)

// AFTER
with (Math){
   x = cos(3 * PI) + sin (LN10)  
   y = tan(14 * E)
}
```

## Quiz.

<details>
<summary>1. strict mode에서 함수를 일반 함수로서 호출했을 때, this가 있다면 에러를 발생시켜 코드를 보다 안정성있게 짤 수 있도록 도와준다. (O, X)</summary>
<div markdown="1">
<br/>
> 정답 : X
<br/>
this는 undefined에 바인딩 시키고, 에러는 일으키지 않는다.
</div>
</details>
<br/>

2.어떤 일이 일어날까요? 

```js
(function (a) {
  'use strict';
  a = 2

  console.log(a); 
}(1)); // ?
```

# 21장 빌트인 객체

## Discussion

1. BOM이란? 
- 전역 객체가 가지고 있는 표준 빌트인 객체 중 하나.
- Browser Object Model의 약어

|||
|---|---|
| window	| 모든 객체가 소속된 객체이며, 브라우저 창을 의미합니다.|
| document	| 현재문서에 대한 정보를 갖고 있는 객체입니다.|
| history	| 현재의 브라우저가 접근했던 URL history를 제어할 수 있습니다.|
| location	| 문서의 주소와 관련된 객체로 window 객체의 프로퍼티인 동시에 document의 프로퍼티입니다. 이 객체를 이용하여 윈도우의 문서 URL을 변경할 수 있고, 문서의 위치와 관련해서 다양한 정보를 얻을 수 있습니다.|
| screen |	사용자의 디스플레이 화면에 대한 다양한 정보를 갖고있는 객체입니다.|
| navigator	| 실행중인 애플리케이션(브라우저)에 대한 정보를 알 수 있습니다. 크로스 브라우징 이슈를 해결할 때 사용할 수 있습니다.|
- https://itprogramming119.tistory.com/entry/Javascript-BOM%EC%9D%B4%EB%9E%80

## Quiz
1. 호스트 객체는 자바스크립트 실행환경 상관없이 언제나 사용할 수 있다. (O, X)

2. 
```js
window.NaN === Number.NaN // ?
```

3. eval 함수 사용을 지양해야하는 이유 2가지는?

4. 
```js
isNaN(undefined) // ?
```

5. 
```js
isNaN({}) // ?
```

# 22장 this

## Quiz

1. 일반함수 호출에서 콜백함수나 중첩함수의 this도 전역객체로 바인딩되면서 생기는 문제점은? 이를 해결하기 위한 방안 3가지도 말해주세요.

2. (실제 면접 질문) Function.prototype.apply, call, bind의 역할과 각 메서드 간 차이에 대해 설명해주세요.

# 23장 실행 컨텍스트

## Quiz

<details>
<summary>1. 실행 컨텍스트란 무엇인가요? (딱 떨어지게 말할 수 있는 연습) </summary>
<div markdown="1">
<br/>
> 소스코드를 실행하는데 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역 입니다. 

</div>
</details>
<br/>


2.함수 코드의 실행 과정에서, this 바인딩은 호출 시에 결정되기 때문에 런타임 과정에서 결정된다. (O, X)

3.실행 컨텍스트는 실행 컨텍스트 스택과 렉시컬 환경으로 이뤄져있다고 할 수 있는데요, 각각의 역할에 대해 말해주세요.

4.전역 객체도 Object.prototype을 상속받는다. (O, X)

<details>
<summary>5. 렉시컬 환경을 구성하는 2개의 컴포넌트와 각각의 역할은 무엇인가? </summary>
<div markdown="1">
<br/>
> 1. 환경 레코드 : 변수, 함수 등을 등록, 관리
<br/>
> 2. 외부 렉시컬 환경에 대한 참조 : 스코프 체인을 이루는 원리. 함수는 정의된 곳을 상위 스코프로 참조한다.

</div>
</details>
<br/>
