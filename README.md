# Job Log — Extensión de Chrome para Registro Automático de Empleos

**Job Log** es una extensión ligera de código abierto para navegadores basados en Chromium (Chrome, Brave, Edge, Opera) diseñada para automatizar y organizar el seguimiento de tus postulaciones de empleo en LinkedIn directamente en una hoja de cálculo personal de Google Sheets, utilizando la API oficial de Google Gemini para extraer y estructurar la información localmente.

---

## Requisitos Previos (Paso 0)

Antes de instalar la extensión, necesitas preparar tu hoja de cálculo. He creado una plantilla optimizada que contiene las columnas y pestañas requeridas:

1. Accede al siguiente enlace: [Plantilla de Google Sheets - Job Log](https://docs.google.com/spreadsheets/d/1pmP8vlTjwJwgYJL89mQZGuCMvN2pDb6_9oSI4HjAvPo/template/preview).
2. Haz clic en el botón azul **"Utilizar plantilla"** (en la esquina superior derecha). Esto creará una copia limpia y privada directamente en tu Google Drive.
3. Copia la **URL completa** de tu nueva hoja de cálculo desde la barra de direcciones del navegador. La necesitarás para la configuración.

---

## Instalación de la Extensión (Paso 1)

Dado que es una herramienta de uso interno/personal y 100% auditable, se instala directamente en modo desarrollador:

1. **Descarga el código:**
   * Si usas Git, clona este repositorio:
     ```bash
     git clone https://github.com/[TU-USUARIO]/job-log.git
     ```
   * Si no usas Git, haz clic en el botón verde **Code -> Download ZIP** en la parte superior de esta página y extrae el archivo en una carpeta de tu computadora.

2. **Carga la extensión en tu navegador:**
   * Abre tu navegador y accede a la sección de extensiones según el que utilices:
     * **Chrome:** `chrome://extensions/`
     * **Brave:** `brave://extensions/`
     * **Edge:** `edge://extensions/`
   * Activa el interruptor **"Modo de desarrollador"** (Developer mode) situado en la parte superior derecha.
   * Haz clic en el botón **"Cargar descomprimida"** (Load unpacked) en la esquina superior izquierda.
   * Selecciona la carpeta raíz del proyecto (la carpeta que contiene el archivo `manifest.json`).

   ![Paso 1: Cargar extensión descomprimida](./docs/assets/01-load-unpacked.png)

---

## Configuración (Paso 2)

### Paso 2.1: Obtener tu Gemini API Key gratuita
Para extraer la información de LinkedIn automáticamente, la extensión necesita una clave de API (API Key) local y gratuita:

1. Entra al sitio oficial de [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Inicia sesión con tu cuenta de Google (Gmail o Workspace).
3. En la esquina superior izquierda, haz clic en el botón azul **"Get API key"** (Obtener clave de API).
4. Selecciona **"Create API key"** (Crear clave de API) y luego elige la opción **"Create API key in new project"** (Crear clave de API en un proyecto nuevo).
5. Copia la clave de API generada (es una serie larga de letras y números). *Recuerda no compartirla con nadie, es de uso exclusivo y privado para tu extensión.*

![Paso 2.1: Obtener API Key en Google AI Studio](./docs/assets/02-1-get-api-key.png)

### Paso 2.2: Configurar la Extensión
Una vez que tengas tu clave de API y la URL de tu hoja de cálculo, agrégalas a la extensión:

1. Haz clic en el icono de la extensión en la barra de herramientas de tu navegador y presiona el botón **Configuración** (o haz clic derecho sobre el icono -> **Opciones**).
2. Completa los dos campos del formulario:
   * **Gemini API Key:** Pega la clave larga que copiaste en el Paso 2.1.
   * **URL de Google Sheets:** Pega la URL completa de la hoja de cálculo que copiaste en el Paso 0.
3. Haz clic en el botón **Guardar configuración**. La extensión validará las credenciales y quedará lista para usar.

![Paso 2: Panel de configuración de credenciales](./docs/assets/02-configuration.png)

---

## Modo de Uso (Paso 3)

Registrar una postulación es sumamente rápido:

1. Navega a cualquier oferta de empleo en **LinkedIn**.
2. Haz clic en el icono de la extensión **Job Log**.
3. La inteligencia artificial extraerá y rellenará automáticamente los campos del puesto (Empresa, Título del cargo, Enlace directo y Origen).
4. Revisa los datos, selecciona el estado de tu postulación (ej. *Postulado*, *En Proceso*, *CV Enviado*) y haz clic en **Registrar postulación**.
5. Los datos se añadirán instantáneamente como una nueva fila en tu hoja de cálculo privada.

![Paso 3: Extensión en acción y guardado de datos](./docs/assets/03-usage-demo.png)

---

## Privacidad y Transparencia Técnica

Al ser una herramienta que interactúa con tu Google Drive, es fundamental garantizar la seguridad de tus datos:

### 1. ¿Por qué Google advierte que la extensión requiere "ver, editar, crear y borrar todas tus hojas de cálculo"?
* **Limitación de la API de Google:** Google Sheets API no provee un permiso granular para interactuar únicamente con "un archivo seleccionado". El permiso mínimo para permitir que la extensión añada filas a tu hoja de cálculo requiere el alcance (scope) general `https://www.googleapis.com/auth/spreadsheets`.
* **Seguridad en el Código:** El acceso está estrictamente limitado a nivel local. Puedes auditar el archivo [`popup.js`](./popup.js) (funciones de Google API) para verificar que la extensión solo realiza consultas al **ID específico de la hoja de cálculo que tú configuraste** y jamás interactúa con ningún otro archivo de tu cuenta.

### 2. Arquitectura Local (Sin servidores intermediarios)
* **100% Serveless:** Esta extensión corre en su totalidad en tu propio navegador. No cuenta con servidores intermedios, bases de datos externas ni sistemas de analíticas.
* **Flujo directo:** La información viaja encriptada y directa: **LinkedIn -> API de Google Gemini (para extracción) -> API de Google Sheets (tu cuenta)**. Ningún dato personal, cookie o credencial sale de tu entorno local.

### 3. Código Abierto y Auditable
Puedes verificar e inspeccionar la lógica de la extensión abriendo los archivos principales:
* [`manifest.json`](./manifest.json) — Define los permisos requeridos (únicamente `activeTab`, `storage`, `identity` y `scripting`).
* [`popup.js`](./popup.js) — Contiene la lógica de extracción con Gemini y guardado directo en Google Sheets.
* [`options.js`](./options.js) — Gestiona el guardado seguro de tus credenciales de forma local en tu navegador.
