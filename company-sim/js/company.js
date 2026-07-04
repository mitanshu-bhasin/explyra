// ============================================
// Company Service — Firestore CRUD
// ============================================

const CompanyService = {
  // Create a new company
  async create(userId, data) {
    try {
      const companyRef = await csDb.collection('cs_companies').add({
        name: data.name,
        goal: data.goal,
        industry: data.industry,
        description: data.description || '',
        userId: userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Link company to user
      await csDb.collection('cs_users').doc(userId).update({
        companyId: companyRef.id
      });

      return { success: true, id: companyRef.id };
    } catch (error) {
      console.error('Create company error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get company by ID
  async get(companyId) {
    try {
      const doc = await csDb.collection('cs_companies').doc(companyId).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Get company error:', error);
      return null;
    }
  },

  // Get company by user ID
  async getByUser(userId) {
    try {
      const userDoc = await csDb.collection('cs_users').doc(userId).get();
      if (!userDoc.exists || !userDoc.data().companyId) return null;
      return this.get(userDoc.data().companyId);
    } catch (error) {
      console.error('Get company by user error:', error);
      return null;
    }
  },

  // Update company
  async update(companyId, data) {
    try {
      await csDb.collection('cs_companies').doc(companyId).update({
        ...data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // ── Agent Management ──

  // Save selected agents for a company
  async saveAgents(companyId, agents) {
    try {
      const batch = csDb.batch();
      for (const agent of agents) {
        const ref = csDb.collection('cs_companies').doc(companyId)
          .collection('agents').doc(agent.id);
        batch.set(ref, {
          ...agent,
          active: true,
          memory: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }
      await batch.commit();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get active agents for a company
  async getAgents(companyId) {
    try {
      const snapshot = await csDb.collection('cs_companies').doc(companyId)
        .collection('agents').where('active', '==', true).get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get agents error:', error);
      return [];
    }
  },

  // Update agent memory
  async updateAgentMemory(companyId, agentId, newMemory) {
    try {
      await csDb.collection('cs_companies').doc(companyId)
        .collection('agents').doc(agentId).update({
          memory: firebase.firestore.FieldValue.arrayUnion(newMemory)
        });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

window.CompanyService = CompanyService;
