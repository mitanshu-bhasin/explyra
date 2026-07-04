// ============================================
// Meeting Service — Create, manage, store meetings
// ============================================

const MeetingService = {
  // Create a new meeting
  async create(companyId, data) {
    try {
      const meetingRef = await csDb.collection('cs_companies').doc(companyId)
        .collection('meetings').add({
          topic: data.topic,
          agentIds: data.agentIds,
          transcript: [],
          summary: null,
          decisions: [],
          actionItems: [],
          followUps: [],
          status: 'active',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      return { success: true, id: meetingRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Add message to meeting transcript
  async addMessage(companyId, meetingId, message) {
    try {
      await csDb.collection('cs_companies').doc(companyId)
        .collection('meetings').doc(meetingId).update({
          transcript: firebase.firestore.FieldValue.arrayUnion({
            sender: message.sender,
            senderRole: message.senderRole || 'user',
            text: message.text,
            timestamp: new Date().toISOString()
          })
        });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Save meeting summary
  async saveSummary(companyId, meetingId, summaryData) {
    try {
      await csDb.collection('cs_companies').doc(companyId)
        .collection('meetings').doc(meetingId).update({
          summary: summaryData.summary || '',
          decisions: summaryData.decisions || [],
          actionItems: summaryData.actionItems || [],
          followUps: summaryData.followUps || [],
          insights: summaryData.insights || [],
          status: 'completed',
          completedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get all meetings for a company
  async getAll(companyId) {
    try {
      const snapshot = await csDb.collection('cs_companies').doc(companyId)
        .collection('meetings')
        .orderBy('createdAt', 'desc')
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get meetings error:', error);
      return [];
    }
  },

  // Get a single meeting
  async get(companyId, meetingId) {
    try {
      const doc = await csDb.collection('cs_companies').doc(companyId)
        .collection('meetings').doc(meetingId).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      return null;
    }
  },

  // Get recent meetings (limit)
  async getRecent(companyId, limit = 5) {
    try {
      const snapshot = await csDb.collection('cs_companies').doc(companyId)
        .collection('meetings')
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return [];
    }
  },

  // Parse summary text into structured data
  parseSummary(summaryText) {
    const sections = {
      summary: '',
      decisions: [],
      actionItems: [],
      followUps: [],
      insights: []
    };

    if (!summaryText) return sections;

    const lines = summaryText.split('\n');
    let currentSection = 'summary';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.toUpperCase().startsWith('SUMMARY:')) {
        currentSection = 'summary';
        const rest = trimmed.substring(8).trim();
        if (rest) sections.summary = rest;
        continue;
      }
      if (trimmed.toUpperCase().startsWith('KEY DECISIONS:')) { currentSection = 'decisions'; continue; }
      if (trimmed.toUpperCase().startsWith('ACTION ITEMS:')) { currentSection = 'actionItems'; continue; }
      if (trimmed.toUpperCase().startsWith('FOLLOW-UP TASKS:') || trimmed.toUpperCase().startsWith('FOLLOW UP TASKS:')) { currentSection = 'followUps'; continue; }
      if (trimmed.toUpperCase().startsWith('IMPORTANT INSIGHTS:') || trimmed.toUpperCase().startsWith('KEY INSIGHTS:')) { currentSection = 'insights'; continue; }

      if (currentSection === 'summary') {
        sections.summary += (sections.summary ? ' ' : '') + trimmed;
      } else {
        const cleaned = trimmed.replace(/^[-•*→\d.)\s]+/, '').trim();
        if (cleaned && sections[currentSection]) {
          sections[currentSection].push(cleaned);
        }
      }
    }

    return sections;
  }
};

window.MeetingService = MeetingService;
