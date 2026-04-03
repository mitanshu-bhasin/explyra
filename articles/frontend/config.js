import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Gracefully parses the fb.config file to extract firebase configuration.
 * Also checks for additional API keys like GEMINI_API_KEY and NEWS_API_KEY.
 */
function parseFbConfig() {
    try {
        const configPath = path.resolve('fb.config');
        if (!fs.existsSync(configPath)) {
            console.error('CRITICAL: fb.config file not found!');
            return null;
        }

        const content = fs.readFileSync(configPath, 'utf-8');
        
        // Extract the object defined in const firebaseConfig = { ... };
        const match = content.match(/const firebaseConfig = ({[\s\S]+?});/);
        if (!match) {
            console.error('Error: Could not parse firebaseConfig from fb.config');
            return null;
        }

        // Convert the matched JS object string to a JSON-parsable string
        // Note: This matches simple JS object literals.
        const rawObj = match[1]
            .replace(/(\w+):/g, '"$1":') // add quotes to keys
            .replace(/'/g, '"') // replace single quotes with double quotes
            .replace(/,(\s*[}\]])/g, '$1'); // remove trailing commas
        
        const firebaseConfig = JSON.parse(rawObj);
        
        const geminiMatch = content.match(/const GEMINI_API_KEY = "(.*)";/);
        const newsMatch = content.match(/const NEWS_API_KEY = "(.*)";/);

        return {
            firebase: firebaseConfig,
            geminiKey: geminiMatch ? geminiMatch[1] : (process.env.GEMINI_API_KEY || "AIzaSyBuaiiY1Ef7EyTB1Qtd1GS2xNT-Rkhhqp4"),
            newsKey: newsMatch ? newsMatch[1] : process.env.NEWS_API_KEY
        };
    } catch (error) {
        console.error('Error parsing fb.config:', error);
        return null;
    }
}

const config = parseFbConfig();

if (!config) {
    process.exit(1);
}

export default config;
