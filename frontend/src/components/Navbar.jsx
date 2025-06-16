export default function Navbar() {
    return (
      <nav className="bg-red-900 text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="text-xl font-bold">Catálogo de Receitas</div>
        <div className="space-x-4">
          <button className="hover:underline text-white">Início</button>
          <button className="hover:underline text-white">Adicionar Receita</button>
        </div>
      </nav>
    );
  }
  