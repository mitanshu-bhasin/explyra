// ============================================
// Memory Service — Long-term knowledge storage
// ============================================

const MemoryService = {
  // Save a memory entry
  async save(companyId, memory) {
    try {
      await csDb.collection('cs_companies').doc(companyId)
        .collection('memories').add({
          type: memory.type || 'fact', // fact, decision, insight, action
          content: memory.content,
          source: memory.source || 'meeting',
          agentRole: memory.agentRole || null,
          meetingId: memory.meetingId || null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Save multiple memories at once
  async saveMultiple(companyId, memories) {
    try {
      const batch = csDb.batch();
      for (const mem of memories) {
        const ref = csDb.collection('cs_companies').doc(companyId)
          .collection('memories').doc();
        batch.set(ref, {
          type: mem.type || 'fact',
          content: mem.content,
          source: mem.source || 'meeting',
          agentRole: mem.agentRole || null,
          meetingId: mem.meetingId || null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      await batch.commit();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get all memories for a company
  async getAll(companyId) {
    try {
      const snapshot = await csDb.collection('cs_companies').doc(companyId)
        .collection('memories')
        .orderBy('createdAt', 'desc')
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get memories error:', error);
      return [];
    }
  },

  // Get memories by type
  async getByType(companyId, type) {
    try {
      const snapshot = await csDb.collection('cs_companies').doc(companyId)
        .collection('memories')
        .where('type', '==', type)
        .orderBy('createdAt', 'desc')
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return [];
    }
  },

  // Get memories for a specific agent
  async getByAgent(companyId, agentRole) {
    try {
      const snapshot = await csDb.collection('cs_companies').doc(companyId)
        .collection('memories')
        .where('agentRole', '==', agentRole)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return [];
    }
  },

  // Get recent memories (for context injection)
  async getRecent(companyId, limit = 20) {
    try {
      const snapshot = await csDb.collection('cs_companies').doc(companyId)
        .collection('memories')
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return [];
    }
  },

  // Get relevant memories for a topic (simple keyword matching)
  async getRelevant(companyId, topic, limit = 5) {
    try {
      const allMemories = await this.getRecent(companyId, 50);
      if (allMemories.length === 0) return [];

      // Simple relevance: check if any keyword from topic appears in memory
      const keywords = topic.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const scored = allMemories.map(mem => {
        const content = (mem.content || '').toLowerCase();
        const score = keywords.reduce((s, kw) => s + (content.includes(kw) ? 1 : 0), 0);
        return { ...mem, score };
      });

      return scored
        .filter(m => m.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    } catch (error) {
      return [];
    }
  },

  // Extract and save memories from a meeting summary
  async extractAndSave(companyId, summaryData, meetingId) {
    const memories = [];

    // Save decisions as memories
    if (summaryData.decisions) {
      for (const decision of summaryData.decisions) {
        memories.push({
          type: 'decision',
          content: decision,
          source: 'meeting',
          meetingId: meetingId
        });
      }
    }

    // Save insights as memories
    if (summaryData.insights) {
      for (const insight of summaryData.insights) {
        memories.push({
          type: 'insight',
          content: insight,
          source: 'meeting',
          meetingId: meetingId
        });
      }
    }

    // Save action items as memories
    if (summaryData.actionItems) {
      for (const item of summaryData.actionItems) {
        memories.push({
          type: 'action',
          content: item,
          source: 'meeting',
          meetingId: meetingId
        });
      }
    }

    if (memories.length > 0) {
      await this.saveMultiple(companyId, memories);
    }

    return memories.length;
  },

  // Get personal chat history for an agent to summarize their connection with the founder
  async getAgentPersonalHistory(companyId, agentRole) {
    try {
      const snapshot = await csDb.collection('cs_companies').doc(companyId)
        .collection('memories')
        .where('agentRole', '==', agentRole)
        .where('source', '==', 'personal_chat')
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get agent personal history error:', error);
      return [];
    }
  }
};

window.MemoryService = MemoryService;
