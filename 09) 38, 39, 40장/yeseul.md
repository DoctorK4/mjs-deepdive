# 38장 브라우저의 렌더링 과정

## 브라우저 렌더링

- 웹 브라우저에서는 뼈대를 그리는 HTML, 살을 붙여 꾸며주는 CSS, 동작을 수행하고 제어하는 JavaScript가 함께 실행된다. 

- 의도한 대로 코드를 실행시키려면 브라우저가 어떻게 렌더링 되는지 파악해야 더 효율적인 코드를 작성할 수 있다. 

## 파싱

- 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 브라우저가 읽고 실행하기 위해 텍스트 문자의 문자열을 분해하고 구조를 생성하는 일련의 과정

=> 브라우저 요청에 의해 서버가 응답한 HTML 문서는 문자열로 이루어져 순수한 텍스트이므로 브라우저가 이해하기 위해 번역이 필요하다! 

## 렌더링

- HTML, CSS, JS로 작성된 문서를 파싱 하여 브라우저에 시각적으로 출력하는 것

# 브라우저 렌더링 과정

리소스 파일 파싱 --> Render 트리 생성 --> 레이 아웃 --> 페인트

먼저 리소스 파일  파싱 단계에 들어가기에 앞서 위에 설명처럼 브라우저 렌더링은 사용자가 브라우저 주소창에 주소를 입력하면 렌더링을 시작한다. 이때,  DNS(Domain Name System)가 주소의 서버를 찾는다.

- DNS(Domain Name System)란?

사람이 읽을 수 있는 도메인 주소를 기계가 읽을 수 있는 IP 주소로 변환하는 기능을 가지는데, 즉 www.naver.com과 같은 사람이 읽을 수 있는 이름을 222.122.195.6과 같은 숫자 IP 주소로 변환하여 컴퓨터가 서로 통신할 수 있도록 인터페이스 역할을 한다.

​리소스 파일  파싱 단계는 DOM 트리 생성과 CSSOM 트리 생성 이렇게 두 가지로 나뉜다.

1. DOM 트리 구축(Building the DOM tree)

HTML 파싱 => DOM 트리 생성

서버로부터 전송받은 HTML 코드는 8비트의 데이터 형태로 전송되는데 이를 바이트 스트림이라 한다.

브라우저는 전송받은 바이트 데이터를 문자로 변환하고,

이러한 문자열을 W3C 표준에 지정된 고유 토큰으로 변환하는 과정인 토큰화를 거친다.

토큰화 과정을 통해 노드가 생성되는데 노드란, DOM 트리를 이루는 거대한 구조의 한 단위로 작은 노드들이 모여서 하나의 거대한 트리 구조를 이루는데 이 트리가 DOM 트리다.

​여기서 특이점은! 

<link>, <image> => 다운로드

브라우저가 DOM 트리를 생성할 때 <link> 태그와 <image> 태그와 같은 태그들을 만나면 해당 태그 안의 명시되어 있는 리소스를 다운로드한다

<script></script> => 일시 정지

DOM 트리 렌더링 과정에서 <script></script> 태그를 만나게 되면 브라우저는 DOM 트리 생성을 중단한 상태로 <script></script> 태그 안에 들어있는 자바스크립트 코드를 해석한다.

2. CSSOM 트리 구축(Building the CSSOM)

CSS 파싱 => CSSOM 트리 생성

DOM 트리 생성과 비슷하게 동작한다.

바이트 데이터로 받은 CSS 파일을 문자로 변환하고 토큰화하여 생성된 노드를 연결해 CSSOM 트리를 생성한다.

다음으로 살펴볼 Render 트리 생성 단계는 리소스 파일을 파싱 해 생성된 DOM TREE + CSSOM TREE 이 두 가지의 결합이다.

세 번째 단계인 레이아웃 단계에서는 뷰포트를 기반으로 각 노드가 가지는 정확한 위치와 크기를 계산해 결정하는 프로세스로 요소의 크기나 좌표와 같은 정보를 담는다. 

* CSS 속성 중 display: none 와 같이 화면에서 보이지도 않고 공간을 차지하지 않는 속성이 적용된 요소는 렌더 트리로 구축되지 않는다.  

마지막 단계인 페인트 단계는 렌더 트리를 그리는 단계다. 

앞서 만들어진 요소의 계산된 위치/크기를 기반으로 화면에 그린다. 이때, 노드들을 하나의 레이어로 화면을 만드는 것이 아니라 한 페이지를 여러 개로 나누어 화면에 그린다. 이렇게 레이어를 분리하면 리페인트 해야 하는 일이 발생했을 때 모든 레이어가 아닌 하나의 레이어만 페인트 할 수 있다.

이렇게 여러 가지 레이어들을 스크린에 픽셀로 표현하여 페인트 단계에서 그려진 레이어들을 순서에 맞춰 합성(Composite) 해 하나의 페이지를 완성한다.

- Reflow(Layout) / Repaint

그렇다면 레이아웃이 변경되면 위의 단계를 처음부터 다시 다 거칠까?! 그럼 너무 효율성 떨어지겠지?? 그래서 리플로우와 리페인트가 있는 것이다! 

CSS를 수정해서 화면에 보이는 레이아웃이 변경되면 브라우저는 렌더 트리를 다시 생성하는데 이때 레이아웃 단계와 페인트 단계가 다시 실행되는 리플로우/리페인트가 실행된다. 

하지만 폰트나 배경 색상 변경과 같은 레이아웃에 영향이 없는 변경은 레이아웃의 크기나 위치에 영향이 가지 않아 다시 계산할 필요가 없기 때문에 레이아웃 단계는 건너뛰고 페인트 단계부터 실행된다.

- transform/ opacity

이처럼 레이아웃 단계에서 대부분의 연산 작업이 이루어져 레이아웃 단계만 생략할 수 있어도 렌더링 속도가 개선되지만, 리플로우/ 리페인트 둘 다 비용이 많이드는 작업이다. 이러한 비용을 절감하려면 리플로우와 리페인트 없이도 레이아웃이 변경 가능하면 된다!

이게 가능한 속성이 transform/ opacity 으로 CPU가 아닌 GPU가 관여할 수 있는 속성으로 이 두 속성들은 별도의 레이어로 분리해 GPU를 사용하여 렌더링 되므로 레이아웃 단계와 페인트 단계를 생략할 수 있다. 주로 애니메이션에 이 속성을 이용해 작업을 많이 한다.

# 39장 DOM

Q. DOM을 사용하는 이유

<details>

<summary>A</summary> 

1. 자바스크립트를 통해 HTML에서 데이터를 가져오고 싶을 때
2. 웹 페이지 데이터를 동적으로 변경하고 싶을 때
3. interactive한 웹 어플리케이션을 만들고 싶을 때

</details>

Q. 요소 노드 취득 방법

<details>

<summary>A</summary> 

1. id를 이용
2. 태그 이름을 이용
3. class를 이용
4. CSS 선택자를 이용

</details>

# 40장 이벤트

Q. 이벤트 핸들러 등록 방법
<details>

<summary>A</summary> 

1. 인라인(inline) 방식
2. 프로퍼티(property) 방식
3. addEventListener 메소드 방식

</details>

Q. 동일한 HTML 요소에서 발생한 동일한 이벤트에 대해 이벤트 핸들러 프로퍼티 방식은 하나 이상의 이벤트 핸들러를 등록할 수 없다. 이를 해결하는 방법은?

<details>

<summary>A</summary> 

addEventListener 메서드는 하나 이상의 이벤트 핸들러를 등록할 수 있다.

</details>

Q. 이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러 제거 방법

<details>

<summary>A</summary> 

이벤트 핸들러 프로퍼티에 null을 할당

</details>
