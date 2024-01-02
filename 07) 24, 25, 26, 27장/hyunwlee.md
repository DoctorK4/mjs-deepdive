## 24. 클로저

> 클로저는 자바스크립트 고유의 개념이 아니다.  
>
> 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어에서 사용되는 중요한 특성이다.  
>
> `클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다. - MDN`  

```javascript
const x = 1;

function outerFunc() {
  const x = 10;
  function innerFunc() {
    console.log(x);
  }
  innerFunc();
}
outerFunc();
```

> 만약 innerFunc함수가 outerFunc함수의 내부에서 정의된 중첩 함수가 아니라면 innerFunc함수를 outerFunc 함수의 내부에서 호출한다 하더라도 outerFunc함수의 변수에 접근할 수 없다.  

```javascript
const x = 1;

function outerFunc() {
  const x = 10;
  innerFunc();
}

function innerFunc() {
  console.log(x);
}
outerFunc();
```

> 이 같은 현상이 발생하는 이유는 자바스크립트가 렉시컬 스코프를 따르는 프로그래밍 언어이기 때문이다.  

```javascript
const x = 1;

function outer() {
  const x = 10;
  const inner = function() {
    console.log(x);
  };
  return inner;
}

const innerFunc = outer();
innerFunc(); // 10
```

####   클로저의 활용

```  javascript
let num = 0;

const increase = function() {
  return ++num;
};

console.log(increase());
console.log(increase());
console.log(increase());
```

```javascript
const increase = (function() {
  let num = 0;
  return function() {
    return ++num;
  };
}());
```

```javascript
const Counter = (function() {
  let num = 0;
  function Counter() {
    // this.num = 0; // 프로퍼티는 public하므로 은닉되지 않는다. 
  }
  Counter.prototype.increase = function() {
    return ++num;
  };
  Counter.prototype.decrease = function() {
    return num > 0 ? --num : 0;
  };
  return Counter;
}());

const counter = new Counter();

console.log(counter.increase());
console.log(counter.increase());
console.log(counter.decrease());
console.log(counter.decrease());
```

  

incorrect case)

```javascript
function makeCounter(aux) {
  let counter = 0;
  return function() {
    counter = aux(counter);
    return counter;
  };
}

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2


const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

correct case)

```javascript
const counter = (function() {
  let counter = 0;
  return function(aux) {
    counter = aux(counter);
    return counter;
  };
}());

function increase() {
  return ++n;
}

function decrease() {
  return --n;
}


const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2


const decreaser = makeCounter(decrease);
console.log(decreaser()); // 1
console.log(decreaser()); // 0
```



---



> closure와 함수형 컴포넌트

```javascript
function createHook(initialValue) {
  let state = initialValue; // 상태를 클로저 내부에 저장
  
  function useState() {
    function setState(newSate) {
      state = newState; // 상태 업데이트
      console.log('새로운 상태: ', state);
    }
    return [state, setState];
  }
  return useState;
}

// 컴포넌트를 모방하는 함수
function MyComponent() {
  const useState = createHook(0); // 초기 상태는 0
  const [count, setCount] = useState();
  
  console.log('현재 상태: ', count);
    
  return {
    increment: () => setCount(count + 1) // 상태 증가 함수
  };
}

// 컴포넌트 사용
const component = MyComponent();
component.increment(); // 상태를 1로 증가
component.increment(); // 상태를 2로 증가
```



> 함수 prototype 프로퍼티와 클래스 prototype 프로퍼티의 차이?

모든 함수 객체가 가지고 있는 prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor 프로퍼티는 클래스 자신을 가리키고 있다.

> 서브클래스에서 constructor를 생략하면 암묵적으로 정의되는 코드는?

``` javascript
constructor(...args) {
  super(...args);
}
```

  



