const server = require('../src/app.js');
const { conn } = require('../src/db.js');

// Opcional pero recomendado: Asegura que la DB se sincronice *si es necesario* // antes de manejar la request, PERO no bloquea el arranque de la función.
// Sin embargo, para producción, lo mejor es **eliminar conn.sync** del código de Vercel.

async function handleRequest(req, res) {
    // Si realmente necesitas que la DB se sincronice al arrancar:
    try {
        await conn.sync({ force: false });
        // console.log("Database synced successfully!");
    } catch (e) {
        // console.error("Database connection failed:", e);
        // Retornar el error para que Vercel lo muestre.
        return res.status(500).send("Database initialization failed.");
    }

    // Devolver la aplicación Express para que Vercel la ejecute
    server(req, res);
}

// Exporta la aplicación Express para que Vercel la pueda ejecutar como handler.
module.exports = server;