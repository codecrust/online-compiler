let questionsData = [
  {
    "question": "Write a JavaScript function named reverseString that takes a string as input and returns the reversed version of that string. For example, if the input is \"Hello World\", the function should return \"dlroW olleH\". You may not use the built-in reverse() method.",
    "methodName": "reverseString",
    "returnType": "string",
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
    "question": "Write a function sumArray that takes an array of integers as input and returns the sum of all the integers in the array. For example, if the input array is [1, 2, 3, 4, 5], the output should be 15 (which is the sum of all the integers in the array). \n If input is not an array return \"Input is not an array\" . Otherwise if there are non numeric characters in array return \"Array contains non-numeric values\".",
    "methodName": "sumArray",
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
   "methodName": "findDuplicates",
    "testcasesList": [    {"input": [1, 2, 3, 2, 4, 5, 3],
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
  },
  {
    "question": "Write a JavaScript function named findMedian that takes an array of integers as input and returns the median value of the array. If the array has an even number of elements, return the average of the two middle elements. For example, if the input is [4, 2, 6, 5, 3], the function should return 4. Note: You may assume that the input array is non-empty and contains only integers.",
   "methodName": "findMedian",
    "testcasesList": [
      {
        "input": [4, 2, 6, 5, 3],
        "output": 4
      },
      {
        "input": [1, 2, 3, 4, 5, 6],
        "output": 3.5
      },
      {
        "input": [2, 5, 7, 1, 9, 10],
        "output": 6
      },
      {
        "input": [2],
        "output": 2
      },
      {
        "input": [8, 7],
        "output": 7.5
      }
    ]
  },
  {
    "question": "Write a JavaScript function named mergeSort that takes an array of integers as input and returns a new array that is sorted in ascending order using the merge sort algorithm. For example, if the input is [4, 2, 6, 5, 3], the function should return [2, 3, 4, 5, 6].Note: You may not use the built-in sort() method.",
  "methodName": "mergeSort",
    "testcasesList": [    {      "input": [4, 2, 6, 5, 3],
        "output": JSON.stringify([2, 3, 4, 5, 6])
      },
      {
        "input": [5, 3, 9, 1, 7],
        "output": JSON.stringify([1, 3, 5, 7, 9])
      },
      {
        "input": [8, 7, 6, 5, 4, 3, 2, 1],
        "output":JSON.stringify( [1, 2, 3, 4, 5, 6, 7, 8])
      },
      {
        "input": [1],
        "output":JSON.stringify( [1])
      },
      {
        "input": [2, 1],
        "output": JSON.stringify([1, 2])
      }
    ]
  },
  {
    "question": "Write a JavaScript function named flattenArray that takes an array of nested arrays as input and returns a new array that is flattened, meaning it contains no nested arrays. For example, if the input is [1, [2, [3, 4], 5], 6], the function should return [1, 2, 3, 4, 5, 6].",
   "methodName": "flattenArray",
    "testcasesList": [
      {
        "input": [1, [2, [3, 4], 5], 6],
        "output": JSON.stringify([1, 2, 3, 4, 5, 6])
      },
      {
        "input": [[1, 2], [3, [4, [5, 6]], 7], 8],
        "output": JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])
      },
      {
        "input": [1, 2, 3, 4, 5],
        "output": JSON.stringify([1, 2, 3, 4, 5])
      },
      {
        "input": [[1, 2]],
        "output":JSON.stringify([1, 2])
      },
      {
        "input": [],
        "output": JSON.stringify([])
      }
    ]
  },
  {
    "question": "Write a JavaScript function named findPairs that takes an array of integers and a target sum as input and returns an array of pairs of integers whose sum is equal to the target. For example, if the input array is [3, 5, 9, 2, 8, 10, 1] and the target sum is 11, the function should return [[3, 8], [5, 6], [9, 2]].\n\nNote: The output array should contain unique pairs only and the pairs should be sorted in ascending order.",
    "methodName": "findPairs",

    "testcasesList": [    {      "input": [[3, 5, 9, 2, 8, 10, 1], 11],
        "output": JSON.stringify([[2, 9], [3, 8], [5, 6]])
      },
      {
        "input": [[1, 2, 3, 4, 5, 6], 7],
        "output": JSON.stringify([[1, 6], [2, 5], [3, 4]])
      },
      {
        "input": [[1, 2, 3, 4, 5, 6], 10],
        "output":JSON.stringify( [[4, 6], [5, 5]])
      },
      {
        "input": [[1, 2, 3], 6],
        "output": JSON.stringify([[3, 3]])
      },
      {
        "input": [[1, 2], 5],
        "output": JSON.stringify([])
      }
    ]
  },
  {
    "question": "Write a JavaScript function named isAnagram that takes two strings as input and returns true if they are anagrams of each other, and false otherwise. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase. For example, \"mary\" and \"army\" are anagrams. The function should be case-insensitive and ignore spaces.",
    "methodName": "isAnagram",
    "testcasesList": [
      {
        "input": ["listen", "silent"],
        "output": true
      },
      {
        "input": ["Tom Marvolo Riddle", "I am Lord Voldemort"],
        "output": true
      },
      {
        "input": ["rail safety", "fairy tales"],
        "output": true
      },
      {
        "input": ["debit card", "bad credit"],
        "output": true
      },
      {
        "input": ["hello", "world"],
        "output": false
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
