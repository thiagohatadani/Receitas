import { useState } from "react";
import Modal from "./Modal";
import RecipeForm from "./RecipeForm";

export function AddRecipeButton({ onRecipeAdded }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-amber-100">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition ml-4"
      >
        Adicionar Receita
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeForm
          onRecipeAdded={() => {
            setIsModalOpen(false);
            onRecipeAdded();
          }}
        />
      </Modal>
    </div>
  );
}
