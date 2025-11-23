//@/database/dummyData.js

//Global themes
const appTheme={
    color1: "#ffffffff",
    color2: "#cab29cde",
    color3: "#5e3d32ff",
    textColor1: "#351f17ff",
    textColor2: "#351f17ff",
    textColor3: "#ffffffff",
    textFont: "Inter, Arial",
    bgImage: require("@/assets/images/brownBearImg.jpg"),
    bgOpacity: 0.15
}
const noteTheme={
    color1: "#fff8e7ff",
      color2: "#f5d6b1ff",
      color3: "#b27c4fff",
      textColor1: "#3b2f2fff",
      textColor2: "#3b2f2fff",
      textColor3: "#ffffffff",
      textFont: "Arial, sans-serif",
      bgImage: null,
      bgOpacity: 1
}
const widgetTheme={
    color1: "#fff0f5",
      color2: "#ffb6c1",
      color3: "#c71585",
      textColor1: "#3a003a",
      textColor2: "#3a003a",
      textColor3: "#ffffffff",
      textFont: "Tahoma, sans-serif",
      bgImage: null,
      bgOpacity: 1
}
export const Theme={appTheme, noteTheme, widgetTheme}

//Notes
export const notes = [
  {
    id: 1,
    groups: ["Pinned", "Diary"],
    noteTheme: {
      color1: "#ffffffff",
      color2: "#9ca7caff",
      color3: "#36325eff",
      textColor1: "#171735ff",
      textColor2: "#171735ff",
      textColor3: "#ffffffff",
      textFont: "Inter, Arial",
      bgImage: null,
      bgOpacity: 1
    },
    editHistory: [
      {
        date: "2025-10-11",
        time: "10:15 AM",
        content: "This is my most important note. I’ll pin it so I never forget what I promised myself today. I think it's important to remember certain things, isn't it?"
      },
      {
        date: "2025-10-10",
        time: "9:02 PM",
        content: "Pinned this one because it matters more than I can say — a reminder of my aspirations and intentions."
      },
      {
        date: "2025-10-09",
        time: "6:40 PM",
        content: "Creating little affirmations daily. Perhaps one day, they’ll form a tapestry of my growth."
      },
      {
        date: "2025-10-08",
        time: "4:22 PM",
        content: "Testing pinned notes for important reminders. I want to start prioritizing my tasks more effectively."
      }
    ]
  },
  {
    id: 2,
    groups: ["Diary"],
    noteTheme: {
      color1: "#fff8e7ff",
      color2: "#f5d6b1ff",
      color3: "#b27c4fff",
      textColor1: "#3b2f2fff",
      textColor2: "#3b2f2fff",
      textColor3: "#ffffffff",
      textFont: "Arial, sans-serif",
      bgImage: null,
      bgOpacity: 1
    },
    editHistory: [
      {
        date: "2025-10-09",
        time: "7:15 PM",
        content: "Reflecting on small victories today — a reminder that consistency matters more than perfection."
      }
    ]
  },
  {
    id: 3,
    groups: ["Tasks", "Ideas"],
    editHistory: [
      {
        date: "2025-10-08",
        time: "4:22 PM",
        content: "Organizing my tasks for the week; I need a clearer schedule to feel less overwhelmed."
      },
      {
        date: "2025-10-07",
        time: "2:30 PM",
        content: "Drafting ideas for the new app UI. Exploring color palettes that are soft but intuitive."
      }
    ]
  },
  {
    id: 4,
    groups: [],
    editHistory: [
      {
        date: "2025-10-06",
        time: "11:05 AM",
        content: "Note to self: Take breaks today. Even short pauses are valuable for mental clarity."
      }
    ]
  },
  {
    id: 5,
    groups: ["Stories"],
    noteTheme: {
      color1: "#e8f0ff",
      color2: "#a3c4f3",
      color3: "#5577cc",
      textColor1: "#1c1c1c",
      textColor2: "#1c1c1c",
      textColor3: "#ffffffff",
      textFont: "Georgia, serif",
      bgImage: null,
      bgOpacity: 1
    },
    editHistory: [
      {
        date: "2025-10-05",
        time: "9:30 PM",
        content: "Brainstorming story ideas with whimsical details — aiming for hopeful yet bittersweet tones."
      },
      {
        date: "2025-10-04",
        time: "8:15 PM",
        content: "Refining plot arcs for clarity and emotional impact. Open endings feel satisfying if done well."
      }
    ]
  },
  {
    id: 6,
    groups: ["Pinned"],
    noteTheme:{
      color1: "#ffffffff",
      color2: "#ffffffc0",
      color3: "#946657ff",
      textColor1: "#547894ff",
      textColor2: "#547894ff",
      textColor3: "#ffffffff",
      textFont: "Inter, Arial",
      bgImage: require("@/assets/images/cozyChristmasMorningCoffee.jpeg"), 
      bgOpacity: 0.75
    },
    editHistory: [
      {
        date: "2025-10-11",
        time: "11:30 AM",
        content: "‘Be patient with slow growth.’ A gentle reminder that small steps accumulate over time."
      },
      {
        date: "2025-10-10",
        time: "10:45 PM",
        content: "Consistency outweighs perfection. Progress is progress, no matter how small."
      },
      {
        date: "2025-10-10",
        time: "8:20 PM",
        content: "Pinned quote: ‘Do it scared, do it small, just do it.’ Movement matters more than comfort."
      },
      {
        date: "2025-10-09",
        time: "7:10 PM",
        content: "Empty canvas today, but opportunity to create something meaningful tomorrow."
      }
    ]
  },
  {
    id: 7,
    groups: ["Pinned", "Diary"],
    noteTheme: {
      color1: "#fff0f5",
      color2: "#ffb6c1",
      color3: "#c71585",
      textColor1: "#3a003a",
      textColor2: "#3a003a",
      textColor3: "#ffffffff",
      textFont: "Tahoma, sans-serif",
      bgImage: null,
      bgOpacity: 1
    },
    editHistory: [
      {
        date: "2025-10-12",
        time: "8:14 AM",
        content: "Pinned for reflection: tracking how far I’ve come even when it feels minimal."
      },
      {
        date: "2025-10-11",
        time: "11:59 PM",
        content: "Half-asleep scribbles, grounding me in the present."
      },
      {
        date: "2025-10-10",
        time: "6:10 PM",
        content: "Accepting imperfect progress. It’s still forward movement."
      },
      {
        date: "2025-10-09",
        time: "1:47 PM",
        content: "Just a small pinned reminder to keep perspective."
      }
    ]
  },
  {
    id: 8,
    groups: ["Diary"],
    editHistory: [
      {
        date: "2025-10-12",
        time: "9:22 PM",
        content: "Stepped outside today after a long pause. The air felt heavier, yet healing."
      },
      {
        date: "2025-10-12",
        time: "6:11 PM",
        content: "Observing how days blend when fatigue sets in; need more mindful journaling."
      },
      {
        date: "2025-10-11",
        time: "8:32 PM",
        content: "Missed journaling yesterday — a gentle nudge to restart."
      },
      {
        date: "2025-10-10",
        time: "10:00 AM",
        content: "Starting fresh with a new journaling habit. Small steps count."
      }
    ]
  }
];

//Note groups
export const groups = ["Pinned", "Diary", "Tasks", "Ideas", "Stories", "Thoughts", "Misc"];