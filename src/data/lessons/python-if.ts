import type { Lesson } from "../../types";

export const pythonIf: Lesson = {
  id: "python-if",
  trackId: "python",
  title: "If / Else — Making Choices",
  level: 3,
  intro:
    "With if/else, your Python program can choose what to do depending on a value. This is where code starts to feel alive.",
  concept: `A basic Python \`if\`:

\`\`\`
age = 12
if age >= 13:
    print("teenager")
\`\`\`

Three things to spot:

- The condition (\`age >= 13\`) sits between \`if\` and the colon
- The body is **indented** (Python uses indentation, not curly braces)
- A colon ends the line that opens the block

Add \`else\` to handle the other case:

\`\`\`
if age >= 13:
    print("teenager")
else:
    print("kid")
\`\`\`

Comparison operators are mostly the same as JavaScript:

- \`==\` equal to (just two equals in Python)
- \`!=\` not equal
- \`>\`, \`<\`, \`>=\`, \`<=\`

For more cases, use \`elif\` (Python's "else if"):

\`\`\`
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
else:
    print("keep going!")
\`\`\`

Combine conditions with \`and\` / \`or\` (no symbols — Python uses words):

\`\`\`
if age >= 13 and has_ticket:
    print("welcome!")
\`\`\``,
  examples: [
    {
      caption: "Simple if/else",
      code: `weather = "rainy"

if weather == "sunny":
    print("Wear sunglasses!")
else:
    print("Take an umbrella.")`,
      note: "The string \"rainy\" doesn't equal \"sunny\", so the else runs.",
      tryIt: {
        python: `weather = "rainy"

if weather == "sunny":
    print("Wear sunglasses!")
else:
    print("Take an umbrella.")`
      }
    },
    {
      caption: "Multiple cases with elif",
      code: `score = 75

if score >= 90:
    print("A — amazing!")
elif score >= 80:
    print("B — great job!")
elif score >= 70:
    print("C — solid.")
else:
    print("Keep practicing.")`,
      note: "First matching branch wins. The rest are skipped.",
      tryIt: {
        python: `score = 75

if score >= 90:
    print("A — amazing!")
elif score >= 80:
    print("B — great job!")
elif score >= 70:
    print("C — solid.")
else:
    print("Keep practicing.")`
      }
    },
    {
      caption: "Combine with and / or",
      code: `age = 14
has_ticket = True

if age >= 13 and has_ticket:
    print("Welcome to the show!")
else:
    print("Not today.")`,
      note: "and means BOTH must be true. or means AT LEAST ONE must be true.",
      tryIt: {
        python: `age = 14
has_ticket = True

if age >= 13 and has_ticket:
    print("Welcome to the show!")
else:
    print("Not today.")`
      }
    }
  ],
  playground: { kind: "ifelse", language: "python" },
  exercise: {
    prompt:
      "Make a variable temperature with a number. Print 'hot!' if it's above 25, 'chilly' if it's below 10, and 'just right' otherwise.",
    files: {
      python: `temperature = 18

# if temperature > 25 print "hot!"
# elif temperature < 10 print "chilly"
# else print "just right"
`
    },
    hint: "Three branches: if, elif, else. Don't forget the colons and the indentation (4 spaces).",
    expectedContains: ["if ", "elif", "else", "print"]
  }
};
