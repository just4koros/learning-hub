// --- Example Data ---
const courses = [
  { id: 1, title: "Mathematics", description: "Primary & Secondary Maths concepts" },
  { id: 2, title: "Chemistry", description: "Learn chemical reactions and lab skills" },
  { id: 3, title: "Physics", description: "Explore motion, energy, and forces" },
  { id: 4, title: "Biology", description: "Understand living organisms and ecosystems" }
];

const lessons = [
  { id: 101, courseId: 1, title: "Form 1 Algebra", content: "Algebraic expressions and equations." },
  { id: 102, courseId: 1, title: "Geometry Basics", content: "Angles, shapes, and measurements." },
  { id: 201, courseId: 2, title: "Acids & Bases", content: "Properties and reactions of acids and bases." },
  { id: 301, courseId: 3, title: "Newton’s Laws", content: "Understanding force and motion." },
  { id: 401, courseId: 4, title: "Cell Structure", content: "Parts and functions of a cell." }
];

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
  });
}

// --- Render Lessons ---
function renderLessons(courseId) {
  const course = courses.find(c => c.id == courseId);
  document.getElementById("course-title").innerText = course.title;

  const container = document.getElementById("lessons");
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
  const courseLessons = lessons.filter(l => l.courseId == currentLesson.courseId);
  const currentIndex = courseLessons.findIndex(l => l.id == currentLessonId);

  const navDiv = document.getElementById("navigation");
  if (currentIndex < courseLessons.length - 1) {
    const nextLesson = courseLessons[currentIndex + 1];
    navDiv.innerHTML = `<a href="lesson.html?id=${nextLesson.id}" class="btn">➡ Next Lesson</a>`;
  } else {
    navDiv.innerHTML = `<p>🎉 You’ve completed all lessons in this course!</p>`;
  }
}

// --- Mark Lesson Complete ---
function markLessonComplete(lessonId) {
  const progress = getProgress();
  progress[lessonId] = { completed: true };
  saveProgress(progress);
}

// --- Render Dashboard ---
function renderDashboard() {
  const progress = getProgress();
  const stats = getStats();
  const completedLessons = Object.keys(progress).filter(id => progress[id].completed);

  const summaryDiv = document.getElementById("summary");
  summaryDiv.innerHTML = `
    <p>You have completed ${completedLessons.length} lessons 🎉</p>
    <p>Total Points: ⭐ ${stats.points}</p>
  `;

  const listDiv = document.getElementById("completed-lessons");
  listDiv.innerHTML = "<h3>Completed Lessons:</h3>";
  completedLessons.forEach(id => {
    const lesson = lessons.find(l => l.id == id);
    const div = document.createElement("div");
    div.innerText = `✅ ${lesson.title} (${courses.find(c => c.id == lesson.courseId).title})`;
    listDiv.appendChild(div);
  });

  const badgeDiv = document.createElement("div");
  badgeDiv.className = "badges";
  badgeDiv.innerHTML = "<h3>Badges Earned:</h3>";
  stats.badges.forEach(b => {
    let icon = "🏅";
    if (b === "Bronze") icon = "🥉";
    if (b === "Silver") icon = "🥈";
    if (
