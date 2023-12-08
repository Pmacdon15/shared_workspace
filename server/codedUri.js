/**
 * The copyPaste module provides functions for copying and pasting text.
 * @type {object}
 */

/**
 * Reads text from the clipboard, encodes it using encodeURIComponent, and copies the encoded URI back to the clipboard.
 * @param {Error} err - The error object, if any.
 * @param {string} wordsToChange - The text read from the clipboard.
 */
const copyAndEncodeUri = (err, wordsToChange) => {
  if (err) {
    console.error('Error reading from clipboard:', err);
    return;
  }
  const codedUri = encodeURIComponent(wordsToChange);
  console.log("Words to change: "+ wordsToChange);
  console.log("Coded URI: "+ codedUri);

  // Copy the encoded URI to the clipboard
  copyPaste.copy(codedUri);
  console.log('Encoded URI copied to clipboard.');
};

// Read from the clipboard
copyPaste.paste(copyAndEncodeUri);
