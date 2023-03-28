function deletionDistance(str1, str2) {
    // Create a 2D array to store the deletion distance for substrings
    const dp = [];
    for (let i = 0; i <= str1.length; i++) {
      dp[i] = new Array(str2.length + 1).fill(0);
    }
  
    console.log(dp)
    // Fill the first row and column with incremental values
    for (let i = 0; i <= str1.length; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= str2.length; j++) {
      dp[0][j] = j;
    }

    console.log(dp)
  
    // Calculate the deletion distance for substrings using dynamic programming
    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + 1;
        }
      }
    }
  
    // Return the deletion distance for the entire strings
    return dp[str1.length][str2.length];
  }
  
  // Example usage:
  console.log(deletionDistance("heat", "hit")); // Output: 3

  