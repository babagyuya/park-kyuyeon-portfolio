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
│  ├─ profile.ts                 # 소개, 숫자, 관심사
│  ├─ works.ts                   # 프로젝트와 Case Study, 이미지 Gallery
│  ├─ experiences.ts             # 전체 이력
│  ├─ skills.ts                  # 기술 카테고리
│  ├─ certifications.ts          # 자격사항
│  ├─ brandCollaborations.ts     # 브랜드 협업
│  └─ contact.ts                 # 공개 연락처
├─ App.tsx             # 페이지, 모션, 라우팅
├─ main.tsx
├─ original.css        # 기존 배포 디자인에서 복구한 스타일
└─ styles.css          # Pretendard, Case Study, 반응형 보완 스타일
```

공개 연락처는 `src/data/contact.ts`에서 관리하며, 실제로 공개할 채널만 화면에 표시합니다.

## Project Images

프로젝트 이미지는 `public/images/projects/<project-slug>/` 아래에 저장합니다.

예를 들어 `public/images/projects/swith/hero.webp`를 추가했다면 `src/data/works.ts`에서 다음과 같이 경로를 넣습니다.

```ts
heroImage: {
  src: "/images/projects/swith/hero.webp",
  alt: "SWITH 대표 서비스 화면",
  caption: "HERO VISUAL",
}
```

`heroImage`, `process[].image`, `gallery[].images[]`의 `src`가 빈 문자열이면 디자인 시스템에 맞춘 placeholder가 표시됩니다. 경로를 입력하면 같은 위치에 실제 이미지가 자동으로 렌더링됩니다.

## Deployment

GitHub Pages via GitHub Actions.

1. 이 프로젝트를 GitHub의 Public repository에 push합니다.
2. 저장소에서 `Settings → Pages → Build and deployment → Source`를 `GitHub Actions`로 설정합니다.
3. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드하고 배포합니다.

Vite `base`는 Actions 실행 시 `GITHUB_REPOSITORY`에서 저장소 이름을 읽어 자동 결정합니다.

- Project site: `https://USERNAME.github.io/REPOSITORY/`
- User site (`USERNAME.github.io` 저장소): `https://USERNAME.github.io/`

상세 페이지는 `HashRouter`를 사용하므로 GitHub Pages에서 직접 열거나 새로고침해도 404가 발생하지 않습니다.
