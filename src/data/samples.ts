import { SampleImage, ScreeningResult } from '../types';

// Helper to create an encoded SVG data URI
function createFundusSvgUri(content: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#b83822" />
        <stop offset="65%" stop-color="#73180c" />
        <stop offset="90%" stop-color="#3d0b06" />
        <stop offset="100%" stop-color="#120201" />
      </radialGradient>
      <radialGradient id="opticDiscGrad" cx="45%" cy="45%" r="50%">
        <stop offset="0%" stop-color="#fff6cc" />
        <stop offset="50%" stop-color="#ffd566" />
        <stop offset="85%" stop-color="#e69533" />
        <stop offset="100%" stop-color="#994d1a" />
      </radialGradient>
      <radialGradient id="foveaGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#4d0c07" stop-opacity="0.9" />
        <stop offset="70%" stop-color="#6e140b" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#b83822" stop-opacity="0" />
      </radialGradient>
      <filter id="softGaze" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
      <filter id="cottonWool" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <filter id="heavyBlur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="12" />
      </filter>
    </defs>
    <!-- Circular Fundus Mask -->
    <circle cx="250" cy="250" r="235" fill="url(#bgGrad)" />
    ${content}
    <!-- Lens boundary vignette -->
    <circle cx="250" cy="250" r="236" fill="none" stroke="#000000" stroke-width="10" />
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Base healthy anatomical structures
const baseRetinaVessels = `
  <!-- Optic Disc (Nasal side, around x: 170, y: 245) -->
  <circle cx="165" cy="245" r="32" fill="url(#opticDiscGrad)" filter="drop-shadow(0 0 3px rgba(255,200,80,0.4))" />
  <ellipse cx="163" cy="244" r="14" fill="#fffae6" opacity="0.8" />
  
  <!-- Fovea / Macula (Temporal, around x: 300, y: 255) -->
  <circle cx="305" cy="255" r="45" fill="url(#foveaGrad)" />
  <circle cx="305" cy="255" r="4" fill="#3a0703" opacity="0.8" />

  <!-- Superior Temporal Artery & Vein -->
  <path d="M 165,230 Q 180,160 250,135 T 380,120" fill="none" stroke="#520703" stroke-width="6.5" stroke-linecap="round" />
  <path d="M 167,232 Q 182,162 250,137 T 380,122" fill="none" stroke="#941913" stroke-width="4" stroke-linecap="round" />

  <!-- Inferior Temporal Artery & Vein -->
  <path d="M 165,260 Q 190,335 260,355 T 390,370" fill="none" stroke="#4a0602" stroke-width="6.5" stroke-linecap="round" />
  <path d="M 167,258 Q 191,333 260,353 T 390,368" fill="none" stroke="#9e1811" stroke-width="3.8" stroke-linecap="round" />

  <!-- Nasal Vessels -->
  <path d="M 150,235 Q 110,180 65,170" fill="none" stroke="#520703" stroke-width="4.5" stroke-linecap="round" />
  <path d="M 148,255 Q 105,310 60,325" fill="none" stroke="#520703" stroke-width="4.5" stroke-linecap="round" />

  <!-- Smaller arterioles and venules branching -->
  <path d="M 230,140 Q 255,185 285,210" fill="none" stroke="#80140d" stroke-width="2" opacity="0.8" />
  <path d="M 240,350 Q 265,305 290,285" fill="none" stroke="#80140d" stroke-width="2" opacity="0.8" />
  <path d="M 330,125 Q 350,170 380,195" fill="none" stroke="#75120a" stroke-width="1.8" opacity="0.75" />
`;

export const SAMPLE_FUNDUS_IMAGES: SampleImage[] = [
  {
    id: 'aptos-sample-0',
    title: 'Normal Retina (Grade 0)',
    stageNumber: 0,
    stageName: 'No Diabetic Retinopathy',
    aptosId: 'APTOS-2019-c01970b4',
    description: 'Clear optic disc, uniform vascular arcades, well-defined fovea, zero microaneurysms or exudates.',
    svgDataUri: createFundusSvgUri(`
      ${baseRetinaVessels}
      <!-- Normal fine background choroidal pattern -->
      <circle cx="250" cy="250" r="210" fill="none" stroke="#821c10" stroke-width="1" opacity="0.15" />
    `),
  },
  {
    id: 'aptos-sample-1',
    title: 'Mild Non-Proliferative (Grade 1)',
    stageNumber: 1,
    stageName: 'Mild Diabetic Retinopathy',
    aptosId: 'APTOS-2019-f9c311e8',
    description: 'Earliest detectable stage. Isolated microaneurysms (tiny punctate red lesions) in macular region.',
    svgDataUri: createFundusSvgUri(`
      ${baseRetinaVessels}
      <!-- Isolated Microaneurysms (Grade 1 hallmark) -->
      <circle cx="280" cy="230" r="3.2" fill="#520300" stroke="#7d0b04" stroke-width="0.8" />
      <circle cx="340" cy="245" r="2.8" fill="#520300" stroke="#7d0b04" stroke-width="0.8" />
      <circle cx="295" cy="290" r="3.4" fill="#470301" stroke="#7d0b04" stroke-width="0.8" />
      <circle cx="355" cy="280" r="2.5" fill="#520300" />
      <circle cx="245" cy="180" r="3.0" fill="#4d0300" />
    `),
  },
  {
    id: 'aptos-sample-2',
    title: 'Moderate Non-Proliferative (Grade 2)',
    stageNumber: 2,
    stageName: 'Moderate Diabetic Retinopathy',
    aptosId: 'APTOS-2019-e58f001c',
    description: 'Definite microaneurysms, scattered blot hemorrhages, and circumscribed yellow lipid exudates.',
    svgDataUri: createFundusSvgUri(`
      ${baseRetinaVessels}
      <!-- Multiple microaneurysms -->
      <circle cx="270" cy="210" r="3.5" fill="#400200" />
      <circle cx="340" cy="225" r="3.0" fill="#400200" />
      <circle cx="285" cy="285" r="4.0" fill="#400200" />
      <circle cx="355" cy="295" r="3.5" fill="#400200" />
      <circle cx="230" cy="190" r="3.2" fill="#400200" />
      
      <!-- Dot and Blot Hemorrhages -->
      <ellipse cx="260" cy="165" rx="7" ry="5" fill="#380200" opacity="0.9" />
      <ellipse cx="370" cy="230" rx="9" ry="6" fill="#360200" opacity="0.9" />
      <ellipse cx="310" cy="320" rx="8" ry="5.5" fill="#380200" opacity="0.9" />
      <circle cx="390" cy="270" r="6" fill="#3b0200" opacity="0.85" />
      
      <!-- Hard Exudates (bright yellowish lipid deposits) -->
      <g fill="#ffe066" opacity="0.95" filter="url(#softGaze)">
        <polygon points="325,185 330,183 333,188 328,190" />
        <polygon points="334,188 338,186 340,192 336,193" />
        <polygon points="322,192 327,191 329,197 323,196" />
        <polygon points="345,195 350,193 352,200 347,201" />
        <circle cx="338" cy="202" r="3" />
        <circle cx="352" cy="208" r="2.5" />
        <circle cx="280" cy="310" r="3.5" />
        <circle cx="286" cy="314" r="2.5" />
        <circle cx="275" cy="316" r="3" />
      </g>
    `),
  },
  {
    id: 'aptos-sample-3',
    title: 'Severe Non-Proliferative (Grade 3)',
    stageNumber: 3,
    stageName: 'Severe Diabetic Retinopathy',
    aptosId: 'APTOS-2019-d0408544',
    description: 'Extensive 4-quadrant hemorrhages, venous beading, cotton-wool spots (nerve fiber ischemia).',
    svgDataUri: createFundusSvgUri(`
      ${baseRetinaVessels}
      <!-- Venous beading on superior/inferior arcades -->
      <circle cx="210" cy="150" r="7" fill="#4a0602" />
      <circle cx="230" cy="140" r="8" fill="#4a0602" />
      <circle cx="250" cy="136" r="6.5" fill="#4a0602" />
      <circle cx="225" cy="345" r="7.5" fill="#4a0602" />
      <circle cx="245" cy="352" r="8.5" fill="#4a0602" />
      
      <!-- Extensive 4-quadrant blot hemorrhages -->
      <ellipse cx="210" cy="115" rx="14" ry="9" fill="#290100" />
      <ellipse cx="330" cy="100" rx="16" ry="10" fill="#290100" />
      <ellipse cx="380" cy="160" rx="12" ry="8" fill="#290100" />
      <ellipse cx="400" cy="260" rx="15" ry="11" fill="#290100" />
      <ellipse cx="360" cy="340" rx="18" ry="11" fill="#290100" />
      <ellipse cx="230" cy="390" rx="15" ry="10" fill="#290100" />
      <ellipse cx="120" cy="300" rx="14" ry="9" fill="#290100" />
      <ellipse cx="110" cy="180" rx="13" ry="8" fill="#290100" />

      <!-- Cotton-Wool Spots (soft fluffy white retinal infarcts) -->
      <ellipse cx="270" cy="150" rx="15" ry="11" fill="#ffffff" opacity="0.75" filter="url(#cottonWool)" />
      <ellipse cx="350" cy="310" rx="18" ry="13" fill="#ffffff" opacity="0.8" filter="url(#cottonWool)" />
      <ellipse cx="380" cy="210" rx="12" ry="9" fill="#f0f5ff" opacity="0.7" filter="url(#cottonWool)" />
      
      <!-- Widespread hard exudates -->
      <g fill="#ffe066" opacity="0.9">
        <circle cx="300" cy="190" r="3.5" />
        <circle cx="310" cy="195" r="4" />
        <circle cx="318" cy="192" r="3" />
        <circle cx="328" cy="295" r="4.5" />
        <circle cx="336" cy="300" r="3.8" />
      </g>
    `),
  },
  {
    id: 'aptos-sample-4',
    title: 'Proliferative DR (Grade 4)',
    stageNumber: 4,
    stageName: 'Proliferative Diabetic Retinopathy',
    aptosId: 'APTOS-2019-b209e992',
    description: 'Neovascularization (fragile new vessel fronds at disc/arcades) and large preretinal hemorrhage.',
    svgDataUri: createFundusSvgUri(`
      ${baseRetinaVessels}
      <!-- Neovascularization at Disc (NVD) - tangled abnormal capillary lace -->
      <g stroke="#b81d14" stroke-width="1.8" fill="none" opacity="0.95">
        <path d="M 165,245 Q 155,220 145,210 T 135,230 T 150,250" />
        <path d="M 165,245 Q 180,215 195,210 T 190,235 T 175,255" />
        <path d="M 165,245 Q 160,270 140,275 T 150,290" />
        <path d="M 165,245 Q 185,265 200,270 T 215,255" />
        <path d="M 155,235 Q 140,240 130,225" />
        <path d="M 175,230 Q 195,225 205,215" />
      </g>
      
      <!-- Neovascularization Elsewhere (NVE) along arcades -->
      <g stroke="#c7241a" stroke-width="1.5" fill="none" opacity="0.9">
        <path d="M 280,140 Q 300,120 315,130 T 325,115" />
        <path d="M 290,360 Q 310,380 330,370 T 345,390" />
      </g>

      <!-- Large Preretinal Boat-shaped / Vitreous Hemorrhage -->
      <path d="M 240,300 Q 310,300 370,300 C 370,340 330,370 240,370 Z" fill="#1f0100" stroke="#3d0300" stroke-width="2" opacity="0.95" />
      
      <!-- Severe dot-blot hemorrhages & exudates -->
      <ellipse cx="380" cy="180" rx="14" ry="9" fill="#2e0200" />
      <ellipse cx="230" cy="120" rx="12" ry="7" fill="#2e0200" />
      <circle cx="340" cy="200" r="4.5" fill="#ffe066" opacity="0.85" />
      <circle cx="348" cy="204" r="3.5" fill="#ffe066" opacity="0.85" />
    `),
  },
  {
    id: 'aptos-sample-poor',
    title: 'Poor Quality (Low Contrast / Blurred)',
    stageNumber: 0,
    stageName: 'No Diabetic Retinopathy',
    aptosId: 'APTOS-2019-poor-qual',
    isPoorQuality: true,
    description: 'Hazy cornea / lens cataract blur, underexposed illumination. Fails screening quality check.',
    svgDataUri: createFundusSvgUri(`
      <g filter="url(#heavyBlur)">
        ${baseRetinaVessels}
      </g>
      <!-- Hazy white-yellow glare artifact from uncooperative pupil / dirty lens -->
      <ellipse cx="230" cy="210" rx="180" ry="140" fill="#eedcb3" opacity="0.45" filter="url(#heavyBlur)" />
      <circle cx="360" cy="160" r="90" fill="#ffffff" opacity="0.35" filter="url(#heavyBlur)" />
    `),
  },
];

// Initial mock records to give the health worker an active dashboard on first launch
export const INITIAL_SCREENING_HISTORY: ScreeningResult[] = [
  {
    id: 'rec-101',
    patientId: 'MH-PHC-2401',
    patientName: 'Rameshwar Patil',
    age: 58,
    eyeSide: 'Right Eye (OD)',
    timestamp: '2026-09-05 10:45 AM',
    imageUrl: SAMPLE_FUNDUS_IMAGES[2].svgDataUri,
    stageNumber: 2,
    categoryName: 'Moderate Diabetic Retinopathy',
    confidenceScore: 88,
    riskLevel: 'Moderate Risk',
    recommendation: 'Ophthalmologist review recommended within 2 to 4 weeks.',
    basicExplanation:
      'The AI identified retinal features that may be associated with diabetic retinopathy, including distinct microaneurysms and yellow lipid exudates. This result is intended for screening assistance and should be reviewed by a qualified eye-care professional.',
    imageQuality: 'Good',
    hallmarks: ['Multiple microaneurysms near macula', 'Scattered dot hemorrhages', 'Hard exudate cluster'],
    isDemoResult: true,
    modelSource: 'sushrut-prototype-engine',
  },
  {
    id: 'rec-102',
    patientId: 'MH-PHC-2402',
    patientName: 'Kamalamma Gowda',
    age: 63,
    eyeSide: 'Left Eye (OS)',
    timestamp: '2026-09-05 11:20 AM',
    imageUrl: SAMPLE_FUNDUS_IMAGES[0].svgDataUri,
    stageNumber: 0,
    categoryName: 'No Diabetic Retinopathy',
    confidenceScore: 96,
    riskLevel: 'Low Risk',
    recommendation: 'Routine annual eye checkup recommended. Continue glycemic control.',
    basicExplanation:
      'No signs of diabetic retinopathy were detected in this retinal photo. Blood vessels and optic disc appear clear and healthy for screening purposes.',
    imageQuality: 'Good',
    hallmarks: ['Normal vascular arcades', 'Sharp optic disc margin', 'No microaneurysms'],
    isDemoResult: true,
    modelSource: 'sushrut-prototype-engine',
  },
  {
    id: 'rec-103',
    patientId: 'MH-PHC-2403',
    patientName: 'Subhash Chandra',
    age: 51,
    eyeSide: 'Both Eyes',
    timestamp: '2026-09-04 02:15 PM',
    imageUrl: SAMPLE_FUNDUS_IMAGES[3].svgDataUri,
    stageNumber: 3,
    categoryName: 'Severe Diabetic Retinopathy',
    confidenceScore: 91,
    riskLevel: 'High Risk',
    recommendation: 'Priority referral to district ophthalmology clinic within 1 week.',
    basicExplanation:
      'Multiple retinal hemorrhages and signs of compromised vascular circulation were observed. Patient is at elevated risk of vision loss without timely specialist intervention.',
    imageQuality: 'Good',
    hallmarks: ['Extensive 4-quadrant hemorrhages', 'Venous beading', 'Cotton-wool ischemic patches'],
    isDemoResult: true,
    modelSource: 'sushrut-prototype-engine',
  },
  {
    id: 'rec-104',
    patientId: 'MH-PHC-2404',
    patientName: 'Anandi Bai',
    age: 49,
    eyeSide: 'Right Eye (OD)',
    timestamp: '2026-09-04 03:40 PM',
    imageUrl: SAMPLE_FUNDUS_IMAGES[1].svgDataUri,
    stageNumber: 1,
    categoryName: 'Mild Diabetic Retinopathy',
    confidenceScore: 84,
    riskLevel: 'Low Risk',
    recommendation: 'Schedule repeat screening in 6 to 9 months with blood sugar monitoring.',
    basicExplanation:
      'Early microvascular changes (isolated microaneurysms) detected. No vision-threatening lesions observed at this stage.',
    imageQuality: 'Good',
    hallmarks: ['Isolated microaneurysms', 'Clear optic disc'],
    isDemoResult: true,
    modelSource: 'sushrut-prototype-engine',
  },
  {
    id: 'rec-105',
    patientId: 'MH-PHC-2405',
    patientName: 'Devraj Singh',
    age: 67,
    eyeSide: 'Left Eye (OS)',
    timestamp: '2026-09-03 09:30 AM',
    imageUrl: SAMPLE_FUNDUS_IMAGES[4].svgDataUri,
    stageNumber: 4,
    categoryName: 'Proliferative Diabetic Retinopathy',
    confidenceScore: 94,
    riskLevel: 'Critical Risk',
    recommendation: 'Urgent ophthalmologist review needed within 48 to 72 hours for potential laser or anti-VEGF therapy.',
    basicExplanation:
      'Advanced neovascularization and pre-retinal hemorrhage features detected. High risk of vitreous hemorrhage or tractional retinal detachment if unmanaged.',
    imageQuality: 'Good',
    hallmarks: ['Neovascularization at optic disc (NVD)', 'Preretinal hemorrhage', 'Fragile abnormal new vessels'],
    isDemoResult: true,
    modelSource: 'sushrut-prototype-engine',
  },
];
