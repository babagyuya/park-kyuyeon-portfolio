import ablyFashionCrew from "../assets/brand-collaborations/ably-fashion-crew.png";
import brandCollaborationContent from "../assets/brand-collaborations/brand-collaboration-content.png";
import kisyningBeautySupporters from "../assets/brand-collaborations/kisyning-beauty-supporters.png";
import switchOnSupporters from "../assets/brand-collaborations/switch-on-supporters.png";

export type BrandCollaboration = {
  id: string;
  brand: string;
  koreanName: string;
  period: string;
  category: string;
  role: string;
  description: string;
  image: string;
  imageAlt: string;
  link?: string;
};

export const brandCollaborations: BrandCollaboration[] = [
  {
    id: "ably-fashion-crew",
    brand: "ABLY Fashion Crew",
    koreanName: "에이블리 패션크루",
    period: "2024.10 — 2025.02",
    category: "Fashion / Content",
    role: "콘텐츠 제작 및 브랜드 활동",
    description: "패션 아이템과 스타일링을 직접 촬영하고, 채널의 이용자가 보고 싶어 하는 콘텐츠로 제작했습니다.",
    image: ablyFashionCrew,
    imageAlt: "에이블리 패션크루 활동 및 패션 콘텐츠 이미지",
  },
  {
    id: "kisyning-beauty-supporters",
    brand: "Kisyning Beauty",
    koreanName: "키시닝뷰티 서포터즈",
    period: "2026.05 — 2026.12",
    category: "Beauty / Content",
    role: "뷰티 콘텐츠 기획 및 제작",
    description: "제품의 색감과 사용 장면을 중심으로 뷰티 콘텐츠의 콘셉트부터 촬영과 편집까지 진행했습니다.",
    image: kisyningBeautySupporters,
    imageAlt: "Kisyning Beauty 서포터즈 콘텐츠 제작 이미지",
  },
  {
    id: "switch-on-supporters",
    brand: "Switch On",
    koreanName: "스위치온 서포터즈",
    period: "2026.07 — 2026.09",
    category: "Healthcare / Content",
    role: "헬스케어 제품 콘텐츠 제작 및 브랜드 활동",
    description: "제품이 일상 속에서 사용되는 순간을 직접 구성하고 촬영해 헬스케어 브랜드 콘텐츠로 전달했습니다.",
    image: switchOnSupporters,
    imageAlt: "스위치온 제품 콘텐츠 및 서포터즈 활동 이미지",
  },
  {
    id: "brand-collaboration-content",
    brand: "Brand Collaborations",
    koreanName: "패션 · 뷰티 · 헬스케어 브랜드 협업",
    period: "2024 — 2026",
    category: "Fashion / Beauty / Healthcare",
    role: "콘텐츠 기획 · 촬영 · 제작",
    description: "패션, 뷰티, 헬스케어 분야의 다양한 브랜드와 협업하며 제품과 브랜드 특성에 맞는 콘텐츠를 직접 기획하고 제작했습니다.",
    image: brandCollaborationContent,
    imageAlt: "패션 뷰티 브랜드 콘텐츠 협업 대표 이미지",
  },
];
