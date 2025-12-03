import TopBar from "./header/top-bar";
import NavigationBar from "./header/navigation-bar";

export default function Header() {
  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <TopBar />
      <NavigationBar />
    </header>
  );
}
