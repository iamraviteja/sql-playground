import { prisma } from "@repo/database";
import QueryOutputPanel from "@/components/QueryOutputPanel";

export default async function IndexPage() {
  const users = await prisma.user.findMany();

  return (
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="relative hidden flex-col items-start gap-8 md:flex">
        <div className="grid w-full items-start gap-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
      </div>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <QueryOutputPanel />
      </div>
    </main>
  );
}
