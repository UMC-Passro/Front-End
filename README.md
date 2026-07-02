# 패스로(Passro)

## 1. 프로젝트 소개

본 프로젝트는 대학생이 매일 오가는 통학 경로를 활용해 소형 택배를 대신 배송해주는 P2P 배송 플랫폼을 목표로 하는 웹 서비스입니다.

사용자가 배송 요청 등록, 운송 가능 경로 확인, 매칭, 배송 진행 상태 확인 등의 핵심 기능을 보다 쉽고 편리하게 이용할 수 있도록 프론트엔드와 백엔드를 분리하여 개발합니다.

## 2. 팀원 및 프론트엔드 역할 분담

| 이름 | 역할 | 담당 업무 |
|---|---|---|
| 이름 | Frontend | UI 구현, 페이지 라우팅, API 연동 |
| 이름 | Backend | API 개발, DB 설계, 인증 처리 |
| 이름 | Backend | 서버 배포, 데이터 관리 |

## 3. 기술 스택

### Frontend

- React
- TypeScript
- Vite
- CSS / Tailwind CSS

### 협업 도구

- GitHub
- Notion
- Discord / KakaoTalk

## 4. 폴더 구조

```bash
src
├── assets
├── components
├── pages
├── hooks
├── apis
├── types
├── utils
└── App.tsx
```

## 5. 브랜치 전략

```bash
main
└── dev
    └── feature/기능명
```

- `main`: 최종 배포용 브랜치
- `dev`: 개발 통합 브랜치
- `feature`: 기능 단위 작업 브랜치

## 6. 커밋 컨벤션

```bash
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
chore: 기타 설정 변경
```

예시:

```bash
feat: 로그인 페이지 UI 구현
fix: 라우팅 오류 수정
docs: README 실행 방법 추가
```

## 7. PR 컨벤션

PR 작성 시 다음 내용을 포함합니다.

```md
## 작업 내용
- 구현한 기능 설명

## 변경 사항
- 수정된 주요 파일 또는 구조

## 확인 사항
- 실행 여부
- 에러 여부
- 추가 확인이 필요한 부분
```

## 8. 실행 방법

```bash
npm install
npm run dev
```

개발 서버 실행 후 브라우저에서 아래 주소로 접속합니다.

```bash
http://localhost:5173
```

## 9. 화면 목록 및 플로우

### 화면 목록

- 메인 페이지
- 로그인 페이지
- 회원가입 페이지
- 배송 요청 등록 페이지
- 배송 매칭 페이지
- 배송 진행 상태 페이지
- 배송 완료 페이지
- 마이페이지
