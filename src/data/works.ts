export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type GalleryType =
  | "full"
  | "two-column"
  | "three-column"
  | "image-description"
  | "before-after"
  | "mobile-grid";

export type GalleryBlock = {
  type: GalleryType;
  title: string;
  description?: string;
  images: ProjectImage[];
};

export type Work = {
  title: string;
  slug: string;
  category: string;
  period: string;
  role: string;
  team: string;
  highlight: string;
  summary: string;
  overview: string[];
  problem: {
    title: string;
    body: string[];
  };
  process: Array<{
    title: string;
    body: string[];
    image: ProjectImage;
  }>;
  myRole: string[];
  challenge: string;
  approach: string;
  result: string;
  results: Array<{ value: string; label: string }>;
  skills: string[];
  accent: string;
  heroImage: ProjectImage;
  gallery: GalleryBlock[];
};

const image = (alt: string, caption = ""): ProjectImage => ({
  src: "",
  alt,
  caption,
});

export const works: Work[] = [
  {
    title: "SWITH",
    slug: "swith",
    category: "PRODUCT",
    period: "2026",
    role: "Frontend · 서비스 경험 설계 · 최종 발표",
    team: "TEAM PROJECT",
    highlight: "1ST PLACE",
    summary: "알고리즘 스터디의 문제 선정부터 풀이, 복습까지 연결한 AI 기반 학습 플랫폼",
    overview: [
      "알고리즘 스터디의 여러 단계를 하나의 학습 흐름으로 연결하기 위해 시작한 프로젝트입니다.",
      "기능의 수보다 사용자가 현재 진행 상태와 다음 행동을 명확히 이해하는 경험에 집중했습니다.",
    ],
    problem: {
      title: "흩어진 학습 과정을 하나의 흐름으로",
      body: [
        "문제 선정, 풀이 공유, 복습 기록이 서로 다른 도구에 흩어져 있어 학습 맥락을 이어가기 어려웠습니다.",
        "팀원마다 진행 상태를 이해하는 방식이 달라 스터디 운영에도 반복적인 확인이 필요했습니다.",
      ],
    },
    process: [
      {
        title: "학습 여정 구조화",
        body: ["문제 선정부터 풀이와 복습까지 핵심 단계를 정리하고, 각 화면이 다음 행동으로 자연스럽게 이어지도록 설계했습니다."],
        image: image("SWITH 학습 여정 화면", "USER FLOW"),
      },
      {
        title: "AI 기능의 역할 정의",
        body: ["AI가 학습 흐름을 방해하지 않고 사용자가 도움이 필요한 순간에 작동하도록 정보 구조와 인터랙션 우선순위를 조정했습니다."],
        image: image("SWITH AI 기능 화면", "AI EXPERIENCE"),
      },
      {
        title: "발표와 서비스 메시지 정리",
        body: ["제품의 문제 정의와 주요 판단을 하나의 이야기로 연결해 최종 발표와 데모 흐름을 구성했습니다."],
        image: image("SWITH 최종 발표 자료", "PRESENTATION"),
      },
    ],
    myRole: [
      "Frontend 구현과 서비스 경험 설계, 최종 발표를 담당했습니다.",
      "화면 단위 구현에 머무르지 않고 사용자가 학습의 진행 상태를 이해하고 다음 행동을 선택할 수 있도록 전체 흐름을 조정했습니다.",
    ],
    challenge: "다양한 학습 기능을 한 화면 흐름 안에 담으면서도 사용자가 복잡함을 느끼지 않게 해야 했습니다.",
    approach: "핵심 학습 단계의 우선순위를 정하고, AI 기능은 필요한 맥락에서만 드러나도록 정보 구조를 단순화했습니다.",
    result: "서비스의 문제와 해결 방식이 명확하게 전달되었고, SSAFY 특화 프로젝트 1위를 기록했습니다.",
    results: [{ value: "1ST", label: "SSAFY 특화 프로젝트" }],
    skills: ["React", "TypeScript", "Product Thinking", "Presentation"],
    accent: "#4DD0E1",
    heroImage: image("SWITH 대표 서비스 화면", "HERO VISUAL"),
    gallery: [
      { type: "full", title: "SERVICE OVERVIEW", images: [image("SWITH 서비스 전체 화면")] },
      { type: "two-column", title: "CORE EXPERIENCE", images: [image("SWITH 핵심 화면 1"), image("SWITH 핵심 화면 2")] },
      { type: "mobile-grid", title: "RESPONSIVE SCREENS", images: [image("SWITH 모바일 화면 1"), image("SWITH 모바일 화면 2"), image("SWITH 모바일 화면 3")] },
    ],
  },
  {
    title: "CALLMEBABY",
    slug: "callmebaby",
    category: "PRODUCT",
    period: "2026",
    role: "Frontend · UI/UX Improvement · User Experience · Final Presentation",
    team: "TEAM PROJECT",
    highlight: "INTERACTIVE UX",
    summary: "아이와 부모가 영상통화를 통해 관계를 이어갈 수 있도록 설계한 인터랙티브 커뮤니케이션 서비스",
    overview: [
      "영상통화를 단순한 대화 도구가 아니라 아이와 부모가 함께 참여하는 시간으로 만들기 위한 프로젝트입니다.",
      "통화의 흐름을 방해하지 않는 낮은 진입 장벽의 인터랙션을 중심으로 경험을 구성했습니다.",
    ],
    problem: {
      title: "대화를 함께하는 경험으로 확장하기",
      body: ["아이와 부모의 영상통화가 짧은 안부 확인에 머무르지 않고 자연스럽게 함께 놀고 반응하는 시간이 될 필요가 있었습니다."],
    },
    process: [
      { title: "사용 상황 관찰", body: ["통화 중 조작이 많아질수록 대화가 끊긴다는 점을 기준으로 핵심 상호작용을 정리했습니다."], image: image("CALLMEBABY 사용자 흐름", "USER SCENARIO") },
      { title: "인터랙션 설계", body: ["아이와 부모가 설명 없이도 함께 사용할 수 있는 직관적인 인터랙티브 요소를 화면에 연결했습니다."], image: image("CALLMEBABY 인터랙션 화면", "INTERACTION") },
      { title: "UI 개선", body: ["통화 화면의 집중도를 유지하면서 필요한 기능을 빠르게 발견할 수 있도록 시각적 위계를 조정했습니다."], image: image("CALLMEBABY UI 개선 화면", "UI REFINEMENT") },
    ],
    myRole: ["Frontend 구현과 UI/UX 개선, 사용자 경험 분석을 담당했으며 프로젝트 최종 발표까지 맡았습니다.", "관계와 상황의 맥락을 먼저 이해하고 기능의 노출 시점과 조작 단계를 조정했습니다."],
    challenge: "통화 중 사용하는 기능은 작은 마찰도 대화의 몰입을 깨뜨릴 수 있었습니다.",
    approach: "상호작용 단계를 줄이고 통화 화면 안에서 바로 이해할 수 있는 피드백을 제공했습니다.",
    result: "영상통화 안에서 함께 참여할 수 있는 인터랙티브 경험을 서비스 흐름에 연결했습니다.",
    results: [{ value: "UX", label: "INTERACTIVE COMMUNICATION" }],
    skills: ["Vue", "JavaScript", "UX", "Frontend", "Final Presentation"],
    accent: "#F3A6B6",
    heroImage: image("CALLMEBABY 대표 서비스 화면", "HERO VISUAL"),
    gallery: [
      { type: "full", title: "VIDEO EXPERIENCE", images: [image("CALLMEBABY 영상통화 화면")] },
      { type: "before-after", title: "UI IMPROVEMENT", images: [image("개선 전 화면", "BEFORE"), image("개선 후 화면", "AFTER")] },
    ],
  },
  {
    title: "FITME",
    slug: "fitme",
    category: "AI / DATA",
    period: "2026",
    role: "Frontend · Backend · Full Stack · Final Presentation",
    team: "TEAM PROJECT",
    highlight: "AI SERVICE",
    summary: "사용자의 골격과 취향을 기반으로 스타일을 추천하는 AI 패션 서비스",
    overview: ["개인의 골격과 취향 차이를 반영한 스타일 추천 경험을 만들었습니다.", "AI의 결과를 그대로 보여주는 대신 사용자가 추천 이유를 이해하고 선택할 수 있는 전체 흐름을 설계했습니다."],
    problem: {
      title: "개인에게 설명 가능한 스타일 추천",
      body: ["일반적인 스타일 추천은 개인의 신체 특성과 취향 차이를 충분히 반영하지 못하고, 결과의 이유도 이해하기 어려웠습니다."],
    },
    process: [
      { title: "입력 구조 설계", body: ["사용자가 부담 없이 골격 정보와 취향 신호를 제공할 수 있도록 입력 단계를 구성했습니다."], image: image("FITME 사용자 입력 화면", "INPUT FLOW") },
      { title: "추천 결과 연결", body: ["분석 결과와 스타일 추천을 하나의 서비스 흐름으로 연결하고 추천 이유를 함께 표현했습니다."], image: image("FITME 추천 결과 화면", "RECOMMENDATION") },
      { title: "서비스 통합", body: ["Frontend와 Backend를 오가며 입력, 분석, 결과 표현의 데이터 흐름을 구현했습니다."], image: image("FITME 서비스 구조", "SYSTEM FLOW") },
    ],
    myRole: ["Frontend와 Backend를 모두 구현하는 Full Stack 역할을 수행했고, 프로젝트 최종 발표도 담당했습니다.", "사용자 입력부터 추천 결과까지 이어지는 흐름을 연결하고, AI 결과가 실제 선택에 도움이 되도록 정보의 순서와 설명 방식을 조정했습니다."],
    challenge: "모델의 결과를 사용자가 이해할 수 있는 제품 언어로 바꾸는 과정이 필요했습니다.",
    approach: "입력, 설명, 피드백을 하나의 경험으로 보고 추천 이유와 다음 행동을 함께 제시했습니다.",
    result: "사용자의 골격 정보와 취향 신호를 추천 경험에 연결하는 웹 서비스 구조를 완성했습니다.",
    results: [{ value: "AI", label: "END-TO-END SERVICE" }],
    skills: ["Python", "AI", "Frontend", "Backend", "Full Stack", "Final Presentation"],
    accent: "#C7B9FF",
    heroImage: image("FITME 대표 서비스 화면", "HERO VISUAL"),
    gallery: [
      { type: "full", title: "SERVICE FLOW", images: [image("FITME 서비스 흐름")] },
      { type: "three-column", title: "KEY SCREENS", images: [image("FITME 화면 1"), image("FITME 화면 2"), image("FITME 화면 3")] },
    ],
  },
  {
    title: "INSTAGRAM MAGAZINE",
    slug: "instagram-magazine",
    category: "CONTENT",
    period: "2025.04 — 2026.04",
    role: "Content · Growth · Performance Analysis",
    team: "INDEPENDENT PROJECT",
    highlight: "4.5M VIEWS",
    summary: "콘텐츠 기획과 제작, 반응 분석을 하나의 편집 시스템으로 운영한 디지털 매거진",
    overview: ["패션과 뷰티 콘텐츠를 일관된 편집 기준으로 발행하고 사용자 반응을 다음 기획에 반영했습니다.", "한 번의 성과보다 반복 가능한 제작 과정과 성장 실험을 만드는 데 집중했습니다."],
    problem: {
      title: "감각과 데이터를 함께 운영하기",
      body: ["지속적으로 콘텐츠를 발행하면서도 주제와 표현의 일관성을 유지하고, 사용자 반응을 다음 기획에 반영할 체계가 필요했습니다."],
    },
    process: [
      { title: "편집 기준 수립", body: ["채널의 주제, 시각 언어, 문장 톤을 정리해 콘텐츠마다 일관된 인상을 만들었습니다."], image: image("인스타그램 매거진 편집 기준", "EDITORIAL SYSTEM") },
      { title: "제작과 발행", body: ["기획, 제작, 발행을 반복 가능한 과정으로 정리해 230개 이상의 콘텐츠를 축적했습니다."], image: image("인스타그램 콘텐츠 이미지", "CONTENT ARCHIVE") },
      { title: "반응 분석", body: ["조회, 저장, 공유 등 사용자 반응을 확인하고 다음 주제와 표현 방식에 반영했습니다."], image: image("콘텐츠 성과 분석", "PERFORMANCE") },
    ],
    myRole: ["콘텐츠 기획과 제작, 채널 운영, 성과 분석을 직접 연결했습니다.", "감각적인 표현과 데이터 기반 개선이 함께 작동하는 편집 시스템을 만들었습니다."],
    challenge: "지속적인 발행 속도와 콘텐츠의 일관성, 성과 개선을 동시에 관리해야 했습니다.",
    approach: "발행 과정을 표준화하고 사용자 반응을 정기적으로 검토해 다음 콘텐츠의 가설로 활용했습니다.",
    result: "230개 이상의 콘텐츠, 2.5K 팔로워, 단일 콘텐츠 최대 4.5M 조회를 기록했습니다.",
    results: [
      { value: "230+", label: "CONTENTS" },
      { value: "2.5K", label: "FOLLOWERS" },
      { value: "4.5M", label: "MAX VIEWS" },
    ],
    skills: ["Content Planning", "Social Media", "Growth Marketing", "Performance Analysis"],
    accent: "#FF784F",
    heroImage: image("인스타그램 매거진 대표 콘텐츠", "HERO VISUAL"),
    gallery: [
      { type: "three-column", title: "CONTENT ARCHIVE", images: [image("콘텐츠 이미지 1"), image("콘텐츠 이미지 2"), image("콘텐츠 이미지 3")] },
      { type: "image-description", title: "PERFORMANCE", description: "성과 화면과 분석 내용을 함께 배치할 수 있습니다.", images: [image("콘텐츠 성과 화면")] },
    ],
  },
  {
    title: "SAMSUNG OPEN TECH COMPANIONS",
    slug: "samsung-open-tech-companions",
    category: "ACTIVITY",
    period: "2026.07 — 2026.12",
    role: "Tech Content · Branding · Content Creation",
    team: "BRAND ACTIVITY",
    highlight: "TECH STORY",
    summary: "기술 이야기를 이해하기 쉬운 콘텐츠와 일관된 브랜드 언어로 전달한 활동",
    overview: ["전문적인 기술 정보를 낯선 독자도 이해하고 관심을 가질 수 있는 이야기로 바꾸는 활동입니다.", "정보의 정확성을 유지하면서 전달 순서와 시각적·언어적 톤을 일관되게 정리합니다."],
    problem: {
      title: "전문 기술을 독자의 언어로",
      body: ["기술 정보는 정확해야 하지만 배경지식이 없는 독자에게는 맥락을 따라가기 어렵다는 문제가 있었습니다."],
    },
    process: [
      { title: "독자 관점 재구성", body: ["기술 주제의 핵심 질문과 독자가 알아야 할 배경을 먼저 정리했습니다."], image: image("기술 콘텐츠 기획안", "CONTENT PLAN") },
      { title: "스토리텔링", body: ["정보의 의미가 자연스럽게 이어지도록 전달 순서와 표현을 단순화했습니다."], image: image("기술 콘텐츠 결과물", "STORYTELLING") },
      { title: "브랜드 톤 정리", body: ["시각적·언어적 톤을 맞춰 여러 콘텐츠가 하나의 브랜드 경험으로 보이게 했습니다."], image: image("브랜드 콘텐츠 시스템", "BRAND VOICE") },
    ],
    myRole: ["기술 콘텐츠 기획과 제작, 브랜드 메시지 정리에 참여했습니다.", "내용을 줄이기보다 독자의 이해를 돕는 구조를 만드는 데 집중했습니다."],
    challenge: "정확한 기술 정보와 쉽고 흥미로운 전달 방식 사이의 균형이 필요했습니다.",
    approach: "핵심 개념을 독자의 질문 순서에 맞춰 재배열하고, 용어와 시각적 톤을 일관되게 유지했습니다.",
    result: "기술 주제를 독자 관점의 콘텐츠로 재구성하고 일관된 브랜드 메시지로 전달했습니다.",
    results: [{ value: "TECH", label: "CONTENT & BRANDING" }],
    skills: ["Storytelling", "Branding", "Content Creation"],
    accent: "#8FC8FF",
    heroImage: image("Samsung Open Tech Companions 대표 콘텐츠", "HERO VISUAL"),
    gallery: [
      { type: "full", title: "TECH CONTENT", images: [image("기술 콘텐츠 대표 이미지")] },
      { type: "two-column", title: "CONTENT SERIES", images: [image("기술 콘텐츠 1"), image("기술 콘텐츠 2")] },
    ],
  },
];
