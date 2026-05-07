import { TEST_STATUSES } from "./tests.constants";

export { TEST_STATUSES };

export function createMockTest(number) {
  return {
    number,
    title: "جلسة امتحانية",
    timeLabel: "منذ اربع دقائق",
    description: "هذه الأسئلة تساعد على التقدم للامتحان بثقة وذلك في مادة البحث",
    tags: ["# علوم اساسية", "# برمجة", "..."],
    levelLabel: "المستوى",
    levelValue: "صعب",
    questionsLabel: "الأسئلة",
    questionsValue: "135",
    ratingLabel: "التقييم",
    ratingValue: "0.0",
    priceValue: "180",
    priceLabel: "ليرة سورية",
    previewLabel: "معاينة",
  };
}

export function createEmptyDayData() {
  return {
    new: [],
    approved: [],
    "needs-edit": [],
    deleted: [],
    "under-review": [],
    reported: [],
  };
}

export const MOCK_TESTS_BY_DAY = {
  6: {
    new: [createMockTest(1), createMockTest(2)],
    approved: [createMockTest(234), createMockTest(236)],
    "needs-edit": [createMockTest(180)],
    "under-review": [createMockTest(180), createMockTest(181)],
    deleted: [createMockTest(180)],
    reported: [createMockTest(180)],
  },
  7: {
    new: [createMockTest(3)],
    approved: [],
    "needs-edit": [createMockTest(182), createMockTest(183)],
    "under-review": [createMockTest(184)],
    deleted: [],
    reported: [createMockTest(185), createMockTest(186)],
  },
  8: {
    new: [],
    approved: [createMockTest(240)],
    "needs-edit": [],
    "under-review": [createMockTest(187), createMockTest(188), createMockTest(189)],
    deleted: [createMockTest(190)],
    reported: [],
  },
  9: createEmptyDayData(),
  10: {
    new: [createMockTest(11), createMockTest(12), createMockTest(13)],
    approved: [createMockTest(241)],
    "needs-edit": [createMockTest(191)],
    "under-review": [],
    deleted: [],
    reported: [],
  },
};

export const TEST_SUBMISSIONS_SECTIONS = [
  {
    id: "new",
    title: "جديد",
    count: 12,
    color: "#5583FF",
    cards: [createMockTest(1), createMockTest(1), createMockTest(1), createMockTest(1)],
  },
  {
    id: "under-review",
    title: "قيد المراجعة",
    count: 22,
    color: "#EEE611",
    cards: [createMockTest(1)],
  },
];
