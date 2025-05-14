import { Container, Grid, Typography } from "@mui/material";
import { ProductCard } from "../components/ProductCard";
import { useGetProductsQuery } from "../features/slices/products/productsSlice";
import { addItem } from "../features/slices/cart/cartSlice";
import { useDispatch } from "react-redux";

export const ProductList = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const dispatch = useDispatch();

  return (
    <>
      {isLoading ? (
        <Typography>Loading Products...</Typography>
      ) : isError ? (
        <Typography>No products found, try again...</Typography>
      ) : (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Grid container spacing={3} size={{ xs: 12, sm: 12, lg: 2 }}>
            {data.items.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onBuyClick={() => dispatch(addItem(product))}
              />
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};
