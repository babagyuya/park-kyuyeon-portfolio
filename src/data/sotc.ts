import officialIntroduction from "../assets/projects/sotc/sotc-official-introduction.png";
import officialMember from "../assets/projects/sotc/sotc-official-member.png";
import memberProfile from "../assets/projects/sotc/sotc-member-profile.png";
import samsungTechBlog from "../assets/projects/sotc/samsung-tech-blog.png";
import contentExample from "../assets/projects/sotc/sotc-content-example.png";
import channelLinks from "../assets/projects/sotc/sotc-channel-links.png";
import blogHome from "../assets/projects/sotc/sotc-blog-home.png";
import blogPosts from "../assets/projects/sotc/sotc-blog-posts.png";
import contentInsights from "../assets/projects/sotc/sotc-content-insights.png";
import type { ProjectImage } from "./works";

const media = (src: string, alt: string, caption: string): ProjectImage => ({ src, alt, caption });

export const sotcCase = {
  info: {
    title: "SOTC",
    subtitle: "SAMSUNG OPEN TECH COMPANIONS",
    period: "2026.07 — 2026.12",
    role: "TECH CONTENT · BRAND COMMUNICATION",
    statement: "기술을 이해하고, 사람들이 보고 싶은 이야기로 바꾸다.",
  },
  images: {
    officialIntroduction: media(officialIntroduction, "Samsung Open Source의 SOT Companions 공식 소개 페이지", "OFFICIAL INTRODUCTION / SAMSUNG OPEN SOURCE"),
    officialMember: media(officialMember, "Samsung Open Source SOT Companions Current Members에 등록된 박규연", "OFFICIAL MEMBER EVIDENCE"),
    memberProfile: media(memberProfile, "SOTC 7기 박규연 Current Member 프로필", "CURRENT MEMBER / PARK KYUYEON"),
    samsungTechBlog: media(samsungTechBlog, "Samsung Tech Blog 메인 페이지", "OFFICIAL TECH CONTENT ECOSYSTEM"),
    contentExample: media(contentExample, "SOTC 7기 박규연이 Content Editor로 제작한 삼성 기술 콘텐츠", "MY CONTENT / CONTENT EDITOR · PARK KYUYEON"),
    channelLinks: media(channelLinks, "SOTC 공식 Instagram의 채널 링크 페이지", "CHANNEL LINKS / OFFICIAL ECOSYSTEM"),
    blogHome: media(blogHome, "Samsung Open Tech Companions 공식 블로그 홈", "OFFICIAL BLOG / HOME"),
    blogPosts: media(blogPosts, "Samsung Open Tech Companions 공식 블로그 게시글 목록", "OFFICIAL BLOG / PUBLISHED CONTENTS"),
    contentInsights: media(contentInsights, "SOTC 콘텐츠 최근 30일 Instagram Insights", "30-DAY CONTENT INSIGHTS"),
  },
  about: [
    "Samsung Open Tech Companions는 Samsung Open Tech의 기술과 활동을 새로운 관점에서 알리고, 콘텐츠와 커뮤니티 활동을 통해 사람들과 기술을 연결하는 활동입니다.",
    "SOTC 7기로서 기술 정보를 그대로 옮기기보다 일반 사용자도 이해하고 관심을 가질 수 있는 주제와 메시지로 다시 구성했습니다.",
  ],
  roles: [
    { id: "01", title: "TECH RESEARCH", description: "삼성의 기술과 서비스, 관련 기술 트렌드를 조사하고 콘텐츠 소재를 발굴했습니다." },
    { id: "02", title: "CONTENT PLANNING", description: "기술 정보를 사용자가 관심을 가질 수 있는 주제와 메시지로 다시 구성했습니다." },
    { id: "03", title: "CONTENT CREATION", description: "Instagram과 Blog 등 채널 특성에 맞는 콘텐츠를 기획하고 제작했습니다." },
    { id: "04", title: "PERFORMANCE REVIEW", description: "게시 이후 조회와 반응을 확인하고 콘텐츠별 차이를 다음 기획에 참고했습니다." },
  ],
  workflow: [
    ["RESEARCH", "Samsung Technology와 Open Tech 조사"],
    ["ANGLE", "사용자 관점에서 콘텐츠 소재 정의"],
    ["PLAN", "제목과 첫 화면, 정보 구조 구성"],
    ["CREATE", "Visual과 Copy 제작"],
    ["PUBLISH", "Official Channel 게시"],
    ["REVIEW", "Views와 Reactions, Reach 확인"],
  ],
  channels: ["INSTAGRAM", "BLOG", "SAMSUNG OPEN SOURCE", "SAMSUNG TECH BLOG", "YOUTUBE"],
  metrics: [
    { value: "2,803", label: "30-DAY CONTENT VIEWS" },
    { value: "94", label: "REACTIONS" },
    { value: "47.5%", label: "NON-FOLLOWERS" },
  ],
  identity: [
    { title: "CREATE", description: "기술을 콘텐츠로 만들고" },
    { title: "CONNECT", description: "사람과 기술을 연결하고" },
    { title: "ANALYZE", description: "사용자의 반응을 다음 기획으로 연결했습니다." },
  ],
  links: {
    officialPageUrl: "",
    instagramUrl: "",
    blogUrl: "",
    techBlogUrl: "",
  },
} as const;
