import NameForm from "@/components/NameForm";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-6">Next.js Form</h1>
          <NameForm />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-6">Angular 1 Form</h1>
          <iframe
            src="http://127.0.0.1:5500/src/index.html"
            className="w-full min-h-[300px] border rounded-lg"
            title="Angular 1 Form"
          />
        </div>
      </div>
    </main>
  );
}
