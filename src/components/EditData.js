import React, { useState, useEffect } from "react";
import "../SiteStyles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { createItem, getUserPk, updateItem, getItemById } from "../Api";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../auth/AuthProvider";

//testing new methods

const EditData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth0();
  const { token } = useAuth();
  const { itemId } = location.state;

  const [formData, setFormData] = useState({
    name: "",
    category: "Game Copy",
    publisher: "",
    releaseYear: "",
    quantity: "",
    condition: "",
    pricePaid: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Category ID to label mapping
  const categoryMap = {
    1: "Game Copy",
    2: "Console",
    3: "Peripheral"
  };

  // Fetch item data on mount
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const getUserRes = await getUserPk(user.sub.split("|")[1]);
        let data = await getUserRes.json();
        const userPk = data.UserPK;
        const itemIdentifiers = {
          "pk": itemId,
          "userid": userPk
        }

        console.log("Item identifiers:", itemIdentifiers);
        const getItemRes = await getItemById(itemIdentifiers);
        data = await getItemRes.json();
        console.log("Fetched item data:", data);

        setFormData({
          name: data.name || "",
          category: categoryMap[data.category] || "Game Copy",
          publisher: data.pubmanu || "",
          releaseYear: data.year?.toString() || "",
          quantity: data.quantity?.toString() || "",
          condition: data.condition || "",
          pricePaid: data.price?.toString() || ""
        });
      } catch (err) {
        console.error("Failed to fetch item data:", err);
        setError("Unable to load item data.");
      }
    };

    fetchItemData();
  }, [itemId, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const userId = user.sub.split("|")[1];
      const getUserRes = await getUserPk(userId);
      const data = await getUserRes.json();
      const userPk = data.UserPK;

      const itemData = {
        name: formData.name,
        category: formData.category === "Game Copy" ? 1 : formData.category === "Console" ? 2 : 3,
        pubmanu: formData.publisher,
        year: parseInt(formData.releaseYear),
        quantity: parseInt(formData.quantity),
        condition: formData.condition,
        price: parseFloat(formData.pricePaid),
        userid: userPk 
      };
      //heard
      //i have an itemId fill up top do you need that?
      
      await updateItem(itemId, itemData); 

      navigate("/databasedisplay", {
        state: {
          consoleName: location.state?.consoleName || "Console",
          success: "Item updated successfully!"
        }
      });
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Failed to update item, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper">
      <h2>Update Item</h2>

      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Game Copy">Game Copy</option>
            <option value="Console">Console</option>
            <option value="Peripheral">Peripheral/controller</option>
          </select>
        </div>

        <div>
          <label htmlFor="publisher">Publisher:</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="releaseYear">Release year:</label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            placeholder="Release Year"
            value={formData.releaseYear}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
         <label htmlFor="condition">Condition:</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
           >
            <option value="">-- Select Condition --</option>
            <option value="digital">Digital</option>
            <option value="new">New</option>
            <option value="like_new">Like New</option>
            <option value="used">Used</option>
            <option value="heavily_used">Heavily Used</option>
          </select>
        </div>

        <div>
          <label htmlFor="pricePaid">Price Paid:$</label>
          <input
            type="number"
            id="pricePaid"
            name="pricePaid"
            placeholder="Price Paid"
            value={formData.pricePaid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value={isSubmitting ? "Submitting..." : "Update"}
            disabled={isSubmitting}
          />
        </div>
      </form>
      
      <button onClick={() => navigate("/databasedisplay")} style={{ cursor: "pointer" }}>
               Return
            </button>
     
    </div>
    
  );
};

export default EditData;

