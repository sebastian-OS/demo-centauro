/* ============================================================
   Demo · Sistema Operativo Centauro en Notion
   Datos de bases de datos + configuración de páginas
   Anclado a las 16 vacantes activas (LinkedIn) y a las
   Condiciones Comerciales de Centauro Rent a Car.
   Autocandidatura — Sebastián Olmedo Salinas.
   ============================================================ */
window.DEMO = (function () {

  /* ---------- DB 1 · Pipeline de Selección (volumen y estacionalidad) ---------- */
  /* Evidencia: 7 de 16 vacantes son agentes de mostrador/check-in en 6 ciudades y
     3 países + International Talent Acquisition Specialist + Téc. Relaciones Laborales. */
  const seleccion = {
    id: 'seleccion',
    icon: '🧲',
    name: 'Pipeline de Selección',
    schema: [
      { key: 'puesto', label: 'Vacante', type: 'title', icon: '🧲' },
      { key: 'sede', label: 'Sede / destino', type: 'select' },
      { key: 'pais', label: 'País', type: 'select' },
      { key: 'fase', label: 'Fase', type: 'status' },
      { key: 'candidatos', label: 'Candidatos', type: 'text' },
      { key: 'reclutador', label: 'Responsable', type: 'person' },
      { key: 'objetivo', label: 'Alta objetivo', type: 'date' },
    ],
    colors: {
      pais: { 'España': 'orange', 'Portugal': 'green', 'Italia': 'blue', 'Grecia': 'purple' },
      sede: { 'Aeropuerto': 'blue', 'Estación AVE': 'purple', 'Oficinas centrales': 'gray', 'Urbano': 'yellow' },
      fase: { 'Vacante abierta': 'gray', 'Criba de CV': 'brown', 'Entrevista tel.': 'yellow', 'Entrevista': 'orange', 'Oferta': 'blue', 'Alta / contrato': 'green' },
    },
    rows: [
      { puesto: 'Rental Agent · Olbia Airport', sede: 'Aeropuerto', pais: 'Italia', fase: 'Vacante abierta', candidatos: '14', reclutador: 'Talent Acq.', objetivo: '2026-07-10' },
      { puesto: 'Rental Agent · Lisboa Airport', sede: 'Aeropuerto', pais: 'Portugal', fase: 'Criba de CV', candidatos: '49', reclutador: 'Talent Acq.', objetivo: '2026-07-05' },
      { puesto: 'Rental Agent · Zaragoza (AVE)', sede: 'Estación AVE', pais: 'España', fase: 'Criba de CV', candidatos: '4', reclutador: 'Talent Acq.', objetivo: '2026-07-12' },
      { puesto: 'Rental Agent · Palma de Mallorca', sede: 'Aeropuerto', pais: 'España', fase: 'Entrevista tel.', candidatos: '18', reclutador: 'Talent Acq.', objetivo: '2026-06-28' },
      { puesto: 'Contact Centre Agent · Finestrat', sede: 'Oficinas centrales', pais: 'España', fase: 'Entrevista', candidatos: '49', reclutador: 'Talent Acq.', objetivo: '2026-06-30' },
      { puesto: 'Agente Check-In · Palma de Mallorca', sede: 'Aeropuerto', pais: 'España', fase: 'Entrevista', candidatos: '10', reclutador: 'RRHH', objetivo: '2026-06-25' },
      { puesto: 'Rental Agent · Murcia Airport', sede: 'Aeropuerto', pais: 'España', fase: 'Entrevista', candidatos: '47', reclutador: 'RRHH', objetivo: '2026-06-24' },
      { puesto: 'Agente Check-In · Barcelona Airport', sede: 'Aeropuerto', pais: 'España', fase: 'Oferta', candidatos: '40', reclutador: 'RRHH', objetivo: '2026-06-20' },
      { puesto: 'Técnico IT · Sistemas & Soporte', sede: 'Oficinas centrales', pais: 'España', fase: 'Entrevista', candidatos: '87', reclutador: 'Talent Acq.', objetivo: '2026-06-22' },
      { puesto: 'Senior Accountant', sede: 'Oficinas centrales', pais: 'España', fase: 'Oferta', candidatos: '15', reclutador: 'Talent Acq.', objetivo: '2026-06-18' },
      { puesto: 'Talent Acquisition Specialist', sede: 'Oficinas centrales', pais: 'España', fase: 'Alta / contrato', candidatos: '24', reclutador: 'Dir. RRHH', objetivo: '2026-06-09' },
    ],
    views: [
      { id: 'board', label: 'Pipeline', icon: '▦', type: 'board',
        groupBy: 'fase',
        groupOrder: ['Vacante abierta', 'Criba de CV', 'Entrevista tel.', 'Entrevista', 'Oferta', 'Alta / contrato'],
        card: { pills: ['pais', 'sede'], footL: 'reclutador', footR: 'objetivo' } },
      { id: 'table', label: 'Todas las vacantes', icon: '☰', type: 'table' },
    ],
  };

  /* ---------- DB 2 · Onboarding de Temporada ---------- */
  /* Evidencia: agentes con "ongoing training", check-in/out, Téc. IT "configuración de
     equipos para nuevas incorporaciones". Soporte = 34% de plantilla, antigüedad 3 años. */
  const onboarding = {
    id: 'onboarding',
    icon: '👥',
    name: 'Onboarding de Temporada',
    schema: [
      { key: 'persona', label: 'Persona', type: 'title', icon: '🧑' },
      { key: 'sede', label: 'Sede', type: 'select' },
      { key: 'puesto', label: 'Puesto', type: 'select' },
      { key: 'inicio', label: 'Inicio', type: 'date' },
      { key: 'progreso', label: 'Formación', type: 'progress' },
      { key: 'mentor', label: 'Mentor', type: 'person' },
      { key: 'estado', label: 'Estado', type: 'status' },
    ],
    colors: {
      sede: { 'Alicante Aeropuerto': 'orange', 'Palma de Mallorca': 'yellow', 'Ibiza': 'blue', 'Málaga Aeropuerto': 'green', 'Barcelona': 'purple', 'Faro': 'brown' },
      puesto: { 'Agente de mostrador': 'blue', 'Lavado y flota': 'brown', 'Supervisor/a': 'purple', 'Atención cliente': 'green' },
      estado: { 'Pendiente': 'gray', 'En formación': 'yellow', 'Operativo': 'blue', 'Certificado': 'green' },
    },
    rows: [
      { persona: 'Nerea Campos', sede: 'Alicante Aeropuerto', puesto: 'Agente de mostrador', inicio: '2026-06-01', progreso: 100, mentor: 'Lucía Sanz', estado: 'Certificado' },
      { persona: 'Marco Bianchi', sede: 'Ibiza', puesto: 'Agente de mostrador', inicio: '2026-06-05', progreso: 80, mentor: 'Javier Pons', estado: 'Operativo' },
      { persona: 'Sofía Méndez', sede: 'Palma de Mallorca', puesto: 'Atención cliente', inicio: '2026-06-08', progreso: 65, mentor: 'Lucía Sanz', estado: 'En formación' },
      { persona: 'Tomás Real', sede: 'Málaga Aeropuerto', puesto: 'Lavado y flota', inicio: '2026-06-10', progreso: 45, mentor: 'Marta Ríos', estado: 'En formación' },
      { persona: 'Aitana Gil', sede: 'Barcelona', puesto: 'Agente de mostrador', inicio: '2026-06-12', progreso: 30, mentor: 'Javier Pons', estado: 'En formación' },
      { persona: 'Hugo Serrano', sede: 'Alicante Aeropuerto', puesto: 'Supervisor/a', inicio: '2026-06-02', progreso: 90, mentor: 'Lucía Sanz', estado: 'Operativo' },
      { persona: 'Inês Costa', sede: 'Faro', puesto: 'Atención cliente', inicio: '2026-06-15', progreso: 15, mentor: 'Marta Ríos', estado: 'En formación' },
      { persona: 'Diego Navarro', sede: 'Málaga Aeropuerto', puesto: 'Agente de mostrador', inicio: '2026-06-18', progreso: 0, mentor: 'Javier Pons', estado: 'Pendiente' },
      { persona: 'Carla Vidal', sede: 'Palma de Mallorca', puesto: 'Lavado y flota', inicio: '2026-06-20', progreso: 0, mentor: 'Marta Ríos', estado: 'Pendiente' },
      { persona: 'Elena Prieto', sede: 'Barcelona', puesto: 'Atención cliente', inicio: '2026-06-09', progreso: 70, mentor: 'Lucía Sanz', estado: 'Operativo' },
    ],
    views: [
      { id: 'table', label: 'Seguimiento', icon: '☰', type: 'table' },
      { id: 'board', label: 'Por estado', icon: '▦', type: 'board',
        groupBy: 'estado',
        groupOrder: ['Pendiente', 'En formación', 'Operativo', 'Certificado'],
        card: { pills: ['sede', 'puesto'], progress: 'progreso', footL: 'mentor', footR: 'inicio' } },
    ],
  };

  /* ---------- DB 3 · Biblioteca de SOPs ---------- */
  /* Evidencia: Téc. IT "documentación de incidencias y procesos"; Política de Calidad ISO 9001
     (Manual, Procedimientos, Instrucciones de Trabajo); Condiciones: peritaje de daños,
     combustible, Smart Pack, multas. */
  const sops = {
    id: 'sops',
    icon: '📘',
    name: 'Biblioteca de SOPs',
    schema: [
      { key: 'proc', label: 'Procedimiento', type: 'title', icon: '📄' },
      { key: 'area', label: 'Área', type: 'select' },
      { key: 'formato', label: 'Formato', type: 'select' },
      { key: 'idiomas', label: 'Idiomas', type: 'multi' },
      { key: 'estado', label: 'Estado', type: 'status' },
      { key: 'revision', label: 'Última revisión', type: 'date' },
      { key: 'responsable', label: 'Owner', type: 'person' },
    ],
    colors: {
      area: { 'Mostrador': 'blue', 'Devolución': 'orange', 'Incidencias': 'red', 'Flota': 'brown', 'Upselling': 'green', 'Atención cliente': 'purple' },
      formato: { 'Checklist': 'green', 'Guía': 'blue', 'Vídeo': 'purple', 'Plantilla': 'yellow' },
      estado: { 'Publicado': 'green', 'En revisión': 'yellow', 'Borrador': 'gray' },
      idiomas: { 'ES': 'gray', 'EN': 'gray', 'IT': 'gray', 'PT': 'gray', 'EL': 'gray' },
    },
    rows: [
      { proc: 'Check-in: entrega y verificación de daños', area: 'Mostrador', formato: 'Checklist', idiomas: ['ES', 'EN'], estado: 'Publicado', revision: '2026-05-20', responsable: 'Operaciones' },
      { proc: 'Check-out: devolución y peritaje de daños', area: 'Devolución', formato: 'Checklist', idiomas: ['ES', 'EN', 'IT', 'PT'], estado: 'Publicado', revision: '2026-05-12', responsable: 'Operaciones' },
      { proc: 'Venta de Smart Pack y extras (seguro · GPS · silla)', area: 'Upselling', formato: 'Plantilla', idiomas: ['ES', 'EN'], estado: 'Publicado', revision: '2026-05-02', responsable: 'Ventas' },
      { proc: 'Gestión de depósito y franquicia por grupo', area: 'Mostrador', formato: 'Guía', idiomas: ['ES', 'EN'], estado: 'En revisión', revision: '2026-05-28', responsable: 'Administración' },
      { proc: 'Política de combustible (Lleno-Vacío / Lleno-Lleno)', area: 'Mostrador', formato: 'Guía', idiomas: ['ES', 'EN', 'EL'], estado: 'Publicado', revision: '2026-04-22', responsable: 'Operaciones' },
      { proc: 'Protocolo de asistencia en carretera 24h', area: 'Incidencias', formato: 'Guía', idiomas: ['ES', 'EN', 'IT', 'PT', 'EL'], estado: 'Publicado', revision: '2026-04-30', responsable: 'Atención cliente' },
      { proc: 'Gestión de multas de tráfico y penalización', area: 'Incidencias', formato: 'Plantilla', idiomas: ['ES', 'EN'], estado: 'En revisión', revision: '2026-05-25', responsable: 'Administración' },
      { proc: 'Atención telefónica y gestión de reservas', area: 'Atención cliente', formato: 'Guía', idiomas: ['ES', 'EN', 'IT', 'PT'], estado: 'Publicado', revision: '2026-04-18', responsable: 'Contact Centre' },
      { proc: 'Alta de vehículo nuevo en flota', area: 'Flota', formato: 'Guía', idiomas: ['ES'], estado: 'Borrador', revision: '2026-05-30', responsable: 'Flota' },
      { proc: 'Cierre de caja y arqueo diario', area: 'Mostrador', formato: 'Checklist', idiomas: ['ES', 'EN'], estado: 'Publicado', revision: '2026-05-08', responsable: 'Administración' },
    ],
    views: [
      { id: 'gallery', label: 'Galería', icon: '▥', type: 'gallery',
        card: { emoji: '📄', pills: ['area', 'formato'] } },
      { id: 'table', label: 'Tabla', icon: '☰', type: 'table' },
    ],
  };

  /* ---------- DB 4 · Aperturas de Oficina ---------- */
  /* Evidencia: ~4 aperturas/año; Téc. PRL "gestión preventiva en obras" + CAE;
     Bienes raíces +300% de vacantes (T1 2026). */
  const aperturas = {
    id: 'aperturas',
    icon: '🗂️',
    name: 'Aperturas de Oficina',
    schema: [
      { key: 'sede', label: 'Sede', type: 'title', icon: '📍' },
      { key: 'pais', label: 'País', type: 'select' },
      { key: 'tipo', label: 'Tipo', type: 'select' },
      { key: 'fase', label: 'Fase', type: 'status' },
      { key: 'progreso', label: 'Progreso', type: 'progress' },
      { key: 'prl', label: 'PRL / CAE', type: 'status' },
      { key: 'responsable', label: 'Responsable', type: 'person' },
      { key: 'apertura', label: 'Apertura objetivo', type: 'date' },
    ],
    colors: {
      pais: { 'España': 'orange', 'Portugal': 'green', 'Italia': 'blue', 'Grecia': 'purple' },
      tipo: { 'Aeropuerto': 'blue', 'Estación AVE': 'purple', 'Urbano': 'gray', 'Costa': 'yellow' },
      fase: {
        'Prospección inmueble': 'gray', 'Negociación contrato': 'brown', 'Acondicionamiento': 'orange',
        'Licencias y permisos': 'yellow', 'Contratación equipo': 'blue', 'Soft opening': 'purple', 'Operativa': 'green'
      },
      prl: { 'Pendiente': 'gray', 'En curso': 'yellow', 'Validado': 'green' },
    },
    rows: [
      { sede: 'Estación AVE Sevilla — Santa Justa', pais: 'España', tipo: 'Estación AVE', fase: 'Licencias y permisos', progreso: 75, prl: 'En curso', responsable: 'Marta Ríos', apertura: '2026-07-15' },
      { sede: 'Málaga Aeropuerto — Terminal 3', pais: 'España', tipo: 'Aeropuerto', fase: 'Acondicionamiento', progreso: 60, prl: 'En curso', responsable: 'Javier Pons', apertura: '2026-08-01' },
      { sede: 'Oporto Aeropuerto', pais: 'Portugal', tipo: 'Aeropuerto', fase: 'Negociación contrato', progreso: 30, prl: 'Pendiente', responsable: 'Marta Ríos', apertura: '2026-10-10' },
      { sede: 'Catania — Sicilia', pais: 'Italia', tipo: 'Aeropuerto', fase: 'Contratación equipo', progreso: 85, prl: 'Validado', responsable: 'Lucía Sanz', apertura: '2026-06-30' },
      { sede: 'Heraklión — Creta', pais: 'Grecia', tipo: 'Costa', fase: 'Prospección inmueble', progreso: 15, prl: 'Pendiente', responsable: 'Javier Pons', apertura: '2026-12-01' },
      { sede: 'Valencia AVE — Joaquín Sorolla', pais: 'España', tipo: 'Estación AVE', fase: 'Operativa', progreso: 100, prl: 'Validado', responsable: 'Lucía Sanz', apertura: '2026-04-02' },
      { sede: 'Milán Malpensa — Terminal 2', pais: 'Italia', tipo: 'Aeropuerto', fase: 'Acondicionamiento', progreso: 50, prl: 'En curso', responsable: 'Marta Ríos', apertura: '2026-09-12' },
      { sede: 'Tesalónica', pais: 'Grecia', tipo: 'Urbano', fase: 'Negociación contrato', progreso: 25, prl: 'Pendiente', responsable: 'Javier Pons', apertura: '2026-11-20' },
      { sede: 'Madeira', pais: 'Portugal', tipo: 'Costa', fase: 'Soft opening', progreso: 95, prl: 'Validado', responsable: 'Lucía Sanz', apertura: '2026-06-18' },
      { sede: 'Murcia Centro', pais: 'España', tipo: 'Urbano', fase: 'Licencias y permisos', progreso: 70, prl: 'En curso', responsable: 'Marta Ríos', apertura: '2026-07-28' },
    ],
    views: [
      { id: 'board', label: 'Pipeline', icon: '▦', type: 'board',
        groupBy: 'fase',
        groupOrder: ['Prospección inmueble', 'Negociación contrato', 'Acondicionamiento', 'Licencias y permisos', 'Contratación equipo', 'Soft opening', 'Operativa'],
        card: { pills: ['pais', 'tipo'], progress: 'progreso', footL: 'responsable', footR: 'apertura' } },
      { id: 'table', label: 'Todas las sedes', icon: '☰', type: 'table' },
    ],
  };

  /* ---------- DB 5 · Incidencias de Flota ---------- */
  /* Evidencia: Téc. Mantenimiento de Flota "control de flota, taller, proveedores,
     valoración de incidencias, seguimiento de costes y tiempos"; Treasury "inventario de
     activos, proveedores talleres"; +40.000 vehículos renovados/año. */
  const incidencias = {
    id: 'incidencias',
    icon: '🚗',
    name: 'Incidencias de Flota',
    schema: [
      { key: 'inc', label: 'Incidencia', type: 'title', icon: '⚠️' },
      { key: 'sede', label: 'Sede', type: 'select' },
      { key: 'matricula', label: 'Vehículo', type: 'text' },
      { key: 'tipo', label: 'Tipo', type: 'select' },
      { key: 'prioridad', label: 'Prioridad', type: 'status' },
      { key: 'estado', label: 'Estado', type: 'status' },
      { key: 'taller', label: 'Taller / proveedor', type: 'text' },
      { key: 'coste', label: 'Coste est.', type: 'text' },
      { key: 'fecha', label: 'Fecha', type: 'date' },
    ],
    colors: {
      sede: { 'Alicante Aeropuerto': 'orange', 'Palma de Mallorca': 'yellow', 'Ibiza': 'blue', 'Málaga Aeropuerto': 'green', 'Barcelona': 'purple', 'Roma Fiumicino': 'brown' },
      tipo: { 'Daño': 'red', 'Mantenimiento': 'blue', 'Limpieza': 'green', 'Documentación': 'gray', 'Reserva': 'purple' },
      prioridad: { 'Alta': 'red', 'Media': 'yellow', 'Baja': 'gray' },
      estado: { 'Abierta': 'red', 'En curso': 'yellow', 'Resuelta': 'green' },
    },
    rows: [
      { inc: 'Rayón en parachoques tras devolución', sede: 'Alicante Aeropuerto', matricula: '7421 KRB', tipo: 'Daño', prioridad: 'Alta', estado: 'En curso', taller: 'Carrocería Levante', coste: '320 €', fecha: '2026-06-07' },
      { inc: 'Revisión 30.000 km pendiente', sede: 'Málaga Aeropuerto', matricula: '5188 LMT', tipo: 'Mantenimiento', prioridad: 'Media', estado: 'Abierta', taller: 'Taller oficial SUR', coste: '180 €', fecha: '2026-06-06' },
      { inc: 'Falta ficha técnica en guantera', sede: 'Ibiza', matricula: '9930 KPD', tipo: 'Documentación', prioridad: 'Baja', estado: 'Resuelta', taller: 'Mostrador Ibiza', coste: '0 €', fecha: '2026-06-03' },
      { inc: 'Limpieza profunda tras incidente', sede: 'Palma de Mallorca', matricula: '6712 MNR', tipo: 'Limpieza', prioridad: 'Media', estado: 'En curso', taller: 'Lavado interno', coste: '45 €', fecha: '2026-06-05' },
      { inc: 'Doble reserva mismo vehículo', sede: 'Barcelona', matricula: '3045 LZF', tipo: 'Reserva', prioridad: 'Alta', estado: 'Abierta', taller: 'Contact Centre', coste: '—', fecha: '2026-06-08' },
      { inc: 'Neumático con desgaste irregular', sede: 'Roma Fiumicino', matricula: 'GA 482 RT', tipo: 'Mantenimiento', prioridad: 'Alta', estado: 'En curso', taller: 'Gomme Roma', coste: '210 €', fecha: '2026-06-04' },
      { inc: 'Cliente reporta luz de aceite', sede: 'Málaga Aeropuerto', matricula: '5188 LMT', tipo: 'Mantenimiento', prioridad: 'Alta', estado: 'Abierta', taller: 'Taller oficial SUR', coste: '95 €', fecha: '2026-06-08' },
      { inc: 'Parabrisas con impacto leve', sede: 'Alicante Aeropuerto', matricula: '8821 KRZ', tipo: 'Daño', prioridad: 'Media', estado: 'Resuelta', taller: 'Cristalauto', coste: '130 €', fecha: '2026-06-01' },
      { inc: 'Interior con olor a tabaco', sede: 'Ibiza', matricula: '9930 KPD', tipo: 'Limpieza', prioridad: 'Baja', estado: 'Resuelta', taller: 'Lavado interno', coste: '60 €', fecha: '2026-05-31' },
      { inc: 'Contrato sin firma del 2.º conductor', sede: 'Barcelona', matricula: '3045 LZF', tipo: 'Documentación', prioridad: 'Media', estado: 'En curso', taller: 'Mostrador BCN', coste: '—', fecha: '2026-06-07' },
    ],
    views: [
      { id: 'board', label: 'Tablero', icon: '▦', type: 'board',
        groupBy: 'estado',
        groupOrder: ['Abierta', 'En curso', 'Resuelta'],
        card: { pills: ['tipo', 'prioridad'], footL: 'sede', footR: 'coste' } },
      { id: 'table', label: 'Registro', icon: '☰', type: 'table' },
    ],
  };

  const databases = { seleccion, onboarding, sops, aperturas, incidencias };

  /* ---------- Páginas (navegación) — orden narrativo: captar → formar → documentar → expandir → operar ---------- */
  const pages = [
    { id: 'home', icon: '🏠', title: 'Inicio', type: 'home' },
    { id: 'diagnostico', icon: '📋', title: 'Diagnóstico', type: 'diag' },
    { id: 'seleccion', icon: '🧲', title: 'Pipeline de Selección', type: 'db', db: 'seleccion' },
    { id: 'onboarding', icon: '👥', title: 'Onboarding de Temporada', type: 'db', db: 'onboarding' },
    { id: 'sops', icon: '📘', title: 'Biblioteca de SOPs', type: 'db', db: 'sops' },
    { id: 'aperturas', icon: '🗂️', title: 'Aperturas de Oficina', type: 'db', db: 'aperturas' },
    { id: 'incidencias', icon: '🚗', title: 'Incidencias de Flota', type: 'db', db: 'incidencias' },
  ];

  /* ---------- Meta páginas DB ---------- */
  const dbMeta = {
    seleccion: {
      cover: 'amber',
      desc: 'Un único pipeline para las vacantes activas en España, Portugal, Italia y Grecia — desde la vacante abierta hasta el alta y contrato. 7 de vuestras 16 vacantes son agentes de mostrador y check-in: el sistema que necesita un Talent Acquisition que recluta a volumen y en estacionalidad.',
      meta: [['Vacantes en pipeline', '11'], ['Países', '4'], ['Fases estándar', '6'], ['Fuente', '16 vacantes LinkedIn']],
    },
    onboarding: {
      cover: 'dark',
      desc: 'Seguimiento de la ola de incorporaciones de temporada: cada persona con su ruta de formación, mentor asignado y progreso. Soporte es el 34% de la plantilla con antigüedad media de 3 años — reducir el tiempo hasta «operativo» en plena campaña de verano vale dinero real.',
      meta: [['Incorporaciones', '10'], ['Sedes', '6'], ['Operativos+', '4'], ['Tiempo a operativo', '< 2 sem.']],
    },
    sops: {
      cover: 'dark',
      desc: 'Procedimientos operativos estándar de mostrador, devolución, flota e incidencias — versionados, multi-idioma y alineados con vuestras Condiciones Comerciales (peritaje de daños, Smart Pack, combustible, multas). La «Instrucción de Trabajo» que pide vuestra Política de Calidad ISO 9001, viva y replicable.',
      meta: [['Procedimientos', '10'], ['Áreas', '6'], ['Idiomas', '5'], ['Publicados', '7']],
    },
    aperturas: {
      cover: 'dark',
      desc: 'Pipeline único para todas las aperturas en 4 países, con su checklist, responsable, fecha objetivo y validación PRL/CAE de obra. Con ~4 aperturas al año y el pico de vacantes en Bienes Raíces (+300%), una sola fuente de verdad en lugar de gestionar cada apertura ad-hoc.',
      meta: [['Sedes en pipeline', '10'], ['Países', '4'], ['Fases estándar', '7'], ['Control PRL/CAE', 'Sí']],
    },
    incidencias: {
      cover: 'dark',
      desc: 'Registro centralizado de incidencias de flota: daños, mantenimiento, limpieza, documentación y reservas, con taller/proveedor y coste estimado. Lo que el Técnico de Mantenimiento de Flota hace hoy disperso, con prioridad, estado y coste siempre visibles sobre +40.000 vehículos.',
      meta: [['Incidencias activas', '10'], ['Abiertas', '3'], ['Prioridad alta', '4'], ['Coste/tiempo', 'Trazado']],
    },
  };

  return { pages, databases, dbMeta };
})();
