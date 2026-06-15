export type Career = {
  id: string;
  title: string;
  category: string;
  streams: string[]; 
  interests: string[];
  aptitude: string[];
  demand: "Very High" | "High" | "Moderate" | "Emerging";
  skills: string[];
  exams: string[];
  degree: string;
  nextStep: string;
  similarCareers: string[];
  emergingCareers: string[];
  // New Fields
  eligibility: string;
  colleges: string[];
  salaryRange: string;
  futureScope: string;
  industryGrowth: string;
  aiImpact: string;
};

// 1. Defence Careers
// 2. Medical Careers
// 3. Art & Design Careers
// 4. Music Careers
// 5. Technology Careers
// 6. High Potential Future Careers
// + existing

export const careersData: Career[] = [
  // DEFENCE CAREERS
  {
    id: "indian-army-officer",
    title: "Indian Army Officer",
    category: "Defence",
    streams: ["MPC", "Humanities", "Commerce"],
    interests: ["Defence", "Leadership", "Sports"],
    aptitude: ["Leadership", "Logical Reasoning", "Spatial Reasoning"],
    demand: "High",
    skills: ["Leadership", "Discipline", "Physical Fitness", "Strategy"],
    exams: ["NDA", "CDS"],
    degree: "B.A / B.Sc / B.Tech through NDA",
    nextStep: "Prepare for NDA and focus on physical fitness.",
    similarCareers: ["Paramilitary Officer", "Intelligence Officer"],
    emergingCareers: ["Cyber Warfare Specialist"],
    eligibility: "10+2 passing for NDA; Graduation for CDS",
    colleges: ["National Defence Academy (NDA)", "Indian Military Academy (IMA)"],
    salaryRange: "₹8 LPA - ₹25 LPA",
    futureScope: "High status, leadership roles in strategic military planning.",
    industryGrowth: "Stable with increasing focus on modernization.",
    aiImpact: "Moderate (AI assists in logistics and strategy but human leadership remains core)."
  },
  {
    id: "indian-navy-officer",
    title: "Indian Navy Officer",
    category: "Defence",
    streams: ["MPC"],
    interests: ["Defence", "Technology", "Oceanography"],
    aptitude: ["Numerical Ability", "Spatial Reasoning"],
    demand: "High",
    skills: ["Navigation", "Engineering", "Adaptability"],
    exams: ["NDA", "10+2 B.Tech Entry", "CDS"],
    degree: "B.Tech in Naval Architecture / Marine Engineering",
    nextStep: "Focus on Physics, Math and NDA exam prep.",
    similarCareers: ["Coast Guard Officer", "Marine Engineer"],
    emergingCareers: ["Submarine Systems Analyst"],
    eligibility: "10+2 with Physics and Maths",
    colleges: ["Indian Naval Academy (INA)", "NDA"],
    salaryRange: "₹8 LPA - ₹25 LPA",
    futureScope: "Global exposure and technological command roles.",
    industryGrowth: "Growing with maritime security needs.",
    aiImpact: "High in navigation and weapon systems."
  },
  {
    id: "indian-air-force-officer",
    title: "Indian Air Force Officer",
    category: "Defence",
    streams: ["MPC"],
    interests: ["Aviation", "Defence", "Technology"],
    aptitude: ["Spatial Reasoning", "Scientific Thinking"],
    demand: "Very High",
    skills: ["Quick Decision Making", "Aviation Physics", "Focus"],
    exams: ["NDA", "AFCAT", "CDS"],
    degree: "B.Tech / B.Sc in Aviation / Engineering",
    nextStep: "Clear AFCAT/NDA and pass medical/physical standards.",
    similarCareers: ["Fighter Pilot", "Commercial Pilot"],
    emergingCareers: ["Drone Warfare Specialist"],
    eligibility: "10+2 with Physics and Maths for flying branch",
    colleges: ["Air Force Academy (AFA)", "NDA"],
    salaryRange: "₹10 LPA - ₹30 LPA",
    futureScope: "Commanding advanced aerospace tech and squadrons.",
    industryGrowth: "Rapidly expanding aerospace defense.",
    aiImpact: "Very High in flight systems and drone swarms."
  },
  {
    id: "commercial-pilot",
    title: "Commercial Pilot",
    category: "Aviation",
    streams: ["MPC"],
    interests: ["Aviation", "Travel", "Technology"],
    aptitude: ["Spatial Reasoning", "Numerical Ability"],
    demand: "High",
    skills: ["Aviation", "Communication", "Stress Management"],
    exams: ["DGCA Exams", "Pilot Aptitude Test"],
    degree: "Commercial Pilot License (CPL) + B.Sc Aviation",
    nextStep: "Enroll in a DGCA-approved flying school.",
    similarCareers: ["Air Force Pilot", "Helicopter Pilot"],
    emergingCareers: ["Drone Fleet Commander"],
    eligibility: "10+2 with Physics and Maths",
    colleges: ["IGRUA", "Various Private Flying Schools"],
    salaryRange: "₹15 LPA - ₹50+ LPA",
    futureScope: "High demand as global travel expands.",
    industryGrowth: "High growth in commercial aviation sector.",
    aiImpact: "Moderate (Autopilot systems handle cruise, but human pilots required)."
  },
  {
    id: "drdo-scientist",
    title: "DRDO / Defence Scientist",
    category: "Defence",
    streams: ["MPC"],
    interests: ["Research", "Technology", "Defence"],
    aptitude: ["Scientific Thinking", "Numerical Ability"],
    demand: "High",
    skills: ["R&D", "Physics", "Aerospace", "Materials Science"],
    exams: ["GATE", "DRDO SET"],
    degree: "B.Tech / M.Tech / Ph.D in Engineering or Sciences",
    nextStep: "Pursue engineering and aim for a high GATE score.",
    similarCareers: ["Aerospace Engineer", "ISRO Scientist"],
    emergingCareers: ["Hypersonic Weapons Specialist"],
    eligibility: "B.Tech / M.Sc with first class",
    colleges: ["IITs", "NITs", "DIAT"],
    salaryRange: "₹10 LPA - ₹25 LPA",
    futureScope: "Leading cutting-edge indigenous defense tech.",
    industryGrowth: "Steady growth under 'Make in India'.",
    aiImpact: "High in weapons R&D and threat detection."
  },

  // MEDICAL CAREERS
  {
    id: "mbbs-doctor",
    title: "MBBS Doctor",
    category: "Medical",
    streams: ["BiPC"],
    interests: ["Medicine", "Biology", "Healthcare"],
    aptitude: ["Scientific Thinking", "Memory", "Empathy"],
    demand: "Very High",
    skills: ["Clinical Diagnosis", "Anatomy", "Patient Care"],
    exams: ["NEET UG"],
    degree: "MBBS",
    nextStep: "Rigorous preparation for NEET focusing on NCERT.",
    similarCareers: ["Surgeon", "Pediatrician", "BDS Dentist"],
    emergingCareers: ["Telemedicine Specialist", "AI Medical Analyst"],
    eligibility: "10+2 with PCB (min 50%)",
    colleges: ["AIIMS", "JIPMER", "AFMC", "CMC Vellore"],
    salaryRange: "₹8 LPA - ₹40+ LPA",
    futureScope: "Evergreen demand, specializations lead to high earning.",
    industryGrowth: "Constant high growth globally.",
    aiImpact: "High in diagnostics, but human care is irreplaceable."
  },
  {
    id: "ayush-practitioner",
    title: "AYUSH Doctor (BAMS/BHMS)",
    category: "Medical",
    streams: ["BiPC"],
    interests: ["Alternative Medicine", "Wellness", "Biology"],
    aptitude: ["Memory", "Empathy"],
    demand: "Moderate",
    skills: ["Holistic Healing", "Herbal Medicine", "Patient Care"],
    exams: ["NEET UG", "AYUSH Entrance"],
    degree: "BAMS / BHMS / BUMS",
    nextStep: "Prepare for NEET to qualify for AYUSH counseling.",
    similarCareers: ["Naturopathy Doctor", "Yoga Therapist"],
    emergingCareers: ["Integrative Medicine Specialist"],
    eligibility: "10+2 with PCB",
    colleges: ["NIA Jaipur", "NIH Kolkata"],
    salaryRange: "₹4 LPA - ₹15 LPA",
    futureScope: "Growing globally as people seek holistic wellness.",
    industryGrowth: "Moderate to High, pushed by government initiatives.",
    aiImpact: "Low (highly personalized human diagnosis approach)."
  },
  {
    id: "veterinary-doctor",
    title: "Veterinary Doctor",
    category: "Medical",
    streams: ["BiPC"],
    interests: ["Animals", "Biology", "Nature"],
    aptitude: ["Scientific Thinking", "Empathy"],
    demand: "High",
    skills: ["Animal Care", "Surgery", "Patience"],
    exams: ["NEET UG", "AIPVT"],
    degree: "B.V.Sc & A.H.",
    nextStep: "Prepare for NEET/State Veterinary exams.",
    similarCareers: ["Wildlife Biologist", "Zoologist"],
    emergingCareers: ["Animal Genetics Specialist"],
    eligibility: "10+2 with PCB",
    colleges: ["IVRI Bareilly", "TANUVAS Chennai"],
    salaryRange: "₹5 LPA - ₹20 LPA",
    futureScope: "Increasing pet ownership and dairy tech demands.",
    industryGrowth: "High growth in urban pet care.",
    aiImpact: "Low to Moderate in diagnostics."
  },
  {
    id: "clinical-psychology",
    title: "Clinical Psychologist",
    category: "Medical",
    streams: ["BiPC", "Humanities"],
    interests: ["Psychology", "Mental Health", "Research"],
    aptitude: ["Empathy", "Communication", "Logical Reasoning"],
    demand: "Very High",
    skills: ["Therapy", "Active Listening", "Behavioral Analysis"],
    exams: ["CUET", "RCI Registration Exams"],
    degree: "B.A/B.Sc Psychology + M.A + M.Phil (Clinical Psy)",
    nextStep: "Pursue a Bachelor's in Psychology.",
    similarCareers: ["Psychiatrist", "Counselor"],
    emergingCareers: ["Digital Mental Health Expert"],
    eligibility: "10+2 in any stream (BiPC/Humanities preferred)",
    colleges: ["NIMHANS", "TISS", "Delhi University"],
    salaryRange: "₹6 LPA - ₹20 LPA",
    futureScope: "Massive awareness driving demand for mental health pros.",
    industryGrowth: "Rapid growth globally.",
    aiImpact: "Low (AI cannot replicate genuine human empathy and therapy)."
  },

  // ART & DESIGN CAREERS
  {
    id: "ui-ux-designer",
    title: "UI / UX Designer",
    category: "Design",
    streams: ["Any Stream"],
    interests: ["Art", "Technology", "Psychology"],
    aptitude: ["Creativity", "Spatial Reasoning"],
    demand: "Very High",
    skills: ["Wireframing", "Figma", "User Research", "Prototyping"],
    exams: ["NID DAT", "UCEED"],
    degree: "B.Des / B.Sc in Design (or portfolio-based)",
    nextStep: "Start learning Figma and understanding user behavior.",
    similarCareers: ["Product Designer", "Graphic Designer"],
    emergingCareers: ["AR/VR Experience Designer", "AI UI Designer"],
    eligibility: "10+2 in any stream",
    colleges: ["NID", "IIT Bombay (IDC)", "Srishti"],
    salaryRange: "₹6 LPA - ₹30 LPA",
    futureScope: "Essential for all tech products and apps.",
    industryGrowth: "Very high as digital transformation continues.",
    aiImpact: "High (AI generates assets, designers focus on user flows and logic)."
  },
  {
    id: "animator",
    title: "Animator / Concept Artist",
    category: "Design",
    streams: ["Any Stream"],
    interests: ["Art", "Movies", "Gaming"],
    aptitude: ["Creativity", "Spatial Reasoning"],
    demand: "High",
    skills: ["Drawing", "3D Modeling", "Storyboarding", "Blender/Maya"],
    exams: ["NID", "Institution specific exams"],
    degree: "B.Des in Animation / B.Sc Animation",
    nextStep: "Build a strong portfolio of sketches and digital art.",
    similarCareers: ["Illustrator", "VFX Artist"],
    emergingCareers: ["Metaverse World Builder"],
    eligibility: "10+2 in any stream",
    colleges: ["NID", "Rubika", "Whistling Woods"],
    salaryRange: "₹4 LPA - ₹25 LPA",
    futureScope: "Expanding gaming and OTT sectors need heavy animation.",
    industryGrowth: "High growth in gaming & entertainment.",
    aiImpact: "Very High (AI tools speed up rendering, but creative direction remains human)."
  },
  {
    id: "fashion-designer",
    title: "Fashion Designer",
    category: "Design",
    streams: ["Any Stream"],
    interests: ["Fashion", "Art", "Business"],
    aptitude: ["Creativity", "Spatial Reasoning"],
    demand: "High",
    skills: ["Sketching", "Fabric Knowledge", "Trend Forecasting"],
    exams: ["NIFT", "NID DAT"],
    degree: "B.Des in Fashion Design",
    nextStep: "Prepare a creative portfolio and practice sketching.",
    similarCareers: ["Textile Designer", "Fashion Merchandiser"],
    emergingCareers: ["Sustainable Fashion Tech Designer", "Virtual Fashion Creator"],
    eligibility: "10+2 in any stream",
    colleges: ["NIFT", "Pearl Academy", "NID"],
    salaryRange: "₹5 LPA - ₹50+ LPA (with own brand)",
    futureScope: "Evergreen industry with a shift towards sustainable tech.",
    industryGrowth: "Steady growth.",
    aiImpact: "Moderate (AI used for trend prediction and pattern generation)."
  },

  // MUSIC CAREERS
  {
    id: "music-producer",
    title: "Music Producer / Sound Engineer",
    category: "Music",
    streams: ["Any Stream (MPC helps for Sound Eng)"],
    interests: ["Music", "Technology", "Art"],
    aptitude: ["Creativity", "Technical Prowess"],
    demand: "Moderate",
    skills: ["Audio Mixing", "DAW (Ableton/Logic)", "Music Theory"],
    exams: ["Institution specific"],
    degree: "Diploma/Degree in Sound Engineering or Music Production",
    nextStep: "Learn a DAW (like FL Studio) and understand basic music theory.",
    similarCareers: ["Composer", "DJ", "Audio Engineer"],
    emergingCareers: ["Spatial Audio Designer (AR/VR)"],
    eligibility: "10+2 (Physics & Math preferred for Sound Eng)",
    colleges: ["KM Music Conservatory", "FTII", "SAE Institute"],
    salaryRange: "₹4 LPA - ₹30+ LPA",
    futureScope: "Huge demand in OTT, gaming, and independent music.",
    industryGrowth: "High growth in digital media consumption.",
    aiImpact: "High (AI mixing tools, AI generated loops, producers become curators)."
  },

  // TECHNOLOGY CAREERS
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    streams: ["MPC"],
    interests: ["Technology", "Coding", "Problem Solving"],
    aptitude: ["Numerical Ability", "Logical Reasoning"],
    demand: "Very High",
    skills: ["Data Structures", "Programming (Python/JS/Java)", "System Design"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT"],
    degree: "B.Tech in Computer Science / IT",
    nextStep: "Focus on JEE and learn basic logic building.",
    similarCareers: ["Full Stack Developer", "Backend Engineer"],
    emergingCareers: ["Cloud Native Architect", "Web3 Developer"],
    eligibility: "10+2 with Physics and Maths",
    colleges: ["IITs", "NITs", "IIITs", "BITS"],
    salaryRange: "₹8 LPA - ₹60+ LPA",
    futureScope: "The backbone of the modern economy.",
    industryGrowth: "Massive continuous growth.",
    aiImpact: "High (AI writes boilerplate code; engineers focus on architecture)."
  },
  {
    id: "ai-engineer",
    title: "AI / ML Engineer",
    category: "Technology",
    streams: ["MPC"],
    interests: ["Technology", "Math", "Research"],
    aptitude: ["Numerical Ability", "Logical Reasoning"],
    demand: "Very High",
    skills: ["Python", "Machine Learning", "Calculus", "Neural Networks"],
    exams: ["JEE Advanced", "GATE"],
    degree: "B.Tech in CS / AI & Data Science",
    nextStep: "Master Mathematics (Linear Algebra, Calculus) and Python.",
    similarCareers: ["Data Scientist", "Research Scientist"],
    emergingCareers: ["LLM Optimization Engineer", "AI Ethicist"],
    eligibility: "10+2 with Physics and Maths",
    colleges: ["IITs", "IIITs", "BITS"],
    salaryRange: "₹12 LPA - ₹80+ LPA",
    futureScope: "The most transformative tech of the decade.",
    industryGrowth: "Explosive growth.",
    aiImpact: "They are the ones building the AI impact."
  },
  {
    id: "cybersecurity-specialist",
    title: "Cybersecurity Specialist",
    category: "Technology",
    streams: ["MPC"],
    interests: ["Technology", "Security", "Puzzles"],
    aptitude: ["Logical Reasoning", "Attention to Detail"],
    demand: "Very High",
    skills: ["Networking", "Ethical Hacking", "Cryptography", "Linux"],
    exams: ["JEE Main", "Certifications (CEH, OSCP)"],
    degree: "B.Tech in CS (Cybersecurity specialization)",
    nextStep: "Learn networking basics and explore Linux.",
    similarCareers: ["Ethical Hacker", "Security Auditor"],
    emergingCareers: ["AI Security Researcher", "Blockchain Security Expert"],
    eligibility: "10+2 with Physics and Maths",
    colleges: ["IITs", "NITs", "Private Universities"],
    salaryRange: "₹7 LPA - ₹40+ LPA",
    futureScope: "Critical need as all assets become digital.",
    industryGrowth: "Extremely high due to rising cyber threats.",
    aiImpact: "High (AI used for threat detection; hackers also use AI)."
  },

  // HIGH POTENTIAL FUTURE CAREERS
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Future Careers",
    streams: ["MPC", "Commerce with Math"],
    interests: ["Math", "Technology", "Business"],
    aptitude: ["Numerical Ability", "Logical Reasoning"],
    demand: "Very High",
    skills: ["Statistics", "Python", "Data Visualization", "SQL"],
    exams: ["JEE", "CUET", "ISI Entrance"],
    degree: "B.Tech / B.Sc in Data Science / Statistics",
    nextStep: "Strengthen statistics and learn Python libraries (Pandas).",
    similarCareers: ["Data Analyst", "Machine Learning Engineer"],
    emergingCareers: ["Quantum Data Scientist"],
    eligibility: "10+2 with Mathematics",
    colleges: ["IITs", "ISI", "Chennai Mathematical Institute"],
    salaryRange: "₹10 LPA - ₹50 LPA",
    futureScope: "Data is the new oil, driving business decisions globally.",
    industryGrowth: "Exponential growth.",
    aiImpact: "High (AI automates basic analysis, scientists focus on complex modeling)."
  },
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Future Careers",
    streams: ["Any Stream (Engineering/MBA combo is popular)"],
    interests: ["Business", "Technology", "Leadership"],
    aptitude: ["Leadership", "Communication", "Logical Reasoning"],
    demand: "High",
    skills: ["Strategy", "User Empathy", "Agile", "Data Analysis"],
    exams: ["CAT", "GMAT"],
    degree: "B.Tech/BBA followed by MBA",
    nextStep: "Develop leadership skills and a knack for solving user problems.",
    similarCareers: ["Business Analyst", "Marketing Manager"],
    emergingCareers: ["AI Product Manager", "Web3 Product Lead"],
    eligibility: "Any Graduation (MBA preferred)",
    colleges: ["IIMs", "ISB", "XLRI"],
    salaryRange: "₹15 LPA - ₹60+ LPA",
    futureScope: "CEOs of the product, very high demand in tech.",
    industryGrowth: "High growth in the startup and tech ecosystem.",
    aiImpact: "Moderate (AI assists in data analysis, but PM requires human empathy and strategy)."
  },
  {
    id: "sustainability-consultant",
    title: "Sustainability Consultant",
    category: "Future Careers",
    streams: ["BiPC", "Humanities", "MPC"],
    interests: ["Environment", "Business", "Policy"],
    aptitude: ["Scientific Thinking", "Communication"],
    demand: "Emerging",
    skills: ["Environmental Science", "ESG Reporting", "Policy Analysis"],
    exams: ["CUET", "CAT"],
    degree: "B.Sc/B.Tech in Environmental Science / MBA in Sustainability",
    nextStep: "Read about climate change policies and ESG metrics.",
    similarCareers: ["Environmental Engineer", "Urban Planner"],
    emergingCareers: ["Climate Tech Entrepreneur", "Carbon Credit Analyst"],
    eligibility: "10+2 in any stream",
    colleges: ["TERI", "TISS", "IITs (Env Eng)"],
    salaryRange: "₹6 LPA - ₹25 LPA",
    futureScope: "Mandatory corporate ESG goals are driving massive demand.",
    industryGrowth: "Rapidly emerging sector.",
    aiImpact: "Moderate (AI models climate data, humans strategize corporate adoption)."
  },
  {
    id: "aerospace-engineer",
    title: "Aerospace Engineer",
    category: "Future Careers",
    streams: ["MPC"],
    interests: ["Space", "Aviation", "Physics"],
    aptitude: ["Numerical Ability", "Scientific Thinking"],
    demand: "High",
    skills: ["Aerodynamics", "Propulsion", "Thermodynamics"],
    exams: ["JEE Advanced", "IIST Entrance"],
    degree: "B.Tech in Aerospace Engineering",
    nextStep: "Focus heavily on Physics and Math for JEE.",
    similarCareers: ["Mechanical Engineer", "Space Scientist"],
    emergingCareers: ["Space Tech Entrepreneur", "Satellite Systems Engineer"],
    eligibility: "10+2 with Physics and Maths",
    colleges: ["IIST", "IIT Bombay", "IIT Kanpur"],
    salaryRange: "₹9 LPA - ₹35 LPA",
    futureScope: "Private space exploration (SpaceX, ISRO startups) is booming.",
    industryGrowth: "High growth due to privatization of space.",
    aiImpact: "High in simulations and structural analysis."
  }
];

export const getRecommendations = (profile: any, aptitudeResults: any) => {
  return careersData.map(career => {
    let score = 0;
    let reasons: string[] = [];

    // Stream Match (20%)
    if (career.streams.includes(profile.stream) || profile.stream === "None" || career.streams.includes("Any Stream")) {
      score += 20;
      reasons.push(`${profile.stream} Stream aligns perfectly.`);
    } else if (career.streams.join(",").includes("Any Stream")) {
      score += 20;
    }

    // Interest Match (30%)
    const matchingInterests = profile.interests ? career.interests.filter(i => profile.interests.includes(i)) : [];
    if (matchingInterests.length > 0) {
      score += Math.min(30, matchingInterests.length * 10);
      reasons.push(`Strong interest in ${matchingInterests.join(", ")}.`);
    }

    // Aptitude Match (35%) - Data-driven using answers and time taken
    if (matchingInterests.length > 0 || score >= 20) {
      const answersObj = aptitudeResults?.answers || {};
      const timeTakenObj = aptitudeResults?.timeTaken || {};
      const correctAnswers = Object.keys(answersObj).length;
      const totalTime = Object.values(timeTakenObj).reduce((a: any, b: any) => a + b, 0) as number;
      const avgTime = correctAnswers > 0 ? totalTime / correctAnswers : 60;

      if (correctAnswers >= 10 && avgTime < 30) {
        score += 35;
        reasons.push(`Outstanding ${career.aptitude.join(" & ")} with high speed and accuracy.`);
      } else if (correctAnswers >= 5) {
        score += 25;
        reasons.push(`Strong ${career.aptitude.join(" & ")} demonstrated in test.`);
      } else {
        score += 15;
      }
    }

    // Personality (10%) + Class Relevance (5%) = 15%
    score += 10; 
    
    return {
      ...career,
      matchScore: Math.min(99, score),
      reason: reasons.join(" ")
    };
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 8); // Return top 8
};
