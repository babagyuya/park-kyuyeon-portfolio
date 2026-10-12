import type { ProjectImage } from "./works";
import landingImage from "../assets/projects/callmebaby/callmebaby-landing.png";
import loginImage from "../assets/projects/callmebaby/callmebaby-login.png";
import videoDrawingImage from "../assets/projects/callmebaby/callmebaby-video-drawing.png";
import diaryCompleteImage from "../assets/projects/callmebaby/callmebaby-diary-complete.png";
import homeImage from "../assets/projects/callmebaby/callmebaby-home.png";
import diaryDetailImage from "../assets/projects/callmebaby/callmebaby-diary-detail.png";
import aiTopicImage from "../assets/projects/callmebaby/callmebaby-ai-topic.png";
import childProfileImage from "../assets/projects/callmebaby/callmebaby-child-profile.png";

type CallmebabyFeature = {
  id: string;
  label: string;
  title: string;
  description: string;
  image?: ProjectImage;
  imagePosition: "left" | "right" | "none";
};

const media = (src: string, alt: string): ProjectImage => ({ src, alt });

export const callmebabyCase = {
  heroImage: media(landingImage, "콜미베이비 서비스 랜딩 화면"),
  loginImage: media(loginImage, "카카오 네이버 구글 소셜 로그인을 제공하는 콜미베이비 로그인 화면"),
  coreImage: media(videoDrawingImage, "부모와 아이가 영상통화 중 공동 그림판을 사용하는 화면"),
  diaryCompleteImage: media(diaryCompleteImage, "그림일기 저장 완료 화면"),
  homeImage: media(homeImage, "영상통화와 그림일기를 선택하는 콜미베이비 홈 화면"),
  diaryDetailImage: media(diaryDetailImage, "함께 그린 그림과 아이의 이야기가 기록된 그림일기 상세 화면"),
  aiTopicImage: media(aiTopicImage, "아이의 관심사를 바탕으로 후속 질문을 추천하는 화면"),
  childProfileImage: media(childProfileImage, "아이별 관심사와 기록을 관리하는 프로필 화면"),
  overview: {
    title: "영상통화만으로는\n아이와의 대화가 계속\n이어지기 어려웠습니다.",
    body: [
      "부모와 아이가 멀리 떨어져 있을 때 영상통화는 가장 직접적인 소통 수단이지만, 특히 어린아이와의 통화에서는 대화 주제가 금방 끊기거나 아이의 집중이 흐트러질 수 있습니다.",
      "CALLMEBABY는 단순히 얼굴을 보는 영상통화를 넘어 함께 그림을 그리고, 아이의 이야기를 기반으로 대화 소재를 추천하고, 통화가 끝난 뒤에는 그림일기로 추억을 남기는 경험을 설계했습니다.",
    ],
  },
  problems: [
    { id: "01", title: "CONVERSATION", description: "아이와 무슨 이야기를 해야 할지 대화 소재가 쉽게 끊김" },
    { id: "02", title: "ENGAGEMENT", description: "단순 영상통화만으로는 아이의 지속적인 참여를 이끌기 어려움" },
    { id: "03", title: "MEMORY", description: "통화가 끝나면 함께 나눈 이야기가 그대로 사라짐" },
  ],
  roles: [
    { title: "Frontend 구현", description: "영상통화, 공동 그림판, 메인 화면 등 사용자가 직접 경험하는 화면과 인터랙션을 구현했습니다." },
    { title: "UI/UX 개선", description: "기능이 단순히 동작하는 것을 넘어 부모와 아이가 자연스럽게 사용할 수 있도록 화면 흐름과 인터랙션을 반복적으로 개선했습니다." },
    { title: "사용자 경험 분석", description: "실제 사용자 테스트와 피드백을 통해 사용 과정에서 느끼는 불편과 흥미 요소를 확인하고 개선 방향을 서비스에 반영했습니다." },
    { title: "Final Presentation", description: "프로젝트의 문제 정의부터 핵심 기능, 기술과 사용자 경험을 하나의 스토리로 정리해 최종 발표를 담당했습니다." },
  ],
  coreExperiences: [
    { title: "REAL-TIME VIDEO CALL", description: "부모와 아이가 하나의 통화방에서 영상과 음성으로 실시간 소통합니다." },
    { title: "SHARED DRAWING", description: "영상통화 중 하나의 캔버스에 함께 그림을 그리며 대화를 자연스럽게 이어갈 수 있습니다." },
  ],
  features: [
    {
      id: "01",
      label: "START",
      title: "소셜 로그인으로\n빠르게 시작",
      description: "카카오·네이버·구글 OAuth를 통해 간편하게 서비스에 진입할 수 있도록 구성했습니다.",
      image: media(loginImage, "콜미베이비 소셜 로그인 화면"),
      imagePosition: "right",
    },
    {
      id: "02",
      label: "PROFILE",
      title: "아이별로\n관심사와 기록을 관리",
      description: "아이의 프로필과 관심사를 등록하고 통화와 AI 분석 결과를 아이별로 관리할 수 있습니다.",
      image: media(childProfileImage, "콜미베이비 아이 프로필 관리 화면"),
      imagePosition: "left",
    },
    {
      id: "03",
      label: "AI CONVERSATION",
      title: "아이의 이야기에서\n다음 질문을 찾다",
      description: "아이의 음성을 분석해 관심사를 파악하고 부모가 자연스럽게 대화를 이어갈 수 있도록 맞춤형 후속 질문을 제공합니다.",
      image: media(aiTopicImage, "아이 관심사 기반 AI 후속 질문 추천 화면"),
      imagePosition: "right",
    },
  ] satisfies CallmebabyFeature[],
  drawingDetails: [
    { id: "01", title: "좌표 정규화", description: "픽셀 좌표 대신 캔버스 비율 좌표를 사용해 서로 다른 화면에서도 동일한 위치를 표현" },
    { id: "02", title: "선 데이터 묶음 전송", description: "연속적으로 발생하는 선 데이터를 묶어 메시지 수와 통신량을 감소" },
    { id: "03", title: "전송 방식 분리", description: "그림 선과 커서처럼 데이터 성격에 따라 안정성과 반응성을 다르게 고려" },
    { id: "04", title: "재접속 상태 복구", description: "연결 중단이나 새로고침 이후에도 최신 그림 상태를 다시 동기화" },
  ],
  systemFlow: ["CHILD VOICE", "STT", "INTEREST ANALYSIS", "TOPIC RECOMMENDATION", "CALL", "AI DIARY"],
  architecture: {
    main: ["USER", "REACT FRONTEND", "SPRING BOOT API"],
    realtime: ["LIVEKIT", "VIDEO / AUDIO"],
    ai: ["CHILD AUDIO", "STT SERVER", "INTEREST ANALYSIS", "AI TOPIC / DIARY"],
    storage: ["MYSQL", "REDIS", "S3"],
  },
  techStack: [
    { category: "FRONTEND", items: ["React", "TypeScript", "Vite", "React Router", "MediaPipe Tasks Vision"] },
    { category: "REALTIME", items: ["WebRTC", "LiveKit", "WebSocket"] },
    { category: "AI", items: ["Python", "FastAPI", "PyTorch", "Transformers", "LoRA", "Whisper", "Kiwi", "Sentence Transformers", "multilingual-e5-small", "gpt-4.1"] },
    { category: "BACKEND & DATABASE", items: ["Java", "Spring Boot", "Spring Data JPA", "Spring Security", "MySQL", "Redis", "Flyway"] },
    { category: "INFRASTRUCTURE", items: ["AWS EC2", "Docker Compose", "Caddy", "Vercel", "Amazon S3"] },
  ],
  userResponse: [
    { value: "14 / 15", label: "서비스가 흥미로웠다", detail: "매우 그렇다 10 · 그렇다 4 · 보통 1" },
    { value: "15 / 15", label: "가족 간 유대감 형성에 긍정적이었다", detail: "매우 그렇다 12 · 그렇다 3" },
  ],
  aiResult: {
    before: "13.22%",
    after: "8.65%",
    improvement: "34.6%",
    description: "팀에서는 범용 Whisper-small을 아동 음성 데이터에 맞게 LoRA Fine-tuning해 동일한 7–10세 외부 평가에서 CER를 13.22%에서 8.65%로 개선했습니다.",
  },
  results: [
    { value: "6", label: "TEAM MEMBERS" },
    { value: "15", label: "USER TESTERS" },
    { value: "13.22 → 8.65", label: "PROJECT STT CER" },
    { value: "FINAL", label: "PRESENTER" },
  ],
  retrospective: [
    {
      title: "WHAT WENT WELL",
      description: "기획부터 개발, 사용자 테스트, 최종 발표 준비까지 역할을 나누며 서비스를 완성했습니다. 영상통화에 공동 그림판, AI 대화 추천, 그림일기를 연결하며 단순 통화 이상의 경험을 설계했습니다.",
    },
    {
      title: "WHAT DIDN'T GO AS PLANNED",
      description: "최종 발표에서는 예상하지 못한 실시간 서비스 환경 문제로 준비한 시연을 성공적으로 보여주지 못했습니다. 개발 환경의 정상 동작만큼 실제 발표 환경에서의 안정성 검증도 중요하다는 것을 체감했습니다.",
    },
    {
      title: "WHAT I LEARNED",
      description: "연결 끊김, 새로고침, 재접속 같은 예외 상황을 테스트하고, 실시간 시연 실패에 대비한 백업 영상과 대체 시나리오까지 하나의 제품 경험으로 준비해야 한다는 것을 배웠습니다.",
    },
  ],
};
