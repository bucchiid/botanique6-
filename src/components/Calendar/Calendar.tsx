import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Download, Trash2 } from 'lucide-react';
import './Calendar.css';

interface CalendarTask {
  id: string;
  title: string;
  date: Date;
  description: string;
  time: string;
  isReminder: boolean;
  color: string;
}

interface CalendarProps {
  tasks?: CalendarTask[];
  onTaskAdd?: (task: CalendarTask) => void;
  onTaskDelete?: (taskId: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ 
  tasks = [], 
  onTaskAdd, 
  onTaskDelete 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    time: '09:00',
    isReminder: false,
    color: '#3b82f6'
  });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    setShowTaskForm(true);
  };

  const handleAddTask = () => {
    if (!selectedDate || !newTask.title.trim()) return;

    const task: CalendarTask = {
      id: Date.now().toString(),
      title: newTask.title,
      date: selectedDate,
      description: newTask.description,
      time: newTask.time,
      isReminder: newTask.isReminder,
      color: newTask.color
    };

    onTaskAdd?.(task);

    // Reset form
    setNewTask({
      title: '',
      description: '',
      time: '09:00',
      isReminder: false,
      color: '#3b82f6'
    });
    setShowTaskForm(false);
    setSelectedDate(null);
  };

  const getTasksForDate = (day: number): CalendarTask[] => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return tasks.filter(task => 
      task.date.toDateString() === date.toDateString()
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const monthYear = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Task & Reminder Calendar</h1>
        <button 
          className="export-btn"
          title="Export to iCal format"
          onClick={() => exportToIcal(tasks)}
        >
          <Download size={20} />
          Export to Calendar
        </button>
      </div>

      <div className="calendar-main">
        {/* Month Navigation */}
        <div className="month-navigation">
          <button onClick={handlePrevMonth} className="nav-btn">
            <ChevronLeft size={24} />
          </button>
          <h2>{monthYear}</h2>
          <button onClick={handleNextMonth} className="nav-btn">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            const dayTasks = day ? getTasksForDate(day) : [];
            return (
              <div 
                key={index}
                className={`calendar-day ${day ? 'active' : 'empty'}`}
                onClick={() => day && handleDateClick(day)}
              >
                {day && (
                  <>
                    <div className="day-number">{day}</div>
                    <div className="day-tasks">
                      {dayTasks.slice(0, 2).map(task => (
                        <div 
                          key={task.id}
                          className="task-dot"
                          style={{ backgroundColor: task.color }}
                          title={task.title}
                        />
                      ))}
                      {dayTasks.length > 2 && (
                        <span className="task-more">+{dayTasks.length - 2}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Details Section */}
      <div className="task-section">
        <div className="task-header">
          <h3>
            {selectedDate 
              ? `Tasks for ${selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}` 
              : 'Select a date to view tasks'}
          </h3>
          {selectedDate && (
            <button 
              className="add-task-btn"
              onClick={() => setShowTaskForm(!showTaskForm)}
            >
              <Plus size={20} /> Add Task
            </button>
          )}
        </div>

        {/* Task Form */}
        {showTaskForm && selectedDate && (
          <div className="task-form">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="form-input"
            />
            <textarea
              placeholder="Description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="form-textarea"
            />
            <div className="form-row">
              <input
                type="time"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                className="form-input"
              />
              <input
                type="color"
                value={newTask.color}
                onChange={(e) => setNewTask({ ...newTask, color: e.target.value })}
                className="color-picker"
              />
            </div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={newTask.isReminder}
                onChange={(e) => setNewTask({ ...newTask, isReminder: e.target.checked })}
              />
              <span>Set as reminder (notifications enabled)</span>
            </label>
            <div className="form-actions">
              <button 
                className="btn-primary"
                onClick={handleAddTask}
              >
                Add Task
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setShowTaskForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="tasks-list">
          {selectedDate && getTasksForDate(selectedDate.getDate()).length > 0 ? (
            getTasksForDate(selectedDate.getDate()).map(task => (
              <div 
                key={task.id}
                className="task-item"
                style={{ borderLeftColor: task.color }}
              >
                <div className="task-info">
                  <h4>{task.title}</h4>
                  {task.description && <p>{task.description}</p>}
                  <div className="task-meta">
                    <span className="task-time">{task.time}</span>
                    {task.isReminder && <span className="task-reminder">🔔 Reminder</span>}
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => onTaskDelete?.(task.id)}
                  title="Delete task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            selectedDate && <p className="no-tasks">No tasks for this date</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Export tasks to iCal format for phone calendars
export function exportToIcal(tasks: CalendarTask[]): void {
  const cal = generateIcalContent(tasks);
  const blob = new Blob([cal], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `botanique-tasks-${new Date().toISOString().split('T')[0]}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function generateIcalContent(tasks: CalendarTask[]): string {
  const events = tasks.map(task => {
    const startDate = task.date.toISOString().split('T')[0].replace(/-/g, '');
    const [hours, minutes] = task.time.split(':');
    const startTime = `${startDate}T${hours}${minutes}00Z`;
    const endTime = `${startDate}T${parseInt(hours) + 1}${minutes}00Z`;

    return `BEGIN:VEVENT
UID:${task.id}@botanique.local
DTSTAMP:${new Date().toISOString().replace(/-/g, '').replace(/:/g, '')}
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${task.title}
DESCRIPTION:${task.description || 'No description'}
CATEGORIES:${task.isReminder ? 'Reminder' : 'Task'}
ALARM:${task.isReminder ? 'DISPLAY' : 'NONE'}
END:VEVENT`;
  }).join('\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Botanique//Tasks Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Botanique Tasks & Reminders
X-WR-TIMEZONE:UTC
BEGIN:VTIMEZONE
TZID:UTC
BEGIN:STANDARD
DTSTART:19700101T000000
TZOFFSETFROM:+0000
TZOFFSETTO:+0000
TZNAME:UTC
END:STANDARD
END:VTIMEZONE
${events}
END:VCALENDAR`;
}
