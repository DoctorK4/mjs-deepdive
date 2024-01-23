## 41. 타이머

## 42. 비동기 프로그래밍

> setTimeout의 콜백 함수의 평가와 실행은 OOO이 담당하지만
호출 스케줄링을 위한 타이머 설정과 콜백 함수의 등록은 OOO가 담당한다.  
이를 위해 브라우저 환경은 태스크 큐와 이벤트 루프를 제공한다.  
 
자바스크립트 엔진 / 브라우저, Node.js  
 
> foo가 나온다 O/X
```javascript
function foo() {
  console.log('foo');
}

function bar() {
  console.log('bar');
}

setTimeout(foo, 3 * 1000);

bar();

while (true)
  ;
```

X => 비동기 처리 함수(DOM API, 타이머 함수, HTTP 요청(Ajax))도 call stack에서 실행된다.  
 
## 43. Ajax
 
## 44. REST API
 
> REST API 설계 원칙
 
1. URI는 리소스를 표현해야 한다.
2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.
 
## 45. Promise
> 서버의 응답을 상위 스코프의 변수에 할당해도 기대한 대로 동작하지 않는다.
```javascript
let todos;

const get = url => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      todos = JSON.parse(xhr.response);
    } else {
      console.err(`{xhr.status} ${xhr.statusText}`);
    }
  };
}

get('endpoint/posts/1');
console.log(todos); // undefined
```
xhr.onload에 바인딩한 이벤트 핸들러의 실행 컨텍스트와 상위 스코프의 todos를 가지고 설명 부탁드리겠습니다.  
 
저는 책을 보면서 봐드리겠습니다!! p.845, 846

> 비동기 처리를 위한 콜백 패턴의 문제점 중에서 가장 심각한 것은 에러 처리가 곤란하다는 것이다.
setTimeout 비동기 함수와 실행 컨텍스트, caller 키워드를 가지고 설명 부탁드립니다.  
 
저는 책을 보면서 봐드리겠습니다.^^ p.848, 849
 
> fetch함수가 반환하는 프로미스 특징
 
404 Not Found나 500 Internal Server Error와 같은 HTTP에러가 발생해도 에러를 reject하지 않고 불리언 타입의 ok상태를 false로 설정한 Respons객체를 resolve한다. 오프라인 등의 네트워크 장애나 CORS 에러에 의해 요청이 완료되지 못한 경우에만 프로미스를 reject한다.  
 
> fetch함수에서 더 명시적으로 에러를 처리하고 싶다면?  
 
resolve한 불리언 타입 ok의 상태를 사용합니다.  
 


## 46. 제너레이터와 async/await
 
## 47. 에러 처리

## 48. 모듈

## 49. Babel과 Webpack을 이용한 ES6+/ES.NEXT 개발 환경 구축
