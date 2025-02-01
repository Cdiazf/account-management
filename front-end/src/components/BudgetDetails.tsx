import { useState } from "react";
import { useBudget } from "../hooks/useBudget";
import EditModal from "./EditModal";
import axiosInstance from "../axios";
import axios from "axios";

const BudgetDetails = () => {
  const { data, isLoading, error, refetch } = useBudget();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<{
    category: string;
    value: number;
    field: string;
  } | null>(null);

  const handleEdit = (category: string, field: string, value: number) => {
    setEditData({ category, value, field });
    setIsEditing(true); // Open the edit modal
  };

  const handleDelete = async (category: string) => {
    const token = sessionStorage.getItem("access_token");
    console.log("JWT Token before delete request:", token); // Log the token

    if (window.confirm(`Are you sure you want to delete ${category}?`)) {
      try {
        await axiosInstance.delete(
          `/api/expenses/${encodeURIComponent(category)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert(`${category} deleted successfully.`);
        refetch(); // Refresh the data
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Error deleting item:",
            err.response?.data || err.message
          );
          alert(
            err.response?.data?.error ||
              "Failed to delete the category. Please try again."
          );
        } else {
          console.error("Unexpected error:", err);
          alert("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  const handleSave = async (updatedValue: number) => {
    const token = sessionStorage.getItem("access_token");
    console.log("JWT Token before save request:", token); // Log the token

    if (!editData) return; // Safety check

    try {
      await axiosInstance.put(
        `/api/expenses/${editData.category}`,
        {
          [editData.field]: updatedValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Value updated successfully.");
      setIsEditing(false); // Close the modal
      refetch(); // Refresh the data
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(
          "Error updating item:",
          err.response?.data || err.message
        );
        alert(
          err.response?.data?.error ||
            "Failed to update the value. Please try again."
        );
      } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (isLoading) return <p>Loading budget data...</p>;
  if (error) return <p>Error fetching budget: {error.message}</p>;

  return (
    <div>
      <h2>Budget Details</h2>
      {/* Button to log the token */}
      {data?.details.length === 0 ? (
        <p>No budget items found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Planned</th>
              <th>Actual</th>
              <th>Difference</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.details.map((item) => {
              const difference = item.actual - item.planned;
              return (
                <tr key={item.category}>
                  <td>{item.category}</td>
                  <td>
                    ${item.planned}{" "}
                    <button
                      onClick={() =>
                        handleEdit(item.category, "planned", item.planned)
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    ${item.actual}{" "}
                    <button
                      onClick={() =>
                        handleEdit(item.category, "actual", item.actual)
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td style={{ color: difference >= 0 ? "green" : "red" }}>
                    ${difference}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item.category)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* Render EditModal if editing */}
      {isEditing && editData && (
        <EditModal
          editData={editData}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default BudgetDetails;
