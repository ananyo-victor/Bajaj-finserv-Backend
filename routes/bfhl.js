import express from 'express';
const router = express.Router();
import { validateFile } from '../utils/fileUtils.js';
import { isPrime } from '../utils/primeUtils.js';
import { constructResponse } from '../utils/responseUtils.js';

function parseData(data) {
  const numbers = data.filter((item) => /^[0-9]+$/.test(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  const lowercaseAlphabets = alphabets.filter((item) => /^[a-z]$/.test(item));
  const highestLowercaseAlphabet = lowercaseAlphabets.length
    ? [lowercaseAlphabets.sort().slice(-1)[0]]
    : [];
  const isPrimeFound = numbers.some((num) => isPrime(parseInt(num, 10)));

  return { numbers, alphabets, highestLowercaseAlphabet, isPrimeFound };
}

router.post("/", async (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid data format. 'data' must be an array.",
      });
    }

    const { numbers, alphabets, highestLowercaseAlphabet, isPrimeFound } = parseData(data);

    const { isValid: fileValid, mimeType: fileMimeType, fileSizeKB } = await validateFile(file_b64);

    const userId = "Ananyo Maitra"; // Replace with dynamic data if needed
    const email = "ananyomaitroan@gmail.com";
    const rollNumber = "0832CA231012";
    const college = "Chameli Devi Group of Instititions"

    const response = constructResponse({
      userId,
      email,
      rollNumber,
      college,
      numbers,
      alphabets,
      highestLowercaseAlphabet,
      isPrimeFound,
      fileValid,
      fileMimeType,
      fileSizeKB,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      is_success: false,
      message: "An unexpected error occurred.",
    });
  }
});

router.get("/", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

export default router;
