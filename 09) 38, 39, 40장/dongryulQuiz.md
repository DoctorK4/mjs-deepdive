# 38장 브라우저 렌더링 과정

1. HTML 문서, CSS문서, 자바스크립트 파일의 파싱과 실행은 브라우저 엔진이 담당한다. (O, X)

2. Reflow와 Repaint가 일어나는 경우는?

3. Reflow만 일어날 수 있을까? Repaint만 일어날 수 있을까?

4. HTTP 1.1과 2.0의 차이는 무엇인가요?

5. script 태그의 async와 defer 속성은 어떤 차이가 있나요?

# 39장 DOM

1. DOM 트리 최상위에 존재하는 노드는? 

2. 어트리뷰트 노드는 요소 노드와 연결되어있으므로, 형제 노드이다. (O, X)

<details>
<summary>3. 모든 HTMl 문서의 요소 노드를 취득하기 위한 방법은?</summary>
<div markdown="1">
<br/>
1. document.getElementsByTagName('*')
<br/>
2. document.querySelectorAll('*')
</div>
</details>
<br/>

4. HTMLCollection과 NodeList 객체의 공통점과 차이점은?

5. 사용자로부터 입력받은 데이터를 그대로 innerHTML 프로퍼티에 할당하는 것이 위험한 이유는?


# 40장 이벤트

1. 버블링이 되지 않는 이벤트 2개만 말해주세요. 

2. addEventListener로 이벤트핸들러 여러 개를 등록할 수 있다. (O, X)

3. 이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러는 제거할 수 없다. (O, X)

4. 이벤트 핸들러 어트리뷰트 방식의 경우 event가 아닌 다른 매개변수 이름으로는 이벤트 객체를 전달받지 못한다. (O, X)

5. 이벤트 전파 단계 3단계가 어떻게 이뤄지는지 설명해주세요

6. 이벤트 전파에 있어서 addEventListenr 등록 방식과 이벤트 핸들러 어트리뷰트 방식의 차이는 무엇인가요?

## 간단 실습해보기
**input 값을 입력한 값을 TodoList에 추가하는 이벤트 구현해보기**
  - 어떤 DOM API를 쓰면 좋을지 고민해보기