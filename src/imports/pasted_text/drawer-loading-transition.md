Add ONLY a premium loading transition to the existing BEZENT right-side utility drawers.

IMPORTANT:
Do not redesign or modify the existing Top Nav, Left Sidebar, Right Utility Rail, Bottom Bar, drawer dimensions, drawer content, icons, typography or layouts.

Use the existing BEZENT UI exactly as it is.

==================================================
LOADING ANIMATION
==================================================

Use a Gmail / Google Workspace inspired circular reveal loading interaction, adapted to BEZENT’s own purple color system.

When the user clicks a Right Utility Rail icon:

1. Open the corresponding drawer immediately.

2. Keep the drawer header and close button visible.

3. In the center of the drawer, display a large version of the selected utility icon.

4. Behind the icon, create ONE soft circular colored shape.

5. Start the circle small behind the icon.

6. Smoothly expand the circle outward until the colored shape visually fills the entire drawer area.

IMPORTANT:
The expanding circle must become large enough to cover the drawer, similar to a circular reveal transition.

Do NOT create multiple rings.

Do NOT make it look like a ripple effect.

It must feel like one continuous soft color surface expanding from behind the icon.

==================================================
ANIMATION SEQUENCE
==================================================

STATE 1 — 0ms

Drawer opens.

Selected utility icon appears in the center.

Small soft circular background behind icon.

Circle approximately 56–64px.

Icon remains sharp and clearly visible.

---

STATE 2 — 120–180ms

Circular background begins expanding smoothly.

Circle grows approximately:

64px → 180px → 320px

Keep the selected icon fixed in the center.

Do not scale the icon together with the circle.

---

STATE 3 — 280–350ms

Circle becomes very large and extends beyond the drawer boundaries.

The expanding color should visually fill almost the entire drawer.

Do not stop the circle at 100–120px.

The purpose is a full drawer circular reveal.

The edges of the circle can extend outside the visible drawer and be clipped by the drawer container.

---

STATE 4 — 400–550ms

Once the drawer is filled:

softly reduce the colored surface opacity.

Fade the loading icon out.

Reveal the actual drawer content using a subtle 150–200ms fade-in.

The transition from loading state → real content must feel seamless.

==================================================
BEZENT COLORS
==================================================

Drawer base:
#FDF7FF

Loading icon:
#610173

Initial circular shade:
#F3B7FE

As the circle expands, transition softly toward:
#FBE8FF

Do not use blue.

Do not use Google colors.

Do not use strong gradients.

The animation must clearly belong to BEZENT.

==================================================
UTILITY-SPECIFIC ICONS
==================================================

Notifications:
Bell icon

My Tasks:
Premium check-circle / task icon

Approvals:
Approval / verified badge icon

Calendar:
Calendar icon

Notes:
Notes / document icon

Use the SAME animation behavior for every utility.

Only the center icon changes.

==================================================
INTERACTION EXAMPLE
==================================================

User clicks My Tasks:

Task icon selected
→ drawer opens
→ task icon appears in center
→ small #F3B7FE circle appears behind it
→ circle smoothly expands
→ circle grows until it fills the drawer
→ loading state fades
→ My Tasks content appears.

User clicks Calendar:

Calendar icon selected
→ existing drawer changes
→ calendar loading icon appears
→ circular purple reveal expands
→ drawer fills
→ Schedule content appears.

==================================================
DRAWER SWITCHING
==================================================

Only one utility drawer can be active.

If My Tasks is currently open and the user clicks Calendar:

Do not close the entire right-side system.

Switch the drawer content.

Play the Calendar circular loading reveal.

Then show Calendar content.

Apply the same behavior between:

Notifications
My Tasks
Approvals
Calendar
Notes

BEZENT AI may use the same circular reveal behavior when opened.

==================================================
MOTION
==================================================

Total loading transition:
approximately 450–550ms.

Use smooth ease-out motion.

Expansion should start slightly faster and gently settle as it fills the drawer.

No bounce.

No spinning loader.

No multiple circles.

No ripple rings.

No skeleton screen during this transition.

No exaggerated animation.

The result should feel:

Fast
Smooth
Premium
Calm
Enterprise-grade
BEZENT branded

The key visual behavior is:

SMALL COLORED CIRCLE BEHIND ICON
→ CIRCLE EXPANDS
→ CIRCLE FILLS THE DRAWER
→ COLOR SOFTLY FADES
→ REAL CONTENT APPEARS.

Apply ONLY this animation. Do not change anything else in the existing BEZENT interface.