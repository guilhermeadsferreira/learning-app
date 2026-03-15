You are a senior frontend architect and product-minded engineer.

I want to build the initial scaffold for a web platform called "Learning Engine".

This platform is a gamified learning system designed to teach technical topics (starting with React) through short lessons, practice challenges, and visible progress.

The architecture must be reusable for multiple courses.

The first MVP will include only one course: React Fundamentals.

The system should support:

- courses
- modules
- lessons
- lesson content
- challenges
- progress tracking
- basic gamification (XP and progress bar)

Tech stack:

- React
- Vite
- TypeScript
- TailwindCSS
- shadcn/ui
- Sandpack for interactive code exercises

Project goals:

The UI must feel modern, clean and motivating.
Inspired by Duolingo, Codecademy and modern SaaS interfaces.

Avoid childish design but keep gamification elements subtle.

---

Create the project scaffold including:

1. folder structure
2. basic routing
3. layout components
4. placeholder pages
5. course data model
6. lesson data model
7. sidebar navigation
8. lesson view layout

---

Required core components:

AppShell  
Header  
SidebarCourseNavigation  
LessonLayout  
LessonContent  
ChallengeCard  
CodeEditorPanel  
PreviewPanel  
FeedbackCard  
ProgressBar  

---

Folder structure suggestion:

src/
  components/
  layouts/
  pages/
  courses/
  engine/
  hooks/
  styles/

---

The scaffold should include:

- Tailwind setup
- shadcn/ui integration
- example course JSON
- example lesson JSON
- example lesson page
- placeholder progress state

---

Create a clean and scalable architecture that can grow into a full learning platform.

Focus on developer experience and maintainability.

Generate the scaffold step by step.