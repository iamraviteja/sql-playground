import { AddTableModal } from "@/components/AddTableModal";
import { CreateTableFormProvider } from "@/hooks/useCreateTableForm";
import { DBTableListCard } from "@/components/DBTableListCard";
import { DBTableListProvider } from "@/hooks/useDBTableList";

function DBSettings() {
  return (
    <main className="p-4">
      <div className="flex justify-end items-center gap-2 py-4">
        <CreateTableFormProvider>
          <AddTableModal />
        </CreateTableFormProvider>
      </div>
      <DBTableListCard />
    </main>
  );
}

export default DBSettings;