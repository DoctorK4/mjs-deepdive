# 42장. 비동기 프로그래밍

## 42.1 동기 처리와 비동기 처리

자바스크립트 엔진은 싱글 스레드 언어로 한 번에 하나의 태스크만 실행 가능해서 처리 시간이 긴 태스크 실행의 경우 블로킹(blocking, 작업 중단)이 발생한다.

- 동기 처리(Synchronous)
: 현재 실행 중인 태스크가 종료할 때까지 다음에 실행될 태스크가 대기하는 방식

  - 순서 보장
  - 블로킹 발생

- 비동기 처리(Asynchronous)
: 현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방식
Ex. 타이머 함수인 setTimeout과 setInterval, HTTP 요청, 이벤트 핸들러

  - 블로킹 발생 X
  - 순서 보장 X
  - 콜백 헬을 발생시켜 가동성이 떨어짐
  - 실행 중 발생한 에러 예외 처리 어려움
  - 한 번에 다량의 비동기 처리가 어려움

## 42.2 이벤트 루프와 태스크 큐

- 콜 스택(Call Stack)
: 실행된 코드의 환경을 저장하는 자료구조인 실행 컨텍스트 스택으로 함수 호출 시 함수 실행 컨텍스트가 순차적으로 푸시되고, 가장 위에 있는 함수를 가장 먼저 처리(LIFO)한다.

- 힙(Heap)
: 객체는 메모리 공간의 크기가 정해져있지 않고 런타임에 결정(동적 할당)하므로 객체가 저장되는 메모리 공간인 힙은 구조화 되어있지 않다.

  - 콜 스택과 힙으로 구성된 자바스크립트 엔진은 태스크 요청을 받으면 콜 스택을 통해 순차적으로 실행하고, 비동기 처리에서 소스코드의 평가와 실행을 제외한 모든 처리는 자바스크립트 엔진을 구동하는 환경인 브라우저 또는 Node.js가 담당한다. 

  - 브라우저는 태스크 큐와 이벤트 루프를 제공한다.

- 이벤트 루프(Event Loop)
: call stack이 다 비워지면 callback queue에 존재하는 함수를 순차적으로 call stack으로 이동시키는 역할

- 태스크 큐(Task Queue/Event Queue/Callback Queue)
: setTimeout이나 setInterval과 같은 비동기 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역으로 call stack과 다르게 가장 먼저 들어온 함수를 가장 먼저 처리(FIFO)한다.

자바스크립트 엔진은 싱글 스레드로 동작하지만 브라우저는 멀티 스레드로 동작한다. 

- Web API
: 브라우저에서 제공하는 API로 DOM API와 타이머 함수, HTTP 요청(Ajax) 등과 같은 비동기 처리를 포함하고 콜스택에서 실행된 비동기 함수는 Web API가 호출하면 Web API는 콜백 함수를 태스크 큐에 담아 보관한다.

Q. 이벤트 루프가 실행되는 시점은?

<details>

<summary>A</summary> 

이벤트 루프(Event Loop)는 **call stack이 다 비워지면** callback queue에 존재하는 함수를 순차적으로 call stack으로 이동시킨다.

</details>

# 43장 Ajax

## 43.1 Ajax란?
Ajax(Asynchronous JavaScript and XML)는 웹페이지의 전체 페이지를 새로 고치지 않고, 필요한 데이터만 비동기 방식으로 전송받아 동적으로 갱신하여 렌더링하는 방식

- Ajax의 장점
  - 불필요한 데이터 통신 발생 X
  - 화면이 순간적으로 깜박이는 현상 발생 X
  - 비동기 방식으로 동작하기 때문에 서버에 요청을 보낸 뒤 블로킹 발생 X

## 43.2 JSON
- JSON(JavaScript Object Notation)은 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷이다.

### 43.2.1 JSON 표기 방식
- 키(key)와 값(value)으로 구성
- 키(key)는 반드시 큰따옴표로 묶어야한다.

### 43.2.2 JSON.stringify
- JSON.stringify 메서드는 객체(배열도 포함)를 JSON 포맷의 문자열로 변환한다.

### 43.2.3 JSON.parse
- JSON.parse 메서드는 JSON 포맷의 문자열을 객체로 변환한다.
- 배열이 JSON 포맷에 문자열로 변환되어 있는 경우에는 배열 객체로 변환하고, 배열의 요소가 객체인 경우 배열의 요소까지 객체로 변환한다. 

## 43.3 XMLHttpRequest
- XMLHttpRequest 객체는 Web API로 자바스크립트에서 HTTP 요청 전송과 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공한다. 

### 43.3.1 XMLHttpRequest 객체 생성
- XMLHttpRequest 생성자 함수를 호출하여 생성
- 브라우저 환경에서만 실행

### 43.3.2 XMLHttpRequest 객체의 프로퍼티와 메서드
- XMLHttpRequest 객체의 프로토타입 프로퍼티
  - readyState: HTTP 요청의 현재 상태를 나타내는 정수
    1. UNSET: 0 
    => XMLHttpRequest 객체 생성
    2. OPEND: 1 
    => open() 메서드 실행
    3. HEADERS_RECEIVED: 2 
    => 모든 요청에 대한 응답 도착
    4. LOADING: 3 
    => 요청한 데이터를 처리
    5. DONE: 4 
    => 요청한 데이터의 처리가 완료되어 응답할 준비 완료
  - status: HTTP 요청에 대한 응답 상태(HTTP 상태 코드)를 나타내는 정수(응답 상태 코드)
    ex
    - 200 : HTTP 요청에 대한 응답 정상
    - 404 : HTTP 요청에 대한 응답 에러
  - statusText: HTTP 요청에 대한 응답 메시지를 나타내는 문자열
  - responseType: HTTP 응답 타입
  - response: HTTP 요청에 대한 응답 몸체, responseType에 따라 타입이 다름

- XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티

|이벤트 핸들러 프로퍼티|설명|
|:---|:---|
|onreadystatechange|readyState 프로퍼티 값이 변경된 경우|
|onerror|HTTP 요청에 에러가 발생한 경우|
|onload|HTTP 요청 시간이 초과한 경우|

- XMLHttpRequest 객체의 메서드

|메서드|설명|
|:---|:---|
|open|HTTP 요청 초기화|
|send|HTTP 요청 전송|
|abort|이미 전송된 HTTP 요청 중단|
|setRequestHeader|특정 HTTP 요청 헤더의 값을 설정|

- XMLHttpRequest 객체의 정적 프로퍼티

|정적 프로퍼티|설명|
|:---|:---|
|DONE: 4|서버 응답 완료|

### 43.3.3 HTTP 요청 전송
1. XMLHttpRequest.prototype.open 메서드로 HTTP 요청을 초기화
문법
```
xhr.open(method, url[, async])
```
- method: HTTP 요청 메서드를 사용해 CRUD 구현

|HTTP 요청 메서드|목적|페이로드(전송되는 데이터)|
|:---|:---|:---|
|GET|리소스 취득|X|
|POST|리소스 생성|O|
|PUT|리소스 전체 교체|O|
|PATCH|리소스 일부 교체|O|
|DELETE|리소스 삭제|X|

- url: HTTP 요청을 전송할 URL
- async: 비동기 요청 여부(옵션으로 기본값은 true, 비동기 방식으로 동작)

2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 특정 HTTP 요청의 헤더 값을 설정
-HTTP 요청 헤더

Content-type
|MIME 타입|content-type|목적|
|:---|:---|:---|
|text|text/plain|텍스트 데이터 전송|
|application|application/json|json 데이터 전송|
|multipart|multipart/formed-data|파일 데이터 전송|

Accept
: HTTP 클라이언트가 서버에 요청할 때 서버가 응답할 데이터의 MIME 타입을 Accept로 지정 가능(Accept 헤더를 설정하지 않으면 send 메서드가 호출될 때 Accept 헤더가 */*으로 전송)

3. XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송
- GET 요청 메서드의 경우 데이터를 URL의 일부분인 쿼리 문자열로 서버에 전송
- POST 요청 메서드의 경우 데이터(payload)를 요청 몸체(body)에 담아 전송
- payload가 객체인 경우 JSONstringify  메서드를 사용하여 직렬화 한 후 전달!!
- HTTP 요청 메서드가 GET인 경우 send 메서드에 페이로드로 전달한 인수는 무시되고 요청 몸체는 null로 설정된다. 

### 43.3.4 HTTP 응답 처리
- onreadystatechange 이벤트 핸들러 프로퍼티에 할당한 이벤트 핸들러는 HTTP 요청의 현재 상태를 나타내는 xhr.readyState가 XMLHhttpRequest.DONE인지 확인하여 서버의 응답 완료 여부 확인하여 xhr.status가 200인지 아닌지로 정상 처리와 에러 처리 구분, xhr.status가 200이면 요청에 대한 응답 몸체를 나타내 xhr.response에서 서버가 전송한 데이터 취득, 아니면 에러 처리.

- load 이벤트 핸들러 프로퍼티에 할당한 이벤트 핸들러는 HTTP 요청이 성공적으로 완료된 경우 발생하므로 xhr.readyState가 XMLHttpRequest.DONE 인지 서버의 응답 여부를 확인 할 필요 없이 xhr.status 프로퍼티 값만 확인 하면 됨.

Q. Ajax의 장점은?

<details>

<summary>A</summary> 

1. 불필요한 데이터 통신 발생 X
2. 화면이 순간적으로 깜박이는 현상 발생 X
3. 비동기 방식으로 동작하기 때문에 서버에 요청을 보낸 뒤 블로킹 발생 X

</details>

Q.
1. Ajax는 특정 함수다. (O/X)
2. Ajax는 라이브러리다. (O/X)
3. Ajax는 프레임워크다. (O/X)

<details>

<summary>A</summary> 

1. X
2. X
3. X

=> Ajax는 특정 함수도 라이브러리도, 프레임워크도 아닌 접근법이며 비동기 통신 방식이다.

</details>

# 44장 REST API
- REST : HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
- REST API: REST를 기반으로 서비스 API를 구현한 것을 의미
- RESTful: REST 기본 원칙을 성실히 지킨 서비스

## 44.1 REST API의 구성
|구성 요소|내용|표현방법|
|:---|:---|:---|
|자원(resource)|자원|URI(엔드포인트)|
|행위(verb)|자원에 대한 행위|HTTP 요청 메서드|
|표현(representation)|자원에 대한 행위의 구체적 내용|페이로드|

## 44.2 REST API 설계 원칙
1. URI는 리소스를 표현
: 리소스를 식별할 수 있는 이름은 동사 보다는 명사 사용

2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현
: 리소스의 행위에 대한 정의

|HTTP 요청 메서드|종류|목적|페이로드|
|:---|:---|:---|:---|
|GET|index/retrieve|모든/특정 리소스 취득|X|
|POST|create|리소스 생성|O|
|PUT|replace|리소스 전체 교체|O|
|PATCH|modify|리소스 일부 수정|O|
|DELETE|delete|모든/특정 리소스 삭제|X|

# 45장 프로미스
프로미스: 비동기 처리 상태와 처리 결과를 관리하는 객체

## 45.1 비동기 처리를 위한 콜백 패턴의 단점
### 45.1.1 콜백 헬
: 콜백 함수 호출이 중첩되어 코드의 흐름이 꼬이고 가독성이 나빠지는 현상

### 45.1.2 에러 처리의 한계
: 에러는 콜스택 아래로 전파되기 때문에 setTimeout과 같은 비동기 처리를 위한 콜백 패턴은 에러 처리가 곤란하다.

## 45.2 프로미스의 생성
- Promise 생성자 함수를 new 연산자와 함께 사용하면 프로미스(promise 객체)를 생성
- Promise 생성자 함수는 resolve(성공)와 reject(실패) 함수를 인수로 가진 콜백 함수를 인수로 전달받는다.

- state

|프로미스 상태 정보|의미|상태 변경 조건|
|:---|:---|:---|
|pending|비동기 처리가 아직 수행되지 않은 대기 상태|프로미스가 생성된 직후 기본 상태|
|fulfilled|비동기 처리가 수행된 이행 상태|resolve 함수 호출|
|rejected|비동기 처리가 수행된 실패 상태|reject 함수 호출|


## 45.3 프로미스의 후속 처리 메서드
- 프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드(then, catch, finally)에 인수로 전달한 콜백 함수가 선택적으로 호출되고 

### 45.3.1 Promise.prototype.then
- Promise.prototype.then(func1, func2)
- 두 개의 콜백 함수를 인수로 전달받음

  - func1: 프로미스가 이행 상태 fulfilled
  - func2: 프로미스가 실패 상태 rejected

### 45.3.2 Promise.prototype.catch
- Promise.prototype.catch(func)
- rejected 상태인 경우 위의 함수들 중단하고 바로 실행

### 45.3.3. Promise.prototype.finally
- Promise.prototype.finally(func)
- 프로미스의 상태와 상관없이 무조건 한 번 호출되므로 공통적으로 수행해야 할 처리 내용에 유용


## 45.4 프로미스의 에러 처리
- 비동기 처리 결과에 대한 후속 처리는 프로미스가 제공하는 후속처리 메서드(then, catch, finally)를 사용하여 수행
- then 메서드의 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못하고 코드가 복잡해져서 가독성이 좋지 않음
- catch 메서드를 사용하는 것이 가독성이 좋고 명확

## 45.5 프로미스 체이닝
- 후속 처리 메서드는 언제나 프로미스를 반환하므로 연속적으로 호출 가능한데 이를 프로미스 체이닝이라 하며, 이를 이용해 결과를 변경하고 에러처리도 가능
- 프로미스도 콜백 패턴을 사용하므로 가독성이 좋지 않아 async/await를 통해 해결 가능

## 45.6 프로미스의 정적 메서드
: Promise 객체는 5가지 정적 메서드 제공

### 45.6.1 Promise.resolve / Promise.reject
- Promise.resolve: 인수로 전달받은 값을 resolve하는 프로미스 생성
- Promise.reject: 인수로 전달받은 값을 reject하는 프로미스 생성

### 45.6.2 Promise.all
- 여러개의 비동기 처리를 모두 병렬 처리
- 프로미스들을 배열로 담아 인자로 전달하고 모든 프로미스가 fulfilled 상태가 되면 값을 배열로 저장해 새로운 프로미스를 반환

1. 순서대로 실행되지만 앞의 함수를 기다리지 않음
2. 처리 순서 보장
3. 하나라도 rejected 상태가 되면 그 즉시 종료

이러한 특징을 이용해 하나라도 누락되면 페이지를 보여주면 안될 때 사용할 수 있다.

### 45.6.3 Promise.race
- 프로미스들을 배열로 담아 인자로 전달하고 가장 먼저 fulfilled 상태가 된 프로미스의 처리 결과를 resolve 하는 새로운 프로미스를 반환
- 하나라도 rejected 상태가 되면 그 즉시 종료

### 45.6.4 Promise.allSettled
- 프로미스들을 배열로 담아 인자로 전달하고 모든 프로미스가 settled 상태(비동기 처리가 수행된 상태, fulfilled 또는 rejected)가 되면 값을 배열로 저장해 새로운 프로미스를 반환
  - fulfilled: status 프로퍼티, value 프로퍼티
  - rejected: status 프로퍼티, resason 프로퍼티

## 45.7 마이크로태스크 큐
- 마이크로태스크 큐는 태스크큐보다 우선순위가 높다.
- Microtask queue -> Animaion Frames -> Macrotask Queue
  - Microtast Queue : promise(then, catch, finally), async/await, Object.observe, process(MutationObserver)
  - Anumation Frames : requestAnimationFrame
  - Macrotask Queue : DOM, setTImeout,setInterval

## 45.8 fetch
- XMLHttpRequest. 객체와 마찬가지로 HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API다.
- fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환하므로 프로미스의 후속 처리 메서드인 then, catch, finally를 사용하여 resolve한 Response 객체를 전달받을 수 있다.

1. GET 요청
2. POST
3. PATCH
4. DELETE

Q. 아래의 코드는 catch 블럭에서 에러를 캐치하지 못 한다. 그 이유는? ㅇㅅㅇ????
```
try {
  setTimeout(() => { throw new Error('ERROR!!'); }, 1000);
} catch(e) {
  console.error(e);
}
```

<details>

<summary>A</summary> 

setTimeout은 비동기 함수이므로 콜백 함수가 호출되는 것을 기다리지 않고 실행이 완료되면 그 즉시 콜 스택에서 팝된다. 그리고 태스크 큐에 푸쉬된 콜백 함수는 이벤트 루프에 의해 콜스택으로 푸쉬되는데 이 시점이 콜스택이 비워져 있을때이고, 에러는 호출자 방향으로(콜스택 아래로) 전파되기 때문에 에러가 발생해도 throw new Error 컨텍스트 아래엔 어떠한 컨텍스트도 없기 때문에 setTimeout 함수의 콜백 함수가 발생시킨 에러는 catch 블록에서 처리되지 않는다.

</details>

Q. 실행 결과는?
```
console.log('Start!')

setTimeout(() => {
  console.log('Timeout!')
}, 0);

Promise.resolve('Promise!')
  .then(res => console.log(res));

console.log('End!')
```

<details>

<summary>A</summary> 

Start!
End!
Promise!
Timeout!

</details>

Q. 실행 결과는?
```
const one = () => Promise.resolve('One!')

async function myfunc() {
  console.log('In function!');
  const res = await one();
  console.log(res);
}

console.log('Before function!');
myFunc();
console.log('After function!');
```

<details>

<summary>A</summary> 

Before function!
In function!
After function!
One!

</details>

출처: https://velog.io/@titu/JavaScript-Task-Queue%EB%A7%90%EA%B3%A0-%EB%8B%A4%EB%A5%B8-%ED%81%90%EA%B0%80-%EB%8D%94-%EC%9E%88%EB%8B%A4%EA%B3%A0-MicroTask-Queue-Animation-Frames-Render-Queue

# 46장 제너레이터와 async/await

## 46.1 제너레이터란?
- ES6에서 도입된 제너레이터는(generator)는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수

1. 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다. 
2. 함수 호출자가 함수의 상태를 주고받을 수 있다. 
3. 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환한다. 

## 46.2 제너레이터 함수의 정의
- function* 키워드로 선언
- 하나 이상의 yield 표현식을 포함
- 화살표 함수 정의 불가
- new 연산자와 함께 생성자 함수로 호출 불가

## 46.3 제너레이터 객체
- 제너레이터 객체는 Symbol.iterator 메서드를 상속받는 이터러블이면서 value, done 프로퍼티를 갖는 이터레이터 리절트  객체를 반환하는 next 메서드를 소유하는 이터레이터이므로 Symbol.iterator 메서드를 호출해서 별도로 이터레이터를 생성할 필요가 없다.
- 제너레이터 객체는 next 메서드를 갖는 이터레이터이지만 이터레이터에는 없는 return, throw  메서드를 갖는다.

|매서드 호출|value property|done property|
|---|:---|---|
|next|yeld 표현식까지 실행하고 yield된 값|false|
|return|인수로 전달받은 값|true|
|throw|인수로 전달받은 에러를 발생시키고 undefined|true|

## 46.4 제너레이터의 일시 중지와 재개
- yield 키워드는 제너레이터 함수의 실행을 일시 중지시키거나 yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다. 
- next 메서드를 호출하면 yield 표현식까지 실행되고 일시 중지 된다. 이때 함수의 제어권이 호출자로 양도된다.
- next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 yield 표현식에서 yield된 값이 할당되고, done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 불리언 값이 할당된다. 

## 46.5 제너레이터의 활용
### 46.5.1 이터러블의 구현 

### 46.5.2 비동기 처리
- 제너레이트 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있으므로 프로미스의 후속처리 메서드 없이 비동기 처리 처럼 구현할 수 있다.

## 46.6 async/await
- 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 구현 가능

### 46.6.1 async 함수
- await 키워드는 반드시 async 함수 내부에서 사용
- async 함수를 사용해 정의하며 언제나 프로미스를 반환
- 클래스의 constructor 메서드는 인스턴스를 반환하지만 async 함수는 프로미스를 반환하므로 클래스의 constructor 메서드는 async의 메서드가 될 수 없다.

### 46.6.2 await 키워드
- await 키워드는 프로미스가 settled 상태(비동기 처리가 수행된 상태)가 되면 프로미스가 resolve한 처리 결과를 반환
- await 키워드는 반드시 프로미스 앞에서 사용

### 46.6.3 에러 처리
- 에러는 호출자 방향으로 전파되기 때문에 비동기 처리를 위한 콜백 패턴의 에러 처리는 어렵다.
- 해결 방법: async / await 사용

# 47장 에러 처리
## 47.1 에러 처리(Error Handling)의 필요성
- 자바스크립트는 런타임에서 에러나 예외적인 상황에 대응하지 않으면 이후 코드는 실행되지 않고 중단되어 사용자가 불편을 느낄 수 있다.
- 언제나 에러나 예외적인 상황이 발생할 수 있다는 것을 전재하고 이에 대응하는 코드를 작성하는 것이 중요하다.

## 47.2 try…catch…finally 문
- try: try 코드 블록 내에서 에러가 발생하면 catch문의 변수에 전달되고 catch 코드 블록 실행
- catch: try 코드 블록에서 포함된 문 중에서 에러가 발생하면 생성되고 catch 코드 블록에서만 유효
- finally: 에러 발생과 상관없이 반드시 한 번 실행

## 47.3 Error 객체
- Error 생성자 함수는 에러 객체를 생성한다. Error 생성자 함수에는 에러를 상세히 설명하는 에러 메시지를 인수로 전달 가능하다.

|생성자 함수|인스턴스|
|:---|:---|
|Error|일반적인 에러 객체|
|SyntaxError|자바스크립트 문법에 맞지 않는 문을 해석할 때 발생하는 에러 객체|
|ReferenceError|참조할 수 없는 식별자를 참조했을 때 발생하는 에러 객체|
|TypeError|피연산자 또는 인수의 데이터 타입이 유효하지 않을 때 발생하는 에러 객체|
|RangeError|숫자값의 허용 범위를 벗어났을 때 발생하는 에러 객체|
|URIError|encodeURI 또는 decodeURI 함수에 부적절한 인수를 전달했을 때 발생하는 에러 객체|
|EvalError|eval 함수에서 발생하는 에러 객체|

## 47.4 throw 문
- Error 생성자 함수로 에러 객체를 생성한다고 에러가 발생하는 것은 아니므로 에러를 발생시키려면 try 코드 블록에서 throw 문으로 에러 객체를 던져야 한다.

## 47.5 에러의 전파
- 에러는 호출자(caller) 방향으로 전파한다.

# 48장 모듈
## 48.1 모듈의 일반적 의미
- 모듈(module)이란 기능별로 분리되어 애플리케이션을 구성하는 개별적 요소로서 필요에 따라 다른 모듈에 의해 재사용 가능한 코드 조각
- 자신만의 파일 스코프(모듈 스코프)를 갖는 모듈의 자산(모듈에 포함된 변수, 함수, 객체 등)은 기본적으로 비공개 상태로 캡슐화되어 다른 모듈에서 접근 불가
- 모듈은 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개(export)가 가능
- export된 모듈의 자산을 사용하는 모듈을 모듈 사용자라하며 이는 모듈이 공개(export)한 자산 중 일부 또는 전체를 선택해 자신의 스코프 내로 불러들여(import) 재사용 가능

## 48.2 자바스크립트와 모듈
- 자바스크립트 런타임 환경인 Node.js는 모듈 시스템은 기본적으로 CommomJS 사양을 따른다. 따라서 Node.js 환경에서는 파일별로 독립적인 파일 스코프(모듈 스코프)를 갖는다.

## 48.3 ES6 모듈(ESM)
- ES6 모듈(ESM)은 script 태그에 type=“module” 어트리뷰트를 추가하면 로드된 자바스크립트 파일을 모듈로서 동작한다. (기본적으로 strict mode 적용)

### 48.3.1 모듈 스코프
- ESM은 독자적이 모듈 스코프를 가짐
- 모듈 내에서 선언한 변수는 전역 변수도 window 객체의 프로퍼티도 아니다.
- 모듈 내에 선언한 식별자는 모듈 외부에서 참조 불가

### 48.3.2 export 키워드
- export 키워드를 사용하면 모듈 내에 선언된 식별자를 외부에 공개하여 재사용할 수 있다. 

### 48.3.3 import 키워드
- import 키워드를 사용하여 다른 모듈에서 exprot한 식별자를 자신의 모듈 스코프 내부로 로드한다.
  - export한 식별자 이름을 변경하여 import 가능
  - 하나의 값만 export하는 경우 default 키워드를 사용하여 export한다.
    - var, let, const 키워드 사용 불가
    - {} 없이 임의의 이름으로 import

# 49장 Babel과 Webpack을 이용한 ES6+/ES.NEXT 개발 환경 구축
## 49.1 Babel
Babel은 ES6+/ES.NEXT로 구현된 최신 사양의 소스코드를 IE 같은 구형 브라우저에서도 동작하는 ES5 사양의 소스코드로 변환(트랜스파일링)이 가능하다. 

## 49.2 Webpack
Webpack은 의존 관계에 있는 자바스크립트, CSS, 이미지 등의 리소스들을 하나(또는 여러 개)의 파일로 번들링하는 모듈 번들러다.
Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요 없다.
여러 개의 자바스크립트 파일을 하나로 번들링하므로 HTML 파일에서 script 태그로 여러 개의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다. 