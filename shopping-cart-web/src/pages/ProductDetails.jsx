import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useGetProductByIdQuery } from "../features/slices/products/productsSlice";
import { addItem } from "../features/slices/cart/cartSlice";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  const [selected, setSelected] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (isLoading)
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  if (isError || !product)
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Product not found</Alert>
      </Container>
    );

  const variants = product.options ?? [];

  const optionKeys = Array.from(
    new Set(
      variants.flatMap((variant) =>
        Object.keys(variant).filter((key) => key !== "quantity")
      )
    )
  );

  const valuesByKey = {};
  optionKeys.forEach((key) => {
    valuesByKey[key] = Array.from(
      new Set(
        variants.flatMap((variant) =>
          Array.isArray(variant[key]) ? variant[key] : [variant[key]]
        )
      )
    );
  });

  const matchingVariant = variants.find((variant) =>
    optionKeys.every((key) => {
      const selectedValue = selected[key];
      const variantValue = variant[key];
      if (Array.isArray(variantValue))
        return variantValue.includes(selectedValue);
      return variantValue === selectedValue;
    })
  );

  const handleChange = (key, value) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = () => {
    if (!matchingVariant || matchingVariant.quantity < 1) return;

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        selectedOptions: selected,
      })
    );
    setSnackbarOpen(true);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="h6">{product.brand}</Typography>
      <Typography>{product.price} SEK</Typography>

      {!product.available && (
        <Alert severity="warning" sx={{ my: 2 }}>
          This product is currently unavailable.
        </Alert>
      )}

      {optionKeys.map((key) => (
        <Box sx={{ my: 2 }} key={key}>
          <FormControl fullWidth>
            <InputLabel>{key}</InputLabel>
            <Select
              value={selected[key] ?? ""}
              label={key}
              onChange={(e) => handleChange(key, e.target.value)}
            >
              {valuesByKey[key].map((val) => (
                <MenuItem key={val} value={val}>
                  {String(val)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}

      {matchingVariant && (
        <Typography sx={{ mt: 1 }}>
          {matchingVariant.quantity > 0
            ? `${matchingVariant.quantity} in stock`
            : "Out of stock"}
        </Typography>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          disabled={
            !product.available ||
            !matchingVariant ||
            matchingVariant.quantity < 1
          }
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Added to cart"
      />
    </Container>
  );
};
