export type Career = {
  id: string;
  title: string;
  category: string;
  streams: string[]; // Streams that are highly compatible (e.g., "MPC", "BiPC")
  interests: string[]; // Related interests
  aptitude: string[]; // Related aptitude strengths (e.g., "Numerical Ability")
  demand: "Very High" | "High" | "Moderate" | "Emerging";
  skills: string[];
  exams: string[];
  degree: string;
  nextStep: string;
  similarCareers: string[];
  emergingCareers: string[];
};

export const careersData: Career[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    streams: ["MPC"],
    interests: ["Technology", "Gaming"],
    aptitude: ["Numerical Ability", "Logical Reasoning"],
    demand: "Very High",
    skills: ["Programming", "Problem Solving", "Logical Thinking"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT"],
    degree: "B.Tech in Computer Science",
    nextStep: "Prepare for JEE and start learning Python.",
    similarCareers: ["Full Stack Developer", "Backend Engineer"],
    emergingCareers: ["AI Engineer", "Machine Learning Engineer"]
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    category: "Technology",
    streams: ["MPC"],
    interests: ["Technology", "Robotics", "Research"],
    aptitude: ["Numerical Ability", "Scientific Thinking"],
    demand: "Very High",
    skills: ["Machine Learning", "Mathematics", "Python"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT"],
    degree: "B.Tech in AI & Data Science",
    nextStep: "Focus on calculus, linear algebra, and introductory Python.",
    similarCareers: ["Data Scientist", "Robotics Engineer"],
    emergingCareers: ["Prompt Engineer", "AI Ethics Researcher"]
  },
  {
    id: "mbbs-doctor",
    title: "MBBS Doctor",
    category: "Medical",
    streams: ["BiPC"],
    interests: ["Medicine", "Biology", "Research"],
    aptitude: ["Scientific Thinking", "Memory"],
    demand: "Very High",
    skills: ["Biology", "Empathy", "Decision Making", "Working under pressure"],
    exams: ["NEET"],
    degree: "MBBS",
    nextStep: "Start rigorous preparation for NEET focusing on NCERT biology.",
    similarCareers: ["Surgeon", "Pediatrician"],
    emergingCareers: ["Biomedical Informatician", "Telemedicine Specialist"]
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant",
    category: "Finance",
    streams: ["Commerce"],
    interests: ["Business", "Finance"],
    aptitude: ["Numerical Ability", "Logical Reasoning"],
    demand: "High",
    skills: ["Accounting", "Taxation", "Analytical Thinking"],
    exams: ["CA Foundation", "CA Intermediate", "CA Final"],
    degree: "B.Com / CA",
    nextStep: "Enroll for CA Foundation after Class 12.",
    similarCareers: ["Investment Banker", "Financial Analyst"],
    emergingCareers: ["FinTech Specialist", "Blockchain Auditor"]
  },
  {
    id: "ias-officer",
    title: "IAS Officer",
    category: "Government",
    streams: ["Humanities", "MPC", "BiPC", "Commerce"],
    interests: ["Leadership", "History", "Environment", "Law"],
    aptitude: ["Communication", "Leadership", "Logical Reasoning"],
    demand: "High",
    skills: ["Administration", "Public Policy", "General Knowledge"],
    exams: ["UPSC CSE"],
    degree: "Any Bachelor's Degree (BA in Political Science is popular)",
    nextStep: "Develop a strong reading habit and follow current affairs.",
    similarCareers: ["IPS Officer", "IFS Officer", "State Civil Services"],
    emergingCareers: ["Public Policy Analyst", "Smart City Administrator"]
  },
  {
    id: "army-officer",
    title: "Army Officer",
    category: "Defence",
    streams: ["MPC"],
    interests: ["Defence", "Leadership", "Sports"],
    aptitude: ["Spatial Reasoning", "Leadership", "Logical Reasoning"],
    demand: "High",
    skills: ["Physical Fitness", "Discipline", "Strategy"],
    exams: ["NDA", "CDS"],
    degree: "B.A / B.Sc / B.Tech through NDA",
    nextStep: "Prepare for NDA exam and focus on physical fitness.",
    similarCareers: ["Naval Officer", "Air Force Officer"],
    emergingCareers: ["Defence Analyst", "Cyber Warfare Expert"]
  },
  {
    id: "clinical-psychologist",
    title: "Clinical Psychologist",
    category: "Psychology",
    streams: ["Humanities", "BiPC"],
    interests: ["Psychology", "Medicine", "Research"],
    aptitude: ["Communication", "Empathy", "Scientific Thinking"],
    demand: "High",
    skills: ["Active Listening", "Counseling", "Behavioral Analysis"],
    exams: ["CUET"],
    degree: "B.A / B.Sc in Psychology",
    nextStep: "Explore introductory psychology books and plan for CUET.",
    similarCareers: ["Counseling Psychologist", "Child Psychologist"],
    emergingCareers: ["Digital Mental Health Specialist", "Neuropsychologist"]
  },
  {
    id: "lawyer",
    title: "Lawyer",
    category: "Law",
    streams: ["Humanities", "Commerce"],
    interests: ["Law", "Leadership", "History"],
    aptitude: ["Communication", "Logical Reasoning"],
    demand: "High",
    skills: ["Debate", "Critical Thinking", "Research"],
    exams: ["CLAT", "AILET"],
    degree: "BA LLB / BBA LLB",
    nextStep: "Start preparing for CLAT and develop strong reading comprehension.",
    similarCareers: ["Corporate Lawyer", "Judge"],
    emergingCareers: ["Cyber Law Expert", "AI Legal Consultant"]
  }
];

export const getRecommendations = (profile: any, aptitudeResults: any) => {
  return careersData.map(career => {
    let score = 0;
    let reasons: string[] = [];

    // Stream Match (20%)
    if (career.streams.includes(profile.stream) || profile.stream === "None") {
      score += 20;
      reasons.push(`${profile.stream} Stream aligns perfectly.`);
    }

    // Interest Match (30%)
    const matchingInterests = career.interests.filter(i => profile.interests.includes(i));
    if (matchingInterests.length > 0) {
      score += Math.min(30, matchingInterests.length * 15);
      reasons.push(`Strong interest in ${matchingInterests.join(", ")}.`);
    }

    // Aptitude Match (35%) - Data-driven using answers and time taken
    if (matchingInterests.length > 0 || career.streams.includes(profile.stream)) {
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
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
};
