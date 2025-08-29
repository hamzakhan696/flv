export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/health`,
    { cache: "no-store" }
  );
  const json = await res.json();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">FLV Foundations</h1>
      <ul className="space-y-1">
        <li>
          DB:{" "}
          <b className={json.db ? "text-green-600" : "text-red-600"}>
            {String(json.db)}
          </b>
        </li>
        <li>
          Redis:{" "}
          <b className={json.redis ? "text-green-600" : "text-red-600"}>
            {String(json.redis)}
          </b>
        </li>
        <li>
          Queue:{" "}
          <b className={json.queue ? "text-green-600" : "text-red-600"}>
            {String(json.queue)}
          </b>
        </li>
      </ul>
    </main>
  );
}
