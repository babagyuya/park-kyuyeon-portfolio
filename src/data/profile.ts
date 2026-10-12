export const profile = {
  nameKo: "박규연",
  nameEn: "Park Kyuyeon",
  displayName: "PARK KYUYEON",
  mark: "PKY®",
  location: "SEOUL, KR",
  year: "2003",
  eyebrow: "TECH × DATA × CONTENT × PEOPLE",
  introduction: [
    "기술과 데이터, 콘텐츠를 넘나들며 아이디어를 실제 경험으로 만드는 박규연입니다.",
    "개발을 통해 아이디어를 구현하고, 데이터와 사용자 반응을 통해 이유를 찾습니다. 콘텐츠와 발표를 통해 발견한 가치를 사람들에게 전달합니다.",
    "하나의 직무에 스스로를 한정하기보다, 문제를 해결하는 데 필요한 영역을 연결하며 일하는 것을 좋아합니다.",
  ],
  keywords: ["BUILD", "ANALYZE", "CREATE", "CONNECT"],
} as const;

export const numbers = [
  { value: 230, suffix: "+", label: "CONTENTS", note: "기획하고 제작한 콘텐츠 수입니다." },
  { value: 2.5, suffix: "K", label: "FOLLOWERS", note: "꾸준한 운영을 통해 함께한 팔로워 규모입니다." },
  { value: 4.5, suffix: "M", label: "MAX VIEWS", note: "단일 콘텐츠가 기록한 최대 조회 수입니다." },
  { value: 925, suffix: "H", label: "SW / AI TRAINING", note: "소프트웨어와 AI 역량을 집중적으로 학습한 시간입니다." },
  { value: 1, suffix: "ST", label: "PROJECT AWARD", note: "SWITH 프로젝트로 SSAFY 특화 프로젝트 1위를 기록했습니다." },
] as const;

export const modes = [
  {
    n: "01",
    title: "BUILD",
    copy: "아이디어를 실제 사용 가능한 서비스로 구현합니다.",
    tags: ["Frontend", "Web", "Product Development"],
    related: "SWITH · CALLMEBABY · FITME",
  },
  {
    n: "02",
    title: "ANALYZE",
    copy: "데이터와 사용자 반응에서 무엇이 일어났고 왜 그런지 확인합니다.",
    tags: ["Data", "AI", "User Behavior", "Experiment"],
    related: "FITME · CONTENT PERFORMANCE",
  },
  {
    n: "03",
    title: "CREATE",
    copy: "정보와 아이디어를 사람들이 보고 싶어 하는 콘텐츠로 만듭니다.",
    tags: ["Content", "Visual Communication", "Social Media"],
    related: "INSTAGRAM MAGAZINE · BRAND COLLABORATION",
  },
  {
    n: "04",
    title: "CONNECT",
    copy: "기술과 사용자, 그리고 비즈니스의 목적을 연결합니다.",
    tags: ["Presentation", "Product Thinking", "Marketing", "Collaboration"],
    related: "EVERYTHING, TOGETHER",
  },
] as const;

export const interests = [
  "PHOTOGRAPHY",
  "FASHION",
  "TRAVEL",
  "JOURNAL",
  "MUSIC",
  "GOOD QUESTIONS",
] as const;
