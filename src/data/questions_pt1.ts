export type Question = {
  id: number;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
};

export type QuestionBank = Record<string, Question[]>;

export const questionBanks: QuestionBank = {
  Class10: [
    {
      id: 1,
      text: "If α and β are the roots of the equation (x^2 - 6x + 8 = 0), then the value of ( α^2 + β^2 ) is:",
      options: { A: "18", B: "20", C: "22", D: "24" },
      answer: "B"
    },
    {
      id: 2,
      text: "If (\\tan \\theta = \\frac{3}{4}), then (\\sin \\theta + \\cos \\theta) is:",
      options: { A: "( \\frac{7}{5} )", B: "( \\frac{5}{7} )", C: "1", D: "( \\frac{12}{25} )" },
      answer: "A"
    },
    {
      id: 3,
      text: "The sum of the first 20 terms of the AP 5, 8, 11, 14, ... is:",
      options: { A: "650", B: "670", C: "720", D: "770" },
      answer: "B"
    },
    {
      id: 4,
      text: "A bag contains 4 red, 5 blue, and 3 green balls. The probability of drawing a blue ball is:",
      options: { A: "5/12", B: "4/12", C: "3/12", D: "7/12" },
      answer: "A"
    },
    {
      id: 5,
      text: "The distance between the points A(−1, 2) and B(5, 10) is:",
      options: { A: "8", B: "10", C: "12", D: "14" },
      answer: "B"
    },
    {
      id: 6,
      text: "A 220 V electric iron draws a current of 5 A. Its resistance is:",
      options: { A: "22 Ω", B: "44 Ω", C: "55 Ω", D: "110 Ω" },
      answer: "B"
    },
    {
      id: 7,
      text: "A student adds dilute hydrochloric acid to sodium carbonate. Which gas is evolved?",
      options: { A: "Hydrogen", B: "Oxygen", C: "Carbon dioxide", D: "Chlorine" },
      answer: "C"
    },
    {
      id: 8,
      text: "If both parents have blood group AB, which blood group cannot appear in their child?",
      options: { A: "A", B: "B", C: "AB", D: "O" },
      answer: "D"
    },
    {
      id: 9,
      text: "Which event immediately triggered the launch of the Non-Cooperation Movement?",
      options: { A: "Swadeshi Movement", B: "Partition of Bengal", C: "Jallianwala Bagh Massacre", D: "Dandi March" },
      answer: "C"
    },
    {
      id: 10,
      text: "Why are black soils highly suitable for cotton cultivation?",
      options: { A: "Rich in humus", B: "Retain moisture for long periods", C: "Rich in limestone", D: "Rich in phosphorus only" },
      answer: "B"
    },
    {
      id: 11,
      text: "Which of the following is considered human capital formation?",
      options: { A: "Construction of highways", B: "Opening a factory", C: "Investment in education and health", D: "Importing machinery" },
      answer: "C"
    },
    {
      id: 12,
      text: "Which feature ensures that rulers can be removed by the people?",
      options: { A: "Constitution", B: "Universal Adult Franchise", C: "Elections", D: "Judiciary" },
      answer: "C"
    },
    {
      id: 13,
      text: "If DOG = 26 and CAT = 24 based on the sum of alphabetical positions of the letters, then LION = ?",
      options: { A: "50", B: "52", C: "56", D: "60" },
      answer: "A"
    },
    {
      id: 14,
      text: "Find the next term in the series: 2, 6, 12, 20, 30, ?",
      options: { A: "40", B: "42", C: "44", D: "46" },
      answer: "B"
    },
    {
      id: 15,
      text: "In a school, 120 students are in MPC, 90 in BiPC, 60 in Commerce, and 30 in Humanities. What percentage of the total students belong to MPC?",
      options: { A: "30%", B: "35%", C: "40%", D: "45%" },
      answer: "C"
    }
  ],
  Class11_MPC: [
    {
      id: 1,
      text: "If x+1/x=4, then x^3+1/x^3 equals:",
      options: { A: "52", B: "56", C: "60", D: "64" },
      answer: "A"
    },
    {
      id: 2,
      text: "The number of ways to arrange the letters of the word MATHEMATICS is:",
      options: { A: "4989600", B: "415800", C: "831600", D: "9979200" },
      answer: "A"
    },
    {
      id: 3,
      text: "The coefficient of x^4 in (2+x)^6 is:",
      options: { A: "240", B: "160", C: "120", D: "80" },
      answer: "A"
    },
    {
      id: 4,
      text: "If the roots of x^2-8x+k=0 differ by 4, then k equals:",
      options: { A: "12", B: "16", C: "20", D: "24" },
      answer: "A"
    },
    {
      id: 5,
      text: "Three fair coins are tossed simultaneously. The probability of getting at least two heads is:",
      options: { A: "1/4", B: "3/8", C: "1/2", D: "5/8" },
      answer: "C"
    },
    {
      id: 6,
      text: "A particle starts from rest and moves with acceleration 4 m/s^2. Distance covered in the 5th second is:",
      options: { A: "16 m", B: "18 m", C: "20 m", D: "22 m" },
      answer: "B"
    },
    {
      id: 7,
      text: "A body of mass 2 kg is moving with velocity 10 m/s. Work required to stop it completely is:",
      options: { A: "50 J", B: "100 J", C: "150 J", D: "200 J" },
      answer: "B"
    },
    {
      id: 8,
      text: "A satellite revolves close to Earth's surface. Its orbital speed is approximately:",
      options: { A: "5.6 km/s", B: "7.9 km/s", C: "9.8 km/s", D: "11.2 km/s" },
      answer: "B"
    },
    {
      id: 9,
      text: "Two forces of 8 N and 15 N act at right angles. Resultant force is:",
      options: { A: "17 N", B: "21 N", C: "23 N", D: "25 N" },
      answer: "A"
    },
    {
      id: 10,
      text: "A simple pendulum has a period of 2 s. Its length is approximately:",
      options: { A: "0.5 m", B: "1.0 m", C: "2.0 m", D: "4.0 m" },
      answer: "B"
    },
    {
      id: 11,
      text: "The maximum number of electrons that can have n=4 and l=2 is:",
      options: { A: "6", B: "10", C: "14", D: "18" },
      answer: "B"
    },
    {
      id: 12,
      text: "Which of the following has the highest first ionization enthalpy?",
      options: { A: "Na", B: "Mg", C: "Al", D: "Si" },
      answer: "D"
    },
    {
      id: 13,
      text: "The bond angle in ammonia (NH3) is closest to:",
      options: { A: "180°", B: "120°", C: "109.5°", D: "107°" },
      answer: "D"
    },
    {
      id: 14,
      text: "For the reaction N2+3H2 ⇌ 2NH3, increasing pressure will:",
      options: { A: "Shift equilibrium left", B: "Shift equilibrium right", C: "Have no effect", D: "Stop the reaction" },
      answer: "B"
    },
    {
      id: 15,
      text: "The oxidation number of sulfur in H2SO4 is:",
      options: { A: "+4", B: "+5", C: "+6", D: "+7" },
      answer: "C"
    }
  ],
  Class11_BiPC: [
    {
      id: 1,
      text: "A particle moves with uniform acceleration. If it covers 24 m in the first 2 seconds and 64 m in the next 2 seconds, its acceleration is:",
      options: { A: "2 m/s²", B: "3 m/s²", C: "4 m/s²", D: "5 m/s²" },
      answer: "D"
    },
    {
      id: 2,
      text: "A body of mass 5 kg moving at 8 m/s collides with a stationary body of mass 3 kg and sticks to it. The common velocity after collision is:",
      options: { A: "4 m/s", B: "5 m/s", C: "6 m/s", D: "7 m/s" },
      answer: "B"
    },
    {
      id: 3,
      text: "The escape velocity from Earth is approximately:",
      options: { A: "7.9 km/s", B: "9.8 km/s", C: "11.2 km/s", D: "16.6 km/s" },
      answer: "C"
    },
    {
      id: 4,
      text: "The dimensional formula of the gravitational constant G is:",
      options: { A: "[M⁻¹L³T⁻²]", B: "[ML⁻¹T⁻²]", C: "[M⁻¹L²T⁻¹]", D: "[ML²T⁻²]" },
      answer: "A"
    },
    {
      id: 5,
      text: "The ratio of kinetic energies of two particles having masses in the ratio 2:3 and equal momenta is:",
      options: { A: "2:3", B: "3:2", C: "4:9", D: "9:4" },
      answer: "B"
    },
    {
      id: 6,
      text: "The maximum number of electrons that can be accommodated in all orbitals having n=4 is:",
      options: { A: "18", B: "24", C: "32", D: "36" },
      answer: "C"
    },
    {
      id: 7,
      text: "Which of the following has the smallest atomic radius?",
      options: { A: "Na", B: "Mg", C: "Al", D: "Cl" },
      answer: "D"
    },
    {
      id: 8,
      text: "The hybridization of carbon in ethyne (C2H2) is:",
      options: { A: "sp³", B: "sp²", C: "sp", D: "dsp²" },
      answer: "C"
    },
    {
      id: 9,
      text: "For the equilibrium N2(g) + 3H2(g) ⇌ 2NH3(g), an increase in pressure shifts equilibrium:",
      options: { A: "Left", B: "Right", C: "No effect", D: "First right then left" },
      answer: "B"
    },
    {
      id: 10,
      text: "The oxidation number of chromium in K2Cr2O7 is:",
      options: { A: "+4", B: "+5", C: "+6", D: "+7" },
      answer: "C"
    },
    {
      id: 11,
      text: "Which of the following organisms belongs to Kingdom Protista?",
      options: { A: "Amoeba", B: "Mushroom", C: "Spirogyra", D: "Moss" },
      answer: "A"
    },
    {
      id: 12,
      text: "The site of protein synthesis in a cell is:",
      options: { A: "Lysosome", B: "Ribosome", C: "Golgi body", D: "Vacuole" },
      answer: "B"
    },
    {
      id: 13,
      text: "During which phase of mitosis do chromosomes align at the equatorial plate?",
      options: { A: "Prophase", B: "Metaphase", C: "Anaphase", D: "Telophase" },
      answer: "B"
    },
    {
      id: 14,
      text: "The primary acceptor of carbon dioxide during the Calvin Cycle is:",
      options: { A: "RuBP", B: "PEP", C: "ATP", D: "NADPH" },
      answer: "A"
    },
    {
      id: 15,
      text: "Which hormone is responsible for the 'fight or flight' response?",
      options: { A: "Insulin", B: "Thyroxine", C: "Adrenaline", D: "Estrogen" },
      answer: "C"
    }
  ],
  Class11_Commerce: [
    {
      id: 1,
      text: "A machine costing ₹1,00,000 has a residual value of ₹10,000 and a useful life of 9 years. Using the Straight Line Method, the annual depreciation is:",
      options: { A: "₹9,000", B: "₹10,000", C: "₹11,000", D: "₹12,000" },
      answer: "B"
    },
    {
      id: 2,
      text: "A trader's bank passbook shows an overdraft balance of ₹12,000. A cheque of ₹3,000 issued by him has not yet been presented for payment. The balance as per Cash Book will be:",
      options: { A: "₹9,000 Overdraft", B: "₹12,000 Overdraft", C: "₹15,000 Overdraft", D: "₹15,000 Positive Balance" },
      answer: "A"
    },
    {
      id: 3,
      text: "Which of the following errors will NOT affect the agreement of the Trial Balance?",
      options: { A: "Wrong totaling of Purchases Book", B: "Posting ₹500 as ₹50", C: "Complete omission of a transaction from books", D: "Posting a debit entry to the credit side" },
      answer: "C"
    },
    {
      id: 4,
      text: "A bill of exchange accepted for ₹20,000 is discounted by the holder at 12% p.a. for 3 months. The discount amount is:",
      options: { A: "₹400", B: "₹500", C: "₹600", D: "₹800" },
      answer: "C"
    },
    {
      id: 5,
      text: "If Gross Profit Ratio is 25% on sales and sales amount to ₹4,00,000, the Gross Profit is:",
      options: { A: "₹75,000", B: "₹1,00,000", C: "₹1,25,000", D: "₹1,50,000" },
      answer: "B"
    },
    {
      id: 6,
      text: "A company wishes to raise large amounts of capital from the public while limiting liability of owners. Which form of organization is most suitable?",
      options: { A: "Sole Proprietorship", B: "Partnership", C: "Joint Hindu Family Business", D: "Joint Stock Company" },
      answer: "D"
    },
    {
      id: 7,
      text: "Which of the following business services directly helps in reducing uncertainty arising from accidental losses?",
      options: { A: "Banking", B: "Warehousing", C: "Insurance", D: "Transport" },
      answer: "C"
    },
    {
      id: 8,
      text: "An entrepreneur starts an online platform where buyers and sellers interact directly without owning inventory. This business model is best described as:",
      options: { A: "Manufacturing", B: "Merchant Model", C: "Marketplace Model", D: "Franchise Model" },
      answer: "C"
    },
    {
      id: 9,
      text: "The median of the data set 12, 18, 21, 24, 30, 35, 40 is:",
      options: { A: "21", B: "24", C: "30", D: "25" },
      answer: "B"
    },
    {
      id: 10,
      text: "A dataset has Mean = 50, Median = 40, Mode = 30. Which statement is most accurate?",
      options: { A: "Distribution is symmetrical", B: "Distribution is positively skewed", C: "Distribution is negatively skewed", D: "No conclusion can be drawn" },
      answer: "B"
    },
    {
      id: 11,
      text: "The Laspeyres Price Index uses:",
      options: { A: "Current year quantities as weights", B: "Base year quantities as weights", C: "Average quantities as weights", D: "No weights" },
      answer: "B"
    },
    {
      id: 12,
      text: "Which reform introduced in 1991 had the objective of reducing government control over industries?",
      options: { A: "Privatization", B: "Liberalization", C: "Globalization", D: "Nationalization" },
      answer: "B"
    },
    {
      id: 13,
      text: "Investment in education and health is considered crucial because it:",
      options: { A: "Increases physical capital directly", B: "Creates human capital", C: "Reduces exports", D: "Elimates inflation" },
      answer: "B"
    },
    {
      id: 14,
      text: "A country records high GDP growth but increasing income inequality. Which statement is most appropriate?",
      options: { A: "Economic growth automatically ensures equitable development", B: "GDP growth alone is not sufficient to measure overall development", C: "Inequality has no impact on development", D: "GDP and development are identical concepts" },
      answer: "B"
    },
    {
      id: 15,
      text: "A shopkeeper offers successive discounts of 20% and 10% on a product marked at ₹5,000. The final selling price is:",
      options: { A: "₹3,500", B: "₹3,600", C: "₹4,000", D: "₹4,100" },
      answer: "B"
    }
  ],
  Class11_Humanities: [
    {
      id: 1,
      text: "Which development is considered the strongest evidence that the transition from prehistory to history had occurred?",
      options: { A: "Use of stone tools", B: "Discovery of fire", C: "Development of writing systems", D: "Domestication of animals" },
      answer: "C"
    },
    {
      id: 2,
      text: "The Industrial Revolution first transformed societies because it primarily:",
      options: { A: "Increased agricultural output", B: "Replaced human and animal labor with machine-based production", C: "Abolished monarchies", D: "Expanded religious institutions" },
      answer: "B"
    },
    {
      id: 3,
      text: "A constitution is often described as a 'living document' because:",
      options: { A: "It is written by living people", B: "It can be interpreted and amended to meet changing needs", C: "It changes every year", D: "It has no fixed provisions" },
      answer: "B"
    },
    {
      id: 4,
      text: "Which situation represents a conflict between liberty and equality?",
      options: { A: "Providing free education to all citizens", B: "Allowing unrestricted wealth accumulation despite extreme inequality", C: "Conducting free elections", D: "Protecting freedom of speech" },
      answer: "B"
    },
    {
      id: 5,
      text: "If a state government and the central government disagree over a constitutional matter, which institution has the final authority to interpret the Constitution?",
      options: { A: "Parliament", B: "Prime Minister", C: "Election Commission", D: "Judiciary" },
      answer: "D"
    },
    {
      id: 6,
      text: "The Himalayas continue to rise in height mainly because:",
      options: { A: "Volcanic eruptions", B: "River deposition", C: "Ongoing collision of tectonic plates", D: "Glacial erosion" },
      answer: "C"
    },
    {
      id: 7,
      text: "A region experiences high rainfall but frequent water scarcity. Which explanation is most reasonable?",
      options: { A: "Rainfall automatically guarantees water availability", B: "Poor storage and management of water resources", C: "Excessive vegetation cover", D: "Low population density" },
      answer: "B"
    },
    {
      id: 8,
      text: "A sociologist studying why different groups in society have unequal access to education would primarily focus on:",
      options: { A: "Individual intelligence only", B: "Social structures and institutions", C: "Biological differences", D: "Climate conditions" },
      answer: "B"
    },
    {
      id: 9,
      text: "Which statement best reflects the sociological imagination?",
      options: { A: "Personal problems are always caused by individual choices", B: "Society has no influence on individual behavior", C: "Personal experiences can be connected to wider social forces", D: "Human behavior is completely random" },
      answer: "C"
    },
    {
      id: 10,
      text: "A student remembers a childhood event vividly after many years but forgets what was studied yesterday. This suggests that:",
      options: { A: "Long-term memory and short-term memory function differently", B: "Memory stores all information equally", C: "Intelligence determines memory completely", D: "Learning has no effect on memory" },
      answer: "A"
    },
    {
      id: 11,
      text: "A researcher wants to determine whether sleep affects academic performance. Which method would provide the strongest evidence?",
      options: { A: "Personal opinion", B: "Controlled experiment", C: "Random guess", D: "Anecdotal observation" },
      answer: "B"
    },
    {
      id: 12,
      text: "A person continues working toward a difficult goal despite repeated failures. This behavior is most closely related to:",
      options: { A: "Perception", B: "Sensation", C: "Motivation", D: "Reflex action" },
      answer: "C"
    },
    {
      id: 13,
      text: "Which scenario best demonstrates nationalism?",
      options: { A: "Loyalty to a sports club", B: "Shared identity and commitment to a nation-state", C: "Support for local government only", D: "Membership in a social media group" },
      answer: "B"
    },
    {
      id: 14,
      text: "A democracy grants freedom of speech but prohibits direct incitement to violence. This reflects the principle that:",
      options: { A: "Rights are absolute and unlimited", B: "Rights may be reasonably restricted to protect society", C: "Freedom is unnecessary in democracy", D: "Governments should control all opinions" },
      answer: "B"
    },
    {
      id: 15,
      text: "A country's GDP grows rapidly, but literacy, healthcare, and employment remain poor. The most appropriate conclusion is:",
      options: { A: "Economic growth automatically ensures development", B: "Development should be measured only by GDP", C: "Human development and economic growth are not always the same", D: "GDP growth is irrelevant" },
      answer: "C"
    }
  ]
};
