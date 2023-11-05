import OpenAI from "openai";


export default summarizeConversation = async (conversation) => {
    const prompt = conversation.map((message) => message.content).join(" ");
    const response = await openai.chat.completions.create({
      model: "text-davinci-002",
      prompt: `Summarize the following conversation in 10 words or less: ${prompt}`,
      max_tokens: 10,
    });
    return response.choices[0].text.trim();
  };