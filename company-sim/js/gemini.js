// ============================================
// Gemini API Service
// ============================================

const GeminiService = {
  async generate(prompt, systemPrompt = '', maxTokens = 1024) {
    try {
      const contents = [];

      // Add system instruction if provided
      const body = {
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.8,
          topP: 0.95,
          topK: 40
        }
      };

      if (systemPrompt) {
        body.system_instruction = {
          parts: [{ text: systemPrompt }]
        };
      }

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Gemini API error:', response.status, errorData);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return {
          success: true,
          text: data.candidates[0].content.parts[0].text.trim()
        };
      }

      throw new Error('No response generated');
    } catch (error) {
      console.error('Gemini generation error:', error);
      return {
        success: false,
        error: error.message,
        text: 'I apologize, but I encountered an issue generating a response. Please try again.'
      };
    }
  },

  // Generate agent response in context
  async agentRespond(agentRole, userMessage, companyContext, agentMemory = []) {
    const systemPrompt = buildAgentSystemPrompt(agentRole, companyContext, agentMemory);
    return this.generate(userMessage, systemPrompt, 1500);
  },

  // Generate meeting summary
  async summarizeMeeting(transcript, topic) {
    const prompt = MEETING_PROMPTS.summary(transcript, topic);
    return this.generate(prompt, 'You are a professional meeting summarizer. Be concise and actionable.', 1200);
  },

  // Extract memories from text
  async extractMemories(text) {
    const prompt = MEMORY_PROMPTS.summarize(text);
    return this.generate(prompt, 'Extract only the most important facts as a numbered list.', 600);
  },

  // Generate presentation copy
  async generatePresentationCopy(companyData, section) {
    const prompts = {
      overview: `Write a compelling 2-sentence company overview for "${companyData.name}" in the ${companyData.industry} industry. Goal: ${companyData.goal}. Make it sound professional and investor-ready.`,
      vision: `Based on this company goal: "${companyData.goal}", write a brief, inspiring vision statement (1-2 sentences).`,
      roadmap: `For a ${companyData.industry} company with the goal "${companyData.goal}", suggest 3 milestone items for the next 6 months. Format: just the milestone titles, one per line.`
    };

    return this.generate(prompts[section] || prompts.overview, 'You are a startup copywriter. Be concise and compelling.', 400);
  }
};

window.GeminiService = GeminiService;
