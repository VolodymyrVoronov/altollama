import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsLocal from "./SettingsLocal";

const Settings = () => {
  return (
    <aside>
      <Tabs defaultValue="ollama-local" className="w-full">
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
