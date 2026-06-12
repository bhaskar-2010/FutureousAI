import { careersData } from "@/data/careers";
import { getRoadmap } from "@/data/roadmaps";

export function generateLocalCounselorResponse(question: string, profile: any): string {
  const q = question.toLowerCase();

  // Keyword matching logic
  
  if (q.includes("roadmap") || q.includes("steps") || q.includes("how to become")) {
    const matchedCareer = careersData.find(c => q.includes(c.title.toLowerCase()) || q.includes(c.id));
    if (matchedCareer) {
      const roadmap = getRoadmap(matchedCareer.id);
      let response = `Here is the roadmap for becoming a **${roadmap.careerName}**:\n\n`;
      roadmap.steps.forEach((step, index) => {
        response += `**${index + 1}. ${step.stage}**: ${step.title}\n   ${step.description}\n\n`;
      });
      return response;
    }
  }

  if (q.includes("exam") || q.includes("entrance")) {
    const matchedCareer = careersData.find(c => q.includes(c.title.toLowerCase()) || q.includes(c.id));
    if (matchedCareer) {
      return `To become a **${matchedCareer.title}**, you should prepare for the following exams:\n\n- ${matchedCareer.exams.join("\n- ")}\n\nGood luck!`;
    } else {
      // Find all exams
      const allExams = new Set<string>();
      careersData.forEach(c => c.exams.forEach(e => allExams.add(e)));
      return `Common entrance exams include: ${Array.from(allExams).slice(0, 5).join(", ")} and many more. Could you tell me which career you are interested in?`;
    }
  }

  // Look for career specific mentions
  const matchedCareer = careersData.find(c => q.includes(c.title.toLowerCase()) || q.includes(c.id.replace("-", " ")));
  if (matchedCareer) {
    return `**${matchedCareer.title}** is a highly sought after career in the ${matchedCareer.category} field.\n\n**Demand:** ${matchedCareer.demand}\n**Skills required:** ${matchedCareer.skills.join(", ")}\n**Degrees:** ${matchedCareer.degree}\n\nLet me know if you want to see the roadmap!`;
  }

  // General fallback
  if (profile) {
    return `I am currently operating in **Offline/Fallback Mode**. Based on your profile (Class ${profile.studentClass}, ${profile.stream} stream), I recommend exploring careers like **${careersData.find(c => c.streams.includes(profile.stream) || c.streams.includes("Any Stream"))?.title || 'Data Scientist'}** or **Software Engineer**. \n\nAsk me about specific careers or exams!`;
  }

  return `I am currently operating in **Offline/Fallback Mode**. I have access to our career database and roadmaps. Please ask me about specific careers (like 'Software Engineer') or exams (like 'JEE')!`;
}
