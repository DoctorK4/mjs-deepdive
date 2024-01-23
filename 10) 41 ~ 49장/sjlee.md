# 41. 타이머

### setTimeout

- delay 시간 뒤에 콜백 단 한 번 동작

### setInterval

- delay 시간 간격으로 콜백 반복 동작

### 자바스크립트는 싱글스레드로 동작, 위의 타이머 API는 비동기로 처리된다.

> delay시간이 보장되지 않음  
> delay시간은 태스크 큐에 콜백을 등록하는 시간을 지연할 뿐!  
> 둘 다 고유한 타이머 Id를 반환함  
> ex) Browser에서는 number, Node에서는 object

## Debounce & Throttle

- 짧은 시간내의 과도한 이벤트 발생을 방지할 수 있는 프로그래밍 기법

```js
// 마지막 한 번만 실행
const debounce = (callback, delay) => {
  let timerId;
  return (event) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

// 설정한 시간만큼만 실행
const throttle = (callback, delay) => {
  let timerId;
  return (event) => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};
```
# 42. 비동기 프로그래밍

### 실행 컨텍스트 스택 = 콜스택

- 자바스크립트는 단 하나의 실행 컨택스트 스택을 갖는다.
- 최상위의 스택이 종료되어 콜스택에서 제거되기전까지는 다른 어떤 태스크도 실행하지 않는다.
- 그래서 비동기 함수가 실행이 되면 뒤의 태스크들이 블로킹되는 현상이 발생한다.

> => 이 때, 이벤트루프가 자바스크립트의 동시성을 지원해준다.  
> ![ㅇㅇ](https://iamsjy17.github.io/assets/img/howtoworksjs/eventloop3.png)

> QUIZ  
> [1] 이벤트루프란 무엇인가요?  
> [2] 타이머를 설정하고 태스크 큐에 푸쉬하는 역할은 누가하는가요?

# 43. Ajax

### Ajax는 XMLHttpRequest를 기반으로 동작한다.

> QUIZ  
> [1] Ajax가 나오게 된 배경은?

#

# 44. REST API

- 자원: URI
- 행위: METHOD
- 표현: PAYLOAD

> QUIZ  
> [1] POST, PUT, PATCH의 차이는?

#

# 45. 프로미스

- ES6에서 비동기처리를 위해 도입된 표준 빌트인 객체
- 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다
- resolve, reject
- then, catch, finally

### 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없고, 상위 스코프의 변수에 할당할 수 없다. 따라서 비동기 함수의 처리 결과는 비동기 함수 내부에서 수행해야한다.

### 프로스의 상태정보

- Pending
- fullfilled
- rejected
- 비동기처리 성공시: resolve
- 비동기처리 실패시: reject

### 마이크로태스크큐

- 태스크큐보다 우선 순위가 높다.

### Fetch

- Promise를 지원하는 HTTP 요청기능
- 에러처리에 주의할 것

> QUIZ  
> [1] 에러는 콜스택의 위방향으로 전파되지 않는다 (O/X)  
> [2] Promise 결과를 .then으로 받을시에 reject된 결과를 받을 수 있다. (O/X)  
> [3] Promise.all과 .allSettled의 차이는?  
> [4] Fetch함수의 단점은?


# 46. 제너레이터와 async, await

- 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 함수
- yield로 호출자가 실행의 제어권을 가질 수 있다.
- 함수 호출시, 제너레이터 객체가 반환된다. {value, done}

### async / await

- ES8에서 도입된 비동기 처리 방식

# 47. 에러처리

- throw된 에러를 처리하지 않으면 프로그램은 종료된다.
- 에러는 호출자에게 전파된다.

**다들 에러처리 어떻게 하시나요??**

> QUIZ  
> [1] setTimeout과 같은 타이머 함수는 에러처리가 가능하다. (O/X)

# 48. 모듈

- 어플리케이션을 구성하는 개별적 요소
- 자신만의 파일 스코프를 가짐

> QUIZ  
> [1] import, export에 대해 말해주세요.
> [2] html script type 애트리뷰트로 module을 설정하면 효과는?

# 49. Webpack, Babel

- IE 11의 ES6 지원률은 약 11%
- 구형 브라우저에서 문제없이 동작시키기 위한 모듈 로더

### 웹팩

- Js, css, 이미지 등의 리소스들을 하나의 파일로 번들링하는 모듈 번들러
- 하나이기에 번거로움이 사라진다!

