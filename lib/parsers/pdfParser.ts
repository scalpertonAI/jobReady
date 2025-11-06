/**
 * PDF Parser Utility
 * Extracts text content from PDF files
 */

import pdf from 'pdf-parse';

/**
 * Extract text from PDF buffer
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

/**
 * Extract text from PDF file (for server-side use)
 */
export async function parsePDFFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return await extractTextFromPDF(buffer);
  } catch (error) {
    console.error('PDF file parsing error:', error);
    throw new Error('Failed to parse PDF file');
  }
}

/**
 * Clean and normalize extracted PDF text
 */
export function cleanPDFText(text: string): string {
  return text
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
    .replace(/\t+/g, ' ') // Replace tabs with spaces
    .replace(/ {2,}/g, ' ') // Remove multiple spaces
    .trim();
}

/**
 * Validate if file is a PDF
 */
export function isPDFFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

/**
 * Validate PDF file size (max 10MB)
 */
export function isValidPDFSize(file: File, maxSizeMB: number = 10): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}
