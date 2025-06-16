export function Stats({ count }) {
  return (
    <div className="bg-amber-100">
      <div className="text-gray-700 pb-6 ml-4 pt-2">
      Total de receitas: <strong>{count}</strong>
    </div>
    </div>
  );
}
