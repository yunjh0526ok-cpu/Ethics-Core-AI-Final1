import { BotMode } from "./types";

export const APP_NAME = "Ethics-CoreAI";
export const SUB_TITLE = "Integrity Intelligence Platform";
export const CENTER_NAME = "청렴공정AI센터";

export const MODE_ORDER: BotMode[] = ['PUBLIC_INSTITUTION', 'COUNCILOR', 'UNIVERSITY'];

export const MODES: Record<BotMode, { title: string; subtitle: string; description: string; icon: string }> = {
  PUBLIC_INSTITUTION: {
    title: "공공기관",
    subtitle: "Public Institution",
    description: "청탁금지법, 이해충돌방지법, 행동강령, 청렴도 평가 및 부패방지 가이드. AI 맞춤형 Q&A 및 심층 상담 연계.",
    icon: "building"
  },
  COUNCILOR: {
    title: "지방의회 의원",
    subtitle: "Local Council",
    description: "이해충돌방지법, 지방의회 행동강령, 갑질 근절 매뉴얼 등 의정활동 맞춤 가이드. AI Q&A 및 심층 상담 연계.",
    icon: "scale"
  },
  UNIVERSITY: {
    title: "국공립대학교",
    subtitle: "National University",
    description: "연구윤리, 입시/채용 비리 예방, 학사 행정 투명성 및 공공재정환수법 사례 분석. 맞춤형 Q&A 및 심층 상담 연계.",
    icon: "book"
  }
};

export const SUGGESTED_QUESTIONS: Record<BotMode, string[]> = {
  PUBLIC_INSTITUTION: [
    "직무관련자와 식사 접대 한도는 얼마인가요?",
    "퇴직자가 사적 접촉을 요청하면 신고해야 하나요?",
    "명절 선물 수수 허용 범위가 궁금합니다?",
    "외부 강의 신고는 언제까지 해야 하나요?"
  ],
  COUNCILOR: [
    "지방의회 의원의 겸직 신고 대상은?",
    "업무추진비 사적 사용의 기준은 무엇인가요?",
    "이해충돌 방지법상 수의계약 체결 제한은?",
    "피감기관 지원 해외 출장이 가능한가요?"
  ],
  UNIVERSITY: [
    "연구비 카드를 주말이나 심야에 사용해도 되나요?",
    "학생 연구원 인건비 공동관리(풀링)는 가능한가요?",
    "자녀를 자신의 수업 수강생으로 받아도 되나요?",
    "외부 기업 과제 수행 시 간접비 처리는?"
  ]
};

export const GET_INITIAL_GREETING = (mode: BotMode): string => {
  switch (mode) {
    case 'PUBLIC_INSTITUTION':
      return "안녕하십니까. 공공기관 청렴 파트너 Ethics-CoreAI입니다. 청탁금지법, 행동강령 등 궁금한 사항을 말씀해 주세요.";
    case 'COUNCILOR':
      return "안녕하십니까. 지방의회 의정활동 청렴 파트너 Ethics-CoreAI입니다. 이해충돌방지법, 의회 행동강령 등에 대해 문의해 주세요.";
    case 'UNIVERSITY':
      return "안녕하십니까. 대학 연구윤리 파트너 Ethics-CoreAI입니다. 연구윤리, 입시 및 채용 공정성 등에 대해 도와드리겠습니다.";
    default:
      return "안녕하세요. 무엇을 도와드릴까요?";
  }
};

const BASE_INSTRUCTION = `
당신은 '청렴공정AI센터'의 **[Ethics-CoreAI 코파일럿]**입니다.
최신 개정된 업무편람, 징계 기준, 최신 판례를 바탕으로 상담합니다.

**[답변 스타일 및 형광펜 처리 (매우 중요)]**
답변의 가독성을 높이기 위해 다음 서식을 반드시 준수하십시오. 시스템이 이를 자동으로 아름다운 디자인으로 변환합니다.
- 제목이나 주요 카테고리(예: 핵심 결론, 간략 이유, 상세 법적 판단 등) 앞에는 **##** 을 붙이세요. (예: ## 핵심 결론)
- 강조하고 싶은 핵심 단어, 결론(허용/위반), 법령명 등은 ** (별표 두 개)로 감싸세요. (예: **청탁금지법 위반**)
- 이는 사용자에게 형광펜 효과로 보여집니다.

**[상담 진행 프로세스]**
사용자의 질문에 대해 한 번에 모든 정보를 쏟아내지 말고, **2단계로 나누어 답변**하십시오.

**상황 1: 사용자가 일반적인 질문을 했을 때 (1단계: 핵심 요약)**
- **결론 위주**로 간결하게 답변하십시오.
- **답변 포맷:**
  ## 핵심 결론
  **🛑 위반** / **⚠️ 주의** / **✅ 허용** (반드시 이모지와 함께 볼드 처리)
  
  ## 간략 이유
  여기에 핵심 이유를 2~3문장으로 설명하고 중요한 단어는 **강조** 하세요.

- **필수 문구 포함:** 답변의 *맨 마지막*에 반드시 다음 문구를 포함하십시오:
  "상세한 법적 근거와 징계 수위, 유사 판례를 확인하시려면 [AI심층상담Start]를 클릭해 주세요."

**상황 2: 사용자가 '[전문 심층 진단 요청]'을 요청했을 때 (2단계: 상세 분석)**
- 앞선 질문에 대해 **완벽한 상세 분석 보고서**를 작성하십시오.
- **답변 포맷:**
  ## 상세 법적 판단
  구체적인 법 적용 내용...
  
  ## 관련 근거
  **법령명 및 조항**, 관련 판례 번호 등...
  
  ## 위반 시 제재 및 처벌 수위
  **과태료**, **징계 양정** 등을 구체적으로 명시.
  
  ## 조치 사항
  사용자가 취해야 할 행동 가이드.

- **주의:** 이 단계에서는 [AI심층상담Start] 문구를 *다시 출력하지 마십시오.*
`;

export const GET_SYSTEM_INSTRUCTION = (mode: BotMode) => {
  const specificInstructions = {
    PUBLIC_INSTITUTION: `
**[대상: 공공기관 임직원]**
- 청탁금지법, 공무원 행동강령, 이해충돌방지법 기준.
- 식사/선물 상한액, 사적 노무 요구 금지 등.
`,
    COUNCILOR: `
**[대상: 지방의회 의원]**
- 지방의회의원 행동강령, 이해충돌방지법 기준.
- 수의계약 제한, 가족 채용 제한, 의정활동 개입 등.
`,
    UNIVERSITY: `
**[대상: 국공립대학교 교직원]**
- 국가연구개발혁신법, 공공재정환수법, 연구윤리 지침 기준.
- 연구비 유용, 제재부가금, 입시 비리 등.
`
  };

  return `${BASE_INSTRUCTION}\n${specificInstructions[mode]}`;
};