# 프로젝트 실행 가이드

## 기본 명령어

### 개발 환경 실행

- `pnpm dev`: 전체 서비스(프론트엔드 + 백엔드) 실행

- `pnpm dev:fe`: 프론트엔드만 실행 (프론트엔드 라이브러리 설치 후 재실행 시 사용)
- `pnpm dev:be`: 백엔드만 실행 (백엔드 라이브러리 설치 후 재실행 시 사용)

### 로그 확인

- `pnpm dev:logs`: 전체 서비스 로그 확인
- `pnpm dev:logs:fe`: 프론트엔드 로그만 확인
- `pnpm dev:logs:be`: 백엔드 로그만 확인

### 컨테이너 관리

- `pnpm down`: 실행 중인 컨테이너 중지
- `pnpm down:volumes`: 컨테이너 중지 및 볼륨 삭제
- `pnpm restart`: 전체 서비스 재시작 (중지 후 시작)
- `pnpm ps`: 실행 중인 컨테이너 상태 확인

### 쉘 접속

- `pnpm frontend`: 프론트엔드 컨테이너 쉘 접속
- `pnpm backend`: 백엔드 컨테이너 쉘 접속

### 기타

- `pnpm clean`: node_modules 및 dist 폴더 삭제

## 참고사항

- 모든 명령어는 프로젝트 루트 디렉토리에서 실행해야 합니다.
- Docker가 실행 중이어야 합니다.
- pnpm이 설치되어 있어야 합니다.
