import type { ProjectImage } from "./works";
import logoFull from "../assets/projects/swith/swith-logo-full.png";
import logoSymbol from "../assets/projects/swith/swith-logo-symbol.png";
import codeGraph from "../assets/projects/swith/swith-code-visualization-graph.png";
import codeGrid from "../assets/projects/swith/swith-code-visualization-grid.png";
import landing from "../assets/projects/swith/swith-landing.png";
import login from "../assets/projects/swith/swith-login.png";
import dashboard from "../assets/projects/swith/swith-dashboard.png";
import groupDetail from "../assets/projects/swith/swith-group-detail.png";
import problemEditor from "../assets/projects/swith/swith-problem-editor.png";
import problemList from "../assets/projects/swith/swith-problem-list.png";
import studyReport from "../assets/projects/swith/swith-study-report.png";
import reviewRecommendation from "../assets/projects/swith/swith-review-recommendation.png";

const media = (src: string, alt: string): ProjectImage => ({ src, alt });

export const swithCase = {
  images: {
    logoFull: media(logoFull, "SWITH 전체 로고"),
    logoSymbol: media(logoSymbol, "SWITH 심볼 로고"),
    codeGraph: media(codeGraph, "그래프 자료구조의 실행 흐름을 보여주는 SWITH 코드 시각화 화면"),
    codeGrid: media(codeGrid, "그리드와 호출 스택을 보여주는 SWITH 코드 시각화 화면"),
    landing: media(landing, "우리의 풀이가 내일의 실력이 될 때까지라는 문구가 있는 SWITH 랜딩 화면"),
    login: media(login, "SSAFY와 Google 로그인을 제공하는 SWITH 로그인 화면"),
    dashboard: media(dashboard, "스터디 일정과 참여 그룹을 보여주는 SWITH 대시보드"),
    groupDetail: media(groupDetail, "스터디 멤버 일정 문제 목록을 보여주는 SWITH 그룹 상세 화면"),
    problemEditor: media(problemEditor, "문제 설명과 코드 에디터를 함께 보여주는 SWITH 문제 풀이 화면"),
    problemList: media(problemList, "추천 문제와 전체 문제 목록을 보여주는 SWITH 문제 탐색 화면"),
    studyReport: media(studyReport, "스터디 대화와 학습 내용을 정리한 SWITH AI 스터디 리포트"),
    reviewRecommendation: media(reviewRecommendation, "스터디 이후 유사 문제를 추천하는 SWITH 복습 화면"),
  },
  basicInfo: {
    fullName: "Study With",
    period: "2026",
    team: "6 PEOPLE",
    role: "FRONTEND · UX · FINAL PRESENTATION",
    message: "알고리즘 스터디의 문제 선정부터 풀이, 코드 이해, 스터디, 복습까지 하나의 흐름으로 연결한 학습 플랫폼",
  },
  award: {
    value: "1위",
    title: "SSAFY 특화 프로젝트 발표회",
    detail: "6인 협업 프로젝트 · 최종 발표 박규연",
  },
  overview: [
    "알고리즘 스터디를 하면서 매번 어떤 문제를 풀지 정하고, 다른 사람의 코드를 이해하고, 스터디가 끝난 뒤 다시 복습하는 과정에서 반복적인 불편이 발생했습니다.",
    "SWITH는 문제 선정, 풀이, 코드 이해, 실시간 스터디, 복습을 하나의 학습 흐름으로 연결했습니다.",
  ],
  painPoints: [
    { id: "01", label: "PROBLEM SELECTION", quote: "오늘은 무슨 문제를 풀어야 하지?", detail: "문제 선정의 부담" },
    { id: "02", label: "CODE UNDERSTANDING", quote: "맞았다고 생각했는데\n도대체 어디서 틀린 거지?", detail: "코드 이해와 디버깅의 어려움" },
    { id: "03", label: "REVIEW", quote: "지난주에 풀었던 것 같은데\n왜 하나도 기억이 안 나지?", detail: "스터디 이후 복습의 부재" },
  ],
  roles: [
    { title: "FRONTEND", description: "React 기반으로 서비스 주요 화면과 사용자 인터랙션을 구현했습니다." },
    { title: "SERVICE FLOW", description: "AI, Backend, Infra 기능이 각각의 기술이 아니라 하나의 서비스 흐름으로 보이도록 화면과 기능을 연결했습니다." },
    { title: "USER EXPERIENCE", description: "추천 → 풀이 → 시각화 → 스터디 → 리포트의 학습 과정이 화면에서 자연스럽게 이어지도록 구성했습니다." },
    { title: "FINAL PRESENTATION", description: "문제 정의부터 핵심 기능, 기술적 차별점과 결과를 하나의 이야기로 정리해 최종 발표를 담당했습니다." },
  ],
  learningFlow: [
    { phase: "BEFORE STUDY", action: "맞춤 문제 추천" },
    { phase: "SOLVE", action: "코드 작성 / 제출" },
    { phase: "UNDERSTAND", action: "코드 시각화" },
    { phase: "STUDY", action: "실시간 스터디" },
    { phase: "AFTER STUDY", action: "AI 학습 리포트" },
    { phase: "REVIEW", action: "개인 맞춤 복습 문제" },
  ],
  recommendationFeatures: ["tierGap", "isWeakTag", "tagOverlap", "solvedRatio"],
  visualizationSteps: [
    { id: "01", title: "TRACE", description: "코드를 실행하며 변수와 자료구조의 변화를 추적하고 역할을 예측해 시각화했습니다." },
    { id: "02", title: "STRUCTURE", description: "AST 아이디어에서 출발해 더 상세한 문법 정보를 활용하는 CST 정적 분석 파이프라인을 추가했습니다." },
    { id: "03", title: "VERIFY", description: "CST로 예상한 코드 구조와 실제 Trace 결과를 대조하고, 두 결과가 일치할 때 시각화를 확정했습니다." },
  ],
  visualizationStats: [
    { value: "11", label: "VARIABLE ROLES" },
    { value: "8", label: "DATA STRUCTURES" },
    { value: "TRACE + CST", label: "ANALYSIS PIPELINE" },
  ],
  technicalHighlights: [
    {
      title: "CODE VISUALIZATION ERROR RATE",
      before: "20%",
      after: "2%",
      label: "TEAM TECHNICAL RESULT",
      description: "Trace 결과와 CST 기반 정적 분석을 교차 검증해 코드 시각화 오답률을 낮췄습니다.",
    },
    {
      title: "ALGORITHM TERM RECOVERY",
      before: "57.14%",
      after: "91.84%",
      label: "TEAM TECHNICAL RESULT",
      description: "LiveKit, VAD, Whisper-1과 알고리즘 용어 Dictionary 보정을 결합해 전문 용어 복원율을 개선했습니다.",
    },
  ],
  myStack: ["React", "TypeScript", "Frontend UI", "Realtime UI Integration"],
  projectStack: [
    { category: "FRONTEND", items: "React · TypeScript · 사용자 흐름 및 실시간 UI" },
    { category: "BACKEND", items: "API · 스터디 · 문제 · 리포트 도메인" },
    { category: "AI", items: "Recommendation · Trace · CST · Whisper-1" },
    { category: "REALTIME", items: "LiveKit · VAD · 음성 채팅 · 댓글 · 화이트보드" },
    { category: "INFRASTRUCTURE", items: "Docker 이중 격리 · CPU / Memory / Time / Network 제한" },
  ],
  results: [
    { value: "1위", label: "SSAFY 특화 프로젝트 발표회" },
    { value: "20 → 2%", label: "CODE VISUALIZATION ERROR RATE" },
    { value: "57.14 → 91.84%", label: "ALGORITHM TERM RECOVERY" },
    { value: "6", label: "TEAM MEMBERS" },
    { value: "FINAL", label: "PRESENTER · PARK KYUYEON" },
  ],
  retrospective: [
    { title: "WHAT I DID", description: "여러 기술 담당자의 기능을 사용자가 경험하는 하나의 학습 여정으로 연결했습니다." },
    { title: "WHAT I LEARNED", description: "기술적으로 좋은 기능도 사용자가 흐름 안에서 이해하지 못하면 서비스 가치로 전달되기 어렵다는 것을 배웠습니다." },
    { title: "FINAL PRESENTATION", description: "복잡한 기술과 기능을 문제 → 해결 → 결과의 이야기로 재구성해 팀의 최종 발표를 담당했습니다." },
  ],
};
