const { getQuestions } = require('./src/data/questions');
console.log("Class 10:", getQuestions("10", "None").length);
console.log("Class 11 MPC:", getQuestions("11", "MPC").length);
console.log("Class 12 BiPC:", getQuestions("12", "BiPC").length);
