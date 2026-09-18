Add ONLY the My Tasks experience to the existing BEZENT HR Role UI. Do not redesign existing navigation or other features.

RIGHT UTILITY RAIL:
Use the existing My Tasks icon. Use a premium task/check-circle icon clearly different from the Approvals icon.

Default:
Outline #0A0044, transparent background.

Hover:
Background #FBE8FF
Icon #610173

Open/Active:
Background #F3B7FE
Strong/filled icon #610173

Do not show number badges.

TASK ICON CLICK:

Open a 360–400px right-side “My Tasks” drawer using the same interaction pattern as Notifications, Approvals and Calendar.

- Push/reduce main workspace width
- Never use a modal
- Keep Right Utility Rail visible
- Only one utility drawer can be open at a time
- Opening Tasks closes Notifications, Approvals, Calendar, Notes or BEZENT AI if currently open

DRAWER HEADER:

My Tasks
“Your assigned HR work and follow-ups”

Actions:
+ Add Task
Filter
Close (X)

TABS:

Today | Upcoming | Completed

TODAY:

Verify employee documents
Arun Kumar • Onboarding
Due Today • High Priority
Open →

Prepare onboarding for new joiner
Priya S • Joining 10 Sep
Due Today
Open →

Review attendance exceptions
Engineering Department • 5 employees
Due 3:00 PM
Open →

Schedule candidate interview
Naveen Kumar • Backend Developer
Due Today
Open →

Follow up missing employee documents
Karthik R • Employee Records
Due Today
Open →

Use compact task rows instead of large cards.

Each task row should contain:
- Task icon
- Task title
- Related employee/candidate/module
- Due date/time
- Priority when applicable
- Completion checkbox
- Open action

TASK COMPLETION:

Checkbox should allow simple tasks to be completed directly.

When checked:
- Use a short completion animation
- Mark task completed
- Move it to Completed
- Show small “Task completed” confirmation

Tasks requiring workflow actions must NOT be completed simply by checkbox.

Example:
“Verify employee documents” → Open actual document verification workflow.

FILTER:

Status:
All
Open
In Progress
Completed

Due:
Overdue
Today
Tomorrow
This Week
Custom

Priority:
High
Medium
Low

Module:
Employees
Recruitment
Onboarding
Attendance
Leave
Documents
Performance
Learning

DRAWER BOTTOM:

View all tasks →

VIEW ALL TASKS:

Open a full “My Tasks” page inside the main workspace.

Header:
My Tasks
“Manage your HR work, follow-ups and deadlines.”

Actions:
+ Add Task

Summary:
Overdue
Due Today
Upcoming
Completed

Tabs:
All | Today | Upcoming | Completed

Search:
“Search tasks...”

Filters:
Status
Priority
Module
Due Date
Assigned By

TASK LIST:

Use a clean enterprise list/table.

Task
Related To
Module
Priority
Due
Status
Action

Example:

Verify documents
Arun Kumar
Onboarding
High
Today
In Progress
Open

Schedule interview
Naveen Kumar
Recruitment
Medium
Today
Open
Open

Attendance exception follow-up
Engineering
Attendance
High
Today
Open
Open

Probation review preparation
Divya M
Employees
Medium
12 Sep
Open
Open

Training enrollment follow-up
Karthik R
Learning
Low
15 Sep
Open
Open

TASK DETAIL:

Click Open → show complete task detail.

Example:

Verify Employee Documents

Arun Kumar
Software Engineer
Engineering

Module:
Onboarding

Priority:
High

Due:
Today • 5:00 PM

Assigned By:
HR Manager

Description:
Verify the employee’s submitted onboarding documents before completing onboarding.

Checklist:
✓ Aadhaar received
✓ PAN received
○ Address proof verification
○ Education certificate verification

Related Record:
Arun Kumar – Onboarding

Attachments:
Show related files when available.

ACTIVITY:
Task created
Assigned to HR
Status changed
Comments
Completion history

Actions:
Open Related Record
Add Comment
Change Due Date
Change Priority
Mark Complete

ADD TASK:

Click + Add Task → open a compact task creation panel.

Fields:
Task Title
Description
Related Employee/Candidate
Module
Priority
Due Date
Due Time
Assignee
Reminder

Actions:
Cancel
Create Task

OVERDUE:

Clearly identify overdue tasks using a small warning indicator and “Overdue” label. Avoid large red backgrounds.

IMPORTANT BEHAVIOR:

My Tasks = work the HR user needs to perform.

Approvals = formal decisions requiring approval/rejection.

Notifications = events, alerts and information.

Example:

Notification:
“Arun submitted documents.”

Task:
“Verify Arun’s documents.”

Approval:
“Approve Arun’s document verification.”

Do not duplicate the same content across all three.

STYLE:

Use existing BEZENT design system:
#FDF7FF surfaces
#FBE8FF hover
#F3B7FE active
#610173 accent
#0A0044 text/icons

Use premium rounded enterprise icons, compact spacing, thin borders, subtle shadows and existing typography.

Do not modify Top Nav, Left Sidebar, Bottom Bar, Notifications, Approvals, Calendar, Notes, BEZENT AI or application shell.

Build ONLY the My Tasks feature and interactions.