let questionsData = [
  {
    "question": "Write a JavaScript function named reverseString that takes a string as input and returns the reversed version of that string. For example, if the input is \"Hello World\", the function should return \"dlroW olleH\". You may not use the built-in reverse() method.",
    "testcasesList": [
      {
        "input": "hello world",
        "output": "dlrow olleh"
      },
      {
        "input": "javascript programming",
        "output": "gnimmargorp tpircsavaj"
      },
      {
        "input": "12345",
        "output": "54321"
      },
      {
        "input": "a",
        "output": "a"
      },
      {
        "input": "",
        "output": ""
      }
    ]
  },
  {
    "question": "Write a function sumArray that takes an array of integers as input and returns the sum of all the integers in the array. For example, if the input array is [1, 2, 3, 4, 5], the output should be 15 (which is the sum of all the integers in the array). \n If input is not an array return \"Input is not an array\" . Otherwise if there are non numeric characters in array return \Array contains non-numeric values\".",
    "testcasesList": [
      {
        "input": [1, 2, 3, 4, 5],
        "output": "15"
      },
      {
        "input": [0, 0, 0, 0],
        "output": "0"
      },
      {
        "input": [],
        "output": "0"
      },
      {
        "input": [1, '2', 3, 4, 5],
        "output": "Array contains non-numeric values"
      },
      {
        "input": 123,
        "output": "Input is not an array"
      },
      {
        "input": "",
        "output": "Input is not an array"
      }
    ]
  },
  {
    "question": "Write a JavaScript function named findDuplicates that takes an array of integers as input and returns an array containing all the duplicate values in the input array. For example, if the input is [1, 2, 3, 2, 4, 5, 3], the function should return [2, 3].",
    "testcasesList": [    {      "input": [1, 2, 3, 2, 4, 5, 3],
        "output": JSON.stringify([2, 3])
      },
      {
        "input": [1, 2, 3, 4, 5],
        "output": JSON.stringify([])
      },
      {
        "input": [1, 1, 1, 1],
        "output":JSON.stringify([1])
      },
      {
        "input": [],
        "output": JSON.stringify([])
      },
      {
        "input": [1, 2, 3, 2, 4, 5, 3, 4, 5],
        "output": JSON.stringify([2, 3, 4, 5])
      }
    ]
  }
]



let statusIdObj = [{
  "id": 1,
  "description": "In Queue"
},
{
  "id": 2,
  "description": "Processing"
},
{
  "id": 3,
  "description": "Accepted"
},
{
  "id": 4,
  "description": "Wrong Answer"
},
{
  "id": 5,
  "description": "Time Limit Exceeded"
},
{
  "id": 6,
  "description": "Compilation Error"
},
{
  "id": 7,
  "description": "Runtime Error (SIGSEGV)"
},
{
  "id": 8,
  "description": "Runtime Error (SIGXFSZ)"
},
{
  "id": 9,
  "description": "Runtime Error (SIGFPE)"
},
{
  "id": 10,
  "description": "Runtime Error (SIGABRT)"
},
{
  "id": 11,
  "description": "Runtime Error (NZEC)"
},
{
  "id": 12,
  "description": "Runtime Error (Other)"
},
{
  "id": 13,
  "description": "Internal Error"
},
{
  "id": 14,
  "description": "Exec Format Error"
}]
