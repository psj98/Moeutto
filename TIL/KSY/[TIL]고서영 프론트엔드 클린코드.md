## 실무에서 클린 코드의 의의
`유지보수 시간의 단축`
- 코드 파악
- 디버깅
- 리뷰
- 시간=자원=돈

## 안일한 코드 추가의 함정
**기능 추가 요청이 들어온 경우**
1. 기존 코드 파악
```javascript
function QuestionPage() {
    async function handleQuestionSubmit() {
        // 1. 연결 중인 전문가가 있으면 팝업 띄우는 로직을 추가해보자
        const 약관동의 = await 약관동의 받아오기();
        if (!약관동의) {
            await 약관동의_팝업일기();
        }
        // 약관동의 필요하면 팝업 띄우기
        await 질문전송(questionValue);
        alert("질문이 등록되었어요");
        // 질문 전송 성공 Alert
    }
    return (
        <main>
            <form>
                <textarea placeholder="어떤 내용이 궁금한가요?"/>
                {/* 2. 팝업 컴포넌트를 추가해보자 */}
                <Button onClick={handleQuestionSubmit}>질문하기</Button>
                {/* 질문하기 버튼 클릭 */}
    )
}
```

2. 나쁜 코드의 예시
```javascript
function QuestionPage() {
    const [popupOpened, setPopupOpened] useState(false); // 팝업 상태
    async function handleQuestionSubmit() {
        // 연결 중인 전문가가 있으면 팝업 띄우기
        const 연결전문가 = await 연결전문가_받아오기();
        if (연결전문가 !== null) {
            setPopupOpened(true);
        }
        const 약관동의 = await 약관동의 받아오기();
        if (!약관동의) {
            await 약관동의_팝업일기();
        }
        // 약관동의 필요하면 팝업 띄우기
        await 질문전송(questionValue);
        alert("질문이 등록되었어요");
        // 질문 전송 성공 Alert
    }
    // 팝업 버튼 클릭 핸들러
    async funtion handleMyExpertQuestionSubmit() {
        await 연결전문가_질문전송(questionValue, 연결전문가.id);
        alert(`${연결전문가.name}에게 질문이 등록되었어요.`);
    }
    return (
        <main>
            <form>
                <textarea placeholder="어떤 내용이 궁금한가요?"/>
                {/* 팝업 컴포넌트 */}
                {popupOpened && (
                <연결전문가 팝업 obSubmit={handleMyExpertQuestionSubmit} />
                )}
                <Button onClick={handleQuestionSubmit}>질문하기</Button>
                {/* 질문하기 버튼 클릭 */}
    )
}
```
- 나쁜 코드가 된 이유
    - 하나의 목적인 코드가 흩뿌려져 있다.
    - 하나의 함수가 여러 가지 일을 하고 있다.
    - 함수의 세부 구현 단계가 제각각이다.

- 리팩토링 단계
    - 함수 세부 구현 단계 통일
        ```javascript
        function QuestionPage() {
            const 연결전문가 = useFetch(연결전문가_받아오기);

            async function handleNewExpertQuestionSubmit() {
            await 질문전송(questionValue);
            alert("질문이 등록되었어요.");
            }
            async function handleMyExpertQuestionSubmit() {
                await 연결전문가_질문전송(questionValue, 연결전문가.id);
                alert(`${연결전문가.name}에게 질문이 등록되었어요.`);
        }
        ```
    - 하나의 목적인 코드는 뭉쳐 두기
     ```javascript
      return (
        <main>
            <form>
                <textarea placeholder="어떤 내용이 궁금한가요?"/>
                {연결전문가.connected ? (
                    <PopupTriggerButton
                    popup={(
                        <연결전문가팝업
                        onButtonSubmit={handleMyExpertQuestionSubmit}/>
                    )}
                )}
                >
                    질문하기 </PopupTriggerButton>
      ) : ()
    )
    ```
    - 함수가 한 가지 일만 하도록 쪼개기
    ```javascript
        <Button onclick={asycn () => {
            await openPopupToNotAgreedUsers();
            await handleMyExpertQuestionSubmit();
        }}
        >
        질문하기
        </Button>
    )}
        </form>
    </main>
    
    async function openPopupToNotAgreedUsers() {
        const 약관동의 = await 약관동의_받아오기();
        if (!약관동의) {
            await 약관동의_팝업일기();
        }
    }
    ```


```
클린 코드 != 짧은 코드
    == 원하는 로직을 빠르게 찾을 수 있는 코드
```

**원하는 로직을 빠르게 찾으려면?**
* 응집도: 하나의 목적을 가진 코드가 흩뿌려져 있음
* 단일책임: 함수가 여러 가지 일을 하고 있음
* 추상화: 함수의 세부구현 단계가 제각각

## 로직을 빠르게 찾을 수 있는 코드
**응집도**
> 같은 목적의 코드는 뭉쳐 두자 (핵심 데이터와 세부 구현 나누기)
  핵심 데이터는 밖에서 전달, 나머지는 뭉친다

* 원본 코드
    ```javascript
        function QuestionPage() {
            const [popupOpened, setPopupOpened] = useState(false);
            async function handleClick() {
            setPopupOpened(true);
            }
            function handlePopupSubmit() {
            await 질문전송(연결전문가.id);
            alert("질문을 전송했습니다.")
            }
            return (
            <>
            <button onClick={handleClick}>질문하기</button>
            <Popup title="보험 질문하기" open={popupOpened}>
            <div>전문가가 설명드려요</div>
            <button onClick={handlePopupSubmit}>확인</button>
            </Popup>
            </>
            );
        }
    ```
    
**단일책임**
> 하나의 일을 하는 뚜렷한 이름의 함수를 만들자

* 함수의 이름: 중요 포인트가 모두 담겨 있지 않은 함수명은 위험하다
    * 기능 추가 시 함수의 이름은 더 복잡해지므로 한 가지 일만 하는, 명확한 이름의 함수가 필요하다
* 한 가지 일만 하는 기능성 컴포넌트
    * before
        ```javascript
            <button
                onClick={async () => {
                    lot('제출 버튼 클릭')
                    await openConfirm();
                }}
            />
        ```
        버튼 클릭 함수에 로그 찍는 함수와 API 콜이 섞여 있다
    * after
        ```javascript
            <LogClick message="제출 버튼 클릭">
                <button onclick={openConfirm} />
            </LogClick>
        ```
        로그는 버튼을 감싼 컴포넌트에서 찍고, 버튼 클릭 함수에는 API 콜만 신경쓴다

