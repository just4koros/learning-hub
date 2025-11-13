// Example data
const courses = [
  { id: 1, title: "Mathematics", description: "Learn basic math skills" },
  { id: 2, title: "Science", description: "Explore the world of science" },
  { id: 3, title: "Coding", description: "Introduction to programming" }
];

// Render courses on homepage
const courseContainer = document.getElementById("courses");
courses.forEach(course => {
  const div = document.createElement("div");
  div.className = "course";
  div.innerHTML = `<h2>${course.title}</h2><p>${course.description}</p>
                   <a href="course.html?id=${course.id}">View Course</a>`;
  courseContainer.appendChild(div);
});
