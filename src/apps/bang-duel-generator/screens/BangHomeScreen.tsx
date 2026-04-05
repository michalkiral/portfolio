import AppLayout from "@/shared/components/AppLayout";
import logo from "../assets/logo.jpeg";
import CreateGame from "../components/CreateGame";

const BangHomeScreen: React.FC = () => {
  return (
    <AppLayout title="Bang! Duel Generator">
      <CreateGame img={logo} />
    </AppLayout>
  );
};

export default BangHomeScreen;
