import type { Lesson } from "../../types";

export const pythonLists: Lesson = {
  id: "python-lists",
  trackId: "python",
  title: "Lists — Stacks of Things",
  level: 2,
  intro:
    "A list in Python is a row of things in order. You can grab any one, add new ones, sort them, or count them.",
  concept: `Here is a Python list:

\`\`\`
fruits = ["apple", "banana", "cherry"]
\`\`\`

Items are numbered starting at 0. So \`fruits[0]\` is "apple" and \`fruits[2]\` is "cherry".

Common methods:

- \`len(fruits)\` — count how many items
- \`fruits.append(x)\` — add x to the end
- \`fruits.pop()\` — remove the last item
- \`fruits.sort()\` — sort the items in place
- \`x in fruits\` — True if x is inside`,
  examples: [
    {
      caption: "Read and count",
      code: `fruits = ["apple", "banana", "cherry"]
print(fruits[0])
print(fruits[-1])
print(len(fruits))`,
      note: "fruits[-1] is a Python trick — it grabs the LAST item. Negative indexes count from the end.",
      tryIt: {
        python: `fruits = ["apple", "banana", "cherry"]
print(fruits[0])
print(fruits[-1])
print(len(fruits))`
      }
    },
    {
      caption: "Add and remove",
      code: `pets = ["dog", "cat"]
pets.append("hamster")
print(pets)

last = pets.pop()
print("Removed:", last)
print(pets)`,
      note: ".append adds to the end; .pop removes the last and returns it.",
      tryIt: {
        python: `pets = ["dog", "cat"]
pets.append("hamster")
print(pets)

last = pets.pop()
print("Removed:", last)
print(pets)`
      }
    },
    {
      caption: "Sort, and check membership",
      code: `numbers = [4, 1, 3, 2]
numbers.sort()
print(numbers)

print(2 in numbers)
print(99 in numbers)`,
      note: ".sort() rearranges in place. The 'in' keyword checks if a value is inside.",
      tryIt: {
        python: `numbers = [4, 1, 3, 2]
numbers.sort()
print(numbers)

print(2 in numbers)
print(99 in numbers)`
      }
    }
  ],
  playground: { kind: "array", language: "python" },
  exercise: {
    prompt:
      "Make a list of your top 3 favorite movies. Print the first one. Add a fourth. Print how many you have. Sort the list and print it. Then check if 'Frozen' is in your list.",
    files: {
      python: `movies = ["A", "B", "C"]

# 1. Print the first movie

# 2. Add a fourth with .append

# 3. Print how many movies there are

# 4. Sort the list and print it

# 5. Print whether 'Frozen' is in your list
`
    },
    hint: "Use print(...) to see each result. For #5, try print('Frozen' in movies).",
    expectedContains: ["print", ".append", ".sort", "len("]
  }
};
