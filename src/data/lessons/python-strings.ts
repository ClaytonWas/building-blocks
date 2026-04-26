import type { Lesson } from "../../types";

export const pythonStrings: Lesson = {
  id: "python-strings",
  trackId: "python",
  title: "Strings in Python",
  level: 1,
  intro: "Python loves words. A string in Python is text inside quotes — and Python gives you tons of methods to play with it.",
  concept: `Here is a Python string:

\`\`\`
"hello world"
\`\`\`

You save it in a variable like this:

\`\`\`
greeting = "hello world"
\`\`\`

Python strings come with built-in **methods** you call with a dot, like \`greeting.upper()\`. To see anything in the output, you have to use \`print(...)\`.`,
  examples: [
    {
      caption: "Make it LOUD",
      code: `greeting = "hello world"
print(greeting.upper())`,
      note: ".upper() makes every letter big.",
      tryIt: {
        python: `greeting = "hello world"
print(greeting.upper())`
      }
    },
    {
      caption: "How long is it?",
      code: `name = "Ada"
print(len(name))`,
      note: "len(name) tells you the number of characters. (Notice Python uses len(), not .length.)",
      tryIt: {
        python: `name = "Ada"
print(len(name))`
      }
    },
    {
      caption: "Glue strings together",
      code: `first = "Peanut"
second = "Butter"
print(first + " " + second)`,
      note: "The + sign sticks strings together, just like in JavaScript.",
      tryIt: {
        python: `first = "Peanut"
second = "Butter"
print(first + " " + second)`
      }
    }
  ],
  playground: { kind: "string", language: "python", initial: "Building Blocks" },
  exercise: {
    prompt: "Make your own string and try three things on it: shout it with .upper(), get its length with len(), and glue it onto another word with +. Print each result.",
    files: {
      python: `my_string = "building blocks"

# 1. Print it in all caps

# 2. Print how long it is

# 3. Glue another word onto it and print it
`
    },
    hint: "Wrap the thing you want to print in print(...).",
    expectedContains: ["print", ".upper", "len"]
  }
};
