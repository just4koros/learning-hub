// --- Courses ---
const courses = [
  { id: 1, title: "Mathematics", description: "Primary & Secondary Maths concepts" },
  { id: 2, title: "Chemistry", description: "Learn chemical reactions and lab skills" },
  { id: 3, title: "Physics", description: "Explore motion, energy, and forces" },
  { id: 4, title: "Biology", description: "Understand living organisms and ecosystems" }
];

// --- Lessons ---
const lessons = [
  // Mathematics
  { id: 101, courseId: 1, title: "Form 1 Algebra", content: "Algebraic expressions and equations." },
  { id: 102, courseId: 1, title: "Geometry Basics", content: "Angles, shapes, and measurements." },

  // Chemistry
  { id: 201, courseId: 2, title: "Acids & Bases", content: "Properties and reactions of acids and bases." },
  { id: 202, courseId: 2, title: "Periodic Table", content: "Elements arranged by atomic number and properties." },

  // Physics
  { id: 301, courseId: 3, title: "Newton’s Laws", content: "Understanding force and motion." },
  { id: 302, courseId: 3, title: "Electricity Basics", content: "Current, voltage, and resistance." },

  // Biology
  { id: 401, courseId: 4, title: "Cell Structure", content: "Parts and functions of a cell." },
  { id: 402, courseId: 4, title: "Human Digestive System", content: "Organs and processes of digestion." }
];

// --- Quizzes ---
const quizzes = {
  101: [
    { q: "Simplify: 2x + 3x", options: ["2x", "3x", "5x", "6x"], answer: 2 },
    { q: "Solve: x + 4 = 7", options: ["x=1", "x=2", "x=3", "x=4"], answer: 2 }
  ],
  201: [
    { q: "Which of these is a base?", options: ["HCl", "NaOH", "CO2", "H2SO4"], answer: 1 }
  ],
  301: [
    { q: "Who formulated the laws of motion?", options: ["Einstein", "Newton", "Galileo", "Tesla"], answer: 1 }
  ],
  401: [
    { q: "Which organelle controls cell activities?", options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"], answer: 0 }
  ]
};
