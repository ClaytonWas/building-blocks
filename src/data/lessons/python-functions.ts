import type { Lesson } from "../../types";

export const pythonFunctions: Lesson = {
  id: "python-functions",
  trackId: "python",
  title: "Functions — Reusable Code",
  level: 7,
  intro:
    "A function in Python is a chunk of code with a name and a list of inputs. You write it once, call it as many times as you like.",
  concept: `Define a function with the \`def\` keyword:

\`\`\`
def double(n):
    return n * 2
\`\`\`

Three pieces:

- The **name** — \`double\`
- The **parameters** — \`n\` (the function's inputs)
- The **return** value — what the function gives back

Notice the colon at the end of the def line, and the indented body (just like loops and ifs).

To use the function, **call** it with a value:

\`\`\`
double(5)    # 10
double(7)    # 14
\`\`\`

Functions can take more than one parameter:

\`\`\`
def add(a, b):
    return a + b

add(3, 4)    # 7
\`\`\`

If a function doesn't \`return\` anything, it gives back \`None\`.`,
  examples: [
    {
      caption: "Define and call",
      code: `def double(n):
    return n * 2

print(double(5))
print(double(10))
print(double(100))`,
      note: "Same function, three different inputs.",
      tryIt: {
        python: `def double(n):
    return n * 2

print(double(5))
print(double(10))
print(double(100))`
      }
    },
    {
      caption: "Two parameters",
      code: `def greet(name, mood):
    return "Hi, " + name + "! Are you " + mood + "?"

print(greet("Ada", "happy"))
print(greet("Linus", "tired"))`,
      note: "Two arguments in, one string out.",
      tryIt: {
        python: `def greet(name, mood):
    return "Hi, " + name + "! Are you " + mood + "?"

print(greet("Ada", "happy"))
print(greet("Linus", "tired"))`
      }
    },
    {
      caption: "Functions inside loops",
      code: `def shout(text):
    return text.upper() + "!"

words = ["hello", "world", "code"]
for w in words:
    print(shout(w))`,
      note: "Define the action once, run it many times. Loops + functions are best friends.",
      tryIt: {
        python: `def shout(text):
    return text.upper() + "!"

words = ["hello", "world", "code"]
for w in words:
    print(shout(w))`
      }
    }
  ],
  playground: { kind: "function" },
  exercise: {
    prompt:
      "Write a function bigger(a, b) that returns whichever number is larger. Call it three times with different number pairs and print each result.",
    files: {
      python: `def bigger(a, b):
    # return the bigger one
    pass

# Call bigger three times and print each result
`
    },
    hint: "Use an if statement: if a > b: return a, otherwise return b. The 'pass' line is a placeholder — replace it.",
    expectedContains: ["def bigger", "return", "print"]
  }
};
