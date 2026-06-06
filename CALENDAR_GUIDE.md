# Calendar Feature Guide - Botanique

## Overview

The Calendar feature is a central hub for managing tasks and reminders in Botanique. It allows users to:

- 📅 View tasks in a monthly calendar interface
- ➕ Add and manage tasks with dates and times
- 🔔 Set reminders for important tasks
- 📱 Sync tasks to phone calendars (Google Calendar, Outlook, Apple Calendar)
- 🔗 Share tasks with others
- 💾 Persistent storage with localStorage

## Quick Start

### Basic Usage

```tsx
import { Calendar } from './components/Calendar/Calendar';
import { useCalendarTasks } from './hooks/useCalendarTasks';

function App() {
  const { tasks, addTask, deleteTask } = useCalendarTasks();

  return (
    <Calendar
      tasks={tasks}
      onTaskAdd={addTask}
      onTaskDelete={deleteTask}
    />
  );
}
```

## Components

### 1. Calendar Component (`src/components/Calendar/Calendar.tsx`)

The main calendar UI component that displays tasks and allows creation/deletion.

**Features:**
- Monthly calendar view with navigation
- Click dates to add tasks
- Visual task indicators with color coding
- Task details panel
- Add task form with time picker
- Delete tasks functionality

**Props:**
```typescript
interface CalendarProps {
  tasks?: CalendarTask[];
  onTaskAdd?: (task: CalendarTask) => void;
  onTaskDelete?: (taskId: string) => void;
}
```

### 2. Custom Hook (`src/hooks/useCalendarTasks.ts`)

Manages calendar task state with localStorage persistence.

**Methods:**
- `addTask(task)` - Add a new task
- `deleteTask(taskId)` - Delete a task
- `updateTask(taskId, updates)` - Update task properties
- `getTasksForDate(date)` - Get tasks for a specific date
- `getUpcomingTasks(days)` - Get upcoming tasks (default: 7 days)
- `getReminders()` - Get all reminders
- `clearAllTasks()` - Clear all tasks

### 3. Calendar Sync Service (`src/services/calendarSync.ts`)

Provides export and integration functionality for multiple calendar platforms.

**Supported Platforms:**
- 📍 Google Calendar
- 📊 Microsoft Outlook
- 🍎 Apple Calendar
- 📅 Generic iCal (`.ics` format)

**Key Functions:**

#### Export to iCal
```typescript
import { downloadIcalFile } from './services/calendarSync';

// Download .ics file to device
downloadIcalFile(tasks, 'my-tasks.ics');
```

#### Generate Direct Calendar Links
```typescript
import { 
  generateGoogleCalendarLink,
  generateOutlookCalendarLink 
} from './services/calendarSync';

const googleLink = generateGoogleCalendarLink(task);
const outlookLink = generateOutlookCalendarLink(task);

// Open links in new window to create events
window.open(googleLink);
window.open(outlookLink);
```

#### JSON Import/Export
```typescript
import { exportToJSON, importFromJSON } from './services/calendarSync';

// Export for backup
const backup = exportToJSON(tasks);

// Import from backup
const imported = importFromJSON(jsonString);
```

## Task Data Structure

```typescript
interface CalendarTask {
  id: string;           // Unique identifier
  title: string;        // Task title
  date: Date;          // Task date
  description: string; // Task description
  time: string;        // Time in HH:mm format
  isReminder: boolean; // Whether it's a reminder
  color: string;       // Hex color code for visual grouping
}
```

## Phone Calendar Integration

### For Users

**Adding to Google Calendar:**
1. Click "Export to Calendar" button
2. Download the `.ics` file
3. Open Google Calendar → Settings → Import & Export
4. Select the `.ics` file
5. Tasks appear in your calendar with reminders

**Adding to iPhone/Apple Calendar:**
1. Export as `.ics` file
2. Send to yourself via email
3. Download the attachment on iPhone
4. Tasks sync to Apple Calendar app

**Adding to Outlook:**
1. Download `.ics` file
2. Open with Outlook
3. Tasks sync automatically

### For Developers

**Sync API Structure:**
```typescript
// Generate iCal content
const icalContent = generateIcalContent(tasks);

// Download file
downloadIcalFile(tasks);

// Get direct calendar links
const googleLink = generateGoogleCalendarLink(task);
const outlookLink = generateOutlookCalendarLink(task);
```

## localStorage Schema

Tasks are persisted in localStorage under `botanique_calendar_tasks` key:

```json
[
  {
    "id": "1234567890",
    "title": "Buy groceries",
    "date": "2026-06-10T00:00:00.000Z",
    "description": "Weekly shopping",
    "time": "09:00",
    "isReminder": true,
    "color": "#3b82f6"
  }
]
```

## Features

### Phase 1 (Complete)
- ✅ Monthly calendar view
- ✅ Add/delete tasks
- ✅ Task reminders
- ✅ Color coding
- ✅ localStorage persistence
- ✅ Export to iCal format
- ✅ Direct calendar app integration

### Phase 2 (Planned)
- ⏳ Push notifications for reminders
- ⏳ Weekly/monthly recurring tasks
- ⏳ Task categories/tags
- ⏳ Search and filtering
- ⏳ Dark mode
- ⏳ Task sharing with other users

### Phase 3 (Future)
- 📋 Collaborative calendar sharing
- 📱 Progressive Web App (PWA) integration
- 🔐 Cloud sync with authentication
- 📊 Calendar analytics
- 🤖 AI-powered task suggestions

## Troubleshooting

### Tasks not persisting
- Check localStorage is enabled in browser settings
- Check browser console for errors
- Verify `useCalendarTasks` hook is properly initialized

### iCal file won't open
- Ensure file has `.ics` extension
- Try opening with Google Calendar or Apple Calendar
- Check iCal content is valid (logs in browser console)

### Direct calendar links not working
- Ensure browser allows pop-ups for calendar.google.com
- For Outlook, ensure you're logged in to Office 365
- Try downloading `.ics` file as alternative

## Best Practices

1. **Use descriptive titles** - Make tasks clear and actionable
2. **Set time zones** - Use consistent timezone for team calendars
3. **Color code by category** - Use colors to group similar tasks
4. **Export regularly** - Backup your calendar as `.ics` files
5. **Check recurring tasks** - Manually add recurring events to calendar app

## Browser Support

- ✅ Chrome/Edge (88+)
- ✅ Firefox (87+)
- ✅ Safari (14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

To extend the calendar feature:

1. Add new sync services to `calendarSync.ts`
2. Create new UI components in `src/components/Calendar/`
3. Add tests for new functionality
4. Update documentation
5. Submit pull request

## License

Part of the Botanique project - MIT License
