import React, { useState, useEffect, useRef } from "react";
import "../SiteStyles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getItems, deleteItem } from "../Api";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../auth/AuthProvider";
import { createUser, getUserPk,createUserBackend,retrieveUserPk } from "../Api"; // Import your createUser function

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

  var userPK;
  var defaultItemQuery = {
    name: "",
    category: -1,
    pubmanu: "",
    year: -1,
    quantity: -1,
    condition: "",
    price: -1,
    userid: userPK,
  };

  // const retrieveUserPk = async () => {
  //   let _userId = user.sub.split("|")[1];

  //   console.log("Attempting to retrieve user PK for ID:", _userId);
  //   let res = await getUserPk(_userId);
  //   if (res.status === 404) {
  //     console.log("User not found, creating new user...");
  //     const userInfo = {
  //       "first_name": user.given_name,
  //       "last_name": user.family_name,
  //       "email": user.email,
  //       "username": user.nickname,
  //       "userid": _userId,
  //     }

  //     res = await createUserBackend(userInfo);
  //     if (res.status === 201) {
  //       console.log("User created successfully");
  //     } else {
  //       console.error("Error creating user:", res);
  //     }

  //     console.log("User created with ID:", res.data.UserPK);
  //     res = await getUserPk(_userId);
  //     if (res.status !== 200) {
  //       console.error("Error retrieving user:", res);
  //     }
  //   }

  //   console.log("User PK retrieved:", res.data.UserPK);
  //   userPK = res.data.UserPK;
  // };

  // useEffect(() => {
  //   retrieveUserPk();
  // }, []);
  

 /* const saveUserToDatabase = async (userData) => {
    try {
      // Format user data according to your required structure
      const formattedUserData = {
        first_name: userData.given_name || userData.name?.split(' ')[0] || '',
        last_name: userData.family_name || userData.name?.split(' ').slice(1).join(' ') || '',
        email: userData.email,
        username: userData.nickname || userData.email.split('@')[0],
        userid: userData.sub // This is Auth0's unique identifier
      };

      // Call your existing createUser function
      const response = await createUser(formattedUserData);
      console.log('User data saved successfully:', response);
      return response;
    } catch (error) {
      console.error('Error saving user data:', error);
      // setLoginError('Failed to create user profile. Please try again.');
      throw error;
    }
  };
*/


    


  useEffect(() => {
    if (location.state && location.state.success) {
      setSuccessMessage(location.state.success);
      
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  const hasFetchedItems = useRef(false);

  const fetchItems = async () => {
    if (tokenLoading || !user) {
      return;
    }
    
    try {
      setLoading(true);
      let userId = user.sub.split("|")[1];
      let getUserRes = await getUserPk(userId);
      console.log("user: ", user);
      if (getUserRes.status == 404) {
        const newUserData = {
          email: user.email,
          username: user.nickname,
          userid: userId,
        }
        console.log("User not found, creating new user with: ", newUserData);
        let createUserRes = await createUserBackend(newUserData);
        if (createUserRes.status == 201) {
          console.log("User created successfully");
        } else {
          console.error("Error creating user:", data);
        }
        getUserRes = await getUserPk(userId);
        if (getUserRes.status != 200) {
          console.error("Error retrieving user:", data);
        }
      }
      let data = await getUserRes.json()
      userPK = data.UserPK;
      console.log("User PK retrieved:", userPK);
      defaultItemQuery.userid = userPK;
      console.log("Retrieving items with json:", defaultItemQuery);
      let getItemsRes = await getItems(defaultItemQuery);
      data = await getItemsRes.json();
      await setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to load items. Please try again.");
    } finally {
      setLoading(false);
    }
    console.log("Items fetched:", items);
  };

  // Updated useEffect to prevent duplicate calls.
  useEffect(() => {
    console.log("useEffect triggered with:", { user, token, tokenLoading });
    
    // If we're still loading the token or we don't have a user, do nothing.
    if (tokenLoading || !user) return;
    
    // If we've already fetched items, don't fetch again.
    if (hasFetchedItems.current) return;
    
    // Mark as fetched to prevent duplicate calls.
    hasFetchedItems.current = true;
    console.log("Calling fetchItems");
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
        setItems(items.filter(item => item.id !== itemId));
        setSuccessMessage("Item deleted successfully!");
      } catch (error) {
        console.error("Error deleting item:", error);
        setError("Failed to delete item. Please try again.");
      }
    }
  };
  
  const handleEditItem = (itemId) => {
    navigate("/editData", { state: { itemId } });
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
                      onClick={() => handleEditItem(item.id)}
                      style={{ padding: "5px 10px", margin: "0 5px" }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
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