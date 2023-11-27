## 8. 제어문

- 제어문(control flow statement)의 정의: 코드의 순차적인 흐름을 제어할 때 사용하는 문. 조건문(conditional statement)과 반복문(loop statement)이 여기에 속한다.

- 제어문을 사용하면 코드의 실행을 인위적으로 제어할 수 있지만, 코드의 흐름을 이해하기 어렵게 만들어서 가독성을 해칠 수 있다는 단점을 가지고 있다.

> **예상질문**

> Q. 제어문말고 코드 가독성을 해치는 요소가 무엇이 있나?

> A: 전역 변수 남발, 의미 없는 변수/값(매직 넘버/매직 스트링), 코드가 긴 함수 또는 블록, 불필요한 주석 등

### 8-1 블록문

- 블록문(block statement)의 정의: 0개 이상의 문을 중괄호로 묶은 문. 코드 블록(code block) 또는 블록이라고 부른다.

- JavaScript는 블록문을 하나의 실행 단위로 취급한다.

- 단독으로 사용 가능하나, 일반적으로 함수를 정의할 때 사용한다.

- 블록문은 언제나 문의 종료를 의미하는 자체 종결성을 갖기 때문에 끝에 세미콜론을 붙이지 않는다.

### 8-2 조건문

- 조건문(conditional statement)의 정의: 주어진 조건식(conditional expression)의 평가 결과(값)에 따라 코드 블록(블록문)의 실행을 결정하는 문

- 조건문의 조건식은 불리언 값(논리적 참 또는 거짓)을 반환한다.

- **if ... else문**: 주어진 조건식의 평가 결과에 따라 실행할 코드 블록을 결정하는 조건문
    - 조건식의 평가 결과가 true일 경우 if 문의 코드 블록, false일 경우 else 문의 코드 블록이 실행된다.

    - if 문의 조건식 평가 결과가 불리언 값이 아닐 경우 JavaScript 엔진에 의해 암묵적 타입 변환이 일어난다.

    - 조건에 따라 실행될 코드 블록을 늘리려면 else if 문을 사용한다.
    ```javascript
    if(/*조건식1*/) {
        // 조건식1이 참이면 이 코드 블록이 실행됨
    } else if(/*조건식2*/) {
        // 조건식2가 참이면 이 코드 블록이 실행됨
    } else {
        // 조건식1과 조건식가 모두 거짓이면 이 코드 블록이 실행됨
    }
    ```

    - else if문은 여러 번 사용할 수 있다.

    - else if 문과 else 문은 작성하지 않아도 동작하는 데에 문제가 없다.

    - 코드 블록 내의 문이 하나만 있을 경우 중괄호 생략이 가능하다.
    ###if ... else 문의 중괄호 생략
    ```javascript
    let num = 10;
    let kind;

    if(num > 0) kind = "양수";
    else if(num < 0) kind = "음수";
    else        kind = '0';

    console.log(kind);
    ```

    - 조건에 따라 단순히 값을 결정하여 변수에 할당하는 경우는 가독성 측면에서 if ... else 문보다 삼항 조건 연산자가 더 좋다.
    ###if ... else 문 => 삼항 조건 연산자
    ```javascript
    const num = 2;

    let result = num % 2 ? "홀수" : "짝수";
    console.log(result); // 짝수
    ``` 
> **깨달은 점**

> 조건에 따라 실행되는 문이 복잡할 경우 삼항 연산자보다는 if ... else 문을 권장한다는 것을 알 수 있었다.

- **switch 문**: 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case 문으로 실행 흐름을 옮기는 조건문
    - case 문은 상황을 의미하는 표현식을 지정하고 콜론(**:**)으로 마치고, 그 뒤에 실행할 문들을 위치시킨다.
    - switch 문의 표현식과 일치하는 case 문이 없다면 default 문으로 이동한다. default 문은 선택사항이다.
    - switch 문은 논리적 참, 거짓보다는 다양한 상황(case)에 따라 실행할 코드 블록을 결정할 때 사용한다.
    ```javascript
    // switch 문의 표현식은 문자열이나 숫자 값으로 평가되는 경우가 많다.
    switch(표현식) {
        case 표현식1:
            /*switch*/ 문의 표현식과 표현식1이 일치하면 실행될 문
            break;        
        case 표현식2:
            /*switch*/ 문의 표현식과 표현식2가 일치하면 실행될 문
            break;
        default:
            /*switch*/의 표현식과 일치하는 /*case*/ 문이 없을 때 실행될 문
    }

    /*
    각 case 문에 break 문을 넣지 않을 경우
    맨 첫 번째 case문 부터 switch 문이 끝날 때까지
    각 case 문과 default 문을 실행하는 현상을
    "폴 스루(fall through)"라고 부른다.
    */ 

    ```
    > **폴 스루(fall through)**
    
    > 각 case 문에 break 문을 넣지 않을 경우 맨 첫 번째 case문 부터 switch 문이 끝날 때까지 각 case 문과 default 문을 실행하는 현상.

    > **예상 질문**
    
    > Q. switch 문과 if ... else 문의 차이점을 설명하시오
    
    > A: switch 문은 문자열 또는 숫자값으로 평가되는 표현식과 일치하는 case 문의 표현식을 찾아 문을 실행한다. if ... else 문은 불리언 값으로 평가되는 표현식의 평가 결과에 따라 실행할 코드 블록을 결정한다.
### 8-3 반복문

- 반복문(loop statement)의 정의: 조건식의 평가 결과가 거짓일 될 때까지 코드 블록을 실행하는 문

- **for 문**
    ###for 문 양식
    ```javascript
    for(/*변수 선언문 또는 할당문; 조건식; 증감식*/) {
        /*조건식이 참인 경우 반복 실행될 문*/
    }
    ```
    
    - for 문의 실행 순서
        1. 변수 선언문 또는 할당문이 단 한 번만 실행된다.
        2. 변수 선언문 또는 할당문의 실행이 종료되면 조건식이 실행된다.
        3. 조건식의 평가 결과가 true가 나오면 코드 블록이 실행된다.
        4. 코드 블록의 실행이 종료되면 증감식이 실행된다.
        5. 증감식 실행이 종료되면 다시 조건식이 실행된다.
        6. 조건식의 평가 결과가 false가 나올 때까지 반복된다. false가 나오면 for 문의 실행이 종료되고 그 다음 코드로 넘어간다.
    - for 문의 변수 선언문 또는 할당문, 조건식, 증감식은 모두 옵션이므로 반드시 사용할 필요는 없다. 단, 어떤 식도 사용하지 않으면 무한루프가 된다.
    ###for 문의 무한루프
    ```javascript
    // 어떤 식도 사용하지 않는 for 문은 코드 블록을 무한히 반복 실행한다.
    for (;;) { /*...*/ }
    ```

    - for 문 내에 for 문을 중첩해 사용할 수 있다.

- **while 문**
    ###while 문 양식
    ```javascript
    let count = 0;

    // while 문은 평가 결과가 false가 될 때까지 코드 블록을
    // 계속해서 반복 실행한다.
    // count 변수의 값이 3보다 작을 때까지 코드 블록을 반복 실행한다.
    while(count < 3) {
        console.log(count); // 0 1 2
        count++;
    }
    ```

    - while 문의 평가 결과가 언제나 true일 경우 무한루프가 된다. 무한루프에서 탈출하려면 코드 블록 안에 if 문으로 탈출 조건을 만들고 break 문으로 코드 블록을 탈출한다.
    ###while 문의 무한루프
    ```javascript
    // 무한루프
    while(true) { /*...*/}
    ```

    ###while 문의 무한루프에서 탈출하기
    ```javascript
    let count = 0;

    // 무한루프
    while (true) {
        console.log(count);
        count++;
        // count가 3이면 코드 블록을 탈출한다.
        if (count === 3) break;
    }
    ```
- **do ... while 문**
    ###do ... while 문 양식
    ```javascript
    let count = 0;

    // count가 3보다 작을 때까지 코드 블록을 계속 실행한다.
    do {
        console.log(count); // 0 1 2
        count++;
    } while (count < 3);
    ```

    - do ... while 문은 코드 블록을 먼저 실행하고 조건식을 평가하는 반복문이다. 

### 8-4 break 문
- break 문(break statement)의 정의: 레이블 문(label statement), 반복문, switch 문의 코드 블록을 탈출시키는 문
    - 레이블 문, 반복문, switch 문의 코드 블록 외에 break 문을 사용하면 __SyntaxError__(문법 에러)가 발생한다.
    ```javascript
    // 레이블 문: 식별자가 붙은 레이블 문
    // break 문과 continue 문과 같이 쓰인다.
    
    // Yeonjun이라는 식별자가 붙은 레이블 블록문
    Yeonjun: {
        console.log(1);
        break Yeonjun; // Yeonjun 레이블 블록문을 탈출한다.
        console.log(2);
    }

    console.log("Done!");
    ```
    > **레이블 문**

    > 식별자가 붙은 문. 프로그램의 실행 순서를 제어하기 위해 break 문과 continue 문과 같이 쓰인다.

    - 중첩된 for 문의 내부 for 문에서 break 문을 실행하면 내부 for 문을 탈출하여 외부 for 문으로 진입한다. 레이블 문의 코드 블록을 탈출하려면 레이블 문의 식별자를 같이 작성한다.
    ```javascript
    outer : for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
            if ( i + j === 3) break outer;
            console.log(`inner ${i} ${j}`)
        }
    }
    ```

### 8-5 continue 문
- continue 문(continue statement)의 정의: 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시키는 문. break 문처럼 반복문을 탈출하지는 않는다.

> **예상 질문**

> Q. break 문과 continue 문의 차이점을 설명하시요

> A: break 문은 특정 조건이 되면 반복문의 코드 블록을 중단하고, 반복문을 빠져 나온다. 레이블 문일 경우 break 문 뒤에 레이블 식별자를 입력하면 레이블 문 코드 블록을 빠져나온다. continue 문은 특정 조건일 때만 잠시 코드 블록을 중단하고, 해당 조건이 아닐 경우 다시 코드 블록을 실행시킨다. 레이블 문일 경우에도 특정 조건문 코드 블록 안에 continue 문 뒤에 레이블 식별자를 입력하면 잠시 레이블 문 코드 블록을 빠져나온 뒤 다시 레이블 문 코드 블록을 진행한다.

## 9. 타입변환과 단축평가

## 10. 객체 리터럴

## 11. 원시값과 객체의 비교