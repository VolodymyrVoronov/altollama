import { useAtomValue, useSetAtom } from "jotai";

import { selectedOllamaTypeAtom } from "@/stores/app";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsLocal from "./SettingsLocal";

const Settings = () => {
  const selectedOllamaTypeTab = useAtomValue(selectedOllamaTypeAtom);
  const setOllamaTypeTab = useSetAtom(selectedOllamaTypeAtom);

  const onTabChange = (tab: string) => {
    setOllamaTypeTab(tab);
  };

  return (
    <aside>
      <Tabs
        value={selectedOllamaTypeTab}
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="w-full">
          <TabsTrigger value="ollama-local">Ollama Local</TabsTrigger>
          <TabsTrigger value="ollama-cloud">Ollama Cloud</TabsTrigger>
        </TabsList>

        <TabsContent value="ollama-local">
          <SettingsLocal />
        </TabsContent>

        <TabsContent value="ollama-cloud">
          Change your password here.
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default Settings;
