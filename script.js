// --- Courses ---
const courses = [
  { id: 1, title: "Mathematics", description: "Form 1–4 Maths concepts and problem solving" },
  { id: 2, title: "Chemistry", description: "Form 1–4 Chemistry syllabus topics" },
  { id: 3, title: "Physics", description: "Form 1–4 Physics syllabus topics" },
  { id: 4, title: "Biology", description: "Form 1–4 Biology syllabus topics" }
];

// --- Lessons (Form 1–4 per subject) ---
const lessons = [
  // Mathematics
  { id: 101, courseId: 1, title: "Form 1 Algebra", content: "Introduction to algebraic expressions and equations." },
  { id: 102, courseId: 1, title: "Form 2 Trigonometry", content: "Basics of trigonometric ratios and identities." },
  { id: 103, courseId: 1, title: "Form 3 Differentiation", content: "Introduction to calculus and differentiation." },
  { id: 104, courseId: 1, title: "Form 4 Vectors", content: "Vector operations and applications." },

  // Chemistry
  { id: 201, courseId: 2, title: "Form 1 States of Matter", content: "Solid, liquid, gas and their properties." },
  { id: 202, courseId: 2, title: "Form 2 Periodic Table", content: "Arrangement of elements and periodic trends." },
  { id: 203, courseId: 2, title: "Form 3 Organic Chemistry", content: "Introduction to hydrocarbons and functional groups." },
  { id: 204, courseId: 2, title: "Form 4 Industrial Chemistry", content: "Ammonia, sulphuric acid, and environmental chemistry." },

  // Physics
  { id: 301, courseId: 3, title: "Form 1 Forces & Motion", content: "Introduction to force, motion, and pressure." },
  { id: 302, courseId: 3, title: "Form 2 Electricity Basics", content: "Current, voltage, resistance, and circuits." },
  { id: 303, courseId: 3, title: "Form 3 Waves", content: "Sound and light waves, reflection and refraction." },
  { id: 304, courseId: 3, title: "Form 4 Electronics", content: "Semiconductors, diodes, transistors, and applications." },

  // Biology
  { id: 401, courseId: 4, title: "Form 1 Cell Structure", content: "Parts and functions of a cell." },
  { id: 402, courseId: 4, title: "Form 2 Transport in Plants", content: "Xylem, phloem, and water movement." },
  { id: 403, courseId: 4, title: "Form 3 Genetics", content: "Inheritance, DNA, and variation." },
  { id: 404, courseId: 4, title: "Form 4 Human Health", content: "Diseases, immunity, and environmental conservation." }
];

// --- Quizzes (sample per subject) ---
const quizzes = {
  101: [
    { q: "Simplify: 2x + 3x", options: ["2x", "3x", "5x", "6x"], answer: 2 },
    { q: "Solve: x + 4 = 7", options: ["x=1", "x=2", "x=3", "x=4"], answer: 2 }
  ],
  202: [
    { q: "Which group contains noble gases?", options: ["Group 1", "Group 7", "Group 8", "Group 2"], answer: 2 }
  ],
  302: [
    { q: "What is the unit of current?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: 1 }
  ],
  403: [
    { q: "Who is known as the father of genetics?", options: ["Darwin", "Mendel", "Watson", "Crick"], answer: 1 }
  ]
};

// --- Progress Helpers ---
function getProgress() {
  return JSON.parse(localStorage.getItem("progress")) || {};
}
function saveProgress(progress) {
  localStorage.setItem("progress", JSON.stringify(progress));
}

// --- Gamification Helpers ---
function getStats() {
  return JSON.parse(localStorage.getItem("stats")) || { points: 0, badges: [] };
}
function saveStats(stats) {
  localStorage.setItem("stats", JSON.stringify(stats));
}
function awardPoints(points) {
  const stats = getStats();
  stats.points += points;
  saveStats(stats);
}
function awardBadge(badge) {
  const stats = getStats();
  if (!stats.badges.includes(badge)) {
    stats.badges.push(badge);
    alert(`🏅 You earned a new badge: ${badge}`);
  }
  saveStats(stats);
}
function checkBadgeMilestones() {
  const progress = getProgress();
  const stats = getStats();
  const completedLessons = Object.keys(progress).filter(id => progress[id].completed).length;

  if (completedLessons >= 1 && !stats.badges.includes("Bronze")) awardBadge("Bronze");
  if (completedLessons >= 3 && !stats.badges.includes("Silver")) awardBadge("Silver");
  if (completedLessons >= 5 && !stats.badges.includes("Gold")) awardBadge("Gold");
  if (completedLessons === lessons.length && !stats.badges.includes("Platinum")) awardBadge("Platinum");
}

// --- Render Courses ---
function renderCourses() {
  const container = document.getElementById("courses");
  container.innerHTML = "";
  const progress = getProgress();

  courses.forEach(c => {
    const div = document.createElement("div");
    div.className = "course";

    const completed = lessons.filter(l => l.courseId == c.id && progress[l.id]?.completed).length;
    const total = lessons.filter(l => l.courseId == c.id).length;
    const percent = total > 0 ? (completed / total) * 100 : 0;

    div.innerHTML = `
      <h2>${c.title}</h2>
      <p>${c.description}</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>
      <p>${completed}/${total} lessons completed</p>
      <a href="course.html?id=${c.id}" class="btn">View Course</a>
    `;
    container.appendChild(div);
console.log("Rendering courses:", courses);
  });
}

// --- Render Lessons ---
function renderLessons(courseId) {
  const course = courses.find(c => c.id == courseId);
  document.getElementById("course-title").innerText = course.title;

  const container = document.getElementById("lessons");
  container.innerHTML = "";
  const progress = getProgress();

  lessons.filter(l => l.courseId == courseId).forEach(l => {
    const div = document.createElement("div");
    div.className = "lesson";

    const status = progress[l.id]?.completed ? "✅ Completed" : "❌ Not Completed";

    div.innerHTML = `
      <h3>${l.title}</h3>
      <p>Status: ${status}</p>
      <a href="lesson.html?id=${l.id}" class="btn">Open Lesson</a>
    `;
    container.appendChild(div);
  });
}

// --- Render Lesson + Quiz ---
function renderLesson(lessonId) {
  const lesson = lessons.find(l => l.id == lessonId);
  document.getElementById("lesson-title").innerText = lesson.title;
  document.getElementById("lesson-content").innerHTML = lesson.content;

  const quizData = quizzes[lessonId];
  if (quizData) {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "<h3>Quiz</h3>";
    quizData.forEach(q => {
      const qDiv = document.createElement("div");
      qDiv.innerHTML = `<p>${q.q}</p>`;
      q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => {
          if (idx === q.answer) {
            alert("✅ Correct!");
            awardPoints(10);
            markLessonComplete(lessonId);
            checkBadgeMilestones();
            showNextLesson(lessonId);
          } else {
            alert("❌ Try again!");
          }
        };
        qDiv.appendChild(btn);
      });
      quizDiv.appendChild(qDiv);
    });
  } else {
    markLessonComplete(lessonId);
    checkBadgeMilestones();
    showNextLesson(lessonId);
  }
}

// --- Show Next Lesson ---
function showNextLesson(currentLessonId) {
  const currentLesson = lessons.find(l => l.id == currentLessonId);

  const courseLessons = lessons.filter(l => l.courseId == currentLesson.course


