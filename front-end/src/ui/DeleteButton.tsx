
const DeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  return <button onClick={onDelete}>Delete</button>;
};

export default DeleteButton;
