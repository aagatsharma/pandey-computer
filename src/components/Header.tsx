import NavigationBar from "./header/navigation-bar";

export default function Header() {
  return (
    <header className="w-full bg-background sticky top-0 z-50 shadow-sm">
      <NavigationBar />
    </header>
  );
}
