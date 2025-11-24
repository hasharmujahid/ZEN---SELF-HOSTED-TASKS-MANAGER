# ZEN - Application Requirements

## 1. Introduction
ZEN is a personal task management platform designed to be modern, intuitive, and productivity-focused. It features a calm aesthetic with dark and light mode options.

## 2. Functional Requirements (FRs)

### 2.1 Authentication & Authorization
- **FR-AUTH-01**: Users must be able to sign up for a new account using an email and password.
- **FR-AUTH-02**: Users must be able to log in securely.
- **FR-AUTH-03**: Passwords must be hashed and stored securely.
- **FR-AUTH-04**: Sessions should persist for a reasonable duration (e.g., 30 days) unless the user logs out.
- **FR-AUTH-05**: Users must be able to log out.

### 2.2 User Profile Management
- **FR-PROF-01**: Users can upload and update a profile picture.
- **FR-PROF-02**: Users can set and update their display name.
- **FR-PROF-03**: Users can set and update their profession/job title.
- **FR-PROF-04**: Profile changes must be reflected immediately in the UI.

### 2.3 Task Management
- **FR-TASK-01**: Users can create a new task with a title and optional description.
- **FR-TASK-02**: Users can view a list of their tasks.
- **FR-TASK-03**: Users can mark a task as "Complete".
- **FR-TASK-04**: Users can delete a task.
- **FR-TASK-05**: Users can put a task on "Hold".
- **FR-TASK-06**: When putting a task on hold, the user must be prompted to add a comment describing the blocker.
- **FR-TASK-07**: Users can edit task details (title, description).

### 2.4 Timer & Time Logging
- **FR-TIME-01**: Users can "Start" a timer for a specific task.
- **FR-TIME-02**: Users can "Stop" the currently running timer.
- **FR-TIME-03**: Users can "Reset" the timer (clearing the current session's elapsed time before saving).
- **FR-TIME-04**: Only one task can have an active timer at a time. Starting a new timer pauses or stops the previous one.
- **FR-TIME-05**: When a timer is stopped, the elapsed time is automatically logged to the task's total time.
- **FR-TIME-06**: Users can view the total time spent on each task.
- **FR-TIME-07**: Users can view a history of time logs for a task (including timestamps of start/stop or duration).

### 2.5 UI/UX Behaviors
- **FR-UI-01**: The application must support both Dark Mode and Light Mode.
- **FR-UI-02**: The user's theme preference should be saved or auto-detected from system settings.
- **FR-UI-03**: The interface must be responsive, adapting to desktop, tablet, and mobile screens.
- **FR-UI-04**: Visual feedback must be provided for interactive elements (hover states, button clicks, loading spinners).

### 2.6 Notifications (Optional/Future)
- **FR-NOTIF-01**: Visual indicators for active timers (e.g., in the tab title or a floating badge).
- **FR-NOTIF-02**: Success messages for actions like "Task Saved" or "Profile Updated".

### 2.7 Error Handling
- **FR-ERR-01**: Clear, user-friendly error messages for failed actions (e.g., "Login failed", "Network error").
- **FR-ERR-02**: Form validation errors must be displayed inline (e.g., "Email is required").

## 3. Non-Functional Requirements (NFRs)

### 3.1 Performance
- **NFR-PERF-01**: Application load time should be under 2 seconds on 4G networks.
- **NFR-PERF-02**: UI interactions (opening modals, switching tabs) should feel instantaneous (< 100ms).
- **NFR-PERF-03**: Timer updates should be smooth (1-second intervals) without causing UI lag.

### 3.2 Security
- **NFR-SEC-01**: All data transmission must occur over HTTPS.
- **NFR-SEC-02**: User passwords must be salted and hashed (e.g., using bcrypt or Argon2).
- **NFR-SEC-03**: API endpoints must be protected against common vulnerabilities (SQL injection, XSS, CSRF).
- **NFR-SEC-04**: User data must be isolated; users cannot access other users' tasks.

### 3.3 Scalability
- **NFR-SCAL-01**: The database schema should support thousands of tasks per user without significant performance degradation.
- **NFR-SCAL-02**: The architecture should allow for future separation of frontend and backend services if needed.

### 3.4 Reliability
- **NFR-REL-01**: The application should handle network disconnects gracefully (e.g., optimistic UI updates where possible, or clear offline indicators).
- **NFR-REL-02**: Data consistency must be maintained for time logs.

### 3.5 Usability
- **NFR-USE-01**: The design must adhere to the "Calm" aesthetic: minimalist layout, ample whitespace, soothing colors.
- **NFR-USE-02**: Critical actions (Start Timer, Complete Task) should be accessible within 1-2 clicks.
- **NFR-USE-03**: The UI must be intuitive enough that a new user can understand the core flow (Create -> Time -> Complete) without a tutorial.

### 3.6 Accessibility
- **NFR-ACC-01**: The application should aim for WCAG 2.1 AA compliance.
- **NFR-ACC-02**: All interactive elements must be keyboard accessible.
- **NFR-ACC-03**: Color contrast ratios must meet standards for text readability in both Dark and Light modes.
- **NFR-ACC-04**: Images (like profile pics) must have appropriate alt text.

### 3.7 UI/UX Quality
- **NFR-QUAL-01**: Animations should be subtle and purposeful (e.g., smooth transitions between lists), not distracting.
- **NFR-QUAL-02**: Typography should use modern, sans-serif fonts (e.g., Inter, Roboto) for readability.
