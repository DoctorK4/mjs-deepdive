# 모던 자바스크립트 딥다이브

## 6. 데이터 타입
- JavaScript(ES6 버전 기준)에는 총 **7개의 데이터 타입**(**타입**/**Type**)이 존재한다.
- 7개의 데이터 타입은 다시 **원시 타입**(**primitive type**)과 **객체 타입**(**object type**/**reference type**)으로 나뉘어진다.
- 원시 타입(primitive type): 숫자 타입(number type), 문자열 타입(string type), 불리언 타입(boolean type), undefined 타입, null 타입, 심벌 타입(symbol type)이 여기에 속한다. 원시 타입은 같은 메모리 주소에 저장된 값을 변경할 수는 없고(**immutable value**) 대신 새로운 메모리 주소에 값을 저장한 후 변수에 재할당한다. 이런 원시 타입의 특징을 **불변성**이라고 부른다.
- 심벌 타입은 ES6 버전에서 추가된 원시 타입이다.

- 객체 타입(object type/reference type): 원시 타입을 제외한 모든 타입이 여기에 속한다. 객체 타입은 객체 데이터를 담은 메모리 주소를 변수에 담은 형태를 취한다. 객체를 할당한 변수는 재할당 없이 객체를 직접 변경할 수 있다(**mutable value**)
> [참고_링크1](https://devowen.com/481#%EB%AC%B8%EC%9E%90%EC%97%B4%EA%B3%BC%20%EB%B6%88%EB%B3%80%EC%84%B1-1)

### 6-1 숫자 타입
- JavaScript는 C, C++, Java처럼 int, float, double 같은 숫자 타입이 아니라 숫자 타입이 number 타입으로 통일되어 있다.
```javascript
let integer = 10; // 정수(양의 정수)
let double = 10.12; // 실수
let negative = -20; // 음의 정수
``` 

## 7. 연산자

### 7-1 산술 연산자