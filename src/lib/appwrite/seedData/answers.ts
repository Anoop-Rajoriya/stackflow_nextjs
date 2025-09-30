export default [
  {
    title: "Using Flexbox to center",
    body: `You can use **CSS Flexbox**:

\`\`\`css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

This will center the child element both vertically and horizontally.`,
    status: "active",
    questionId: 1, // replace with real ID
  },
  {
    title: "Use transform with absolute positioning",
    body: `Another way is to use **absolute positioning** with \`transform\`:

\`\`\`css
.div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
\`\`\`

This works well for fixed-size elements.`,
    status: "active",
    questionId: 1,
  },
  {
    title: "Explanation of let, const, and var",
    body: `Here’s the difference:

- \`var\` → **function scoped**, can be redeclared, hoisted.
- \`let\` → **block scoped**, can be reassigned but not redeclared.
- \`const\` → **block scoped**, cannot be reassigned.

Example:

\`\`\`js
var a = 1; // function scope
let b = 2; // block scope
const c = 3; // constant
\`\`\`

Use \`const\` by default, \`let\` if value changes, and avoid \`var\`.`,
    status: "accepted",
    questionId: 2,
  },
  {
    title: "SQL vs NoSQL",
    body: `- **SQL**: Relational, structured schema, great for complex queries.  
- **NoSQL**: Non-relational, schema-less, scales horizontally.

Example:

- SQL → MySQL, PostgreSQL  
- NoSQL → MongoDB, Firebase

Use **SQL** when relationships are important. Use **NoSQL** when you need flexibility and high scalability.`,
    status: "active",
    questionId: 3,
  },
  {
    title: "Use bcrypt for hashing passwords",
    body: `In Node.js, you can use **bcrypt**:

\`\`\`js
import bcrypt from 'bcrypt';

const hash = await bcrypt.hash(password, 10);
const isMatch = await bcrypt.compare(password, hash);
\`\`\`

- Always store the **hash**, not the plain password.
- Use a strong salt (10+ rounds is common).`,
    status: "accepted",
    questionId: 5,
  },
];
