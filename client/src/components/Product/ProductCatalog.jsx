import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { styles } from "../../style/tailwindStyles";
import { renderProductList } from "../../utils/renderProductList";
import { useSortedProducts } from "../../utils/sortProduct";
import { getProduct } from "../../api/productApi";
import { filteredProducts } from "../../utils/filteredProducts";

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const products = getProduct();

  const searchedProducts = filteredProducts(products, searchTerm);

  const { sortedProducts, setSortBy, setSortOrder } =
    useSortedProducts(searchedProducts);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption.type);
    setSortOrder(sortOption.order);
    handleSortClose();
  };

  return (
    <Box className={`${styles.flexCenter} flex-col`}>
      <Typography
        variant="h3"
        component="h3"
        style={{
          marginTop: "5rem",
          marginBottom: "2rem",
        }}
      >
        Product Catalog
      </Typography>

      <Box className={`${styles.flexBetween} w-full px-[2rem]`}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          variant="secondary"
          onClick={handleSortClick}
          style={{ marginLeft: "1rem" }}
        >
          Sort
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleSortClose}
        >
          <MenuItem
            style={{ fontSize: "1rem" }}
            onClick={() => handleSortChange({ type: "name", order: "asc" })}
          >
            By Name (A-Z)
          </MenuItem>
          <MenuItem
            style={{ fontSize: "1rem" }}
            onClick={() => handleSortChange({ type: "name", order: "desc" })}
          >
            By Name (Z-A)
          </MenuItem>
          <MenuItem
            style={{ fontSize: "1rem" }}
            onClick={() => handleSortChange({ type: "price", order: "asc" })}
          >
            By Price (Low to High)
          </MenuItem>
          <MenuItem
            style={{ fontSize: "1rem" }}
            onClick={() => handleSortChange({ type: "price", order: "desc" })}
          >
            By Price (High to Low)
          </MenuItem>
        </Menu>
      </Box>

      {sortedProducts.length === 0 ? (
        <Typography
          variant="body1"
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            color: "#ffffff66",
          }}
        >
          No Products Found
        </Typography>
      ) : (
        <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[2rem]">
          {renderProductList(sortedProducts)}
        </Grid>
      )}
    </Box>
  );
};

export default ProductCatalog;
