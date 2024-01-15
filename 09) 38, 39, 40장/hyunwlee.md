## 38. 브라우저의 렌더링 과정

DOM이 Tree형태의 자료구조로 되어있는 이유.

> HTML요소는 중첩 관계를 갖는다. HTML 요소의 콘텐츠 영역에는 텍스트뿐만 아니라 다른 HTML 요소도 포함될 수 있다.

  

렌더트리에서 포함되지 않는 노드

> meta 태그, script 태그 in HTML, display: none in CSS

  

렌더링 엔진에서 자바스크립트 엔진에 제어권이 넘어가는 경우

> HTML 파싱 중 script 태그를 만났을 때



?

> 참고로 V8엔진의 경우 자주 사용되는 코드는 터보팬<sup>TurboFan</sup>이라 불리는 컴파일러에 의해 최적화된 머신 코드<sup>optimized machine code</sup>로 컴파일되어 성능을 최적화한다. 만약 코드의 사용 빈도가 적어지면 다시 디옵티마이징<sup>deoptimizing</sup>하기도 한다.

  

## 39. DOM  

how convert `HTMLCollection(Array-Like)` to `Array`

> 3가지 방법

```html
<!DOCTYPE>
<html>
  <body>
    <ul>
      <li id='apple'>Apple</li>
      <li id='banana'>Banana</li>
      <li id='orange'>Orange</li>
    </ul>
    <script>
     const $elems = document.getElementsByTagName('li');
     // Error
     //$elems.forEach(elem => {elem.style.color = 'red'});

     // 1. this바인딩 parameter 전달
     Array.prototype.forEach.call($elems, (elem) => {
       elem.style.color = 'red';
     });

     // 2.
     [...$elems].forEach(elem => { elem.style.color = 'red' });

     // 3. 채신문법
     Array.from($elems).forEach(elem => { elem.style.color = 'red' });
    </script>
  </body>
</html>
```

  

?  

```
DOM컬렉션 객체인 NodeList객체는 유사배열이면서 이터러블이다.
따라서, for...of문으로 순회할 수 있다.
Array vs Array-Like vs Iterable vs Iterator

NodeList는 forEach 메서드를 제공한다.
위 예제처럼 HTMLCollection은 제공안한다.
```

  

이벤트 위임을 사용할 때 유용한 Eelement.prototype은?

>  matches 메서드  

  

HTMLCollection의 for문 순회 문제에 해결 3가지 방법은?

> 역방향 순회, 무한 while 문, HTMLCollection 본체 쓰지 마세요. 고차함수로 해결하세요.



NodeList 사용 시 조심해야 할 점

> childNodes 프로퍼티가 반환하는 NodeList 객체는 HTMLCollection 객체와 같이 실시간으로 노드 객체의 상태 변경을 하는 live 객체로 동작하므로 주의가 필요하다.

  

자식 노드 중에 텍스트 노드가 아닌 요소 노드가 존재하는지 확인하려면?

> children.length, childElementCount in Element 인터페이스

  

textContent 프로퍼티와 유사한 동작을 하는 innerText 프로퍼티는 지양하는 것이 좋다. 그 이유는?

> - CSS에 순종적이다. 예를 들어 innerText 프로퍼티는 CSS에 의해 비표시(visibility : hidden;)로 지정된 요소 노드의 텍스트를 반환하지 않는다.
> - innerText 프로퍼티는 CSS를 고려해야 하므로 textContent 프로퍼티보다 느리다.

  

innerHTML 사용 시 단점

> - 사용자로부터 입력받은 데이터를 그대로 innerHTML 프로퍼티에 할당하는 것은  
>
> 크로스 사이트 스크립팅 공격 (XSS: Cross-Site Scripting Attacks)에 취약하므로 위험하다.  
>
>   
>
> HTML5에서 에러 이벤트를 강제로 발생 시켜 자바스크립트 코드가 실행되도록 한다면
>
> HTML sanitization을 사용하면 된다.
>
>   
>
> - innerHTML로 할당 시 모든 자식 노드를 제거하고 새로 생성한다.
> - 새로운 요소를 삽입할 때 삽입될 위치를 지정할 수 없다.

  

Document.Fragment는 언제 사용하는 것인가?

> 복수의 노드 생성과 추가를 하면 reflow, repaint를 한번으로 줄이기 위해서 불필요한 container(div)를 남발하기 마련이다. 이를 해결하기 위해 사용한다.  

  

setAttribute는  

1. DOM 프로퍼티를 변경하는 것이다.
2. HTML 어트리뷰트를 변경하는것이다.

> 2

   

HTML 어트리뷰트와 DOM 프로퍼티 둘 다 존재하는 이유는?

> input과 checkbox 입력 필드는 초기상태와 최신상태를 가지고 있어야 한다.  

  

## 40. 이벤트



이벤트 핸들러 등록하는 3가지 방법

> - 이벤트 핸들러 어트리뷰트 방식
>   - on 접두사 + 이벤트 타입으로 이루어져 있다.
>   - 어트리뷰트 값으로 함수 참조가 아닌 함수 호출문 형태로 등록
>     - 이벤트 핸들러 어트리뷰트 값은 사실 암묵적으로 생성될 이벤트 핸들러의 함수 몸체를 의미한다.
>     - 이처럼 동작하는 이유는 이벤트 핸들러에 인수를 전달하기 위해서다.
>     - CBD<sup>Component Based Development</sup>방식 같은 프레임워크/라이브러리에서는 이벤트 핸들러 어트리뷰트 방식으로 이벤트를 처리한다.
>       - CBD에서는 HTML, CSS, 자바스크립트를 관심사가 다른 개별적인 요소가 아닌, 뷰를 구성하기 위한 구성 요소로 보기 때문에 관심사가 다르다고 생각하지 않는다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button onclick="sayHi('Lee')">Click me!</button>
    <script>
      function sayHi(name) {
        console.log(`Hi! ${name}.`);
      }
    </script>
  </body>
</html>

// 암묵적 생성
function onclick(event) {
  sayHi('Lee');
}
```

> - 이벤트 핸들러 프로퍼티 방식
>   - 이벤트 핸들러 프로퍼티에 함수를 바인딩하면 이벤트 핸들러가 등록된다.
>   - 이벤트 핸들러를 등록하기 위해서
>     - 이벤트를 발생시킬 개체인 `이벤트 타깃`<sup>event target</sup> 지정
>     - 이벤트의 종류를 나타내는 문자열 `이벤트 타입`<sup>event type</sup> 지정
>     - `이벤트 핸들러` 지정
>   - 하나의 이벤트 핸들러만 바인딩할 수 있다는 단점이 있다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector('button');
      // 두 번째 바인딩된 이벤트 핸들러에 의해 재할당되어 실행되지 않는다.
	  $button.onclick = function() {
	    console.log('Button clicked 1');
	  };
	  $button.onclick = function() {
	    console.log('Button clicked 2');
	  };
    </script>
  </body>
</html>
```

> - addEventListener 메서드 방식
>   - on 접두사를 붙이지 않는다.
>   - 마지막 매개변수에는 이벤트를 캐치할 이벤트 전파 단계(캡처링 또는 버블링)를 지정한다.
>   - 하나 이상의 이벤트 핸들러를 등록할 수 있다.
>     - 참조가 동일한 이벤트 핸들러를 중복 등록하면 하나의 핸들러만 등록된다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector('button');
      $button.onclick = function() {
	    console.log('[이벤트 핸들러 프로퍼티 방식]button click');
	  };
	  $button.addEventListener('click', function() {
	    console.log('[addEventListener 메서드 방식]button click');
	  });
    </script>
  </body>
</html>
```

  

이벤트 전파 3단계

> - 캡처링 단계: 이벤트가 상위 요소에서 하위 요소 방향으로 전파
> - 타깃 단계: 이벤트가 이벤트 타겟에 도달
> - 버블링 단계: 이벤트가 하위 요소에서 상위 요소 방향으로 전파



각각의 이벤트 핸들러 방식의 this 설명

> - 이벤트 핸들러 어트리뷰트 방식 this
>   - 일반 함수
>     - window
>   - 암묵적 변환되는 이벤트 핸들러
>     - 이벤트를 바인딩한 DOM 요소
> - 이벤트 핸들러 프로퍼티 방식 / addEventListener 방식 this
>   - 이벤트를 바인딩한 DOM 요소

  

클래스에서 이벤트 핸들러를 바인딩하는 경우 this에 주의해야 한다. 그 이유와 해결법?

> 이벤트 핸들러 내부의 this는 이벤트를 바인딩한 DOM 요소를 가리키기 때문에 클래스 내부 프로퍼티를 참조해야 할 경우 
>
> - bind 메서드를 사용해 인스턴스를 this에 전달해야 한다.
>
> - 화살표함수를 사용하여 내부의 this를 인스턴스를 가리키도록 한다.



  





  









  

