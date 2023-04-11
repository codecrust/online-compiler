[{
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
  }]