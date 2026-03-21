
const PROJECT_ID = 'explyras';
const API_KEY = '"+"(window.EXPLYRA_CONFIG?.firebase?.apiKey || "")+"';
const EMAIL = 'explyras@gmail.com';

async function findUserId() {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery?key=${API_KEY}`;
  
  const query = {
    structuredQuery: {
      from: [{ collectionId: 'users' }],
      where: {
        fieldFilter: {
          field: { fieldPath: 'email' },
          op: 'EQUAL',
          value: { stringValue: EMAIL }
        }
      },
      limit: 1
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(query)
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

findUserId();
