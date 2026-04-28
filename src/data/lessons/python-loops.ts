import type { Lesson } from "../../types";

export const pythonLoops: Lesson = {
  id: "python-loops",
  trackId: "python",
  title: "Loops — Do It Again",
  level: 5,
  intro:
    "Loops let Python repeat the same code many times without copy-pasting. Two flavors cover almost everything you'll do.",
  concept: `**For loop with range** — count from one number to another:

\`\`\`
for i in range(1, 6):
    print(i)
\`\`\`

\`range(1, 6)\` makes the numbers 1, 2, 3, 4, 5 (it stops *before* 6).

**For loop over a list** — go through each item:

\`\`\`
for fruit in ["apple", "banana", "cherry"]:
    print(fruit)
\`\`\`

**While loop** — repeat as long as a condition is true:

\`\`\`
i = 0
while i < 8:
    print(i)
    i = i + 2
\`\`\`

Notice Python's special trick: the body of the loop is **indented** (usually 4 spaces). That's how Python knows which lines are *inside* the loop.`,
  examples: [
    {
      caption: "Count from 1 to 5",
      code: `for i in range(1, 6):
    print(i)`,
      note: "range(1, 6) gives you 1, 2, 3, 4, 5 — it stops before 6.",
      tryIt: {
        python: `for i in range(1, 6):
    print(i)`
      }
    },
    {
      caption: "Greet each friend",
      code: `friends = ["Ada", "Linus", "Grace"]
for friend in friends:
    print("Hi, " + friend + "!")`,
      note: "for-in walks every item in the list. Friendly and clean.",
      tryIt: {
        python: `friends = ["Ada", "Linus", "Grace"]
for friend in friends:
    print("Hi, " + friend + "!")`
      }
    },
    {
      caption: "While the door is closed",
      code: `knocks = 0
while knocks < 3:
    print("knock knock!")
    knocks = knocks + 1

print("Door opened after " + str(knocks) + " knocks.")`,
      note: "while keeps repeating until the condition is false. str(knocks) turns the number into text so we can glue it onto the message.",
      tryIt: {
        python: `knocks = 0
while knocks < 3:
    print("knock knock!")
    knocks = knocks + 1

print("Door opened after " + str(knocks) + " knocks.")`
      }
    }
  ],
  playground: { kind: "loop", language: "python" },
  exercise: {
    prompt:
      "Print the numbers 1 through 10 with a for loop. Then make a list of three favorite snacks and print 'I love ___' for each one.",
    files: {
      python: `# 1. for loop: print 1 through 10

# 2. a list of three snacks, then for-in to print "I love ___" for each
`
    },
    hint: "range(1, 11) makes the numbers 1 to 10. Use 4 spaces to indent the loop body.",
    expectedContains: ["for ", "range(", "print"]
  }
};
