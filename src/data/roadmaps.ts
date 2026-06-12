export type RoadmapNode = {
  stage: string;
  title: string;
  description: string;
};

export type Roadmap = {
  id: string;
  careerName: string;
  steps: RoadmapNode[];
};

// A fallback roadmap for missing careers
export const genericRoadmap: Roadmap = {
  id: "generic",
  careerName: "Your Custom Career Path",
  steps: [
    { stage: "Class 10", title: "Foundation Building", description: "Focus on core subjects, explore your interests, and start building a strong academic base." },
    { stage: "Class 11-12", title: "Stream Selection & Deep Dive", description: "Choose the stream aligned with this career. Focus heavily on relevant subjects and maintain a high percentage." },
    { stage: "Entrance Exams", title: "Preparation & Testing", description: "Identify and prepare for the national or state-level entrance exams required for this field." },
    { stage: "Degree", title: "Higher Education", description: "Enroll in a relevant Bachelor's degree program at a reputed university." },
    { stage: "Skills", title: "Skill Development", description: "Build practical skills through internships, projects, and certifications." },
    { stage: "Career Launch", title: "Entering the Workforce", description: "Apply for entry-level positions, build a strong portfolio, and start networking." }
  ]
};

// Creating a subset of the required 30 roadmaps for MVP
export const roadmapsData: Record<string, Roadmap> = {
  "software-engineer": {
    id: "software-engineer",
    careerName: "Software Engineer",
    steps: [
      { stage: "Class 10", title: "Mathematics & Logic", description: "Strengthen your mathematical skills and logic. Start exploring block coding or basic Python." },
      { stage: "Class 11-12", title: "MPC Stream", description: "Take Physics, Chemistry, and Mathematics. Focus intensely on Calculus and Algebra." },
      { stage: "Entrance Exams", title: "JEE / BITSAT", description: "Prepare for JEE Main, JEE Advanced, or other engineering entrance exams." },
      { stage: "Degree", title: "B.Tech in CSE", description: "Pursue a 4-year B.Tech in Computer Science or IT. Focus on Data Structures and Algorithms." },
      { stage: "Skills", title: "Programming Languages", description: "Master languages like JavaScript, Python, or Java. Build projects on GitHub." },
      { stage: "Career Launch", title: "Tech Placements", description: "Participate in college placements, apply for SDE roles, and build a strong resume." }
    ]
  },
  "mbbs-doctor": {
    id: "mbbs-doctor",
    careerName: "MBBS Doctor",
    steps: [
      { stage: "Class 10", title: "Biology Foundation", description: "Build a strong interest in human anatomy and life sciences." },
      { stage: "Class 11-12", title: "BiPC Stream", description: "Take Biology, Physics, and Chemistry. NCERT books are your bible for NEET." },
      { stage: "Entrance Exams", title: "NEET UG", description: "Crack the National Eligibility cum Entrance Test (NEET) with a high percentile." },
      { stage: "Degree", title: "MBBS", description: "Complete your 5.5-year MBBS degree including the mandatory 1-year internship." },
      { stage: "Skills", title: "Clinical Skills", description: "Develop empathy, decision-making under pressure, and practical clinical skills." },
      { stage: "Career Launch", title: "Residency & Practice", description: "Clear NEET PG for specialization or start practicing as a general physician." }
    ]
  },
  "data-scientist": {
    id: "data-scientist",
    careerName: "Data Scientist",
    steps: [
      { stage: "Class 10", title: "Math & Statistics", description: "Develop a strong affinity for numbers, puzzles, and basic statistics." },
      { stage: "Class 11-12", title: "MPC or Commerce with Math", description: "Opt for Math as a core subject. Statistics and Economics are highly beneficial." },
      { stage: "Entrance Exams", title: "University Entrances", description: "Prepare for exams like CUET, JEE (if aiming for B.Tech), or specific B.Stat entrances (ISI)." },
      { stage: "Degree", title: "B.Sc/B.Tech in Data Science", description: "Pursue Statistics, Math, Computer Science, or dedicated Data Science degrees." },
      { stage: "Skills", title: "Python & Machine Learning", description: "Master Python, Pandas, SQL, and Machine Learning algorithms. Compete on Kaggle." },
      { stage: "Career Launch", title: "Data Analyst / Junior DS", description: "Start as an Analyst or Junior Data Scientist. Build a strong portfolio of projects." }
    ]
  },
  "lawyer": {
    id: "lawyer",
    careerName: "Lawyer",
    steps: [
      { stage: "Class 10", title: "Reading & Debating", description: "Improve public speaking, reading comprehension, and participation in debates." },
      { stage: "Class 11-12", title: "Humanities or Commerce", description: "Political Science, History, and Legal Studies are great choices. Maintain high grades." },
      { stage: "Entrance Exams", title: "CLAT & AILET", description: "Prepare rigorously for Common Law Admission Test (CLAT) to enter top National Law Universities (NLUs)." },
      { stage: "Degree", title: "BA LLB (Hons)", description: "Complete a 5-year integrated law degree. Participate actively in Moot Courts and legal aid." },
      { stage: "Skills", title: "Legal Drafting & Internships", description: "Intern with NGOs, law firms, and senior advocates to learn drafting and litigation." },
      { stage: "Career Launch", title: "Bar Council & Practice", description: "Clear the All India Bar Examination (AIBE) and join a firm or practice in courts." }
    ]
  },
  "civil-engineer": {
    id: "civil-engineer",
    careerName: "Civil Engineer",
    steps: [
      { stage: "Class 10", title: "Science Foundation", description: "Focus on Physics and Mathematics, understanding forces and geometry." },
      { stage: "Class 11-12", title: "MPC Stream", description: "Take Physics, Chemistry, and Mathematics." },
      { stage: "Entrance Exams", title: "JEE & State Exams", description: "Prepare for JEE Main, JEE Advanced, or state-level engineering entrances." },
      { stage: "Degree", title: "B.Tech in Civil Engineering", description: "Study structural engineering, fluid mechanics, and construction materials." },
      { stage: "Skills", title: "CAD & Project Management", description: "Learn AutoCAD, STAAD Pro, and project management fundamentals." },
      { stage: "Career Launch", title: "Site Engineer / Designer", description: "Start on-site or in design. Consider giving the GATE exam for PSUs or M.Tech." }
    ]
  },
  "army-officer": {
    id: "army-officer",
    careerName: "Army Officer",
    steps: [
      { stage: "Class 10", title: "Physical Fitness & Discipline", description: "Start building physical endurance and join NCC if available." },
      { stage: "Class 11-12", title: "Any Stream (MPC Preferred)", description: "MPC is required for Navy/Air Force, but Army accepts any stream. Keep academics strong." },
      { stage: "Entrance Exams", title: "NDA Exam", description: "Clear the UPSC NDA written exam during or right after Class 12." },
      { stage: "Selection", title: "SSB Interview", description: "Pass the rigorous 5-day Service Selection Board (SSB) interview and medical tests." },
      { stage: "Training", title: "NDA & IMA", description: "Undergo 3 years of training at National Defence Academy, followed by 1 year at Indian Military Academy." },
      { stage: "Career Launch", title: "Commissioned Officer", description: "Pass out as a Lieutenant in the Indian Army, ready to lead and serve." }
    ]
  },
  "graphic-designer": {
    id: "graphic-designer",
    careerName: "Graphic Designer",
    steps: [
      { stage: "Class 10", title: "Art & Aesthetics", description: "Develop an eye for design, colors, and typography. Start sketching." },
      { stage: "Class 11-12", title: "Any Stream", description: "Any stream is fine. Fine Arts or Humanities can be advantageous." },
      { stage: "Entrance Exams", title: "Design Entrances", description: "Prepare for NID DAT, UCEED, or NIFT entrances if aiming for top institutes." },
      { stage: "Degree", title: "B.Des or Fine Arts", description: "Pursue a Bachelor of Design (B.Des) in Visual Communication or Graphic Design." },
      { stage: "Skills", title: "Adobe CC & Portfolio", description: "Master Photoshop, Illustrator, Figma. Build a stunning Behance portfolio." },
      { stage: "Career Launch", title: "Junior Designer", description: "Join an agency, tech company, or start freelancing to build your client base." }
    ]
  }
};

export const getRoadmap = (id: string): Roadmap => {
  return roadmapsData[id] || { ...genericRoadmap, careerName: "Custom Roadmap" };
};
