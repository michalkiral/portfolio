import AppLayout from "@/shared/components/AppLayout";
import GameGenerator from "../components/GameGenerator";

const GameGeneratorScreen: React.FC = () => {
  return (
    <AppLayout title="Bang! Duel Generator">
      <div className="flex flex-1 items-center justify-center">
        <GameGenerator />
      </div>
    </AppLayout>
  );
};

export default GameGeneratorScreen;
