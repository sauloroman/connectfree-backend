import { HashAdapter } from "../../../../config/plugin";
import { postgresPool } from "../postgres.pool";

const hashedPasswords = {
    password123: HashAdapter.hash('password123'),
    Admin2026: HashAdapter.hash('Admin2026'),
};

const users = [
    { username: 'ana_dev', email: 'ana.dev@example.com', password: hashedPasswords.password123 },
    { username: 'carlos_g', email: 'carlos.gtz@example.com', password: hashedPasswords.Admin2026 },
    { username: 'maria_lpz', email: 'maria.lopez@example.com', password: hashedPasswords.password123 },
    { username: 'juanito_22', email: 'juan.perez22@example.com', password: hashedPasswords.Admin2026 },
    { username: 'sofia_design', email: 'sofia.ui@example.com', password: hashedPasswords.password123 },
    { username: 'pedro_api', email: 'pedro.backend@example.com', password: hashedPasswords.Admin2026 },
    { username: 'laura_ml', email: 'laura.machine@example.com', password: hashedPasswords.password123 },
    { username: 'diego_qa', email: 'diego.testing@example.com', password: hashedPasswords.Admin2026 },
    { username: 'valeria_ux', email: 'valeria.ux@example.com', password: hashedPasswords.password123 },
    { username: 'admin_master', email: 'admin@tuapp.com', password: hashedPasswords.Admin2026 },
];

const seedUsers = async () => {

    const client = await postgresPool.connect()

    try {
        console.log('Iniciando Semilla de Usarios')

        for (const user of users) {
            try {

                await client.query(
                `
                    INSERT INTO users (username, email, password)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (email) DO NOTHING
                `,
                    [user.username, user.email, user.password]
                );

            } catch (err: any) {
                console.error(`Error al insertar usuario ${user.username} (${user.email})`, err.message);
            }
        }

        console.log('Semilla de Usuarios finalizada')
    } catch (err) {
        console.error('Semilla Usuarios - Error general en el seed:', err);
    } finally {
        client.release()
        await postgresPool.end()
    }

}

(async () => await seedUsers())()

