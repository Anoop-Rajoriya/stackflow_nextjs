import type { ProfileType, QuestionPreviewType, QuestionType } from "./type";

export const mockProfile: ProfileType = {
  id: "something1234",
  name: "Anoop Rajoriya",
  reputation: 40,
  avatar: null,
  tagsHistory: ["next.js", "full-stack"],
  interest: [
    {
      id: "q1",
      title: "How to center a div both vertically and horizontally?",
      body: `I'm trying to **center a \`div\`** in the middle of the page.

I tried this:

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

But it's not working as expected. What is the correct way to center a div in CSS?`,
      tags: ["css", "html", "frontend"],
      author: {
        id: "u1",
        name: "Jane Doe",
        reputation: 1520,
        avatar: null,
      },
      stats: {
        comments: 3,
        answers: 2,
        votes: 15,
      },
      createdAt: "2025-10-02T10:15:00Z",
      updatedAt: "2025-10-02T11:00:00Z",
    },
    {
      id: "q2",
      title: "React useEffect not running after state update",
      body: `I have a component where I'm using **\`useEffect\`** but it doesn't run when I expect.

\`\`\`jsx
useEffect(() => {
  console.log("Effect ran");
}, [count]);
\`\`\`

Even after updating \`count\`, the effect doesn't trigger. What could cause this?`,
      tags: ["react", "javascript", "hooks"],
      author: {
        id: "u2",
        name: "John Smith",
        reputation: 800,
        avatar: "https://avatars.githubusercontent.com/u/2?v=4",
      },
      stats: {
        comments: 1,
        answers: 0,
        votes: 5,
      },
      createdAt: "2025-10-05T14:20:00Z",
      updatedAt: "2025-10-05T14:25:00Z",
    },
  ],
};

export const mockQuestionsPreview: QuestionPreviewType[] = [
  {
    id: "q1",
    title: "How to center a div both vertically and horizontally?",
    body: `I'm trying to **center a \`div\`** in the middle of the page.

I tried this:

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

But it's not working as expected. What is the correct way to center a div in CSS?`,
    tags: ["css", "html", "frontend"],
    author: {
      id: "u1",
      name: "Jane Doe",
      reputation: 1520,
      avatar: null,
    },
    stats: {
      comments: 3,
      answers: 2,
      votes: 15,
    },
    createdAt: "2025-10-02T10:15:00Z",
    updatedAt: "2025-10-02T11:00:00Z",
  },
  {
    id: "q2",
    title: "React useEffect not running after state update",
    body: `I have a component where I'm using **\`useEffect\`** but it doesn't run when I expect.

\`\`\`jsx
useEffect(() => {
  console.log("Effect ran");
}, [count]);
\`\`\`

Even after updating \`count\`, the effect doesn't trigger. What could cause this?`,
    tags: ["react", "javascript", "hooks"],
    author: {
      id: "u2",
      name: "John Smith",
      reputation: 800,
      avatar: "https://avatars.githubusercontent.com/u/2?v=4",
    },
    stats: {
      comments: 1,
      answers: 0,
      votes: 5,
    },
    createdAt: "2025-10-05T14:20:00Z",
    updatedAt: "2025-10-05T14:25:00Z",
  },
  {
    id: "q3",
    title: "How to optimize MongoDB queries for large datasets?",
    body: `I'm working with a **large MongoDB collection** (~2 million documents) and some queries are becoming slow.

- I already added basic indexes.
- Queries involve multiple fields and sometimes regex searches.

What are **practical tips** or best practices to speed up queries in MongoDB?`,
    tags: ["mongodb", "database", "performance"],
    author: {
      id: "u3",
      name: "DevMaster",
      reputation: 2400,
      avatar: "https://avatars.githubusercontent.com/u/3?v=4",
    },
    stats: {
      comments: 5,
      answers: 3,
      votes: 22,
    },
    createdAt: "2025-09-28T08:00:00Z",
    updatedAt: "2025-10-01T09:30:00Z",
  },
  {
    id: "q4",
    title: "Why does Tailwind class not apply inside a dynamic component?",
    body: `I'm using **Tailwind CSS** in a Next.js project.  
Inside a component that renders dynamically, some classes like \`bg-red-500\` don't apply.

For example:

\`\`\`jsx
const Button = ({ color }) => (
  <button className={\`bg-\${color}-500 text-white p-2\`}>
    Click me
  </button>
);
\`\`\`

When I use \`color="red"\`, the background doesn't appear. Why?`,
    tags: ["tailwindcss", "next.js", "react"],
    author: {
      id: "u4",
      name: "CSS Wizard",
      reputation: 670,
      avatar: null,
    },
    stats: {
      comments: 0,
      answers: 1,
      votes: 9,
    },
    createdAt: "2025-10-06T12:10:00Z",
    updatedAt: "2025-10-06T12:15:00Z",
  },
  {
    id: "q5",
    title: "Node.js file upload: How to validate file type securely?",
    body: `I want to **validate uploaded files** in a Node.js + Express app.

Right now I'm just checking file extension, but I know that's not secure.  
How can I properly validate file **MIME types** or contents to prevent malicious uploads?`,
    tags: ["node.js", "express", "security", "file-upload"],
    author: {
      id: "u5",
      name: "SecureDev",
      reputation: 1340,
      avatar: "https://avatars.githubusercontent.com/u/5?v=4",
    },
    stats: {
      comments: 2,
      answers: 2,
      votes: 18,
    },
    createdAt: "2025-10-03T09:45:00Z",
    updatedAt: "2025-10-03T10:00:00Z",
  },
];

export const mockQuestion: QuestionType = {
  id: "q101",
  title: "How to debounce an input in React?",
  body: `I'm trying to **debounce user input** in a search bar to avoid making too many API calls.

Currently, I'm calling the API on every \`onChange\`:

\`\`\`jsx
const handleChange = (e) => {
  setQuery(e.target.value);
  fetchResults(e.target.value);
};
\`\`\`

This works but fires **too many requests**.  
What is the best way to implement **debouncing in React** for this scenario?`,
  tags: ["react", "javascript", "performance", "hooks"],
  author: {
    id: "u10",
    name: "ReactWizard",
    reputation: 3200,
    avatar: "https://avatars.githubusercontent.com/u/10?v=4",
  },
  stats: {
    comments: 2,
    answers: 2,
    votes: 25,
  },
  createdAt: "2025-10-04T09:00:00Z",
  updatedAt: "2025-10-06T12:00:00Z",

  // 💬 Question Comments
  comments: [
    {
      id: "c1",
      body: "You can use `lodash.debounce` — it's the easiest way to handle this.",
      author: {
        id: "u11",
        name: "CodeHelper",
        reputation: 870,
        avatar: null,
      },
      createdAt: "2025-10-04T10:00:00Z",
      updatedAt: "2025-10-04T10:05:00Z",
    },
    {
      id: "c2",
      body: "Or implement your own with `setTimeout` inside a custom hook.",
      author: {
        id: "u12",
        name: "HookMaster",
        reputation: 1520,
        avatar: "https://avatars.githubusercontent.com/u/12?v=4",
      },
      createdAt: "2025-10-04T10:30:00Z",
      updatedAt: "2025-10-04T10:35:00Z",
    },
  ],

  // ✅ Answers with Comments
  answers: [
    {
      id: "a1",
      body: `You can use **\`lodash.debounce\`** inside your input handler:

\`\`\`bash
npm install lodash
\`\`\`

\`\`\`jsx
import { debounce } from "lodash";

const handleChange = debounce((value) => {
  fetchResults(value);
}, 500);

<input onChange={(e) => handleChange(e.target.value)} />;
\`\`\`

This way, API calls will only fire **after the user stops typing for 500ms**.`,
      votes: 18,
      author: {
        id: "u13",
        name: "DevGuru",
        reputation: 4120,
        avatar: "https://avatars.githubusercontent.com/u/13?v=4",
      },
      createdAt: "2025-10-04T11:00:00Z",
      updatedAt: "2025-10-04T11:20:00Z",

      // 💬 Comments for answer a1
      comments: [
        {
          id: "a1c1",
          body: "This worked perfectly. Adding lodash just for debounce might be overkill though.",
          author: {
            id: "u15",
            name: "MinimalistDev",
            reputation: 740,
            avatar: null,
          },
          createdAt: "2025-10-04T12:00:00Z",
          updatedAt: "2025-10-04T12:10:00Z",
        },
        {
          id: "a1c2",
          body: "You can also tree-shake lodash and import only the debounce function.",
          author: {
            id: "u16",
            name: "PerfNinja",
            reputation: 2310,
            avatar: "https://avatars.githubusercontent.com/u/16?v=4",
          },
          createdAt: "2025-10-04T12:30:00Z",
          updatedAt: "2025-10-04T12:45:00Z",
        },
      ],
    },
    {
      id: "a2",
      body: `You can also build a **custom React hook** for debouncing:

\`\`\`jsx
import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
\`\`\`

Then in your component:

\`\`\`jsx
const debouncedQuery = useDebounce(query, 500);

useEffect(() => {
  if (debouncedQuery) {
    fetchResults(debouncedQuery);
  }
}, [debouncedQuery]);
\`\`\``,
      votes: 22,
      author: {
        id: "u14",
        name: "HookEnthusiast",
        reputation: 2980,
        avatar: null,
      },
      createdAt: "2025-10-05T09:45:00Z",
      updatedAt: "2025-10-05T10:00:00Z",

      // 💬 Comments for answer a2
      comments: [
        {
          id: "a2c1",
          body: "Love this approach — keeps dependencies minimal!",
          author: {
            id: "u17",
            name: "ReactFan",
            reputation: 890,
            avatar: null,
          },
          createdAt: "2025-10-05T10:10:00Z",
          updatedAt: "2025-10-05T10:15:00Z",
        },
        {
          id: "a2c2",
          body: "This is what I use in all my projects. Great example 👏",
          author: {
            id: "u18",
            name: "OpenSourceDev",
            reputation: 1340,
            avatar: "https://avatars.githubusercontent.com/u/18?v=4",
          },
          createdAt: "2025-10-05T10:25:00Z",
          updatedAt: "2025-10-05T10:30:00Z",
        },
      ],
    },
  ],
};
