# Park Kyuyeon Portfolio

Personal Brand Portfolio of Park Kyuyeon.

영문 브랜딩과 한국어 콘텐츠를 결합한 개인 포트폴리오입니다. 기존 editorial layout, kinetic typography, scroll interaction을 유지하면서 프로젝트와 경험을 한국어 중심으로 정리했습니다.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS 기반 기존 스타일 시스템
- GSAP / ScrollTrigger
- React Router (`HashRouter`)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

빌드 결과는 `dist/`에 생성됩니다.

## Project Structure

```text
src/
├─ data/
│  ├─ profile.ts       # 소개, 숫자, 경험, 기술, 연락처
│  └─ projects.ts      # 프로젝트 카드와 한국어 Case Study
├─ App.tsx             # 페이지, 모션, 라우팅
├─ main.tsx
├─ original.css        # 기존 배포 디자인에서 복구한 스타일
└─ styles.css          # 한국어 렌더링과 보완 스타일
```

실제 이메일, GitHub, LinkedIn, Instagram 주소와 프로젝트별 상세 수치가 확인되지 않은 곳은 명시적인 placeholder로 관리합니다. 공개 전에 `src/data/profile.ts`와 `src/data/projects.ts`를 실제 정보로 교체하세요.

## Deployment

GitHub Pages via GitHub Actions.

1. 이 프로젝트를 GitHub의 Public repository에 push합니다.
2. 저장소에서 `Settings → Pages → Build and deployment → Source`를 `GitHub Actions`로 설정합니다.
3. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드하고 배포합니다.

Vite `base`는 Actions 실행 시 `GITHUB_REPOSITORY`에서 저장소 이름을 읽어 자동 결정합니다.

- Project site: `https://USERNAME.github.io/REPOSITORY/`
- User site (`USERNAME.github.io` 저장소): `https://USERNAME.github.io/`

상세 페이지는 `HashRouter`를 사용하므로 GitHub Pages에서 직접 열거나 새로고침해도 404가 발생하지 않습니다.
