
/**
 * Syncs an expense to the main Explyra Firebase database
 */
export async function syncToFirebase(expense, env) {
  const projectId = env.FIREBASE_PROJECT_ID || 'explyras';
  const apiKey = env.FIREBASE_API_KEY;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/expenses?key=${apiKey}`;

  // Map the internal expense object to Firestore's complex field structure
  const firestoreDoc = {
    fields: {
      companyId: { stringValue: expense.company_id },
      userId: { stringValue: expense.user_id || "CaJjWT031DUvoQ9Jm8wXDeYO4X43" }, // Default to the admin we found
      userName: { stringValue: expense.user_name || "API User" },
      userEmail: { stringValue: expense.user_email || "explyras@gmail.com" },
      title: { stringValue: expense.note || "API Expense" },
      totalAmount: { stringValue: expense.amount.toString() },
      currency: { stringValue: expense.currency || "USD" },
      status: { stringValue: "PENDING_MANAGER" }, // Initial status for most flows
      type: { stringValue: "EXPENSE" },
      projectCode: { stringValue: expense.category || "API" },
      notes: { stringValue: `Source: API. Note: ${expense.note || ''}` },
      lineItems: {
        arrayValue: {
          values: [
            {
              mapValue: {
                fields: {
                  category: { stringValue: expense.category || "General" },
                  amount: { doubleValue: parseFloat(expense.amount) },
                  description: { stringValue: expense.note || "API entry" },
                  date: { stringValue: expense.date }
                }
              }
            }
          ]
        }
      },
      createdAt: { timestampValue: new Date().toISOString() },
      updatedAt: { timestampValue: new Date().toISOString() },
      history: {
        arrayValue: {
          values: [
            {
              mapValue: {
                fields: {
                  action: { stringValue: "SUBMITTED" },
                  by: { stringValue: "API-E Worker" },
                  date: { timestampValue: new Date().toISOString() }
                }
              }
            }
          ]
        }
      }
    }
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(firestoreDoc)
    });
    
    if (!res.ok) {
      const err = await res.json();
      console.error("Firebase Sync Failed:", err);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error("Firebase Sync Error:", e);
    return false;
  }
}
