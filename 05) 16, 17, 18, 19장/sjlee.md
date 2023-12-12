# 16. 프로퍼티 어트리뷰트

## 내부 슬롯과 내부 메서드

- 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는다. 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티가 아니지만, **proto**를 통해 간접적으로 접근할 수 있다.

## 프로퍼티

자바스크립트 엔진은 프로퍼티를 생성할 때, 해당 4개의 값을 자동의로 정의한다.

| 데이터 프로퍼티(Data Property) | 접근자 프로퍼티(Access Property) |
| :----------------------------: | :------------------------------: |
|           [[Value]]            |             [[Get]]              |
|          [[Writable]]          |             [[Set]]              |
|         [[Enumerable]]         |          [[Enumerable]]          |
|        [[Configurable]]        |         [[Configurable]]         |

해당 Attribute에 직접 접근할 수 는 없지만, Object.getOwnPropertyDescriptor()를 사용해 간접적으로 확인할 수 있다.

## 객체 변경 방지 3가지

1. preventExtensions()
2. seal()
3. freeze()

```javascript
Quiz.
[1] 프로퍼티와 애트리뷰트를 직접 정의하기 위해서 쓸 수 있는 메서드는?
[2] Configurable이 false인 경우, 제한되는 것은?
[3] Object.seal() 메서드는 애트리뷰트 재정의가 가능하다. (O/X)
```

# 17. 생성자 함수에 의한 객체 생성

생성자 함수의 인스턴스 생성 과정

1. 인스턴스 생성과 this 바인딩
2. 인스턴스 초기화
3. 인스턴스 반환
   // **만약 여기서 명시적으로 원시 값을 반환해버린다면?**
   // **만약 여기서 명시적으로 다른 객체를 반환해버린다면?**

## 일반 객체는 호출할 수 없지만 함수는 호출할 수 있는 이유

- 함수 객체의 내부 슬롯에는 [[Environment]], [[FormalParameters]]가 있는데, [[Call]], [[Construct]]와 같은 내부 메서드를 추가로 가지고 있기 때문이다.

### 하지만 모든 함수가 constructor는 아니다.

<table>
  <tr align='center'><th>constructor 함수</th><th>non-constructor 함수</th></tr>
  <tr align='center'><td>함수 선언문, 함수 표현식, 클래스</td><td>메서드, 화살표 함수</td></tr>
</table>

##

```javascript
Quiz
[1] 객체리터럴로 객체를 생성시 단점은?
[2] 생성자 함수로 객체를 생성시 단점은?

function foo() {
  console.log(this);
}
foo(); // [3] ??

const obj = { foo };
obj.foo(); // [4] ??

const inst = new foo(); // [5] ??

[6] 생성자 함수가 new없이 호출되는 것을 방지하기 위해 사용할 수 있는 방법 2가지


[7] 이 둘은 동일하게 동작한다(O/X)
let obj1 = new Object();
let obj2 = Object();
```

# 18. 함수와 일급 객체

### 일급객체란?

1. 런타임에 생성가능한 무명의 리터럴로 생성 가능하다.
2. 변수나 자료구조에 저장할 수 있다.
3. 함수의 매개변수로 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

### 모든 객체는 [[prototype]]이라는 내부 슬롯을 갖는다.

```javascript
Quiz.

function foo(x){}
foo(1,2)
console.log(foo.length) // [1] ??

({}).hasOwnProperty('prototype'); // [2] ??

[3]
function callMethod(obj, method) {
  var shift = [].shift;
  shift.call(arguments);
  shift.call(arguments);
  return obj[method].apply(obj, arguments);
}
var obj = {
  add: function (x, y) {
    return x + y;
  },
};
callMethod(obj, 'add', 17, 25); // ??

function callMethod(obj, method) {
  var args = [].slice.call(arguments, 2);
  return obj[method].apply(obj, args);
}

[4]
function values(){
    var i =0, n = arguments.length;
    return {
        hasNext: function() {
            return i< n;
        }.
        next: function(){
            if(i>=n){
                throw new Error("end of iteration");
            }
            return arguments[i++];
        }
    }
}
var it = values(1,3,4,5,6,3,3,4,5,2);
it.next(); // ??
it.next(); // ??
it.next(); // ??

```

```javascript
// 올바른 사용 방법
function values(){
    var i =0, n = arguments.length, a = arguments;
    return {
        hasNext: function() {
            return i< n;
        }.
        next: function(){
            if(i>=n){
                throw new Error("end of iteration");
            }
            return a[i++];
        }
    }
}
```

# 19. 프로토타입

### 자바스크립트의 상속 메커니즘은 클래스가 아닌 프로토타입 기반이다.

✅ 프로토타입을 사용해야하는 기준을 항상 확인한다. 자세한 것은 아래 퀴즈에서!

- 모든 객체는 \_\_proto\_\_를 통해 자신의 프로토타입에 접근할 수 있다.

하지만 프로토타입의 참조를 취득하고 싶은 경우엔,  
\_\_proto\_\_가 아닌, Object.getPrototypeOf()를 사용하고, 교체하고 싶을 땐, setPrototypeOf()를 사용한다.

그 이유는 무엇일까?

> prototype의 가장 끝에는 \_\_proto\_\_로 접근하는 것이 불가능한 객체가 있기 때문이다.  
>  그래서 \_\_proto\_\_는 비표준이며 언제든 deprecated가 될 수 있다!

##

[1] 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.  
[2] 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.

> 깜짝 Quiz🧐  
> 그렇다면 생성자 함수에 의해 프로토타입이 교체되는 경우,  
> constructor 프로퍼티와 생성자 함수간의 연결은 파괴된다. (O/X)  
> 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결은 파괴된다. (O/X)

✅ Object.create()를 사용해야하는 이유

1. new 연산자 없이도 객체를 생성할 수 있다.
2. 프로토타입을 지정하면서 객체를 생성할 수 있다.
3. 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

상위 클래스의 생성자를 객체에서 호출한다면 해당 객체의 필드가 상위 클래스의 프로토타입에 저장되게 된다. 그래서 상위 클래스 생성자는 하위 클래스 프로토타입이 생성될 때가 아니라, 반드시 하위 클래스의 생성자로부터 호출되어야한다.

```javascript
// Item38 참조
SpaceShip.prototype = Object.create(Actor.prototype); // 👍🏻
SpaceShip.prototype = new Actor(); // ❌
```

##

```javascript
Quiz.

[1] 해당 예제의 문제점은?

function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

[2] 그렇다면 아래 예제는 ??

function Tree(x) {
  this.value = x;
}

Tree.prototype = {
  children: [],
  addChild: function (x) {
    this.children.push(x);
  },
};

var left = new Tree(2);
left.addChild(1);
left.addChild(3);

var right = new Tree(6);
right.addChild(4);
right.addChild(5);
right.children;


// 어떤 기준으로 prototype을 사용하는 것을 나누어야할까?

function Tree(x) {
  this.value = x;
  this.children = [];
}

Tree.prototype = {
  addChild: function (x) {
    this.children.push(x);
  },
};

[3] __proto__ .prototype Object.getPrototypeOf()의 차이점은?
```
