import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Database connected successfully.');
        client.release();
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

export { testConnection };
export default pool;