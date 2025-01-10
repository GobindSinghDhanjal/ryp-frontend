// import React, { useState, useEffect, useRef } from "react";
// import { styled } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
// import Typography from "@mui/material/Typography";
// import Link from "next/link";
// import { Divider } from "@mui/material";
// import { useRouter } from "next/navigation";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: "whitesmoke",
//   marginLeft: 0,
//   width: "100%",
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   color: "black",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "black",
//   width: "100%",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

// const SearchResults = styled("div")(({ theme }) => ({
//   position: "absolute",
//   top: "calc(100% + 4px)",
//   left: 0,
//   zIndex: 999,
//   width: "100%",
//   backgroundColor: "#f0f0f0",
//   borderRadius: theme.shape.borderRadius,
//   boxShadow: theme.shadows[1],
//   padding: theme.spacing(1),
// }));

// export default function SearchBox2() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [isSearchOpen, setIsSearchOpen] = useState(false); // New state to track if search is open
//   const inputRef = useRef(null);

//   const handleSearchClick = () => {
//     setIsSearchOpen(true);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (inputRef.current && !inputRef.current.contains(event.target)) {
//         setIsSearchOpen(false); // Close search when clicked outside
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSearchChange = async (event) => {
//     const term = event.target.value;
//     setSearchTerm(term);

//     // If the search term is not empty, set isSearchOpen to true
//     setIsSearchOpen(term !== "");

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch professors");
//       }
//       const data = await response.json();
//       // Filter the results based on the search term
//       const filteredResults = data.filter((professor) =>
//         professor.name.toLowerCase().includes(term.toLowerCase())
//       );
//       const limitedResults = filteredResults.slice(0, 4); // Limit results to maximum of 4 entries
//       const searchList = limitedResults.length
//         ? limitedResults
//         : ["Didn't find"];
//       setSearchResults(searchList);
//     } catch (error) {
//       console.error("Error fetching professors:", error);
//       setSearchResults(["Didn't find"]); // Set search results to "Didn't find" in case of error or empty list
//     }
//   };

//   const handleResultClick = (result) => {
//     setSearchTerm(result.name);
//     window.location.href = `/professor?search=${encodeURIComponent(
//       result._id
//     )}`;
//   };

//   const router = useRouter();

//   const search = () => {
//     router.push(`/searchprofessors?search=${encodeURIComponent(searchTerm)}`);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "ArrowUp") {
//       event.preventDefault();
//       setSelectedIndex((prevIndex) =>
//         prevIndex === -1 ? searchResults.length - 1 : prevIndex - 1
//       );
//     } else if (event.key === "ArrowDown") {
//       event.preventDefault();
//       setSelectedIndex((prevIndex) =>
//         prevIndex === searchResults.length - 1 ? -1 : prevIndex + 1
//       );
//     } else if (event.key === "Enter" && selectedIndex !== -1) {
//       handleResultClick(searchResults[selectedIndex]);
//     } else if (event.key === "Enter") {
//       search();
//     }
//   };

//   return (
//     <div className="search-box">
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar className="app-bar" position="static">
//           <Toolbar>
//             <Search ref={inputRef}>
//               <SearchIconWrapper>
//                 <SearchIcon />
//               </SearchIconWrapper>
//               <StyledInputBase
//                 placeholder="Search…"
//                 inputProps={{ "aria-label": "search" }}
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 onFocus={handleSearchClick} // Open search when input is focused
//                 onKeyDown={handleKeyDown}
//               />
//               {isSearchOpen && searchResults.length > 0 && (
//                 <SearchResults>
//                   {searchResults.map(
//                     (result, index) =>
//                       result.college && (
//                         <div
//                           key={index}
//                           onClick={() => handleResultClick(result)}
//                           style={{
//                             cursor: "pointer",
//                             padding: "5px",
//                             backgroundColor:
//                               index === selectedIndex
//                                 ? "lightblue"
//                                 : "transparent",
//                           }}
//                         >
//                           <Typography
//                             variant="body1"
//                             sx={{ color: "black" }}
//                             style={{
//                               fontWeight:
//                                 index === selectedIndex ? "bold" : "normal",
//                             }}
//                           >
//                             {result.name}
//                           </Typography>
//                           <Typography
//                             variant="body2"
//                             sx={{ fontSize: 12, color: "grey" }}
//                           >
//                             {result.college.name},{" "}
//                             {result.college.university.name}
//                           </Typography>
//                           <Divider sx={{ mt: 1, mb: 0 }} />
//                         </div>
//                       )
//                   )}
//                   <Link href="/addprofessor">
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         cursor: "pointer",
//                         color: "blue",
//                         textAlign: "center",
//                         marginTop: "10px",
//                         fontSize: 12,
//                       }}
//                     >
//                       Didn't find your professor? <br /> Add Now
//                     </Typography>
//                   </Link>
//                 </SearchResults>
//               )}
//             </Search>
//           </Toolbar>
//         </AppBar>
//       </Box>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "whitesmoke",
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchResults = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  zIndex: 999,
  width: "100%",
  backgroundColor: "#f0f0f0",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1),
}));

export default function SearchBox2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setIsSearchOpen(term !== "");

    try {
      // const response = await fetch(`/api/professors/search/${encodeURIComponent(term)}`);

      // if (!response.ok) {
      //   throw new Error("Failed to fetch professors");
      // }

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_NEXT_BASE_URL
        }/professors/search/${encodeURIComponent(term)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch professors");
      }

      const data = await response.json();

      // Handle case where no results found
      const searchList = data.length ? data : ["Didn't find"];

      setSearchResults(searchList);
    } catch (error) {
      console.error("Error fetching professors:", error);
      setSearchResults(["Didn't find"]);
    }
  };

  const handleResultClick = (result) => {
    setSearchTerm(result.name);
    window.location.href = `/professor?search=${encodeURIComponent(
      result._id
    )}`;
  };

  const router = useRouter();

  const search = () => {
    router.push(`/searchprofessors?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === -1 ? searchResults.length - 1 : prevIndex - 1
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === searchResults.length - 1 ? -1 : prevIndex + 1
      );
    } else if (event.key === "Enter" && selectedIndex !== -1) {
      handleResultClick(searchResults[selectedIndex]);
    } else if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="search-box">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="app-bar" position="static">
          <Toolbar>
            <Search ref={inputRef}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchClick}
                onKeyDown={handleKeyDown}
              />
              {isSearchOpen && searchResults.length > 0 && (
                <SearchResults>
                  {searchResults.map(
                    (result, index) =>
                      result.college && (
                        <div
                          key={index}
                          onClick={() => handleResultClick(result)}
                          style={{
                            cursor: "pointer",
                            padding: "5px",
                            backgroundColor:
                              index === selectedIndex
                                ? "lightblue"
                                : "transparent",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ color: "black" }}
                            style={{
                              fontWeight:
                                index === selectedIndex ? "bold" : "normal",
                            }}
                          >
                            {result.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: 12, color: "grey" }}
                          >
                            {result.college.name},{" "}
                            {result.college.university.name}
                          </Typography>
                          <Divider sx={{ mt: 1, mb: 0 }} />
                        </div>
                      )
                  )}
                  <Link href="/addprofessor">
                    <Typography
                      variant="body1"
                      sx={{
                        cursor: "pointer",
                        color: "blue",
                        textAlign: "center",
                        marginTop: "10px",
                        fontSize: 12,
                      }}
                    >
                      Didn't find your professor? <br /> Add Now
                    </Typography>
                  </Link>
                </SearchResults>
              )}
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
