// ============================================
// Meeting & Memory Prompts
// ============================================

const MEETING_PROMPTS = {
  summary: (transcript, topic) => `You are analyzing a business meeting. Here is the full transcript of a meeting about "${topic}":

${transcript}

Generate a concise meeting summary with the following sections (use plain text, no markdown):

SUMMARY:
[2-3 sentence overview of the meeting and main outcome]

KEY DECISIONS:
[List each decision as a bullet point]

ACTION ITEMS:
[List each action item with the responsible role]

FOLLOW-UP TASKS:
[List 2-3 follow-up tasks for the next meeting]

IMPORTANT INSIGHTS:
[List 2-3 key insights or important facts discussed]

Be concise and specific. Focus on actionable outcomes.`,

  discussionStart: (topic, agents, companyContext) => `We are having a team meeting about: "${topic}"

Company: ${companyContext.name}
Industry: ${companyContext.industry}
Goal: ${companyContext.goal}

Participants: ${agents.map(a => a.name).join(', ')}

As the meeting facilitator, provide a brief opening to kick off the discussion. Address how this topic relates to our company goals. Keep it to 2-3 sentences.`
};

const MEMORY_PROMPTS = {
  summarize: (text) => `Analyze the following text and extract key facts, decisions, and insights that should be remembered long-term. Return them as a simple list:

${text}

Return only the most important points (max 5) as a simple numbered list. Each point should be one concise sentence. Focus on facts, decisions, and actionable insights that would be useful context for future discussions.`,

  relevantRetrieval: (memories, currentTopic) => `Given the current discussion topic: "${currentTopic}"

And these stored memories:
${memories.map((m, i) => `${i + 1}. ${m.content}`).join('\n')}

Select only the memories that are directly relevant to the current topic. Return their numbers as a comma-separated list. If none are relevant, return "none".`
};

if (typeof window !== 'undefined') {
  window.MEETING_PROMPTS = MEETING_PROMPTS;
  window.MEMORY_PROMPTS = MEMORY_PROMPTS;
}
