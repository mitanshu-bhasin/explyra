
const url = "http://127.0.0.1:8787/admin/register-company";
const body = {
    id: "cmp_ksi8vqw87",
    admin_email: "explyras@gmail.com",
    admin_password: "mitanshu"
};

fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
})
.then(res => res.json())
.then(data => {
    console.log("Success:", JSON.stringify(data));
})
.catch(err => {
    console.error("Error:", err);
});
