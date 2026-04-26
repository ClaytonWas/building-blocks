import type { Lesson } from "../../types";

export const pythonVariables: Lesson = {
  id: "python-variables",
  trackId: "python",
  title: "Variables and Types",
  level: 1,
  intro:
    "A variable is a label that points at a value. Python uses a single equals sign to make one — no special keyword needed.",
  concept: `Make a variable in Python like this:

\`\`\`
age = 12
\`\`\`

That's it — no \`let\` or \`var\`. The label \`age\` now points at the number 12.

You can read it (\`age\`) or change it (\`age = 13\`). Python doesn't make you say what *type* of value it holds — it just figures it out.

Common types:

- **int** — whole numbers like \`12\`, \`-7\`
- **float** — decimals like \`3.14\`
- **str** — text in quotes like \`"hello"\`
- **bool** — \`True\` or \`False\` (note: capital letter!)
- **list** — \`[1, 2, 3]\`
- **dict** — \`{"key": "value"}\`
- **None** — "nothing on purpose"

To check the type of a value, use the built-in \`type()\`:

\`\`\`
type(12)        # <class 'int'>
type("hello")   # <class 'str'>
type(True)      # <class 'bool'>
\`\`\``,
  examples: [
    {
      caption: "Make a variable and change it",
      code: `score = 0
print(score)

score = score + 1
print(score)`,
      note: "Read, change, read again. Same label, new value.",
      tryIt: {
        python: `score = 0
print(score)

score = score + 1
print(score)`
      }
    },
    {
      caption: "Different types side by side",
      code: `name = "Ada"
age = 12
likes_pizza = True

print(name, type(name))
print(age, type(age))
print(likes_pizza, type(likes_pizza))`,
      note: "Python prints types as <class 'something'>. The 'something' is the type name.",
      tryIt: {
        python: `name = "Ada"
age = 12
likes_pizza = True

print(name, type(name))
print(age, type(age))
print(likes_pizza, type(likes_pizza))`
      }
    },
    {
      caption: "Numbers vs strings — careful!",
      code: `age = 12
print("I am " + str(age) + " years old.")

# This would crash:
# print("I am " + age + " years old.")`,
      note: "Python won't let you glue a string and a number together. Use str() to turn the number into text first.",
      tryIt: {
        python: `age = 12
print("I am " + str(age) + " years old.")

# This would crash:
# print("I am " + age + " years old.")`
      }
    }
  ],
  playground: { kind: "type", language: "python" },
  exercise: {
    prompt:
      "Make four variables: a number, a string, a boolean, and a list of three foods. Print each one along with its type using type().",
    files: {
      python: `# 1. A number

# 2. A string

# 3. A boolean (remember: True or False with capital letters)

# 4. A list of three foods

# Print each one with its type, like:
# print(my_thing, type(my_thing))
`
    },
    hint: "print can take more than one thing — separate them with commas.",
    expectedContains: ["print", "type("]
  }
};
