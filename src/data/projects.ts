export type Project = {
  title: string;
  slug: string;
  category: string;
  year: string;
  role: string;
  description: string;
  highlight?: string;
  stats: string[];
  skills: string[];
  accent: string;
  caseStudy: {
    problem: string;
    role: string;
    decision: string;
    solution: string;
    challenge: string;
    improvement: string;
    result: string;
    learning: string;
  };
  hasPlaceholders?: boolean;
};

const pending = "프로젝트 회고 자료와 실제 지표를 확인한 뒤 구체적인 내용을 추가할 예정입니다.";

export const projects: Project[] = [
  {
    title: "SWITH",
    slug: "swith",
    category: "PRODUCT",
    year: "2026",
    role: "Frontend · 서비스 경험 설계 · 최종 발표",
    description: "알고리즘 스터디의 문제 선정부터 풀이, 복습까지 연결한 AI 기반 학습 플랫폼",
    highlight: "1ST PLACE",
    stats: ["STUDY FLOW", "TEAM PRODUCT", "SSAFY 특화 프로젝트 1위"],
    skills: ["React", "Product Thinking", "Presentation"],
    accent: "#4DD0E1",
    caseStudy: {
      problem: "알고리즘 스터디의 문제 선정, 풀이 공유, 복습 기록이 서로 다른 도구에 흩어져 학습 흐름을 이어가기 어렵다는 문제에서 출발했습니다.",
      role: "Frontend 구현과 서비스 경험 설계, 최종 발표를 담당했습니다. 세부 기여 범위는 실제 프로젝트 자료를 기준으로 추가 정리할 예정입니다.",
      decision: "기능의 수를 늘리기보다 문제 선정부터 풀이와 복습까지 하나의 흐름으로 인식할 수 있게 만드는 것을 우선했습니다.",
      solution: "핵심 학습 단계를 연결된 화면 흐름으로 구성하고, AI 기능이 학습을 방해하지 않으면서 필요한 순간에 도움을 주도록 설계했습니다.",
      challenge: pending,
      improvement: pending,
      result: "SSAFY 특화 프로젝트 1위를 기록했습니다. 심사 기준과 정량 지표는 확인 가능한 자료를 바탕으로 추후 보완할 예정입니다.",
      learning: "기술 구현뿐 아니라 사용자가 학습의 진행 상태를 이해하고 다음 행동을 선택할 수 있도록 만드는 것이 제품 경험의 핵심임을 배웠습니다.",
    },
    hasPlaceholders: true,
  },
  {
    title: "CALLMEBABY",
    slug: "callmebaby",
    category: "PRODUCT",
    year: "2026",
    role: "Frontend · UI/UX 개선 · 사용자 경험 분석",
    description: "아이와 부모가 영상통화를 통해 관계를 이어갈 수 있도록 설계한 인터랙티브 커뮤니케이션 서비스",
    stats: ["INTERACTIVE UX", "WEB SERVICE"],
    skills: ["Vue", "UX", "Frontend"],
    accent: "#F3A6B6",
    caseStudy: {
      problem: "영상통화가 단순한 대화를 넘어 아이와 부모가 자연스럽게 함께 참여하는 시간이 되려면 어떤 상호작용이 필요한지 고민했습니다.",
      role: "Frontend 구현, UI/UX 개선, 사용자 경험 분석을 담당했습니다. 세부 작업 범위는 프로젝트 자료 확인 후 보완할 예정입니다.",
      decision: "복잡한 조작보다 통화 흐름을 방해하지 않는 낮은 진입 장벽의 상호작용을 우선했습니다.",
      solution: "영상통화 안에서 함께 사용할 수 있는 인터랙티브 요소를 서비스 흐름에 연결했습니다.",
      challenge: pending,
      improvement: pending,
      result: pending,
      learning: "커뮤니케이션 서비스에서는 기능 자체보다 관계와 상황의 맥락을 먼저 이해해야 한다는 점을 배웠습니다.",
    },
    hasPlaceholders: true,
  },
  {
    title: "FITME",
    slug: "fitme",
    category: "AI / DATA",
    year: "2026",
    role: "Frontend · Backend · 서비스 구현",
    description: "사용자의 골격과 취향을 기반으로 스타일을 추천하는 AI 패션 서비스",
    stats: ["AI SERVICE", "END-TO-END"],
    skills: ["Python", "AI", "Full Stack"],
    accent: "#C7B9FF",
    caseStudy: {
      problem: "일반적인 스타일 추천이 개인의 골격과 취향 차이를 충분히 반영하지 못한다는 문제를 다뤘습니다.",
      role: "Frontend와 Backend를 오가며 서비스 구현에 참여했습니다. 기능별 기여 범위는 실제 기록을 기준으로 추가할 예정입니다.",
      decision: "AI 결과를 그대로 보여주기보다 사용자가 추천 이유를 이해하고 선택할 수 있는 서비스 경험을 목표로 했습니다.",
      solution: "사용자의 골격 정보와 취향 신호를 추천 흐름에 연결하는 웹 서비스 구조를 구현했습니다.",
      challenge: pending,
      improvement: pending,
      result: pending,
      learning: "AI 모델의 결과를 실제 제품 가치로 연결하려면 입력, 설명, 피드백의 전체 흐름을 함께 설계해야 한다는 점을 배웠습니다.",
    },
    hasPlaceholders: true,
  },
  {
    title: "INSTAGRAM MAGAZINE",
    slug: "instagram-magazine",
    category: "CONTENT",
    year: "2025",
    role: "Content · Growth · Performance Analysis",
    description: "콘텐츠 기획과 제작, 반응 분석을 하나의 편집 시스템으로 운영한 디지털 매거진",
    stats: ["230+ CONTENTS", "4.5M MAX VIEWS", "2.5K FOLLOWERS"],
    skills: ["Content", "Growth", "Performance Analysis"],
    accent: "#FF784F",
    caseStudy: {
      problem: "지속적으로 콘텐츠를 발행하면서도 주제와 표현의 일관성을 유지하고, 사용자 반응을 다음 기획에 반영할 방법이 필요했습니다.",
      role: "콘텐츠 기획과 제작, 채널 운영, 성과 분석을 연결해 반복 가능한 발행 흐름을 만들었습니다.",
      decision: "한 번의 성과보다 축적 가능한 편집 기준과 반응 분석 루프를 만드는 데 집중했습니다.",
      solution: "기획, 제작, 발행, 반응 확인, 다음 기획으로 이어지는 운영 체계를 구성했습니다.",
      challenge: pending,
      improvement: pending,
      result: "230개 이상의 콘텐츠를 제작했고, 팔로워 2.5K와 단일 콘텐츠 최대 4.5M 조회를 기록했습니다.",
      learning: "콘텐츠의 감각적인 표현과 데이터 기반 개선은 서로 반대가 아니라 함께 작동하는 과정임을 배웠습니다.",
    },
    hasPlaceholders: true,
  },
  {
    title: "SAMSUNG OPEN TECH COMPANIONS",
    slug: "samsung-open-tech-companions",
    category: "ACTIVITY",
    year: "2025",
    role: "Tech Content · Branding",
    description: "기술 이야기를 이해하기 쉬운 콘텐츠와 일관된 브랜드 언어로 전달한 활동",
    stats: ["TECH STORY", "BRAND VOICE"],
    skills: ["Storytelling", "Branding", "Content"],
    accent: "#8FC8FF",
    caseStudy: {
      problem: "전문적인 기술 정보를 낯선 독자도 이해하고 관심을 가질 수 있는 이야기로 바꾸는 과제를 다뤘습니다.",
      role: "기술 콘텐츠 기획과 제작, 브랜드 메시지 정리에 참여했습니다. 구체적인 기여 범위는 활동 자료 확인 후 보완할 예정입니다.",
      decision: "정보의 정확성을 유지하면서도 독자가 맥락을 놓치지 않도록 전달 순서와 표현을 단순화했습니다.",
      solution: "기술 주제를 독자 관점의 이야기 구조로 재구성하고 시각적·언어적 톤을 일관되게 정리했습니다.",
      challenge: pending,
      improvement: pending,
      result: pending,
      learning: "좋은 기술 커뮤니케이션은 내용을 줄이는 일이 아니라 이해를 돕는 구조를 만드는 일임을 배웠습니다.",
    },
    hasPlaceholders: true,
  },
];
