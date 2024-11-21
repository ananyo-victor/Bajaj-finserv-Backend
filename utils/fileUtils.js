import { fileTypeFromBuffer } from 'file-type';

async function validateFile(file_b64) {
    if (!file_b64) {
      return { isValid: false, mimeType: null, fileSizeKB: null };
    }
  
    const fileBuffer = Buffer.from(atob(file_b64), "base64");
    const fileInfo = await fileTypeFromBuffer(fileBuffer);
  
    if (fileInfo) {
      const fileSizeKB = (fileBuffer.length / 1024).toFixed(2);
      return { isValid: true, mimeType: fileInfo.mime, fileSizeKB };
    }
  
    return { isValid: false, mimeType: null, fileSizeKB: null };
  }
  
  export { validateFile };
  
