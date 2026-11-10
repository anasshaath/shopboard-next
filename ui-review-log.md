# Modal review log

## Original findings

- The original manual Tab trap used a broad selector. It could include hidden, inert, or otherwise unfocusable controls and could miss valid focus targets.
- The original native `close` handler always requested `onOpenChange(false)` and restored opener focus. A queued close event could therefore affect a dialog that had already reopened.
- The original layout used a viewport-height inner wrapper but did not make the dialog itself a bounded flex container for reliable mobile content scrolling.
- The dialog had an unconditional `flex` class. That overrides the user-agent closed-dialog rule, so a closed dialog can remain rendered instead of using native `display: none`.

## Changes made

- Removed the custom focusable selector and Tab handler. Native `showModal()` supplies modal focus containment, while child keyboard handlers now pass through normally.
- Added mounted and current-controlled-state refs. A close event is ignored when it is from an unmounted component or when the dialog is open again; only a genuine native close while controlled open requests a state update. Focus restoration runs only for the active closed dialog.
- Made the dialog a `max-h-dvh` flex column. The header does not shrink and the content region uses `min-h-0 flex-1 overflow-y-auto` for internal scrolling on small viewports.
- Replaced the unconditional `flex` class with Tailwind's `open:flex` variant. `flex-col` and `max-h-dvh` remain available for the open layout without overriding the native closed state.
- Added the narrow `ShoppingHelp` Client Component and rendered it from the Server Component products page. Its guidance only covers product search and availability.

## Verification status

- Source review confirmed no arbitrary Tailwind bracket utilities or inline styles in the modal.
- Browser interaction checks have not been run in this environment. Initial closed visibility and keyboard exclusion, open flex layout, Escape and Close dismissal, focus return, rapid close/reopen, native Tab containment, Shift+Tab containment, and small-screen scrolling remain manual checks.
