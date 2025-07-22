export const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Aviasales</h1>
      <nav>
        <ul className="flex gap-4">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
        </ul>
      </nav>
    </header>
  );
};