import React, { useState } from "react";

interface EditModalProps {
  editData: { category: string; value: number; field: string };
  onClose: () => void;
  onSave: (updatedValue: number) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({ editData, onClose, onSave }) => {
  const [value, setValue] = useState(editData.value);

  const handleSave = async () => {
    if (isNaN(value) || value < 0) {
      alert("Please enter a valid positive number.");
      return;
    }
    await onSave(value);
  };

  return (
    <div className="modal">
      <h3>
        Edit {editData.field} for {editData.category}
      </h3>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      />
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
