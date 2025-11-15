# Survey Notepad

A simple tool for creating and managing survey questions.

## Local Setup

1. **Clone the repository:**
  ```bash
  git clone https://github.com/brianmmcgrath/empathy-research-exercise
  cd empathy-research-exercise
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Start the development server:**
  ```bash
  npm start
  ```

## Main Components and Functionality

- **App Component:**  
  Contains simpler routeroutlet for navigation

- **SurveyDetailsComponent:**  
  Edit, delete, and organize questions for individual surveys.

- **QuestionCardComponent:**  
  Logic for generation of individual questions. Of particular importance is the parseQuestionScript function for extracting both the string array of questions and the main question text from within the single textarea input. 


---

