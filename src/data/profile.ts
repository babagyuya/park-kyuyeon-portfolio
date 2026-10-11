export const profile = {
  name: "Park Kyuyeon",
  displayName: "PARK KYUYEON",
  mark: "PKY®",
  location: "SEOUL, KR",
  year: "2003",
  eyebrow: "TECH × DATA × CONTENT × PEOPLE",
  introduction: [
    "기술과 데이터, 콘텐츠를 넘나들며 아이디어를 실제 경험으로 만드는 박규연입니다.",
    "개발을 통해 아이디어를 구현하고, 데이터와 사용자 반응을 통해 이유를 찾고, 콘텐츠와 발표를 통해 그 가치를 전달합니다.",
    "하나의 직무에 스스로를 한정하기보다 문제를 해결하기 위해 필요한 영역을 연결하며 일하는 것을 좋아합니다.",
  ],
  keywords: ["BUILD", "ANALYZE", "CREATE", "CONNECT"],
} as const;

export const numbers = [
  {
    value: 230,
    suffix: "+",
    label: "CONTENTS",
    note: "기획하고 제작한 콘텐츠 수입니다.",
  },
  {
    value: 2.5,
    suffix: "K",
    label: "FOLLOWERS",
    note: "꾸준한 운영을 통해 함께한 팔로워 규모입니다.",
  },
  {
    value: 4.5,
    suffix: "M",
    label: "MAX VIEWS",
    note: "단일 콘텐츠가 기록한 최대 조회 수입니다.",
  },
  {
    value: 925,
    suffix: "H",
    label: "SW / AI TRAINING",
    note: "소프트웨어와 AI 역량을 집중적으로 학습한 시간입니다.",
  },
  {
    value: 1,
    suffix: "ST",
    label: "PROJECT AWARD",
    note: "SWITH 프로젝트로 SSAFY 특화 프로젝트 1위를 기록했습니다.",
  },
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
    related: "INSTAGRAM MAGAZINE · SAMSUNG",
  },
  {
    n: "04",
    title: "CONNECT",
    copy: "기술과 사용자, 그리고 비즈니스의 목적을 연결합니다.",
    tags: ["Presentation", "Product Thinking", "Marketing", "Collaboration"],
    related: "EVERYTHING, TOGETHER",
  },
] as const;

export const experiences = [
  {
    year: "2025—26",
    title: "SSAFY",
    note: "SW·AI 집중 교육을 통해 웹 개발, 데이터, AI 기반 프로젝트를 수행했습니다. 팀 프로젝트에서는 Frontend를 중심으로 사용자 경험과 서비스 흐름을 구현했고, 최종 발표와 서비스 전달 과정에도 참여했습니다.",
  },
  {
    year: "2025",
    title: "SAMSUNG OPEN TECH COMPANIONS",
    note: "기술 이야기를 더 많은 사람이 이해할 수 있는 콘텐츠로 바꾸고, 일관된 브랜드 메시지로 전달하는 활동을 경험했습니다.",
  },
  {
    year: "2025",
    title: "TENTEN CAMP",
    note: "활동의 구체적인 역할과 성과는 확인 가능한 자료를 기준으로 추후 업데이트할 예정입니다.",
  },
  {
    year: "2025",
    title: "INSTAGRAM MAGAZINE",
    note: "콘텐츠를 하나의 편집 시스템이자 성장 실험으로 운영하며 기획, 제작, 반응 분석의 흐름을 경험했습니다.",
  },
  {
    year: "NOW",
    title: "CONNECTING AI · CONTENT · PRODUCT",
    note: "직무의 경계보다 문제를 해결하는 데 필요한 기술, 데이터, 콘텐츠의 연결에 집중하고 있습니다.",
  },
] as const;

export const skillGroups = [
  {
    name: "DEVELOPMENT",
    items: ["React", "Vue", "TypeScript", "JavaScript", "Python", "Django", "REST API"],
    connection: "아이디어를 사람들이 직접 사용할 수 있는 웹 서비스와 제품으로 구현할 때 사용했습니다.",
  },
  {
    name: "AI / DATA",
    items: ["Python", "Pandas", "LLM", "Computer Vision", "Data Analysis"],
    connection: "데이터에서 문제의 원인과 사용자 반응을 확인하고 AI 기능을 서비스에 연결할 때 활용했습니다.",
  },
  {
    name: "PRODUCT",
    items: ["UX", "User Research", "Experiment", "Service Planning"],
    connection: "아이디어를 명확한 사용자 흐름과 검증 가능한 서비스 구조로 발전시키는 데 사용했습니다.",
  },
  {
    name: "MARKETING / CONTENT",
    items: ["Content Planning", "Social Media", "Growth", "Performance Analysis"],
    connection: "전달하고 싶은 정보를 사람들이 보고 싶어 하는 이야기로 만들고 반응을 통해 개선했습니다.",
  },
  {
    name: "COMMUNICATION",
    items: ["Presentation", "Storytelling", "Team Collaboration"],
    connection: "팀의 판단 근거와 결과물을 이해하기 쉬운 이야기로 정리하고 발표하는 데 활용했습니다.",
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

export const contactLinks: Array<{ label: string; href: string | null }> = [
  { label: "EMAIL", href: null },
  { label: "GITHUB", href: null },
  { label: "LINKEDIN", href: null },
  { label: "INSTAGRAM", href: null },
];
