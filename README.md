# Explorador educativo DPI2020 — Valentina Vargas Ospina

Primera versión del visor, sin chatbot. Usa el Excel original del repositorio. No requiere claves de IA.

## Funciones
Selección de uno, varios o todos los nombres originales; periodo; agrupación temática propuesta; 129 variables; tabla paginada; cobertura completa; series numéricas para variables compatibles y hasta 12 entidades; listado de cambios entre años consecutivos; CSV de todos los registros filtrados. No se imputan ni unen entidades históricas.

## Desplegar desde el navegador en Vercel
1. Entra en tu propia cuenta de Vercel.
2. Elige Add New → Project e importa `ValenVargasOspina/base-de-datos-sistemas-politicos`.
3. Si esta versión permanece en una rama de revisión, selecciónala como rama del despliegue. No publiques main sin incorporar antes el código del visor.
4. Framework Preset: Other. Root Directory: raíz del repositorio.
5. Build Command: `npm run build`. Output Directory: `public`. El proyecto no tiene dependencias de Node.
6. No agregues variables de entorno: esta versión no tiene chatbot ni claves de servicios.
7. Revisa la cuenta o equipo de destino y despliega. Verifica el enlace resultante antes de compartirlo.

## Comprobaciones ejecutadas
`node --check public/app.js` y `npm run build`.
La extracción Python comprueba igualdad de todas las celdas con el JSON. Se contrastan las seis coberturas del §10 del documento de alcance. La fecha Excel de `year` se convierte a año entero. Los demás valores se preservan sin redondeo ni imputación.

## Regenerar datos
Con Python y openpyxl disponibles: `python scripts/prepare.py`. Conserva el Excel original. La exportación CSV redondeada previamente identificada no es fuente de análisis.

## Pendientes antes de usar con estudiantes
- Prueba visual y funcional en navegador del despliegue.
- Fichas verificadas en español, unidades y códigos de las 129 variables; actualmente se conserva la descripción breve en inglés y se enlaza el manual aportado.
- Resolver gwno, tensys_strict, oppothvt, termlimit y multpl. Sus valores originales se muestran sin interpretación.
- Revisar agrupación temática y usos pedagógicos.
- Los cambios detectados no equivalen a hitos históricos. No se incluyen hitos ni fuentes nuevas posteriores a 2020.
- Confirmar licencia, condiciones de redistribución y revisión institucional antes de difusión académica.

## Fuente
Cruz, Keefer y Scartascini (2021), Database of Political Institutions 2020, BID. DOI https://doi.org/10.18235/0003049. Herramienta educativa sin afiliación con el BID. No se presenta como herramienta institucional autorizada de EAFIT.
