import React, { useState, useEffect } from "react";
import "../SiteStyles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getItems, deleteItem } from "../Api";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../auth/AuthProvider";

const DatabaseDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth0();
  const { token, tokenLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    if (location.state && location.state.success) {
      setSuccessMessage(location.state.success);
      
      fetchItems();
      
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  const fetchItems = async () => {
    if (tokenLoading || !user) {
      return;
    }
    
    try {
      setLoading(true);
      const data = await getItems(user.sub, token);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to load items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [user, token, tokenLoading]);

const handleSort = (field) => {
  if(field === sortField){
    setSortDirection(sortDirection==="asc" ? "desc" : "asc");
  } else {
    setSortField(field);
    setSortDirection("asc");
  }
}

const sortedItems = [...items].sort((a,b) => {
  if(typeof a[sortField] ==='string'){
    const compare = a[sortField].localeCompare(b[sortField]);
    return sortDirection ==="asc" ? compare : -compare;
  }else{
    const compare = a[sortField] -b[sortField];
    return sortDirection ==="asc" ? compare : -compare;
  }
});


  
  const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(itemId, token);
        setItems(items.filter(item => item.itemID !== itemId));
        setSuccessMessage("Item deleted successfully!");
      } catch (error) {
        console.error("Error deleting item:", error);
        setError("Failed to delete item. Please try again.");
      }
    }
  };
  
  const handleEditItem = (itemId) => {
    navigate("/editdata", { state: { itemId } });
  };

  const sortIndicator = (field) => {
    if(sortField === field){
      return sortDirection === "asc" ? "^" : "v";
    }
    return"";
  };

  return (
    <div className="wrapper">
      <h2>Welcome to the database!</h2>

      <p>You can add, edit, remove, and search for any item that you want!</p>
      
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
<div style = {{display: "flex",gap: "10px",marginBottom: "15px"}}>
      <button onClick={() => navigate("/adddata", { state: { userId: user?.sub} })}>
        Add a new element
      </button>
      <button onClick={fetchItems}>
        Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <table>
          <caption> Database</caption>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")} style={{ cursor: "pointer"}}> Name {sortIndicator("name")}
              </th>
              <th onClick={() => handleSort("category")} style={{ cursor: "pointer"}}> Category {sortIndicator("category")}
              </th>
              <th onClick={() => handleSort("pubmanu")} style={{ cursor: "pointer"}}> Publisher/Manufacturer {sortIndicator("pubmanu")}
              </th>
              <th onClick={() => handleSort("year")} style={{ cursor: "pointer"}}> Year {sortIndicator("year")}
              </th>
              <th onClick={() => handleSort("quantity")} style={{ cursor: "pointer"}}> Quantity {sortIndicator("quantity")}
              </th>
              <th onClick={() => handleSort("condition")} style={{ cursor: "pointer"}}> Condition {sortIndicator("condition")}
              </th>
              <th onClick={() => handleSort("price")} style={{ cursor: "pointer"}}> Price Paid {sortIndicator("price")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.length > 0 ? (
              sortedItems.map(item => (
                <tr key={item.itemID}>
                  <td>{item.name}</td>
                  <td>
                    {item.category === 1 
                      ? "Game Copy" 
                      : item.category === 2 
                        ? "Console" 
                        : "Peripheral"}
                  </td>
                  <td>{item.pubmanu}</td>
                  <td>{item.year}</td>
                  <td>{item.quantity}</td>
                  <td>{item.condition}</td>
                  <td>${item.price}</td>
                  <td>
                    <button 
                      onClick={() => handleEditItem(item.itemID)}
                      style={{ padding: "5px 10px", margin: "0 5px" }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.itemID)}
                      style={{ 
                        padding: "5px 10px", 
                        margin: "0 5px",
                        backgroundColor: "#ff4d4d" 
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No items found. Add one to get started!</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DatabaseDisplay;