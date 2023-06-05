export default function sliceWords(text) {
    const words = text.split(" "); // Split the string into an array of words
    if (words.length <= 10) {
      return text; // Return the original string if it has 10 or fewer words
    }
  
    // Keep the first 5 words and the last 5 words, and join them with "..."
    const slicedText = `${words.slice(0, 5).join(" ")} ... ${words.slice(-5).join(" ")}`;
    return slicedText;
  };
  