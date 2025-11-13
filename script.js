// Example data
const courses = [
  { id: 1, title: "Mathematics", description: "Learn basic math skills" },
  { id: 2, title: "Science", description: "Explore the world of science" },
  { id: 3, title: "Coding", description: "Introduction to programming" }
];

const lessons = [
  { id: 101, courseId: 1, title: "Addition", content: "Addition is combining numbers." },
  { id: 102, courseId: 1, title: "Subtraction", content: "Subtraction is taking away numbers." },
  { id: 201, courseId: 2, title: "Plants", content: "Plants make food through photosynthesis." },
  { id: 301, courseId: 3, title: "Hello World", content: "Your first program prints 'Hello World'." }
];

const quizzes = {
  101: [
    { q: "2 + 2 = ?", options: ["3", "4", "5", "6"], answer: 1 },
    { q: "5 + 1 = ?", options: ["6", "7", "8", "9"], answer: 0 }
  ],
  201: [
    { q: "What do plants use to make food?", options: ["Water", "Sunlight", "Air", "All of these"], answer: 3 }
  ]
};

// --- Progress Helpers ---
function getProgress() {
  return JSON.parse(localStorage.getItem("progress")) || {};
}

function saveProgress(progress) {
  localStorage.setItem("progress", JSON.stringify(progress));
}

// --- Render Courses ---
function renderCourses() {
  const container = document.getElementById("courses");
  const progress = getProgress();

  courses.forEach(c => {
    const div = document.createElement("div");
    div.className = "course";

    // Count completed lessons
    const completed = lessons.filter(l => l.courseId == c.id && progress[l.id]?.completed).length;
    const total = lessons.filter(l => l.courseId == c.id).length;

    div.innerHTML = `<h2>${c.title}</h2>
                     <p>${c.description}</p>
                     <p>Progress: ${completed}/${total} lessons</p>
                     <a href="course.html?id=${c.id}">View Course</a>`;
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

    div.innerHTML = `<h3>${l.title}</h3>
                     <p>Status: ${status}</p>
                     <a href="lesson.html?id=${l.id}">Open Lesson</a>`;
    container.appendChild(div);
  });
}

// --- Render Lesson + Quiz ---
function renderLesson(lessonId) {
  const lesson = lessons.find(l => l.id == lessonId);
  document.getElementById("lesson-title").innerText = lesson.title;
  document.getElementById("lesson-content").innerText = lesson.content;

  const quizData = quizzes[lessonId];
  if (quizData) {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "<h3>Quiz</h3>";
    quizData.forEach((q, i) => {
      const qDiv = document.createElement("div");
      qDiv.innerHTML = `<p>${q.q}</p>`;
      q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => {
          if (idx === q.answer) {
            alert("Correct!");
            markLessonComplete(lessonId);
          } else {
            alert("Try again!");
          }
        };
        qDiv.appendChild(btn);
      });
      quizDiv.appendChild(qDiv);
    });
  } else {
    // If no quiz, mark lesson complete when viewed
    markLessonComplete(lessonId);
  }
}

// --- Mark Lesson Complete ---
function markLessonComplete(lessonId) {
  const progress = getProgress();
  progress[lessonId] = { completed: true };
  saveProgress(progress);
}
