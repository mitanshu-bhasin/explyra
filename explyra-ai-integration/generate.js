const { GoogleGenerativeAI } = require("@google/generative-ai");

// The Google AI Studio API Key provided
const API_KEY = "AIzaSyCA36DOoQGv51JCrEkIbVxXtaw6WkN_4GY";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(API_KEY);

async function main() {
    try {
        console.log("Initializing Explyra AI engine...");
        
        // Using the recommended fast model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // A sample prompt to test the integration
        const prompt = "Please introduce yourself, incorporating theoretical physics and software engineering.";
        
        console.log(`Sending prompt: "${prompt}"\n`);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log("========== EXPLYRA AI RESPONSE ==========");
        console.log(text);
        console.log("=========================================");
        
    } catch (error) {
        console.error("Failed to connect to Google AI Studio:", error.message);
    }
}

main();
