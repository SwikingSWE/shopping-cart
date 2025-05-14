import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

export const ProductCard = ({ id, name, brand, price, available }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: isMobile ? "100%" : "30%",
        boxSizing: "border-box",
      }}
    >
      <CardContent>
        <Typography variant="h6" noWrap>
          {name}
        </Typography>
        <Typography color="text.secondary">{brand}</Typography>
        <Typography>{price} SEK</Typography>
        {!available ? (
          <Typography color="error" variant="body2">
            Unavailable
          </Typography>
        ) : (
          <Box height={20} width={20}></Box>
        )}
      </CardContent>
      <CardActions sx={{ mt: "auto", justifyContent: "space-between" }}>
        <Button component={Link} to={`/product/${id}`} size="small">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};
