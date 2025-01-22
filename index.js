const { OpenAI } = require("openai");

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = "396533d9be07418ba0ad3bf2988f51b5";

// Updated system prompt to guide the AI to give short, insightful responses
const systemPrompt = "You are Lord Krishna. Answer the user in brief, insightful, and meaningful phrases, keeping the responses short and conversational.";

const api = new OpenAI({
  apiKey,
  baseURL,
});

const main = async () => {
  while (true) {
    // Take user input
    const userPrompt = await promptUser("You: ");
    if (userPrompt.toLowerCase() === 'exit') {
      console.log("Exiting chat...");
      break;
    }

    // Modify the user prompt to ask for Lord Krishna's short phrases
    const prompt = `${userPrompt} Talk to me like Lord Krishna in short phrases.`;

    // Make the API request to get a response from the model
    const completion = await api.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5, // Lower temperature for more concise responses
      max_tokens: 50,  // Limit the response to shorter text
    });

    const response = completion.choices[0].message.content;

    // Print the conversation
    console.log("AI (as Lord Krishna):", response);
  }
};

// Function to prompt the user
const promptUser = (message) => {
  return new Promise((resolve) => {
    process.stdout.write(message + " ");
    process.stdin.on("data", (data) => resolve(data.toString().trim()));
  });
};

main();
