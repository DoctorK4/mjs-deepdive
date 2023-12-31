# 4. 변수

## 4-1. 변수란 무엇인가? 왜 필요한가?

- 변수란 : 하나의 값을 저장하기 위해 확보한 메모리 공간 (자체 또는 그 메모리 공간)을 식별하기 위해 붙인 이름

- 값의 위치를 가리키는 상징적인 이름

> 변수가 값을 저장한 메모리 주소를 가리키고 있기 때문에 직접 이진수로 된 메모리에 접근하거나 제어하지 않아도 편하게 값을 불러올 수 있는 것! 

- 할당 : 변수에 값을 저장하는 것
- 참조 : 변수의 값을 읽어들이는 것

## 4-2. 식별자

- 식별자란 : 변수의 이름, 어떤 값을 구별해서 식별할 수 있는 고유한 이름
- 식별자는 값이 아니라 메모리 주소를 기억하고 있다.

> 생각해봐야할 주제 : 변수와 식별자는 다른 것일까? 다르다면 어떻게 다른 것일까? 

## 4-3. 변수 선언

- var 선언
- let, const 선언 : ES6에서 도입

### 변수 선언 과정 정리 

> 상세하게 알아보고 가자!

1. 선언단계 : 변수 이름을 등록하고 값을 저장할 메모리 공간 확보

    - 선언단계 : 변수 이름을 등록하여 js엔진에 변수의 존재를 알리는 단계
2. 초기화단계 : 확보된 메모리 공간에는 `undefined` 값이 할당되어 초기화

    - 초기화 단계 : 변수가 선언된 이후 최초로 값을 할당하는 단계. 

> 예상면접질문 : var 선언만 하고 값이 할당되지 않은 변수를 출력하면 무슨 값이 나오는가?
---
### 선언되지 않는 식별자
선언되지 않은 식별자에 접근하면 ReferenceError가 발생한다. 

> 예상면접질문 : 선언하지 않은 a 변수를 콘솔에 출력하면 어떤 일이 일어나는가? 

## 4-4. 변수 선언의 실행 시점과 변수 호이스팅

```javascript
console.log(score);

var score;
```

변수 선언은 소스코드가 한 줄씩 순차적으로 실행되는 런타임 시점이 아니라 그 전에 이뤄진다.

코드만 봤을 때는, 참조 에러가 발생해야할 것 같지만 변수 선언이 먼저 실행되어 undefined가 할당된다. 

- 호이스팅 : 변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징
- var, let, const, function, function*, class 모두 호이스팅된다. 

> 이야기해보기 : let과 const로 선언한 변수들은 어떻게 될까요?

## 4-5. 값의 할당

선언과 다르게, 할당은 소스코드가 실행되는 시점인 런타임에 실행된다. 

> 용어 알고가기 : 런타임? 런타임언어? 런타임에러? (p.14 참고)

> 퀴즈 : 다음 예시 코드에 각 score가 콘솔에 어떻게 출력될까? 

```javascript
console.log(score);

score = 80;
var score;

console.log(score);

```

## 4-6. 값의 재할당

값의 재할당은 기존 값이 저장되어있던 메모리 공간을 지우고 새 값을 저장하는 것이 아니라, 새로운 메모리 공간을 확보하고 그곳에 값을 저장한 후 변수의 식별자가 그곳을 새롭게 가리키는 것이다. 

## 4-7. 식별자 네이밍 규칙

- 숫자로 시작하는 것은 안된다. 
- 특수문자로 시작하는 것도 안된다.
- 중간에 하이픈이 들어가면 안된다. 

# 5. 표현식과 문

## 5-1. 값

- 값 : 식이 평가되어 생성된 결과
- 평가 : 식을 해석해서 값을 생성하거나 참조하는 것

> 값을 생성하는 다양한 방식들에 대해 알아보자

## 5-2. 리터럴

- 리터럴 : (**생겨먹은 그대로**) 약속된 기호를 통해 값을 생성하는 표기법(방식)
> 값 그 자체를 쓰는 것

## 5-3. 표현식

- 표현식 : 값으로 평가될 수 있는 문. 결국 새로운 값을 생성하거나 값을 참조한다.
- 리터럴도 표현식이다. 
- 결국, 값으로 평가될 수 있는 문은 모두 표현식이다.
- 값이 올 수 있는 자리에 표현식도 올 수 있다.

### 표현식의 예시 
```javascript
square(); // 함수의 호출

person.name // 식별자 표현식
```

## 5-4. 문

- 문 : 프로그램을 구성하는 기본 단위이자 최소 실행 단위
- 토큰 : 문법적으로 더이상 나눌 수 없는 코드의 기본 요소

## 5-5. 세미콜론과 세미콜론 자동 삽입 기능

- 세미콜론은 문의 종료를 나타낸다. 
- 코드블록 뒤에는 세미콜론을 붙이지 않는다. 

> 토론 거리 : 여러분은 세미콜론을 붙이고 계신가요?

## 5-6. 표현식인 문과 표현식이 아닌 문

| 문||
|---|---|
|표현식인 문|표현식이 아닌 문|
|값으로 평가될 수 있는 문|값으로 평가될 수 없는 문|
|ex) 할당문 | ex)변수 선언문| 
### 표현식인 문과 표현식이 아닌 문을 구별하는 방법 
=> **"변수에 할당해보는 것"**

>**처음 알게된 사실** 
<br/>크롬 개발자 도구에서 표현식이 아닌 문은 undefined를 출력하고, 표현식인 문을 실행하면 평가된 값을 반환한다. 

> **이번 챕터에서 중요한 포인트**
<br/> 1. 많은 용어들에 대한 정의를 명확하게 기억하는 것
<br/> 2. 그 용어들간의 관계를 구조화하여 기억하는 것
