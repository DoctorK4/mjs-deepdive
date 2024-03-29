# 41장 타이머

## 41-1. 호출 스케줄링
- 함수를 명시적으로 호출하지 않고 일정 시간이 경과된 이후에 호출되도록 함수호출을 예약하려면 타이머 함수를 사용한다. 이를 호출 스케줄링이라 한다.
- setTimeout, setInterval => 비동기 처리 방식으로 동작
- clearTimeout, clearInterval
- 타이머 함수는 ECMA script 사양에 정의된 빌트인 함수가 아니다.
- 하지만 브라우저 환경과 Node.js 환경에서 타이머 함수를 제공한다. 타이머 함수는 호스트 객체이다.

## 41-2. 타이머 함수 

### 41.2.1 setTimeout / clearTimeout
- setTimeOut(func, [, delay, param1, param2....])
- 두 번째 인수로 전달받은 시간 이후 단 한번 동작하는 타이머를 생성한다.
- delay 인수 전달이 생략되면 0이 지정된다.
- 시간이 설정된 타이머가 만료되어도 즉시 호출을 보장하지 않는다. 태스크 큐에 콜백함수를 등록하는 시간을 지연한 것 뿐이다.
- param : 콜백함수에 전달할 인수를 전달할 수 있다.
- setTimeOut는 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
- 반환한 타이머 id는 브라우저의 경우 숫자, Node.js의 경우 객체이다.
- 반환한 타이머 id를 clearTimeout 함수의 인수로 전달하여 타이머를 취소할 수 있다. (= 호출 스케줄링을 취소한다.)

### 41.2.2 setInterval / clearInterval
- 두 번째 인수로 전달받은 시간으로 반복 동작하는 타이머를 생성한다.
- setInterval 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
- 반환한 타이머 id는 브라우저의 경우 숫자, Node.js의 경우 객체이다.
- clearInterval 함수에 인수로 타이머 id를 전달하여 호출스케줄링을 취소할 수 있다.

## 41-3. 디바운스와 스로틀
- scroll, resize, mousemove와 같은 이벤트는 짧은 시간 간격으로 연속해서 발생한다. 
- 이러한 짧은 간격에 바인딩한 이벤트 핸들러는 성능에 문제를 일으킬 수 있으므로 디바운스와 스로틀이라는 기술을 통해 짧은 시간 연속해서 발생하는 이벤트를 그룹화하여 과도한 이벤트 핸들러의 호출을 방지하는 프로그래밍 기법이다. 
- 이벤트 처리시 매우 유용하다.

### 41.3.1 디바운스
- 짧은 시간 가격으로 이벤트가 연속해서 발생하면 이벤트 핸들러를 호출하지 않다가 일정 시간이 경과한 후에 이벤트 핸들러가 한번만 호출되도록 한다.
- 짧은 시간 간격으로 발생하는 이벤트를 그룹화하여 마지막 한번만 이벤트 핸들러가 호출되게끔 한다.
- 인수로 전달한 시간보다 짧은 간격으로 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정한다.
- 그러다 delay 시간보다 이벤트가 더이상 발생하지 않으면 한번만 호출된다.
- 자주 사용되는 Case
  - resize 이벤트 처리
  - 입력 필드 자동완성 UI
  - 버튼 중복 클릭 방지 처리 
- 실무에서는 Underscore나 Lodash 라이브러리의 debounce 함수 사용을 권장한다.

### 41.3.2 스로틀
- 짧은 시간 간격으로 이벤트가 연속해서 발생하더라도 일정 시간 간격으로 이벤트 핸들러가 최대 한번만 호출되도록 한다.
- 시간단위로 이벤트 핸들러가 호출될 수 있도록 호출 주기를 만든다.
- 인수로 전달한 delay 시간이 경과해야 이벤트 핸들러가 동작하게끔 타이머를 설정한다. delay 시간 간격으로 콜백 함수가 호출된다.
- 자주 사용되는 Case
  - scroll 이벤트 처리
  - 무한 스크롤 UI 구현
- 실무에서는 Underscore나 Lodash 라이브러리의 throttle 함수 사용을 권장한다.

# 42장 비동기 프로그래밍

## 42-1. 동기 처리와 비동기 처리
- 자바스크립트는 단 하나의 실행 컨텍스트 스택을 갖는다. 동시에 2개 이상의 함수를 실행할 수 없다는 의미이다.
  - 싱글 스레드 방식으로 동작한다.
  - 시간이 걸리는 태스크를 실행하면 블로킹이 발생한다.
- 동기 처리 : 실행 중인 태스크가 종료될 때까지 다음에 실행될 태스크가 대기하는 방식
  - 태스크를 순서대로 하나씩 처리한다.
  - 실행순서가 보장된다.
  - 앞선 태스크가 종료될 때까지 이후 태스크들이 블로킹되는 단점이 있다. 
- 비동기 처리 : 현재 실행중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 바로 실행하는 방식
  - 블로킹이 발생하지 않는다.
  - 태스크의 실행 순서가 보장되지 않는다.
- 비동기 처리를 수행하는 비동기 함수는 콜백패턴을 사용한다.
  - 그러나, 콜백 패턴은 가독성을 해치고 에러의 예외 처리를 어렵게 하며, 여러 개의 비동기 처리를 한번에 처리하는데 한계가 있다.
- 타이머 함수, HTTP 요청, 이벤트 핸들러는 비동기 처리 방식으로 동작한다. 
  - 커스텀 이벤트를 디스패치하거나, click, blur, focus 메서드 등을 호출하면 태스크 큐를 거치지 않고 즉시 호출된다.(동기 처리 방식으로 동작)

## 42-2. 이벤트 루프와 태스크 큐
- 브라우저에 내장되어있는 기능 중 하나인 이벤트 루프는 자바스크립트의 동시성을 지원한다.
  - 많은 기능이 동시에 처리되는것처럼 우리가 느끼는 이유
- 자바스크립트 엔진의 2개 영역
  - 콜스택 : 실행컨텍스트 스택, 함수를 호출하면 순차적으로 콜스택에 푸시되어 실행된다.
  - 힙 : 객체가 저장되는 메모리 공간, 실행 컨텍스트는 힙에 저장된 객체를 참조한다. 객체는 할당해야하는 메모리 크기를 런타임에 결정해야하기 때문에 구조화되어있지 않다는 특징이 있다.
- 비동기 처리 시의 담당 영역
  - JS 엔진 : 소스코드 평가와 실행
  - 브라우저 또는 Node.js : 호출 스케줄링을 위한 타이머 설정, 태스크 큐에 콜백함수의 등록 등
- 브라우저에서는 태스크 큐와 이벤트 루프를 제공한다.
  - 태스크 큐 (콜백큐, 이벤트큐): 비동기 함수의 콜백함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역.
  - 마이크로태스크 큐 : 프로미스의 후속 처리 메서드의 콜백 함수가 일시적을 보관되는 영역.
  - 이벤트 루프 : 콜스택에 실행중인 컨텍스트가 있는지 그리고 태스크 큐에 대기중인 함수가 있는지 반복해서 확인하는 역할을 함. 콜스택이 비어있고 태스크 큐에 대기중인 함수가 있다면 이벤트루프는 순차적으로 태스크 큐에 대기중인 함수를 콜스택으로 이동시킨다.
- 자바스크립트 엔진은 싱글 스레드로 동작하지만, 브라우저는 멀티 스레드로 동작한다.
- 브라우저는 렌더링 엔진과 Web API를 제공한다. 
  - Web API : 브라우저 제공 API로서, DOM API와 타이머 함수, HTTP 요청과 같은 비동기 처리를 포함한다.

# 43장 Ajax

## 43-1. Ajax란?
- 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식
- Web API인 XMLHttpRequest 객체를 기반으로 동작한다.
- XMLHttpRequest는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공한다.

### 전통적인 웹페이지 동작 방식
- 완전한 HTML을 서버로부터 전송받아 웹페이지 전체를 다시 렌더링하는 방식
- 화면이 전환되면 서버로부터 새로운 HTML을 전송받아 웹페이지 전체를 처음부터 다시 렌더링했음
- **단점**
  1. 변경할 필요가 없는 부분까지 포함된 완전한 HTML을 매번 다시 전송받기 때문에 불필요한 데이터 통신이 발생한다.
  2. 변경할 필요없는 부분까지 다시 렌더링하기 때문에 화면이 순간적으로 다시 깜박이는 현상이 발생한다.
  3. 동기방식으로 동작하기 때문에 서버로부터 응답이 있을 때까지 다음 처리는 블로킹된다.

#### Ajax의 등장으로 인한 장점
- 브라우저에서도 데스크톱 어플리케이션과 같이 빠른 퍼포먼스와 부드러운 화면 전환이 가능해짐
- **장점**
  1. 변경할 부분을 갱신하는데 필요한 데이터만 서버로부터 전송받기 때문에 불필요한 데이터 통신이 발생하지 않는다.
  2. 변경할 필요가 없는 부분은 다시 렌더링하지 않는다. 순간적으로 깜박이는 현상이 발생하지 않는다.
  3. 비동기 방식으로 동작하기 때문에, 서버에게 요청을 보낸 이후 블로킹이 발생하지 않는다.

## 43-2. JSON
- JSON : 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷
  - 자바스크립트에 종속되지 않는 언어 독립형 데이터 포맷으로, 대부분의 프로그래밍 언어에서 사용할 수 있음

### 43.2.1 JSON 표기 방식
- 키와 값으로 구성된 순수 텍스트
- 키는 반드시 큰 따옴표로 묶어야한다.
- 값은 객체 리터럴과 같은 표기법을 사용할 수 있으나, 문자열의 경우 반드시 큰따옴표로 묶어야한다. 

### 43.2.2 JSON.stringify
- 객체를 JSON 포맷의 문자열로 변환한다.
- 직렬화(serializing) : 클라이언트가 서버로 객체를 전송하기 위해 객체를 문자열화하는 것
- 객체뿐만 아니라 배열도 JSON 포맷 문자열로 변환한다.

### 43.2.3 JSON.parse
- JSON 포맷의 문자열을 객체로 변환
- 역직렬화 (deserializing) : 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열이다. 객체로서 사용하기 위해 JSON 포맷의 문자열을 객체화하는 것
- 배열이 JSON 포맷 문자열로 변환되어있는 경우 JSON.parse는 문자열을 배열 객체로 변환한다.
- 배열 요소가 객체인 경우 배열 요소까지 객체로 변환한다.

## 43-3. XMLHttpRequest
- HTTP 요청 전송을 전송하기 위해 XMLHttpRequest 객체를 사용한다. XMLHttpRequest객체는 HTTP 요청 전송과 응답수신을 위한 메서드와 프로퍼티를 제공한다.

### 43.3.1 XMLHttpRequest 객체 생성
- XMLHttpRequest 생성자 함수를 호출하여 생성한다.
- Web API이므로 브라우저 환경에서만 정상적으로 실행된다.

### 43.3.2 XMLHttpRequest 객체의 프로퍼티와 메서드

#### XMLHttpRequest 객체의 프로토타입 프로퍼티
- readyState : HTTP 요청의 현재 상태를 나타내는 정수 -> ex) LOADING : 3
- status : HTTP 요청에 대한 응답 상태를 나타내는 정수 -> ex) 200
- statusText : HTTP 요청에 대한 응답 메시지를 나타내는 문자열 ex) "OK"
- responseType : HTTP 응답 타입 ex) document, json, text, blob...
- response : HTTP 요청에 대한 응답 몸체

#### XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티
- onreadystatechange : readyState 프로퍼티 값이 변경된 경우
- onerror : HTTP 요청에 에러가 발생한 경우
- onload : HTTP 요청이 성공적으로 완료된 경우

#### XMLHttpRequest 객체의 메서드
- open : HTTP 요청 초기화
- send : HTTP 요청 전송
- abort : 이미 전송된 HTTP 요청 중단
- setRequestHeader : 특정 HTTP 요청 헤더의 값을 설정

#### XMLHttpRequest 객체의 정적 프로퍼티
- DONE : 서버 응답 완료

### 43.3.3 HTTP 요청 전송
1. XMLHttpRequest.prototype.open 메서드로 HTTP 요청을 초기화한다.
2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 특정 HTTP 요청의 헤더 값을 설정한다.
3. XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송한다.

#### XMLHttpRequest.prototype.open
- xhr.open(method, url[, async])
- HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)를 알리는 방법이다. 주로 5가지 요청메서드를 통해 CRUD를 구현한다.
- GET: payload X
- POST
- PUT : 리소스 전체 교체
- PATCH : 리소스 일부 수정
- DELETE : payload X

#### XMLHttpRequest.prototype.send
- GET 요청 메서드 : 데이터를 URL의 일부분인 쿼리 스트링으로 서버에 전송한다.
- POST 요청 메서드 : 데이터를 요청 몸체 (리퀘스트 바디)에 담아 전송한다.
- 페이로드가 객체인 경우 JSON.stringify를 사용하여 직렬화한다음 전달해야한다.
- GET 메서드에 페이로드를 전달하면 무시되고 요청 몸체는 null로 설정된다.

#### XMLHttpRequest.prototype.setRequestHeader
- setRequestHeader메서드는 반드시 open 메서드를 호출한 이후에 호출해야한다.
- Content-type : 전송할 데이터의 MIME 타입의 정보를 표현
  - text : text/plain, text/html, text/css, text/javascript
  - application : application/json, application/x-www-form-urlencode
  - multipart : multipart/formed-data
- Accept : HTTP 클라이언트가 서버에 요청할 때 서버가 응답할 데이터의 MIME 타입을 Accept로 지정할 수 있다. 지정하지 않으면 */*으로 전송된다.

> 미디어 타입 (Multipurpose Internet Mail Extensions 또는 MIME type로도 알려져 있음)이란 문서, 파일 또는 바이트 집합의 성격과 형식을 나타냅니다. MIME 타입은 IETF의 RFC 6838에 정의 및 표준화되어 있습니다.

> Accept 헤더는 요청을 보낼 때 서버에 이런 미디어 타입(media type) 혹은 MIME type을 명시하여 데이터를 보내줬으면 좋겠다고 명시할 때 사용합니다. 클라이언트가 이해가능한 타입을 서버에게 알려주는 것.

### 43.3.4 HTTP 응답 처리
- 서버가 전송한 응답을 클라이언트가 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야한다. XMLHttpRequest 객체에서 갖는 onreadystatechange, onload, onerror와 같은 이벤트 프로퍼티를 통해 이벤트를 캐치하여 응답을 처리할 수 있다.
- onreadystatechange 로 캐치하는 방법 : readyState 프로퍼티가 변경될 때마다 발생하는 이벤트를 캐치 -> XMLHttpRequest.DONE인지 확인하여 데이터 취득
- onload 로 캐치하는 방법 : HTTP 요청이 성공적으로 완료된 경우 발생하는 이벤트(XMLHttpRequest.DONE인지 확인할 필요 없음) -> 캐치하여 데이터 취득

# 44장 REST API
- REST : HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
- REST API : REST를 기반으로 서비스 API를 구현한 것을 의미
- HTTP의 장점을 최대한으로 활용할 수 있는 아키텍처로서 REST를 구상하여 소개하였음
- HTTP 프로토콜을 의도에 맞게 디자인하도록 유도
- RESTful : REST의 기본 원칙을 성실히 지킨 서비스 디자인

## 44-1. REST API의 구성 (의미와 표현방법)
- 자원 : 자원 | URI(엔드포인트)
- 행위 : 자원에 대한 행위 | HTTP 요청 메서드
- 표현 : 자원에 대한 행위의 구체적인 내용 | 페이로드
- REST는 자체 표현구조로 구성되어있어 REST API만으로 HTTP 요청의 내용을 이해할 수 있음.

## 44-2. REST API 설계 원칙
1. URI는 리소스를 표현하는데 집중한다.
  - 명사를 사용
  - get과 같이 행위에 대한 표현이 들어가면 안된다. 
2. 행위에 대한 정의는 HTTP 요청 메서드를 통해 한다.
  - 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)을 알리는 방법
  - GET, POST, PUT, PATCH, DELETE

## 44-3. JSON Server를 이용한 REST API 실습

### 44.3.1 JSON Server 설치
- 가상 REST API 서버를 구축할 수있는 툴 JSON Server를 NPM에서 설치한다.

### 44.3.2 db.json 파일 생성
- db.json 파일을 생성하여 리소스를 제공하는 데이터 베이스 역할을 하게끔 한다.

### 44.3.3 JSON Server 실행
- JSON 서버를 실행한다.

### 44.3.4 GET 요청
- 리소스 url을 통해 리소스 취득을 요청한다.
- index url로 전체 리소스를 취득하거나 id를 사용하여 특정 리소스를 취득할 수도 있다.

### 44.3.5 POST 요청
- 새로운 리소스를 생성한다.
- POST 요청 시에는 setRequestHeader 메서드를 사용해 서버로 전송할 페이로드의 MIME 타입을 지정해야 한다.
- xhr.setRequestHeader('content-type', 'application/json)

### 44.3.6 PUT 요청
- 특정 리소스 전체를 교체할 때 사용한다.
- PUT 요청 시에는 setRequestHeader 메서드를 사용해 서버로 전송할 페이로드의 MIME 타입을 지정해야 한다.

### 44.3.7 PATCH 요청
- 특정 리소스의 일부를 수정할 때 사용
- PATCH 요청 시에는 setRequestHeader 메서드를 사용해 서버로 전송할 페이로드의 MIME 타입을 지정해야 한다.

### 44.3.8 DELETE 요청
- 리소스를 삭제할 때 사용

# 45장 프로미스 
- 비동기 처리의 하나의 패턴으로 콜백 함수를 사용한다. 
  - 전통적인 콜백패턴은 가독성이 나쁘고
  - 비동기 처리중 발생한 에러처리가 곤란하며
  - 여러개의 비동기 처리를 한번에 처리할 때 한계가 있다.
- ES6에서 비동기 처리를 위한 또다른 패턴으로 Promise를 도입했다.
  - 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다.

## 45-1. 비동기 처리를 위한 콜백 패턴의 단점

### 45.1.1 콜백 헬
- 비동기 함수 : 함수 내부에 비동기로 동작하는 코드를 포함한 함수
- 근본적으로 비동기 함수는, 호출되고 실행이 완료되기 까지 시간이 소요되기 때문에 그 처리 결과를 외부에 반환하거나 상위 스코프의 변수에 할당할 수 없다.
- 따라서 비동기 함수의 처리 결과(서버의 응답 등)에 대한 후속 처리는 비동기 함수 내부에서 수행해야한다.
- 비동기 함수에 콜백함수를 전달함으로서 비동기 처리 결과에 대한 후속 처리를 수행하는 것이 일반적이다.
  - 필요에 따라 성공시 호출될 콜백함수와 실패시 호출될 콜백함수를 전달할 수 있다.
- 하지만, 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리 결과를 가지고 또다시 비동기 함수를 호출해야한다면 콜백 함수호출이 중첩되어 복잡도가 높아진다. => **콜백 헬 현상**
  - 콜백 헬은 가독성을 나쁘게 하며 실수를 유발하는 원인이 된다.
 
### 45.1.2 에러 처리의 한계
- 콜백함수를 호출시키는 것은 콜백함수를 인수로 받은 함수가 아니다. 해당 함수는 이미 실행 후 콜백함수의 호출을 기다리지 않고 즉시 종료된다.
- 이때 콜백함수가 에러를 일으킨다면 콜백함수를 인수로 가졌던 함수에 try...catch로 에러 처리를 했어도 콜백함수의 호출자가 해당 함수가 아니기 때문에 에러처리가 되지 않는다.
- 이러한 사례로 보듯이, 콜백 패턴은 에러 처리가 곤란하다는 문제가 있다.

## 45-2. 프로미스의 생성
- new Promise : 프로미스 객체를 생성한다.
- ES6에서 도입된 Promise는 ECMAScript 사양에 정의된 표준 빌트인 객체이다.
- Promise 생성자 함수는 비동기 처리를 수행할 콜백함수를 인수로 전달받는다.
  - 이 콜백함수는 resolve와 reject 함수를 인수로 전달받는다.
- 인수로 전달받은 콜백 함수 내부에서 비동기 처리를 수행한다.
  - 처리에 성공하면 resolve 함수를 호출하고, 실패하면 reject 함수를 호출한다.
- 프로미스는 현재 비동기 처리가 어떻게 진행되고 있는지를 나타내는 상태 정보를 갖는다.
  - 프로미스 상태 정보 | 의미 | 상태 변경 조건
  - pending : 비동기 처리가 아직 수행되지 않은 상태  | 프로미스가 생성된 직후 기본 상태
  - fulfilled : 비동기 처리가 수행된 상태(성공) | resolve 함수 호출
  - rejected : 비동기 처리가 수행된 상태(실패)  | reject 함수 호출
- 프로미스의 상태는 resolve 또는 reject 함수를 호출하는 것으로 결정된다.
  - settled 상태 : fulfilled이던 rejected 비동기 처리가 수행된 상태
  - 일단 settled 상태가 되면 더는 다른 상태로 변화할 수 없다. 
  - pending 상태는 settled 상태로 변화할 수 있다.
- 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체이다.
  - 성공하면 fulfilled 상태, 처리 결과는 resolve 함수에 따라 결정
  - 실패하면 rejected 상태, 처리 결과는 reject 함수에 따라 결정

## 45-3. 프로미스의 후속 처리 메서드
- 프로미스의 비동기 처리 상태가 변화함에 따라 이에 따른 후속 처리를 해야 한다. 이를 위해 후속 메서드를 제공한다. 
- 프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출된다.
- 후속처리 메서드는 프로미스를 반환하며, 비동기로 동작한다.

### 45.3.1 Promise.prototype.then
- 두개의 콜백 함수를 인수로 받는다. 
  - 첫번째 : fulfilled 상태가 되면 호출된다. 프로미스의 비동기 처리 결과를 인수로 전달받는다.
  - 두번째 : rejected 상태가 되면 호출된다. 프로미스의 에러를 인수로 전달받는다. 
- 언제나 프로미스를 반환한다.
  - 콜백함수가 프로미스를 반환한다면 그 프로미스를 그대로 반환한다.
  - 콜백함수가 프로미스가 아닌 값을 반환하면 암묵적으로 그 값을 resolve 또는 reject하여 프로미스를 생성해 반환한다.

### 45.3.2 Promise.prototype.catch
- 한개의 콜백 함수를 인수로 받는다. 
  - rejected인 상태인 경우에만 콜백 함수가 호출된다.
- .then(undefined, onRejected)와 동일하게 동작한다.
- 언제나 프로미스를 반환한다.

### 45.3.3 Promise.prototype.finally
- 한개의 콜백 함수를 인수로 전달받는다.
- 프로미스의 성공 또는 실패와 상관없이 무조건 한 번 호출된다.
- 프로미스의 상태와 상관없이 공통적으로 수행해야할 처리 내용이 있을 때 유용하다.
- then/catch 메서드와 마찬가지로 언제나 프로미스를 반환한다.

## 45-4. 프로미스의 에러 처리
- 프로미스는 에러를 문제 없이 처리할 수 있다.
- 비동기 처리에서 발생한 에러는 then 메서드의 두번째 콜백 함수로 처리할 수 있다.
- 비동기 처리에서 발생한 에러는 .catch 메서드를 통해서도 처리할 수 있다. catch 메서드는 내부적으로 .then(undefined, onRejected)를 호출한다.
- 단 then 메서드의 두번째 콜백함수는 첫번째 콜백함수에서 발생한 에러를 캐치할 수 없다는 단점이 있고, 코드가 복잡해진다.
- catch 메서드를 then 메서드들을 모두 호출한 이후에 호출하면, 비동기 처리에서 발생한 에러 뿐만 아니라 then 메서드 내부에서 발생한 에러까지 모두 캐치할 수 있다.
  - 가독성과 명확성을 위해 가급적 에러처리는 then보다는 catch 메서드에서 하는 것을 권장한다.

## 45-5. 프로미스 체이닝
- then -> then -> catch -> finally 메서드를 연쇄적으로 호출할 수 있다. 
  - 후속 처리 메서드들이 언제나 프로미스를 반환하는 점을 이용
  - 이를 **프로미스 체이닝**이라고 한다.
  - 콜백 헬을 해결하는 대안이 된다.
- 후속 처리 메서드의 콜백 함수가 프로미스가 아닌 값을 반환해도 암묵적으로 resolve / reject 하여 프로미스를 생성해 반환한다.
  - 프로미스도 콜백 패턴을 사용하므로 
- async/await을 사용하면 후속 처리 메서드없이 마치 동기 처리처럼 프로미스가 처리결과를 반환하도록 구현할 수 있다.
  - 프로미스 기반으로 동작한다.
 
## 45-6. 프로미스의 정적 메서드

### 45.6.1 Promise.resolve / Promise.reject
- 이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용한다.
- Promise.resolve : 인수로 전달받은 값을 resolve하는 프로미스를 생성한다.
- Promise.reject : 인수로 전달받은 값을 reject하는 프로미스를 생성한다.

### 45.6.2 Promise.all
- 여러개의 비동기 처리를 모두 병렬 처리할 때 사용한다.
- 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받는다.
- 전달받은 프로미스가 모두 fulfilled 상태가 되면 모든 처리 결과를 배열에 저장해 새로운 프로미스를 반환한다.
- 가장 늦게 fulfilled 상태가 되는 프로미스의 처리 시간보다 Promise.all 메서드의 종료 시간이 조금 더 길다.
- 하나라도 rejected 상태가 되면 나머지 프로미스의 상태가 fulfilled 되는 것을 기다리지 않고 즉시 종료한다.
- 처리 순서가 보장된다.
- 인수로 전달받은 이터러블의 요소가 프로미스가 아닌 경우 Promise.resolve 메서드를 통해 프로미스로 래핑된다.

### 45.6.3 Promise.race
- 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받는다.
- 가장 먼저 fulfilled 상태가 된 프로미스의 처리 결과를 resolve하는 새로운 프로미스를 반환한다.
- 전달된 프로미스가 하나라도 rejected 상태가 되면 에러를 reject하는 새로운 프로미스를 즉시 반환한다.

### 45.6.4 Promise.allSettled
- ES11 도입
- 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받는다.
- 전달된 프로미스가 모두 settled 상태가 되면 처리 결과를 배열로 반환한다.

## 45-7. 마이크로태스크 큐
- 프로미스의 후속 처리 메서드의 콜백함수는 태스크 큐가 아니라 마이크로태스크 큐에 저장된다. 
- 태스트큐와는 별도의 큐이다. 마이크로태스크 큐는 태스크 큐보다 우선순위가 높다.
- 콜스택이 비면 이벤트루프가 마이크로태스크 큐에서 대기하고 있던 함수들을 먼저 가져오고 이후 마이크로태스크큐가 비면 태스크 큐에서 대기하고 있던 함수를 가져와 실행한다.

## 45-8. fetch
- HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API
- XMLHttpRequest 객체보다 사용법이 간단하고 프로미스를 지원하기 때문에 비동기 처리를 위한 콜백 패턴의 단점으로부터 자유롭다.
- const promise = fetch(url [,options])
  - 첫번째 인수 : HTTP 요청할 url
  - 두번째 인수로 HTTP 요청메서드 요청헤더, 페이로드 등을 설정한 객체를 전달한다.
- HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환한다.
- Response 객체는 HTTP응답을 나타내는 다양한 프로퍼티를 제공한다.
  - Response.json 메서드 : response 객체에서 HTTP 리스폰스 바디를 취득하여 역 직렬화한다.
- fetch 함수를 사용할 때는 에러 처리에 주의해야한다. 
  - fetch 함수가 반환하는 프로미스는 기본적으로 404, 500 에러와 같은 HTTP 에러가 발생해도 에러를 reject하지 않고 불리언 타입의 ok 상태를 false로 설정한 Response 객체를 resolve한다.
  - 네트워크 장애나 CORS 에러에 의해 요청이 완료되지 못한 경우에만 프로미스를 reject한다.
  - 그러므로 반환한 프로미스가 resolve한 불리언 타입의 ok 상태를 확인해 명시적으로 에러를 처리해줘야한다.
- axios는 모든 HTTP 에러를 reject 하는 프로미스를 반환하기 때문에 모든 에러를 catch에서 처리할 수 있어 편리하다. 

# 46장 제너레이터와 async/await

## 46-1. 제너레이터란?
- ES6 도입
- 제너레이터 : 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수

### 일반 함수와의 차이
1. 함수 호출자에게 함수 실행의 제어권을 양도(yield)할 수 있다.
    - 함수 호출자가 함수 실행을 일시 중지시키거나 재개시킬 수 있다.  
2. 함수 호출자와 함수의 상태를 주고 받을 수 있다.
    - 함수 호출자와 양방향으로 함수의 상태를 주고 받을 수 있다. 제너레이터 함수는 함수 호출자에게 상태를 전달할 수 있고, 함수 호출자로부터 상태를 전달받을 수도 있다.
3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
    - 함수코드를 실행하는 것이 아니라 이터러블이면서 이터레이터인 제너레이터 객체를 반환한다.

## 46-2. 제너레이터 함수의 정의
- function* 키워드로 선언한다. 하나 이상의 yield 표현식을 포함한다.
- 에스터리스크(*) 위치는 function 키워드와 함수 이름 사이라면 어디든지 상관없다.
- 화살표 함수로는 정의할 수 없다.
- new 연산자와 함께 생성자 함수로 호출할 수 없다.

## 46-3. 제너레이터 객체
- 제너레이터 함수를 호출하면 제너레이터 객체를 생성하여 반환한다.
- 제너레이터 객체는 이터러블이면서 이터레이터 이다.
- Symbol.iterator 메서드를 상속받는 이터러블
- value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 next 메서드를 소유하는 이터레이터 이다.
- 제너레이터 객체는 이터레이터에는 없는 return, throw 메서드를 갖는다.
  - next : 호출하면 yield 표현식까지 코드블록을 실행하고 yield된 값을 value 프로퍼티 값으로, false를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.
  - return : 호출하면 인수로 전달받은 값을 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다. 
  - throw : 호출하면 인수로 전달받은 에러를 발생시키고 undefined를 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

## 46-4. 제너레이터의 일시 중지와 재개
- yield 키워드와 next 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있다.
- 제너레이터는 함수 호출자에게 제어권을 양도하여 필요한 시점에 함수 실행을 재개할 수 있다.
- 제너레이터 객체의 next 메서드를 호출하면 제너레이터 함수의 코드블록을 yield 표현식까지만 실행한다. 
  - yield 키워드는 제너레이터 함수의 실행을 일시 중지시키거나 yield 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다.
  - 이후 또다시 next 메서드를 호출하면 재개하기 시작하여 다음 yield 표현식까지 실행되고 다시 일시중지된다.
  - 이터레이터 리절트 객체를 반환한다. {value, done}
- 제너레이터의 next 메서드에 인수를 전달할 수 있다. 이 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당된다.
- next 메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고 받을 수 있다.
  - 제너레이터 객체가 관리하는 상태를 꺼내오기
  - 인수를 전달하여 제너레이터 객체에 상태 밀어넣기

## 46-5. 제너레이터의 활용

### 46.5.1 이터러블의 구현
- 간단하게 이터러블을 구현할 수 있다.

### 46.5.2 비동기 처리
- 프로미스를 사용한 비동기 처리를 동기 처럼 구현할 수 있다.

## 46-6. async/await
- ES8에서 도입
- 프로미스를 기반으로 동작
- 동기처럼 프로미스를 사용할 수 있다.
 
### 46.6.1 async 함수
- await 키워드는 반드시 async 함수 내부에서 사용해야한다.
- async 키워드를 통해 async 함수를 정의하며 언제나 프로미스를 반환한다. 명시적으로 프로미스를 반환하지 않더라도 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.
- 클래스의 constructor 메서드는 async 함수가 될 수 없다.

### 46.6.2 await 키워드
- 프로미스가 settled 상태가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다. 반드시 프로미스 앞에서 사용해야한다.
- await 키워드 사용 시 처리 대기시간에 유의해야한다. 연관없이 이뤄지는 비동기 처리는 순차적으로 처리할 필요없으니 굳이 사용하지 않아도 된다.
- 순차적으로 처리해야하는 비동기 처리의 경우 await 키워드를 통해 처리한다.

### 46.6.3 에러 처리
- async/await에서는 try...catch문을 사용할 수 있다. 
- 콜백함수를 인수로 받는 비동기 함수와 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.
- async 함수 내에서 catch 문을 사용해 에러처리하지 않으면 async 함수는 발생한 에러를 reject하는 프로미스를 반환한다.
  - .catch를 사용해 에러를 캐치할 수도 있다. 

# 47장 에러 처리
## 47-1. 에러 처리의 필요성
- try...catch문을 사용하면 프로그램이 강제 종료되지 않고 계속해서 코드를 실행시킬 수 있다.
- 예러를 발생시키지 않는 예외 상황이 발생하는 경우에 적절하게 대응하지 않으면 에러로 이어질 가능성이 크다.
  - if 문으로 반환값 확인하기
  - 옵셔널 체이닝 연산자 사용

## 47-2. try...catch...finallly문
- 에러처리 방법 1. 예외 상황이 발생하면 반환하는 값을 확인하여 처리하는 방법  
- 에러처리 방법 2. 에러처리코드를 미리 등록해두고 에러가 발생하면 에러처리코드로 점프하는 방법
  -  try...catch...finallly문은 두번째 방법이다.
- finally문은 생략가능하다.
- try 코드 블록 실행 중 에러가 발생하면 catch문에 err 변수가 전달되어 catch 코드 블록이 실행된다.
- finally 코드 블록은 에러 발생과 상관없이 반드시 한번 실행된다.
-  try...catch...finallly문으로 에러를 처리하면 프로그램이 강제 종료되지 않는다.

## 47-3. Error 객체
- Error 생성자 함수는 에러 객체를 생성한다.
- 에러를 상세 설명하는 에러 메시지를 인수로 전달할 수 있다.
- 에러 객체는 message, stack 프로퍼티를 갖는다.
  - stack 프로퍼티의 값은 에러를 발생시킨 콜스택의 호출정보를 나타내는 문자열이며 디버깅 목적으로 사용된다.
- 자바스크립트는 7가지 에러 객체를 생성할 수 있는 Error 생성자 함수를 제공한다. 모두 Error.prototype을 상속받는다.
  - SyntaxError
  - ReferenceError
  - TypeError
  - RangeError
  - URIError
  - EvalError

## 47-4. throw 문
- 에러를 발생시키려면 throw 문으로 에러 객체를 던져야한다.
- catch문에는 이 던져진 에러 객체가 할당된다.

## 47-5. 에러의 전파
- 에러는 호출자 방향으로 전파된다.(콜스택의 아래방향)
- 주의 : 비동기 함수인 setTimeout이나 프로미스 후속 처리 메서드의 콜백함수는 호출자가 없다.
 
# 48장 모듈

## 48-1. 모듈의 일반적 의미
- 모듈 : 어플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각
- 모듈은 자신만의 파일 스코프를 가질 수 잇어야한다.
- 모듈은 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개가 가능하다. => export
- 모듈이 공개한 자산 중 일부 또는 전체를 선택해 자신의 스코프로 불러들여 재사용가능하다. => import

## 48-2. 자바스크립트와 모듈
- 모든 자바스크립트 파일은 하나의 전역을 공유한다. 
- 그러다 모듈시스템 사용을 위해 CommonJS와 AMD가 제안되었다.
- Node.js는 CommonJS를 채택했고 파일별로 독립적인 모듈스코프를 갖는 모듈시스템을 지원한다.

## 48-3.ES6 모듈 (ESM)
- ES6에서 모듈 기능을 추가했다. 대부분 브라우저에서 사용가능하다.
- script 태그에 type="module"을 추가
- 확장자는 mjs 사용 권장
- strict mode 적용

### 48.3.1 모듈 스코프
- ESM은 독자적인 모듈스코프를 갖는다. 
- 모듈 내에서 선언한 식별자는 모듈 외부에서 참조할 수 없다.

### 48.3.2 export 키워드
- 모듈 내부에서 선언한 식별자를 외부에 공개하여 다른 모듈들이 재사용할 수 있게끔 export 키워드를 사용한다.
- 선언문 앞에 사용
- export 대상을 하나의 객체로 구성하여 한번에 export 할 수 있다.

### 48.3.3 import 키워드
- 다른 모듈에서 공개한 식별자를 자신의 모듈 스코프 내부로 로드하려면 import 키워드를 사용한다.
- 파일 확장자를 생략할 수 없다.
- import문에 로드되는 의존성을 갖는 모듈을 script 태그로 로드하지 않아도 된다.
- export한 식별자 이름을 as 키워드를 통해 변경하여 import할 수 있다.
- 하나의 값만 export 한다면 default 키워드를 사용할 수 있고, 이름없이 export 한다.
  - default 키워드로 export된 모듈은 {} 없이 임의의 이름으로 import 한다.


# 49장 Babel과 Webpack을 이요한 ES6+/ES.NEXT 개발 환경 구축
- 최신 ECMAScript 사양을 사용한 프로젝트를 구형 브라우저에서 동작하기 위해 개발환경을 구축하는 것이 필요하다.

## 49-1. Babel
- 최신사양의 소스코드를 구형브라우저에서도 동작하는 ES5 사양의 소스코드로 변환할 수 있다.

### 49.1.1 Babel 설치

### 49.1.2 Babel 프리셋 설치와 babel.config.json 설정 파일 작성
- 바벨 프리셋은 함께 사용되어야하는 바벨 플러그인들을 모아둔 것이다.

### 49.1.3 트랜스파일링

### 49.1.4 Babel 플러그인 설치
- 프리셋에서 지원하지 않는 추가 사양을 트랜스파일링하기 위해서는 플러그인을 설치해야한다.

### 49.1.5 브라우저에서 모듈 로딩 테스트

## 49-2. Webpack
- 의존관계에 있는 자바스크립트, css, 이미지 등의 리소스를 하나(또는 여러개의 파일)로 번들링하는 모듈 번들러이다.
- 여러개의 자바스크립트 파일을 하나로 번들링하므로 HTML 파일에서 script 태그를 여러개로 로드해야하는 번거로움도 사라진다.

### 49.2.1 Webpack 설치

### 49.2.2 babel-loader 설치
- webpack이 babel-Loader를 통해 최신 자바스크립트 문법을 ES5 사양의 소스코드로 트랜스파일링하도록 해준다.

### 49.2.3 webpack.config.js 설정파일 작성
- 트랜스파일링 : 바벨이 수행
- 번들링 : 웹팩이 수행
- 실행결과 dist/폴더에 bundle.js가 생성된다. html에서는 bundle.js만 로드하면 된다.

### 49.2.4 babel-polyfill 설치
- 최신 문법을 트랜스파일링 해도 브라우저가 지원하지 않는 코드가 남아있을 수 있다.
- 이런 경우 @babel/polyfill을 설치해야한다.
- 개발환경 뿐만 아니라 실제 운영환경에서도 사용해야한다.
 
