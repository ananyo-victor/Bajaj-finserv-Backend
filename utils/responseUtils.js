// Function to construct the response body
function constructResponse({ userId, email, rollNumber, numbers, alphabets, highestLowercaseAlphabet, isPrimeFound, fileValid, fileMimeType, fileSizeKB }) {
    return {
      is_success: true,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
      is_prime_found: isPrimeFound,
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKB,
    };
  }
  
  export { constructResponse };
  