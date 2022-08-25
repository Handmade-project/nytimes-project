# 🔍 뉴욕타임즈 기사 검색 웹 프로젝트

🪄 개요
리액트를 이용한 뉴욕타임즈 기사 검색 프로젝트입니다.
자신이 보고자 하는 뉴욕타임즈기사를 검색하는 것을 목적으로 하고 있습니다.

## 📚 메인 기술

- <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
- <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
- <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

## ✅ 요구사항

### 필수 요구사항 - Routing

- [ ] "/" url에서는 기사 검색 페이지 랜더한다.
- [ ] "/clip" url에서 내가 clip한 기사 페이지 랜더한다.
- [ ] 그 외 url은 "/"로 redirect 진행한다.

### 필수 요구사항 - input

- [ ] 마지막 타이핑 이후 0.5초 동안 추가 입력이 없으며, input value가 있는 경우 검색 api 호출한다.
- [ ] 최대 5개까지 search history 저장한다. (브라우저 종료해도 지속)
- [ ] search history가 존재하고 input에 focus 중이면 search history 노출한다.

### 필수 요구사항 - news list

- [ ] "/"와 "/clip"은 기사 리스트를 렌더한다.
- [ ] 기사 리스트는 다음 내용을 포함하는 기사 카드를 렌더한다. (타이틀 / 날짜 / clip하기 버튼 / 자세히 보기 버튼)
- [ ] infinite scroll (스크롤이 마지막에 닿았을 때 다음 페이지 요청)
- [ ] 첫 페이지가 화면의 높이를 모두 채우지 못한 경우에도 페이지 요청

### 필수 요구사항 - clip

- [ ] 기사 카드의 clip버튼을 클릭하여 해당 기사를 즐겨찾기한다.
- [ ] clip된 기사들은 "/clip"에서 확인할 수 있다.
- [ ] clip된 기사들은 브라우저를 재시작하여도 유지된다.
- [ ] 기사를 unclip 하면 더는 "/clip"에서 확인할 수 없다.

### 기타 요구사항

- [ ] create-react-app 사용
- [ ] react-router-dom 사용
- [ ] redux 사용
- [ ] 스타일링 및 방식은 자유 (css, styled-components 등)
- [ ] nyt api token은 본인이 가입하여 발급하기

## 🤼‍♀️ 팀 구성

|                                  정호윤                                   |                                이보룡                                 |                                   박소예                                   |                                김민지                                |                                 윤한솔                                 |
| :-----------------------------------------------------------------------: | :-------------------------------------------------------------------: | :------------------------------------------------------------------------: | :------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|              [@Jeong-hoyun](https://github.com/Jeong-hoyun)               |                [@roroism](https://github.com/roroism)                 |              [@stardust6653](https://github.com/stardust6653)              |                 [@MinJ33](https://github.com/MinJ33)                 |                [@1sol2sol](https://github.com/1sol2sol)                |
|                                                                           |
| <img src="https://avatars.githubusercontent.com/Jeong-hoyun" width="100"> | <img src="https://avatars.githubusercontent.com/roroism" width="100"> | <img src="https://avatars.githubusercontent.com/stardust6653" width="100"> | <img src="https://avatars.githubusercontent.com/MinJ33" width="100"> | <img src="https://avatars.githubusercontent.com/1sol2sol" width="100"> |

## 🤼‍♀️ 조원 한마디

- 정호윤 미니프로젝트 파이팅~!

- 이보룡 모두 즐거운 프로젝트 되셨으면 좋겠습니다! 화이팅~!

- 윤한솔 살려주세여 ㅠㅠㅠㅠㅠ

- 김민지 제발 살려주세여 ㅠㅠㅠㅠㅠ 화이팅~!

- 박소예 ...죽여줘

