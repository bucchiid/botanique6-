# 🌿 Botanique - Complete Setup Guide

Your Botanique Brussels community hub is now fully set up and ready to use!

## 📱 Features Implemented

### ✅ Calendar Management
- **Direct Calendar Access** - App starts with calendar page
- **Add Tasks** - Click any date to add tasks with title, description, time, and reminders
- **Color Coding** - Assign colors to organize tasks by category
- **Download to Phone** - Export calendar events to sync with:
  - 📍 Google Calendar
  - 🍎 Apple Calendar (iPhone)
  - 📊 Microsoft Outlook
  - 📅 Any calendar app supporting .ics format

### ✅ Joke Generator
- **Random Jokes** - Get jokes from multiple categories
- **Save Favorites** - Save and manage your favorite jokes
- **Share Easily** - Copy jokes to share with the community
- **Animated Banner** - Shows all house members continuously scrolling

### ✅ Community Features
- **House Members Display** - Show all community members
- **Green Theme** - Beautiful nature-inspired Botanique design
- **Responsive Design** - Works on desktop and mobile devices
- **Navigation Bar** - Easy switching between Calendar, Jokes, and Home

## 🚀 How to Use

### Adding Tasks to Calendar
1. Click on any date in the calendar
2. Click "Add Task" button
3. Fill in:
   - Title (required)
   - Description (optional)
   - Time
   - Color (for categorization)
   - Reminder checkbox
4. Click "✓ Add Task" to save

### Downloading Events to Phone
1. Click the **"Download"** button at top of calendar
2. Choose:
   - **"Download All Events"** - Export entire calendar
   - **"Download This Month"** - Export current month only
3. A `.ics` file downloads to your device
4. Open the file with your phone's calendar app
5. Events sync automatically!

### Getting Jokes
1. Click the **"😂 Jokes"** button in navigation
2. Click **"Get Joke"** to get a random joke
3. Choose joke category if desired
4. Click **"Save"** to save favorites
5. Click **"Copy"** to share with others

## 📋 Project Structure

```
botanique6-/
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── Calendar.tsx        # Main calendar component
│   │   │   └── Calendar.css        # Calendar styles
│   │   └── JokeGenerator/
│   │       ├── JokeGenerator.tsx   # Joke component
│   │       └── JokeGenerator.css   # Joke styles
│   ├── hooks/
│   │   ├── useCalendarTasks.ts     # Calendar state management
│   │   └── useJokeGenerator.ts     # Joke state management
│   ├── services/
│   │   ├── calendarSync.ts         # Calendar export/sync service
│   │   └── jokeApi.ts              # Joke API service
│   ├── App.tsx                     # Main app component
│   ├── App.css                     # App styles
│   ├── index.tsx                   # React entry point
│   └── index.css                   # Global styles
├── public/
│   └── index.html                  # HTML template
├── package.json                    # Dependencies & scripts
├── DEPLOYMENT.md                   # Deployment guide
├── CALENDAR_GUIDE.md               # Calendar documentation
└── JOKE_GENERATOR_GUIDE.md         # Joke generator documentation
```

## 🎯 Key Features

### Calendar
✅ Monthly view with navigation
✅ Click dates to add tasks
✅ Color-coded task indicators
✅ Download to phone calendars (.ics format)
✅ Set reminders for important tasks
✅ Add descriptions and specific times
✅ Delete tasks easily

### Joke Generator
✅ Multiple joke categories
✅ Random joke fetching from JokeAPI
✅ Save favorite jokes with localStorage
✅ Share jokes via copy-to-clipboard
✅ Animated banner with house members
✅ Beautiful green theme

### Community
✅ House members display
✅ Navigation between features
✅ Responsive on all devices
✅ Beautiful Botanique branding

## 💾 Data Storage

- **Calendar Tasks** - Saved in browser localStorage (`botanique_calendar_tasks`)
- **Favorite Jokes** - Saved in browser localStorage (`favorite_jokes`)
- **Automatic Sync** - Data persists between sessions

## 🌐 Deployment

### Local Development
```bash
npm install
npm start
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

Live at: `https://bucchiid.github.io/botanique6-`

## 📲 Download to Phone Calendar

### Google Calendar
1. Download .ics file from calendar
2. Open Google Calendar
3. Go to Settings → Import & Export
4. Select the .ics file
5. Done! Events appear in calendar

### Apple Calendar (iPhone)
1. Download .ics file
2. Send to yourself via email
3. Download attachment on iPhone
4. File opens in Calendar app
5. Events sync automatically

### Outlook
1. Download .ics file
2. Open with Outlook
3. Events sync to your calendar
4. Done!

## 🎨 Customization

### Edit House Members
Update the `houseMembers` array in `src/App.tsx`:
```tsx
const houseMembers = [
  '🏠 Botanique Brussels',
  '👤 Your Name',
  '👤 Friend Name',
  // Add more members here
];
```

### Change Colors
Calendar color theme is in `src/index.css` and `src/components/Calendar/Calendar.css`:
- Primary green: `#10b981`
- Secondary green: `#059669`
- Dark green: `#047857`

### Add More Categories
Joke categories can be extended in `src/components/JokeGenerator/JokeGenerator.tsx`

## 🐛 Troubleshooting

### Tasks not saving
- Check browser localStorage is enabled
- Clear browser cache and reload
- Check browser console for errors

### Download not working
- Ensure you have tasks to download
- Try a different browser
- Check file has .ics extension

### Jokes not loading
- Check internet connection
- Verify JokeAPI is accessible (jokeapi.dev)
- Try a different category
- Clear browser cache

## 📞 Support

For issues or questions:
1. Check the documentation files (CALENDAR_GUIDE.md, JOKE_GENERATOR_GUIDE.md)
2. Review browser console for error messages
3. Check GitHub repository for latest updates

## 📜 License

MIT License - Free to use and modify

## 🎉 You're All Set!

Your Botanique community hub is ready to use! 

**Quick Start:**
1. Add some calendar events by clicking dates
2. Download them to your phone
3. Get some jokes and save your favorites
4. Share with the Botanique community!

Enjoy! 💚🌿
