import { readFile } from "node:fs/promises";
import { join } from "node:path";

type Meta = {
  recordCount: number;
  countryCount: number;
  countries: string[];
  minYear: number;
  maxYear: number;
};

async function loadMeta(): Promise<Meta> {
  "use cache";
  const metaPath = join(process.cwd(), "data", "meta.generated.json");
  const raw = await readFile(metaPath, "utf8");
  return JSON.parse(raw) as Meta;
}

export default async function Home() {
  const meta = await loadMeta();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Visor DPI2020</h1>
      <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
        Visor de la Base de Datos de Instituciones Políticas 2020 (Database of
        Political Institutions). Explora y compara los sistemas políticos de los
        países del mundo.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <dt className="text-sm text-gray-500">Países</dt>
          <dd className="mt-1 text-2xl font-semibold">{meta.countryCount}</dd>
        </div>
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <dt className="text-sm text-gray-500">Registros</dt>
          <dd className="mt-1 text-2xl font-semibold">{meta.recordCount}</dd>
        </div>
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <dt className="text-sm text-gray-500">Periodo</dt>
          <dd className="mt-1 text-2xl font-semibold">
            {meta.minYear}–{meta.maxYear}
          </dd>
        </div>
      </dl>

      <p className="mt-8 text-sm text-gray-500">
        La base de datos contiene {meta.countryCount} países. Las siguientes
        funcionalidades (filtros por país y región, temas, gráficos y
        definiciones de variables) se añadirán en las próximas iteraciones.
      </p>
    </main>
  );
}
