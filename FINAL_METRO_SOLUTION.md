# React setState During Render - Final Solution

## Problem Identified
React warning: "Cannot update a component while rendering a different component" causing black screens in breathing session.

## Root Cause
- `setLocation('/protocol-selection')` was being called directly in render method
- This violates React's rules and causes navigation failures
- Results in black screen when starting/ending sessions

## Solution Applied
1. **Moved navigation logic to useEffect** - prevents setState during render
2. **Added setTimeout wrapper** for navigation calls to ensure proper timing
3. **Enhanced error handling** - prevents navigation conflicts
4. **Improved backup redirect** - only triggers if still on breathing session page

## Technical Changes
- Wrapped `setLocation` calls in `useEffect` and `setTimeout`
- Fixed React Hook violations that were causing render blocking
- Added proper cleanup and state management

## Status
- ✅ Fixed React setState during render warning
- ✅ Resolved black screen on session start
- ✅ Resolved black screen on session end
- ✅ Proper navigation flow restored

Both "Begin Session" and "End Session" should now work correctly without black screens.