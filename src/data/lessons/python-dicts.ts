import type { Lesson } from "../../types";

export const pythonDicts: Lesson = {
  id: "python-dicts",
  trackId: "python",
  title: "Dictionaries — Labels and Values",
  level: 6,
  intro:
    "A dictionary in Python pairs labels with values. Like a real dictionary: each word (key) has a meaning (value).",
  concept: `Here is a dictionary:

\`\`\`
person = {
  "name": "Ada",
  "age": 12,
  "likes_pizza": True
}
\`\`\`

You read a value by its **key**:

\`\`\`
print(person["name"])
\`\`\`

You can change or add values:

\`\`\`
person["age"] = 13
person["grade"] = 7
\`\`\`

Useful methods:

- \`person.keys()\` — all the labels
- \`person.values()\` — all the values
- \`person.get(k, default)\` — value at k, or default if not there
- \`k in person\` — True if k is a label`,
  examples: [
    {
      caption: "Read and change",
      code: `dog = {
  "name": "Pixel",
  "breed": "corgi",
  "age": 4
}

print(dog["name"])
dog["age"] = dog["age"] + 1
print("Happy birthday!", dog["name"], "is now", dog["age"])`,
      note: "Brackets with quotes — dog[\"age\"] — to read or set a value.",
      tryIt: {
        python: `dog = {
  "name": "Pixel",
  "breed": "corgi",
  "age": 4
}

print(dog["name"])
dog["age"] = dog["age"] + 1
print("Happy birthday!", dog["name"], "is now", dog["age"])`
      }
    },
    {
      caption: "List keys and values",
      code: `car = {
  "color": "red",
  "wheels": 4,
  "brand": "Toyota"
}

print(list(car.keys()))
print(list(car.values()))`,
      note: "Wrap with list() so they print nicely.",
      tryIt: {
        python: `car = {
  "color": "red",
  "wheels": 4,
  "brand": "Toyota"
}

print(list(car.keys()))
print(list(car.values()))`
      }
    },
    {
      caption: "Safe lookup with .get",
      code: `scores = {"Ada": 95, "Linus": 88}
print(scores.get("Ada"))
print(scores.get("Grace", 0))`,
      note: ".get gives a default if the key isn't there — no crash.",
      tryIt: {
        python: `scores = {"Ada": 95, "Linus": 88}
print(scores.get("Ada"))
print(scores.get("Grace", 0))`
      }
    }
  ],
  playground: { kind: "object", language: "python" },
  exercise: {
    prompt:
      "Make a dictionary about you with keys: name, age, favorite_color. Print your name. Add a 'grade' key. Print all the keys. Use .get to safely look up 'pet' with a default of 'no pet'.",
    files: {
      python: `me = {
  "name": "Your name",
  "age": 0,
  "favorite_color": "blue"
}

# 1. Print your name

# 2. Add a 'grade' key

# 3. Print all the keys

# 4. Use .get('pet', 'no pet') to print a safe lookup
`
    },
    hint: "Use me['name'] to read, me['grade'] = 5 to set. Wrap me.keys() in list() before printing.",
    expectedContains: ["print", ".get", ".keys", "me["]
  }
};
