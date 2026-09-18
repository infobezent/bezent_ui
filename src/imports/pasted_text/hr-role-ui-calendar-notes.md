Add ONLY the Calendar and Notes experiences to the existing BEZENT HR Role UI. Do not redesign existing navigation or other completed features.

==================================================
1. CALENDAR / SCHEDULE
==================================================

RIGHT UTILITY RAIL:
Use the existing Calendar icon.

Default:
Outline icon #0A0044

Hover:
Background #FBE8FF
Icon #610173

Open/Active:
Background #F3B7FE
Filled/strong calendar icon #610173

No number badge.

CALENDAR ICON CLICK:

Open a 360–400px right-side Schedule drawer using the same interaction pattern as Gmail Calendar.

- Push/reduce main workspace width
- Do not use a modal
- Keep Right Utility Rail visible
- Only one utility drawer can be open at a time
- Opening Calendar closes Notifications, Tasks, Approvals, Notes or BEZENT AI

DRAWER HEADER:

Schedule
Current date: Wed, 9 Sep

Actions:
Today
Previous <
Next >
Open Full Calendar
Close X

DATE STRIP:

Show a compact week selector:

Mon 7
Tue 8
Wed 9 [Selected]
Thu 10
Fri 11
Sat 12
Sun 13

Selected date:
#F3B7FE background + #610173 text.

TODAY SUMMARY:

“4 events scheduled”

DAY TIMELINE:

09:30 AM
Candidate Interview
Naveen Kumar • Backend Developer
Recruitment

11:00 AM
New Joiner Onboarding
Priya S • Design
Onboarding

02:00 PM
HR Review Meeting
Meeting Room 2

04:30 PM
Probation Review
Arun Kumar • Engineering
Employees

Display events as compact blocks aligned to time.

Use subtle category accents; do not make the drawer colorful or crowded.

EVENT CLICK:

Open a compact event detail panel:

Event title
Date
Start/End time
Employee/Candidate
Module
Location / Meeting Link
Participants
Description

Actions:
Edit
Open Related Record

Do not create approval actions inside Calendar.

DRAWER BOTTOM:

Open Full Calendar →

FULL CALENDAR:

Open the Schedule page in main workspace.

Header:
Schedule
“Manage HR events, interviews, meetings and important dates.”

Actions:
+ Create Event
Today
Previous
Next

Views:
Day | Week | Month

Include:
Mini calendar
Search
Event Type filter
Department filter
Employee filter

HR EVENT TYPES:

Interviews
Employee Joining
Onboarding
Training
HR Meetings
Probation Reviews
Performance Reviews
Employee Exit
HR Deadlines
Company HR Events

CREATE EVENT:

Fields:
Event Title
Event Type
Date
Start Time
End Time
Employee/Candidate
Participants
Location / Meeting Link
Related Module
Description
Reminder

Actions:
Cancel
Create Event

IMPORTANT:
Calendar is for scheduled/time-based HR events.
Do not duplicate Tasks or Notifications.

==================================================
2. NOTES
==================================================

RIGHT UTILITY RAIL:
Use existing Notes icon.

Default:
Outline icon #0A0044

Hover:
Background #FBE8FF
Icon #610173

Open/Active:
Background #F3B7FE
Filled/strong Notes icon #610173

No number badge.

NOTES ICON CLICK:

Open a 360–400px right-side Notes drawer.

Use the same drawer width and interaction pattern as other BEZENT utilities.

- Push/reduce main workspace width
- Keep Right Utility Rail visible
- Only one utility drawer open at a time
- Opening Notes closes Calendar, Notifications, Tasks, Approvals or BEZENT AI

DRAWER HEADER:

Notes
“Quick personal notes”

Actions:
+ New Note
Search
Close X

NOTES LIST:

Pinned

Candidate Interview Notes
Naveen Kumar
“Strong React knowledge. Need to verify...”
Today • 10:45 AM

────────────

Today

Onboarding Follow-up
“Ask Priya to submit address proof.”
Today • 9:30 AM

Training Ideas
“Plan advanced Excel training for HR team.”
Yesterday

Probation Discussion
“Follow up with Arun’s reporting manager.”
8 Sep

Use compact note cards/rows.

Each note:
Title
2-line preview
Last updated time
Optional related record
Pin icon
More menu

NOTE CLICK:

Open note editor inside the same drawer.

Header:
← Back
Note Title
Pin
More

Editable content area.

Optional:
Related To

Example:
Employee • Arun Kumar

Actions:
Save automatically
Delete
Convert to Task

NEW NOTE:

Click + New Note.

Fields:

Title
Write a note...

Optional:
Related To
Employee / Candidate / HR Record

Auto-save while typing.

NOTE MORE MENU:

Pin / Unpin
Convert to Task
Add Related Record
Delete

CONVERT TO TASK:

When selected, open a small task creation flow using the note title/content.

Allow:
Task title
Priority
Due date
Assignee

Do not automatically delete the original note.

NOTES PRIVACY:

Notes are PERSONAL to the logged-in HR user by default.

Clearly show:
“Private to you”

Do not make personal Notes visible to other employees unless a future explicit sharing feature is added.

FULL NOTES VIEW:

At drawer bottom show:

View all notes →

Click → open full Notes workspace.

Header:
Notes
“Capture and organize your personal HR notes.”

Actions:
+ New Note

Sections:
All Notes
Pinned
Recent

Search notes...

Optional filters:
Related Module
Related Employee
Updated Date

Use a clean list/grid toggle if appropriate.

Do not turn Notes into Documents or Knowledge Base.

==================================================
COMMON INTERACTION RULE
==================================================

Maintain one consistent Right Utility system:

Notifications
Tasks
Approvals
Calendar
Notes

Only ONE drawer can be open at a time.

Example:

Calendar open
→ click Notes
→ Calendar closes
→ Notes opens.

Click active utility icon again
→ close drawer.

Click X
→ close drawer.

Use smooth 180–220ms transitions.

BEZENT AI should also follow this exclusivity rule.

STYLE:

Use existing BEZENT design system:

#FDF7FF = surfaces
#FBE8FF = hover
#F3B7FE = active/selected
#610173 = primary accent
#0A0044 = text/icons

Use premium rounded enterprise icons, compact spacing, thin borders and subtle shadows.

Do NOT change Top Nav, Left Sidebar, Bottom Bar, Notifications, Tasks, Approvals or existing application shell.

Build ONLY Calendar and Notes with their interactions.