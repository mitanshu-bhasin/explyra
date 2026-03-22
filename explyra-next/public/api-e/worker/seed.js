
import { hashPassword } from './src/utils.js';

async function seedCompany() {
    const id = "cmp_ksi8vqw87";
    const email = "explyras@gmail.com";
    const password = "mitanshu";
    const hashedPassword = await hashPassword(password);

    const company = {
        id,
        admin_email: email,
        admin_password: hashedPassword,
        plan: "starter",
        created_at: new Date().toISOString()
    };

    console.log("Seed data prepared. Use wrangler kv:key put to insert.");
    console.log(`wrangler kv:key put --binding=EXPLYRA_COMPANIES "company:${id}" '${JSON.stringify(company)}'`);
    console.log(`wrangler kv:key put --binding=EXPLYRA_COMPANIES "email:${email}" "${id}"`);
}

seedCompany();
