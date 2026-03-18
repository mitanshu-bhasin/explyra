# Explyra API-E SDK Examples

Samples of how to interact with the Explyra Enhanced API using Node.js and Python.

## Node.js (Fetch API)

```javascript
const API_URL = "https://api-e.explyra.com/v1";
const API_KEY = "your_api_key_here";

async function getExpenses() {
  const response = await fetch(`${API_URL}/expenses`, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error("Error:", error);
    return;
  }
  
  const data = await response.json();
  console.log("Expenses:", data.expenses);
}

getExpenses();
```

## Python (Requests)

```python
import requests

API_URL = "https://api-e.explyra.com/v1"
API_KEY = "your_api_key_here"

headers = {
    "x-api-key": API_KEY,
    "Content-Type": "application/json"
}

def get_expenses():
    response = requests.get(f"{API_URL}/expenses", headers=headers)
    
    if response.status_code != 200:
        print(f"Error: {response.json()}")
        return
        
    data = response.json()
    print(f"Expenses: {data['expenses']}")

if __name__ == "__main__":
    get_expenses()
```

## Creating an API Key (Admin)

```javascript
async function createKey(jwt) {
  const response = await fetch("https://api-e.explyra.com/admin/create-api-key", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ label: "Mobile App" })
  });
  
  const data = await response.json();
  console.log("New API Key:", data.api_key);
}
```
