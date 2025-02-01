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

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    if (term.length === 0) {
      setIsLoading(false);
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch professors");
      }
      const data = await response.json();
      const filteredResults = data.filter((professor) =>
        professor.name.toLowerCase().includes(term.toLowerCase())
      );
      const limitedResults = filteredResults.slice(0, 4);
      setSearchResults(limitedResults);
    } catch (error) {
      console.error("Error fetching professors:", error);
      setSearchResults(["Didn't find"]);
    } finally {
      setIsLoading(false);
    }
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
                onFocus={handleSearchClick} // Open search when input is focused
                onKeyDown={handleKeyDown}
              />
              {isSearchOpen && (
                <SearchResults>
                  {isLoading ? (
                    <Typography
                      variant="body1"
                      sx={{
                        color: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Loading...
                    </Typography>
                  ) : searchResults.length === 0 ? (
                    <Typography
                      variant="body1"
                      sx={{ color: "black", padding: "5px" }}
                    >
                      No results found
                    </Typography>
                  ) : (
                    searchResults.map((result, index) => (
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
                    ))
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
