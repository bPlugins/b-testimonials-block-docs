# Writing standard for DOCUMENTATION.html

The reader is a site owner, not a developer. They should never feel buried. Every page must be easy to scan and easy to follow.

## 1. Keep it short

- One idea per paragraph. A paragraph has 1 to 3 short sentences. Never more than 35 words.
- A sentence has one thought. Aim for 12 words or fewer.
- If a page can say it in half the words, say it in half the words.
- A page has a one or two sentence opening that says what the reader will get.

## 2. Steps first

- If the reader has to do something, write numbered steps. One action per step.
- Start each step with a verb: Open, Click, Type, Switch on, Choose.
- Bold the name of the button or field exactly as it appears on screen.
- Each step that clicks something has one screenshot with an arrow (see SCREENSHOT-STANDARD.md).
- Keep a step to one or two sentences. A reason, if needed, goes in one short sentence after the action.

## 3. Lists beat paragraphs, but keep lists small

- Use a short list for options. 3 to 5 items is best. Never more than 7 in a row.
- Do not use a table for something a short list can say. Keep a table only when the reader truly compares columns.
- Do not repeat the same facts in two places. Explain once, where the reader does the task. Elsewhere, write "See ..." with a link.

## 4. Plain words

- Write the way you would explain it to a friend. Say "you", not "the user".
- No jargon without a one line meaning. Prefer the everyday word.
- Say why before how, in one sentence.
- No dashes, curly quotes, arrows, or ellipsis. Use plain full stops and commas.

## 5. Help the eye

- Use headings that say what the reader wants to do: "Add a search box", not "Search box configuration".
- Use a callout only for one thing that really matters: a warning or a tip. One callout per section at most.
- Leave out developer details (hooks, filters, REST routes, internal limits). They live in DEVELOPERS.html.

## 6. Check before you save

1. Is any paragraph longer than 35 words? Split or cut it.
2. Is any list longer than 7 items? Group it or cut it.
3. Is the same fact written in two places? Keep one.
4. Does every click step have a screenshot with an arrow?
5. Any special characters? Remove them.
6. Write to a temp file, check the size, then rename. Never write straight over DOCUMENTATION.html.
