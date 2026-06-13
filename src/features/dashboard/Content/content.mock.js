function makePreviewSvg({
  accent = "#E7ECFF",
  title = "DOCUMENT",
  paper = "#FFFFFF",
}) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <rect width="150" height="150" rx="26" fill="#ffffff"/>
      <rect x="14" y="14" width="122" height="122" rx="26" fill="${paper}" stroke="#8C8C8C" stroke-width="2"/>
      <text x="75" y="26" text-anchor="middle" font-size="8" font-family="Arial" font-weight="700" fill="#3B4A67">${title}</text>
      <rect x="28" y="42" width="56" height="28" rx="9" fill="#F3EBE1" stroke="#CFC3B5"/>
      <rect x="92" y="45" width="28" height="16" rx="8" fill="#FFFFFF" stroke="#A4A4A4"/>
      <rect x="92" y="66" width="28" height="16" rx="8" fill="#FFFFFF" stroke="#A4A4A4"/>
      <rect x="92" y="87" width="28" height="16" rx="8" fill="#FFFFFF" stroke="#A4A4A4"/>
      <rect x="92" y="108" width="28" height="16" rx="8" fill="#FFFFFF" stroke="#A4A4A4"/>
      <rect x="26" y="78" width="60" height="26" rx="8" fill="${accent}" stroke="#C8D5F0"/>
      <rect x="26" y="110" width="60" height="18" rx="8" fill="#FFF1D7" stroke="#ECD7A7"/>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CONTENT_STATS = [
  {
    id: "posts",
    title: "عدد المنشورات الكلي",
    value: "17000",
    unit: "منشور",
  },
  {
    id: "files",
    title: "عدد الملفات الكلي",
    value: "5000",
    unit: "ملف",
  },
  {
    id: "images",
    title: "عدد الصور الكلي",
    value: "12000",
    unit: "صورة",
  },
];

export const CONTENT_ITEMS = [
  {
    id: 1,
    type: "صورة",
    title: "وثيقة صبغي حيوي",
    description: "تحتوي هذه الصورة على طريقة تكاثر الصبغيات في أجسام الحيوانات",
    tags: ["# علوم اساسية", "# برمجة"],
    duration: "15 س",
    imageSrc: makePreviewSvg({ accent: "#E7ECFF", title: "PEROXISOME" }),
  },
  {
    id: 2,
    type: "صورة",
    title: "وثيقة صبغي حيوي",
    description: "تحتوي هذه الصورة على طريقة تكاثر الصبغيات في أجسام الحيوانات",
    tags: ["# علوم اساسية", "# برمجة"],
    duration: "15 س",
    imageSrc: makePreviewSvg({ accent: "#E7ECFF", title: "PEROXISOME" }),
  },
  {
    id: 3,
    type: "ملف",
    title: "هرمية الأفكار",
    description: "تحتوي هذه الصورة على طريقة تكاثر الصبغيات في أجسام الحيوانات",
    tags: ["# علوم اساسية"],
    duration: "منذ يومان",
    imageSrc: makePreviewSvg({
      accent: "#F5E3D2",
      title: "IDEAS MAP",
      paper: "#FFFDF9",
    }),
  },
  {
    id: 4,
    type: "ملف",
    title: "هرمية الأفكار",
    description: "تحتوي هذه الصورة على طريقة تكاثر الصبغيات في أجسام الحيوانات",
    tags: ["# علوم اساسية"],
    duration: "منذ يومان",
    imageSrc: makePreviewSvg({
      accent: "#F5E3D2",
      title: "IDEAS MAP",
      paper: "#FFFDF9",
    }),
  },
  {
    id: 5,
    type: "ملف",
    title: "قواعد معطيات متقدمة",
    description: "تحتوي هذه الصورة على طريقة تكاثر الصبغيات في أجسام الحيوانات",
    tags: ["# علوم اساسية"],
    duration: "35 د",
    imageSrc: makePreviewSvg({ accent: "#EEF4FF", title: "DB RULES" }),
  },
  {
    id: 6,
    type: "ملف",
    title: "قواعد معطيات متقدمة",
    description: "تحتوي هذه الصورة على طريقة تكاثر الصبغيات في أجسام الحيوانات",
    tags: ["# علوم اساسية"],
    duration: "35 د",
    imageSrc: makePreviewSvg({ accent: "#EEF4FF", title: "DB RULES" }),
  },
  {
    id: 7,
    type: "صورة",
    title: "وثيقة صبغي حيوي",
    description: "تحتوي هذه الصورة على طريقة تكاثر الصبغيات في أجسام الحيوانات",
    tags: ["# علوم اساسية", "# برمجة"],
    duration: "15 س",
    imageSrc: makePreviewSvg({
      accent: "#F2F2F2",
      title: "BIO DOC",
      paper: "#FFFFFF",
    }),
  },
  {
    id: 8,
    type: "صورة",
    title: "وثيقة صبغي حيوي",
    description: "تحتوي هذه الصورة على طريقة تكاثر الصبغيات في أجسام الحيوانات",
    tags: ["# علوم اساسية", "# برمجة"],
    duration: "15 س",
    imageSrc: makePreviewSvg({
      accent: "#F2F2F2",
      title: "BIO DOC",
      paper: "#FFFFFF",
    }),
  },
  {
    id: 9,
    type: "ملف",
    title: "أساسيات البرمجة",
    description: "يحتوي هذا الملف على مدخل مبسط لتنظيم المفاهيم البرمجية الأساسية",
    tags: ["# برمجة"],
    duration: "45 د",
    imageSrc: makePreviewSvg({ accent: "#DFF0FF", title: "PROGRAMMING" }),
  },
  {
    id: 10,
    type: "صورة",
    title: "مخطط كائنات دقيقة",
    description: "تحتوي هذه الصورة على تمثيل مرئي مرتب لتصنيف الكائنات الدقيقة",
    tags: ["# علوم اساسية", "# أحياء"],
    duration: "20 س",
    imageSrc: makePreviewSvg({ accent: "#E9F6E3", title: "MICROBE MAP" }),
  },
  {
    id: 11,
    type: "ملف",
    title: "بنية التقارير",
    description: "نموذج ملف منظم يوضح كيفية كتابة التقرير العلمي داخل المنصة",
    tags: ["# ملف", "# منهجية"],
    duration: "منذ 3 أيام",
    imageSrc: makePreviewSvg({ accent: "#F6E7E0", title: "REPORT FILE" }),
  },
  {
    id: 12,
    type: "صورة",
    title: "ملخص مفاهيم حيوية",
    description: "بطاقة مرئية تلخص أبرز المفاهيم الحيوية المستخدمة في هذا الفصل",
    tags: ["# أحياء", "# علوم اساسية"],
    duration: "10 س",
    imageSrc: makePreviewSvg({ accent: "#E7ECFF", title: "BIO SUMMARY" }),
  },
  {
    id: 13,
    type: "ملف",
    title: "مراجعة مصطلحات علمية",
    description: "قائمة ملفية سريعة لمراجعة أهم المصطلحات العلمية قبل الاختبار",
    tags: ["# علوم اساسية"],
    duration: "55 د",
    imageSrc: makePreviewSvg({ accent: "#F7F1DE", title: "SCI TERMS" }),
  },
  {
    id: 14,
    type: "صورة",
    title: "لوحة تصنيف الأنسجة",
    description: "صورة مرتبة توضح الفروقات بين أنواع الأنسجة الأساسية",
    tags: ["# أحياء"],
    duration: "12 س",
    imageSrc: makePreviewSvg({ accent: "#EDE8FF", title: "TISSUE MAP" }),
  },
  {
    id: 15,
    type: "ملف",
    title: "مبادئ بناء الجداول",
    description: "ملف مبسط يشرح كيفية بناء الجداول وربط الحقول داخل البيانات",
    tags: ["# قواعد بيانات", "# ملف"],
    duration: "30 د",
    imageSrc: makePreviewSvg({ accent: "#E6F2FF", title: "TABLE GUIDE" }),
  },
  {
    id: 16,
    type: "صورة",
    title: "خريطة وظائف الخلية",
    description: "تصور بصري يربط بين أجزاء الخلية ووظيفة كل جزء بشكل مباشر",
    tags: ["# علوم اساسية", "# صورة"],
    duration: "18 س",
    imageSrc: makePreviewSvg({ accent: "#EAF6EA", title: "CELL MAP" }),
  },
  {
    id: 17,
    type: "ملف",
    title: "دليل مفاهيم سريعة",
    description: "ملف مختصر يضم أهم المفاهيم المتكررة للمراجعة قبل التقييم",
    tags: ["# ملف", "# مراجعة"],
    duration: "25 د",
    imageSrc: makePreviewSvg({ accent: "#FCE8D8", title: "QUICK GUIDE" }),
  },
  {
    id: 18,
    type: "صورة",
    title: "خلاصة الدورة الدموية",
    description: "صورة توضيحية لمسار الدورة الدموية الرئيسية داخل جسم الإنسان",
    tags: ["# أحياء", "# صورة"],
    duration: "16 س",
    imageSrc: makePreviewSvg({ accent: "#FFE9EC", title: "BLOOD FLOW" }),
  },
  {
    id: 19,
    type: "ملف",
    title: "هيكل البيانات الأساسية",
    description: "ملف يشرح الهيكل التنظيمي للبيانات وكيفية تقسيم العناصر",
    tags: ["# قواعد بيانات"],
    duration: "40 د",
    imageSrc: makePreviewSvg({ accent: "#E6F2FF", title: "DATA SHAPE" }),
  },
  {
    id: 20,
    type: "صورة",
    title: "رسم توضيحي للأعضاء",
    description: "صورة مرئية تربط بين أعضاء الجسم ووظائفها بشكل مبسط",
    tags: ["# علوم اساسية", "# أحياء"],
    duration: "22 س",
    imageSrc: makePreviewSvg({ accent: "#EDF7E7", title: "ORGANS MAP" }),
  },
];
