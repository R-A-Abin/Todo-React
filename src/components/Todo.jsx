// import React, { useState, useEffect } from "react";
// import { 
//   Box, Typography, Button, TextField, List, ListItem, IconButton 
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import axios from "axios";

// const Todo = () => {
//   const [users, setUsers] = useState([]);
//   const [nameInput, setNameInput] = useState("");
//   const [editUser, setEditUser] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/users");
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Data Not Fetched", error);
//     }
//   };

//   const handleNameChange = (e) => {
//     setNameInput(e.target.value);
//   };

//   const handleAdd = async () => {
//     if (!nameInput) {
//       alert("Please enter a task before adding!");
//       return;
//     }

//     if (editUser) {
//       try {
//         const updatedUser = { name: nameInput };
//         const response = await axios.patch(
//           `http://localhost:5000/users/${editUser.id}`,
//           updatedUser
//         );
//         setUsers(users.map((user) => (user.id === editUser.id ? response.data : user)));
//         setEditUser(null);
//         setNameInput("");
//       } catch (error) {
//         console.error("Error updating user:", error);
//         alert("Update failed!");
//       }
//     } else {
//       try {
//         const newUser = { name: nameInput };
//         const response = await axios.post("http://localhost:5000/users", newUser);
//         setUsers([...users, response.data]);
//         setNameInput("");
//       } catch (error) {
//         console.error("Error adding user:", error);
//         alert("Failed to add task!");
//       }
//     }
//   };
 
//   const handleEdit = (user) => {
//     setNameInput(user.name);
//     setEditUser(user);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/users/${id}`);
//       setUsers(users.filter((user) => user.id !== id));
//     } catch (error) {
//       console.error("Failed to delete", error);
//       alert("Failed to delete");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor:'blue',
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: "rgba(247, 234, 55, 0.9)",
//           padding: "20px",
//           borderRadius: "10px",
//           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//           width: "100%",
//           maxWidth: "500px",
//           textAlign: "center",
//         }}
//       >
//         <Typography 
//           variant="h4" 
//           sx={{ fontWeight: "bold", marginBottom: "20px", color: "#333" }}
//         >
//           Todo List
//         </Typography>
        
//         <Box sx={{ display: "flex", gap: "10px", flexDirection: { xs: "column", sm: "row" } }}>
//           <TextField
//             fullWidth
//             label="Enter Your Task"
//             variant="outlined"
//             value={nameInput}
//             onChange={handleNameChange}
//             sx={{ flex: 1 }}
//           />
//           <Button 
//             variant="contained" 
//             color={editUser ? "warning" : "primary"}
//             onClick={handleAdd}
//           >
//             {editUser ? "Update" : "Add"}
//           </Button>
//         </Box>

//         <List sx={{ marginTop: "20px" }}>
//           {users.map((user) => (
//             <ListItem
//               key={user.id}
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 backgroundColor: "#fafafa",
//                 borderRadius: "5px",
//                 padding: "10px",
//                 marginBottom: "10px",
//                 boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
//               }}
//             >
//               <Typography sx={{ color: "#333" }}>{user.name}</Typography>
//               <Box sx={{ display: "flex", gap: "5px" }}>
//                 <IconButton color="warning" onClick={() => handleEdit(user)}>
//                   <Edit />
//                 </IconButton>
//                 <IconButton color="error" onClick={() => handleDelete(user.id)}>
//                   <Delete />
//                 </IconButton>
//               </Box>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Box>
//   );
// };

// export default Todo;

import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Button, TextField, List, ListItem, 
  IconButton, Paper, Avatar, Tooltip, Divider, Slide
} from "@mui/material";
import { Edit, Delete, Add, Check, Task } from "@mui/icons-material";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const Todo = () => {
  const [users, setUsers] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Data Not Fetched", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleAdd = async () => {
    if (!nameInput.trim()) {
      alert("Please enter a valid task before adding!");
      return;
    }

    setLoading(true);
    try {
      if (editUser) {
        const updatedUser = { name: nameInput };
        const response = await axios.patch(
          `http://localhost:5000/users/${editUser.id}`,
          updatedUser
        );
        setUsers(users.map((user) => (user.id === editUser.id ? response.data : user)));
        setEditUser(null);
      } else {
        const newUser = { name: nameInput };
        const response = await axios.post("http://localhost:5000/users", newUser);
        setUsers([...users, response.data]);
      }
      setNameInput("");
    } catch (error) {
      console.error("Error:", error);
      alert(editUser ? "Update failed!" : "Failed to add task!");
    } finally {
      setLoading(false);
    }
  };
 
  const handleEdit = (user) => {
    setNameInput(user.name);
    setEditUser(user);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete", error);
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: 'linear-gradient(135deg,rgb(102, 234, 223) 0%,rgb(222, 153, 224) 100%)',
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Slide in direction="up" timeout={500}>
          <Paper
            elevation={10}
            sx={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: { xs: "15px", sm: "30px" },
              borderRadius: "16px",
              width: "100%",
              maxWidth: "600px",
              textAlign: "center",
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <Task />
              </Avatar>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: "bold", 
                  color: "primary.main",
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                Todo List
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: "flex", 
              gap: 2, 
              mb: 3,
              flexDirection: { xs: "column", sm: "row" } 
            }}>
              <TextField
                fullWidth
                label={editUser ? "Edit your task" : "Add a new task"}
                variant="outlined"
                value={nameInput}
                onChange={handleNameChange}
                onKeyPress={handleKeyPress}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, color: 'action.active' }}>
                      {editUser ? <Edit color="primary" /> : <Add color="primary" />}
                    </Box>
                  ),
                }}
              />
              <Button 
                variant="contained" 
                color={editUser ? "secondary" : "primary"}
                onClick={handleAdd}
                disabled={loading || !nameInput.trim()}
                sx={{
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 5,
                  }
                }}
                startIcon={editUser ? <Check /> : <Add />}
              >
                {editUser ? "Update" : "Add"}
              </Button>
            </Box>

            <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.1)' }} />

            {loading && users.length === 0 ? (
              <Typography sx={{ color: 'text.secondary', my: 3 }}>
                Loading your tasks...
              </Typography>
            ) : users.length === 0 ? (
              <Typography sx={{ color: 'text.secondary', my: 3 }}>
                No tasks yet. Add your first task above!
              </Typography>
            ) : (
              <List sx={{ 
                maxHeight: '400px', 
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '3px',
                }
              }}>
                {users.map((user, index) => (
                  <Slide in direction="right" timeout={(index + 1) * 100} key={user.id}>
                    <Paper
                      elevation={2}
                      sx={{
                        mb: 1.5,
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 4,
                        }
                      }}
                    >
                      <ListItem
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                        }}
                      >
                        <Typography 
                          sx={{ 
                            color: "#333",
                            fontWeight: '500',
                            flexGrow: 1,
                            textAlign: 'left',
                            textDecoration: editUser?.id === user.id ? 'underline wavy' : 'none'
                          }}
                        >
                          {user.name}
                        </Typography>
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          <Tooltip title="Edit">
                            <IconButton 
                              color="primary" 
                              onClick={() => handleEdit(user)}
                              disabled={loading}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton 
                              color="error" 
                              onClick={() => handleDelete(user.id)}
                              disabled={loading}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItem>
                    </Paper>
                  </Slide>
                ))}
              </List>
            )}
          </Paper>
        </Slide>
      </Box>
    </ThemeProvider>
  );
};

export default Todo;