# Example application in react implementing wordle

## Running

To run the application locally in development mode you need to:
- clone this repository
- add a file containing the words in src/data/ called words.json
- install all the required packages by running ```npm install```
- start the application with ```npm start```
- open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Words file format

The words.json file should respect the format indicated in src/data/words.d.ts, here's a sample
```json
[
  {"word":"words","is_solution":false},
  {"word":"tests","is_solution":true},
  {"word":"thing","is_solution":false},
  {"word":"react","is_solution":true},
  {"word":"games","is_solution":false},
  {"word":"hints","is_solution":true}
]
```

The words where is_solution is marked as true will have a chance to be chosen as the solution.
Every other word can still be used to get hints.
