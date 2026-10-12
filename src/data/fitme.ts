import landing from "../assets/projects/fitme/fitme-landing.png";
import photoUpload from "../assets/projects/fitme/fitme-photo-upload.png";
import qrMobileUpload from "../assets/projects/fitme/fitme-qr-mobile-upload.png";
import aiAnalysis from "../assets/projects/fitme/fitme-ai-analysis.png";
import result from "../assets/projects/fitme/fitme-result.png";
import styleGuide from "../assets/projects/fitme/fitme-style-guide.png";
import fitDetails from "../assets/projects/fitme/fitme-fit-details.png";
import productRecommendation from "../assets/projects/fitme/fitme-product-recommendation.png";
import community from "../assets/projects/fitme/fitme-community.png";
import myPage from "../assets/projects/fitme/fitme-my-page.png";
import type { ProjectImage } from "./works";

const media = (src: string, alt: string, caption: string): ProjectImage => ({ src, alt, caption });

export const fitmeCase = {
  basicInfo: {
    title: "FITME",
    tagline: "나에게 맞는 핏을 찾다",
    description: "사용자의 신체 정보와 전신 이미지, 설문 응답을 바탕으로 골격 유형과 체형 특징을 분석하고 어울리는 스타일과 상품을 추천하는 AI 퍼스널 스타일링 서비스",
    period: "2026",
    team: "2 PEOPLE",
    role: "FULL STACK · UX · FINAL PRESENTATION",
  },
  images: {
    landing: media(landing, "나에게 맞는 핏을 찾다라는 문구가 있는 FitMe 랜딩 화면", "FITME / LANDING"),
    photoUpload: media(photoUpload, "정면 측면 후면 전신 사진을 등록하는 FitMe 진단 화면", "DIAGNOSIS / PHOTO UPLOAD"),
    qrMobileUpload: media(qrMobileUpload, "QR 코드로 휴대폰 촬영을 연결하는 FitMe 모달", "DIAGNOSIS / MOBILE CAPTURE"),
    aiAnalysis: media(aiAnalysis, "신체 정보 사진 설문을 함께 분석하는 FitMe 분석 진행 화면", "AI ANALYSIS"),
    result: media(result, "Straight 골격 유형과 체형 특징을 보여주는 FitMe 최종 결과 화면", "YOUR FITME RESULT"),
    styleGuide: media(styleGuide, "어울리는 스타일과 피하면 좋은 스타일을 설명하는 FitMe 가이드", "STYLE GUIDE"),
    fitDetails: media(fitDetails, "사용자에게 어울리는 착장 기준을 의류 예시로 설명하는 FitMe 화면", "FIT DETAILS"),
    productRecommendation: media(productRecommendation, "골격 유형과 필터 조건에 맞춘 FitMe 상품 추천 목록", "PRODUCT RECOMMENDATION"),
    community: media(community, "골격 유형별 스타일 경험을 공유하는 FitMe 후기 커뮤니티", "FIT REVIEW COMMUNITY"),
    myPage: media(myPage, "내 후기와 최근 추천 상품을 확인하는 FitMe 마이페이지", "MY PAGE / RETENTION"),
  },
  overview: [
    "온라인 쇼핑 환경에서는 사용자가 옷을 직접 입어보지 못한 상태에서 구매를 결정해야 합니다.",
    "FitMe는 단순히 인기 상품을 추천하는 대신 사용자의 신체 정보와 전신 이미지, 설문 결과를 종합해 골격 유형을 판단하고 그 결과를 실제 스타일과 상품 선택으로 연결했습니다.",
  ],
  problems: [
    { id: "01", key: "FIT", question: "이 옷이\n내 체형에 맞을까?", answer: "DIAGNOSE" },
    { id: "02", key: "STYLE", question: "나에게 어울리는 스타일은\n무엇일까?", answer: "GUIDE" },
    { id: "03", key: "CHOICE", question: "결과를 알더라도 실제 상품은\n어떻게 골라야 하지?", answer: "RECOMMEND" },
  ],
  roles: [
    { id: "01", title: "FRONTEND", description: "Vue 기반으로 진단 플로우, 결과 페이지, 추천 상품 UI와 커뮤니티 화면을 구현했습니다." },
    { id: "02", title: "BACKEND", description: "Django와 DRF 기반 API, 회원 관리, 인증과 추천 연동 등 서비스 동작에 필요한 Backend 영역을 함께 구현했습니다." },
    { id: "03", title: "SERVICE FLOW", description: "회원가입부터 진단, 분석, 결과, 상품 추천, 커뮤니티까지 하나의 사용자 경험으로 연결했습니다." },
    { id: "04", title: "FINAL PRESENTATION", description: "온라인 쇼핑의 Fit 문제에서 Diagnosis, Style, Product로 이어지는 서비스 스토리를 정리해 최종 발표를 담당했습니다." },
  ],
  diagnosisFlow: ["BASIC INFO", "PHOTO", "SURVEY", "AI ANALYSIS", "RESULT", "STYLE GUIDE", "PRODUCT"],
  bodyTypes: [
    { title: "STRAIGHT", description: "상체의 안정감과 깔끔한 실루엣 강조" },
    { title: "WAVE", description: "부드러운 곡선과 가벼운 소재 강조" },
    { title: "NATURAL", description: "자연스러운 골격과 여유 있는 핏 강조" },
  ],
  recommendation: {
    inputs: ["body_type", "gender", "height", "weight", "category", "style_tag", "sort"],
    principles: [
      { title: "EXPLAINABLE", description: "단순 인기순이 아니라 골격 유형과 상품 태그를 연결" },
      { title: "FILTERABLE", description: "사용자가 카테고리와 정렬 기준을 직접 변경" },
      { title: "PRACTICAL", description: "학습 데이터가 충분하지 않은 상황에서도 서비스 목적에 맞는 추천 구조 구현" },
    ],
  },
  communityFeatures: ["게시글", "댓글", "대댓글", "좋아요"],
  myPageFeatures: ["내가 작성한 후기", "저장한 상품", "최근 추천 상품", "사용자 정보"],
  architecture: [
    { title: "VUE", label: "Frontend" },
    { title: "REST API", label: "Connection" },
    { title: "DJANGO", label: "Backend" },
    { title: "DATABASE", label: "Persistence" },
  ],
  socialFlow: ["KAKAO · GOOGLE · NAVER", "OAuth", "Django Backend", "JWT"],
  techStack: [
    { category: "FRONTEND", items: "Vue 3 · Vite · Vue Router · Pinia · Axios" },
    { category: "BACKEND", items: "Python 3.11 · Django 5 · Django REST Framework · SQLite" },
    { category: "AUTH", items: "Simple JWT · Kakao OAuth · Google OAuth · Naver OAuth" },
    { category: "AI", items: "GMS / Gemini API · 이미지 분석 · 설문 기반 보정" },
  ],
  retrospective: [
    { title: "WHAT I BUILT", description: "회원가입부터 진단, 추천, 커뮤니티까지 서비스 전체 Flow를 구현했습니다." },
    { title: "WHAT I LEARNED", description: "Frontend와 Backend를 분리한 SPA 구조에서 인증, 이미지 업로드, 추천 API와 Community 기능을 연결하며 서비스 전체 구조를 경험했습니다." },
    { title: "NEXT", description: "저장, 클릭, 조회와 후기 데이터가 쌓인다면 현재의 규칙 기반 추천을 사용자 행동 기반 개인화 추천으로 확장할 수 있습니다." },
  ],
} as const;
