// Configuración de Supabase
// Reemplaza estas credenciales con las de tu propio proyecto en Supabase Dashboard
const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
const SUPABASE_ANON_KEY = 'tu-clave-anonima-publica-aqui';

// Inicialización del cliente Supabase
let supabase = null;
if (typeof supabase !== 'undefined' && SUPABASE_URL !== 'https://tu-proyecto.supabase.co') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Evento al hacer clic en el botón de la demostración práctica
document.getElementById('btn-cargar').addEventListener('click', async () => {
    const contenedorResultado = document.getElementById('resultado-supabase');
    contenedorResultado.textContent = 'Cargando datos desde Supabase...';

    // Verificación de credenciales
    if (!supabase) {
        setTimeout(() => {
            contenedorResultado.innerHTML = `
                <p style="color: #ff6b6b;">⚠️ <strong>Modo Demostración:</strong> Para realizar peticiones reales, debes colocar tu <code>SUPABASE_URL</code> y <code>SUPABASE_ANON_KEY</code> dentro del archivo <code>app.js</code>.</p>
                <p style="color: #3ecf8e; margin-top: 8px;">Conexión simulada con la base de datos PostgreSQL: ¡OK!</p>
            `;
        }, 1000);
        return;
    }

    try {
        // Consulta a la tabla creada en Supabase
        const { data, error } = await supabase
            .from('respuestas_tarea')
            .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
            contenedorResultado.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        } else {
            contenedorResultado.textContent = 'Conexión exitosa, pero la tabla no contiene filas aún.';
        }
    } catch (err) {
        contenedorResultado.textContent = 'Error al consultar Supabase: ' + err.message;
    }
});