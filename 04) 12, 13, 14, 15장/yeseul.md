# 12장 함수
## 12.4.1 함수 선언문
Quiz. 함수 선언문은 표현식인 문이다. (O / X) 
Quiz. 아래 코드의 출력 값은?
```
function add(x, y) {
  return x + y
}
```

## 12.4.2 함수 표현식
Quiz. 아래 코드의 출력 값은?
```
var foo = function a() {
  console.log('foo')
}
a();
```

## 12.4.3 함수 생성 시점과 함수 호이스팅
Quiz. 함수 표현식은 호이스팅이 불가능한 이유.

## 12.5.2 인수 확인
Quiz. 아래 코드의 출력 값은?
```
function add(x, y) {
  return x + y;
}

console.log(add(2));
console.log(add('a', 'b'));
```

# 13장 스코프
## 13.1 스코프란?
Quiz. 아래 코드의 출력 값은?
```
var x = 'global';
function foo() {
  var x = 'local';
  console.log(x); // ?
}

foo();

console.log(x) // ?
```

Quiz. 아래 코드의 출력 값은?
```
function foo() {
  var x = 1;
  var x = 2;
  console.log(x) // ?
}
foo()
```
## 13.3.1
Quiz. 자바스크립트 엔진은 스코프 체인을 따라 변수를 참조하는 코드의 스코프에서 시작해 하위 스코프 방향으로 이동하며 선언된 변수를 검색한다. (O / X)
