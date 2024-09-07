export default function page({ params }: { params: { name: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="font-bold">Project {params.name}</p>
    </main>
  );
}
