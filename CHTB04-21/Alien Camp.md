# Alien Camp 
###### Category: Misc


Main goal of challenge is to be able to read and write emojis on TCP socket connection.
Instead of handling the case to render emojis on terminal, got around the problem by creating a JS script to read and respond to questions as follows:

```text
1. ❓
2. Take test!
> 1
Here is a little help:

🌞 -> 26 🍨 -> 20 ❌ -> 70 🍪 -> 16 🔥 -> 72 ⛔ -> 26 🍧 -> 81 👺 -> 13 👾 -> 82 🦄 -> 42 
```
Get help and map of which emojis points to which number. Then proceed to request for test. 

```text
1. ❓
2. Take test!
> 2

You must answer 500 questions. You have only a few seconds for each question! Be fast! ⏰

Question 1:

🍪 - 🦄  = ?

Answer: -26

Time: 0.15
Correct! ✔
Question 2: ... and so on
```

Read the question, replace the emojis with numbers in the string and pass it as is to `eval` and send the results as response on TCP socket.

Find the [JS code here](./whyemojiswhy.js)
