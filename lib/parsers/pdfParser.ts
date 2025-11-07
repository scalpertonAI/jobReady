/**
 * PDF Parser Utility
 * Extracts text content from PDF files using unpdf
 * Pure Node.js library with no canvas/DOM dependencies
 */

import { extractText } from 'unpdf';

/**
 * Extract text from PDF buffer
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // unpdf requires Uint8Array, so convert Buffer to Uint8Array
    const uint8Array = new Uint8Array(buffer);

    // Extract text from PDF - no canvas dependencies!
    const result = await extractText(uint8Array);

    // unpdf returns text as an array of strings, one per page
    let extractedText = '';

    if (Array.isArray(result.text)) {
      // Join all pages with double newlines
      extractedText = result.text.join('\n\n');
    } else if (typeof result.text === 'string') {
      extractedText = result.text;
    } else {
      // Handle any other format by converting to string
      extractedText = String(result.text || '');
    }

    // Check if we got any text
    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error('No text content found in PDF');
    }

    return extractedText;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
