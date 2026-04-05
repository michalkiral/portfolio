import AppLayout from "@/shared/components/AppLayout";
import GameGenerator from "../components/GameGenerator";

const GameGeneratorScreen: React.FC = () => {
  return (
    <AppLayout title="Bang! Duel Generator">
      <div className="flex h-full items-center justify-center p-6">
        <GameGenerator />
      </div>
    </AppLayout>
  );
};

export default GameGeneratorScreen;
