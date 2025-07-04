---
"@dndbuilder.com/react": patch
---

fix(registry): fixed registry class type issue

- Added type guards to ensure block.type and breakpoint.key are defined before accessing them
- Added validation checks to ensure blocks and breakpoints have all required properties before registration
- Implemented explicit type casting with `as BlockConfig` and `as BreakpointConfig` when registering components
- Enhanced error handling with console warnings for blocks and breakpoints that don't meet requirements
- Improved type safety throughout the BuilderRegistry class implementation
