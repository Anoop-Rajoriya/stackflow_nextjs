export const users = [
  { id: "u1", name: "Anoop Rajoriya", email: "anoop@example.com" },
  { id: "u2", name: "Priya Sharma", email: "priya@example.com" },
  { id: "u3", name: "Ravi Mehta", email: "ravi@example.com" },
  { id: "u4", name: "Sneha Gupta", email: "sneha@example.com" },
  { id: "u5", name: "Vikram Patel", email: "vikram@example.com" },
];

export const questions = [
  // ----------------- Q1 -----------------
  {
    id: "q1",
    author: users[0],
    title: "How to debounce an input in React?",
    body: `I'm trying to **debounce user input** in a search bar to avoid too many API calls.  
Currently, the function fires on every keystroke:  

\`\`\`jsx
const handleChange = (e) => {
  setSearch(e.target.value);
  fetchData(e.target.value);
};
\`\`\`

How can I make it wait until the user stops typing for a bit?`,
    answers: [
      {
        id: "a1",
        author: users[1],
        body: `You can use **\`lodash.debounce\`** or a custom debounce function.  
Here's a simple example:

\`\`\`jsx
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
\`\`\`

Then wrap your API call:  
\`const debouncedFetch = debounce(fetchData, 500)\`.`,
        comments: [
          {
            id: "c1",
            author: users[2],
            body: "Great answer! The plain JS example is so easy to grasp compared to abstract utility libraries.",
          },
          {
            id: "c2",
            author: users[0],
            body: "Yes, this keeps the code lightweight and readable without external dependencies. Thanks a lot!",
          },
        ],
      },
    ],
    comments: [
      {
        id: "c3",
        author: users[3],
        body: "I also struggled with debounce timing while building my search input. This clarifies the logic nicely.",
      },
      {
        id: "c4",
        author: users[4],
        body: "Try React’s built-in transitions if you’re using React 18; they work smoothly with debounced inputs.",
      },
    ],
  },

  // ----------------- Q2 -----------------
  {
    id: "q2",
    author: users[1],
    title: "What’s the difference between `useMemo` and `useCallback`?",
    body: `In React, both **\`useMemo\`** and **\`useCallback\`** seem to cache values.  
When should I use one over the other?  
An example would help.`,
    answers: [
      {
        id: "a2",
        author: users[0],
        body: `- **useMemo** caches *a value*  
- **useCallback** caches *a function*  

\`\`\`jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedFn = useCallback(() => handleClick(a), [a]);
\`\`\`  

Use \`useMemo\` for derived data, and \`useCallback\` to avoid unnecessary re-renders.`,
        comments: [
          {
            id: "c5",
            author: users[4],
            body: "That’s a crystal clear explanation. I used to confuse them both until reading this post.",
          },
        ],
      },
    ],
    comments: [
      {
        id: "c6",
        author: users[2],
        body: "I was confused by this too. Your example makes it simple to visualize how memoization actually works.",
      },
    ],
  },

  // ----------------- Q3 -----------------
  {
    id: "q3",
    author: users[2],
    title: "How can I improve React component re-render performance?",
    body: `I have a component that re-renders frequently because of changing props.  
I already use **\`React.memo\`**, but it still updates often.  
What other methods can I use to optimize this?`,
    answers: [
      {
        id: "a3",
        author: users[3],
        body: `Check whether your props are **stable references**.  
Even memoized components re-render if object or function props change identity each render.

Try using **\`useCallback\`** for functions and **\`useMemo\`** for derived values.  
Also, avoid anonymous functions directly in JSX.  
Profiling with React DevTools helps spot wasted renders.`,
        comments: [
          {
            id: "c7",
            author: users[0],
            body: "Exactly! I faced this with passing inline arrow functions. useCallback fixed it beautifully.",
          },
        ],
      },
    ],
    comments: [
      {
        id: "c8",
        author: users[4],
        body: "If your components rely on complex props, consider flattening or splitting them for better performance.",
      },
    ],
  },

  // ----------------- Q4 -----------------
  {
    id: "q4",
    author: users[3],
    title: "How to manage global state in a React app without Redux?",
    body: `Redux feels too heavy for my small project.  
Is there a simpler way to manage **global state** across multiple components?  
Something lightweight but scalable.`,
    answers: [
      {
        id: "a4",
        author: users[2],
        body: `You can use **\`Zustand\`**, a tiny and fast state manager.  
It has a simple API and works with hooks:

\`\`\`jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
\`\`\`

Then call \`useStore()\` inside any component.  
It’s much easier than Redux for small projects.`,
        comments: [
          {
            id: "c9",
            author: users[0],
            body: "Zustand really simplifies things. I replaced Redux in one project and it reduced boilerplate drastically.",
          },
        ],
      },
      {
        id: "a5",
        author: users[4],
        body: "Another lightweight option is **Jotai** or **Recoil** if you prefer atomic state management patterns.",
        comments: [
          {
            id: "c10",
            author: users[1],
            body: "Good mention! Jotai’s atom-based structure fits perfectly for modular apps with isolated states.",
          },
        ],
      },
    ],
    comments: [
      {
        id: "c11",
        author: users[2],
        body: "I switched from Redux to Zustand recently — less code, same functionality, and faster setup overall.",
      },
    ],
  },

  // ----------------- Q5 -----------------
  {
    id: "q5",
    author: users[4],
    title: "How to fetch data efficiently with React Query?",
    body: `I started using **React Query** for API fetching.  
It works well, but I'm not sure how caching and invalidation work behind the scenes.  
How can I use it properly for better performance?`,
    answers: [
      {
        id: "a6",
        author: users[1],
        body: `React Query automatically **caches data** and **invalidates** it when you refetch or mutate.  
You can set custom stale times like this:

\`\`\`jsx
useQuery(['todos'], fetchTodos, { staleTime: 5000 });
\`\`\`

For mutations, call \`queryClient.invalidateQueries(['todos'])\` after updating to refetch data.`,
        comments: [
          {
            id: "c12",
            author: users[3],
            body: "React Query’s cache layer is amazing once you grasp it. Saves a lot of redundant network requests.",
          },
        ],
      },
      {
        id: "a7",
        author: users[0],
        body: "Also, use DevTools extension for React Query to visualize the cache and stale status — super helpful!",
        comments: [
          {
            id: "c13",
            author: users[2],
            body: "True! The DevTools make debugging data fetching flow very transparent, especially during refetch cycles.",
          },
        ],
      },
    ],
    comments: [
      {
        id: "c14",
        author: users[1],
        body: "I like how React Query simplifies fetching logic while keeping control over background updates.",
      },
    ],
  },
];
