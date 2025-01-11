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

// Styled components
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
  const [professors, setProfessors] = useState([]); // Store all professors data here
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const router = useRouter();

  // Fetch all professors once when the component is mounted
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch professors");
        }
        const data = await response.json();
        setProfessors(data); // Store all professors' data
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    fetchProfessors();
  }, []); // This runs once when the component is mounted

  // Handle search input change with debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm !== "") {
        const filteredResults = professors.filter((professor) =>
          professor.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const limitedResults = filteredResults.slice(0, 4);
        setSearchResults(
          limitedResults.length ? limitedResults : ["Didn't find"]
        );
      } else {
        setSearchResults([]); // Clear search results when input is empty
      }
    }, 300); // Debounce delay of 300ms

    return () => clearTimeout(debounceTimer); // Cleanup the timeout on each render
  }, [searchTerm, professors]); // Re-run when searchTerm or professors change

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsSearchOpen(false); // Close search when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // This will run once when the component mounts

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsSearchOpen(event.target.value !== ""); // Open search results when there's a query
  };

  const handleResultClick = (result) => {
    setSearchTerm(result.name);
    window.location.href = `/professor?search=${encodeURIComponent(
      result._id
    )}`;
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
      router.push(`/searchprofessors?search=${encodeURIComponent(searchTerm)}`);
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
                onFocus={() => setIsSearchOpen(true)} // Open search when input is focused
                onKeyDown={handleKeyDown}
              />
              {isSearchOpen && searchResults.length > 0 && (
                <SearchResults>
                  {searchResults.map((result, index) =>
                    result.college ? (
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
                    ) : null
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
