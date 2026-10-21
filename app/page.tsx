import { THEMES } from "@/lib/themes";
import { loadMeta, getVariableSeries } from "@/lib/data";
import { Viewer } from "@/components/viewer";

export default async function Home() {
  const meta = await loadMeta();

  // Initial theme/variable and its compact series. Only this one variable's
  // series is shipped to the client initially; switching theme/variable loads
  // the next series via a server action. The 15MB dataset stays on the server.
  const initialThemeId = THEMES[0].id;
  const initialVariable = THEMES[0].variables[0];
  const initialSeries = await getVariableSeries(initialVariable);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Visor DPI2020</h1>
        <p className="mt-2 max-w-3xl text-base text-gray-600 dark:text-gray-300">
          Explora y compara los sistemas políticos de {meta.countryCount} países
          con la Base de Datos de Instituciones Políticas 2020 (Database of
          Political Institutions). Filtra por país y región, navega por temas y
          consulta las definiciones de cada variable. Datos de {meta.minYear} a{" "}
          {meta.maxYear}.
        </p>
      </header>

      <Viewer
        allCountries={meta.countries}
        minYear={meta.minYear}
        maxYear={meta.maxYear}
        initialThemeId={initialThemeId}
        initialVariable={initialVariable}
        initialSeries={initialSeries}
      />
    </main>
  );
}
