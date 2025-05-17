import React, { useState } from "react";
import {
  Card,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const initialItems = [
  {
    id: 1,
    name: "Denim T-Shirt",
    color: "Blue",
    price: 7500,
    qty: 2,
    ref: "007197456",
    image:
      "https://shop.hardrock.com/dw/image/v2/BJKF_PRD/on/demandware.static/-/Sites-hardrock-master/default/dw7e130f3f/images/large/0886676483978_4.jpg?sw=800&sh=800",
  },
  {
    id: 2,
    name: "Denim Pants",
    color: "Blue",
    price: 9000,
    qty: 3,
    ref: "011015233",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxHI31OQa1XcVhN6G_E930tdxr9dzbYlGu8Q&s",
  },
  {
    id: 3,
    name: "Sony Smartwatch",
    color: "Black",
    price: 24500,
    qty: 1,
    ref: "004822981",
    image:
      "https://microless.com/cdn/products/12a2f56ce93e8f9ec3285002d855798d-hi.jpg",
  },
  {
    id: 4,
    name: "Cognac Oxford",
    color: "Brown",
    price: 4500,
    qty: 1,
    ref: "035772962",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSH3tbue18ElPmWpgo7EcYOpfT4hWziETLWg&s",
  },
];

export default function App() {
  const [cart, setCart] = useState(initialItems);
  const [cardType, setCardType] = useState("mastercard");
  const [cardPanelVisible, setCardPanelVisible] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleQtyChange = (itemId, diff) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, qty: Math.max(1, item.qty + diff) }
          : item
      )
    );
  };

  const deleteItem = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const total = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      minHeight="100vh"
      bgcolor="#f3f4f6"
      p={2}
    >
      <Box flex={2} pr={isMobile ? 0 : 4}>
        <Typography variant="h4" mb={3}>
          Shopping Cart Ui
        </Typography>

        {cart.map((item) => (
          <Card
            key={item.id}
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              p: 2,
              gap: 2,
            }}
          >
            <Box display="flex" gap={2} alignItems="center">
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9G-lY8DU6nRlvoWNql2T_mehbL19khYJavQ&s")
                }
              />
              <Box>
                <Typography>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Ref. {item.ref}
                </Typography>
              </Box>
            </Box>

            <Typography color="text.secondary">{item.color}</Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleQtyChange(item.id, -1)}
              >
                -
              </Button>
              <Typography>{item.qty}</Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleQtyChange(item.id, 1)}
              >
                +
              </Button>
            </Box>

            <Typography sx={{ minWidth: 100 }}>
              {(item.price * item.qty).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>

            <Button
              color="error"
              variant="text"
              onClick={() => deleteItem(item.id)}
            >
              ×
            </Button>
          </Card>
        ))}

        <Box mt={4} textAlign="right">
          <Typography variant="h6">
            Toplam:{" "}
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
        </Box>

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="text">←Shopping Back</Button>
          <Button
            variant="outlined"
            onClick={() => setCardPanelVisible((prev) => !prev)}
          >
            {cardPanelVisible ? "Cart Hidden" : "Cart Show"}
          </Button>
        </Box>
      </Box>

      <AnimatePresence>
        {cardPanelVisible && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: isMobile ? "100%" : "33%",
              background: "linear-gradient(to bottom, #1f2937, #111827)",
              color: "white",
              padding: "2rem",
              marginTop: isMobile ? "2rem" : 0,
              borderRadius: "8px",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, color: "#fbbf24" }}>
              Card Detals
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1 }}>Card Type</Typography>
              <RadioGroup
                row
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                sx={{ gap: 2 }}
              >
                {["mastercard", "visa", "verve"].map((type) => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio sx={{ color: "white" }} />}
                    label={type.toUpperCase()}
                    sx={{ color: "white" }}
                  />
                ))}
              </RadioGroup>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1 }}>Cart Number</Typography>
              <TextField
                placeholder="•••• •••• •••• ••••"
                fullWidth
                variant="outlined"
                InputProps={{
                  sx: { backgroundColor: "white", color: "black" },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <TextField
                placeholder="MM / YY"
                fullWidth
                variant="outlined"
                InputProps={{
                  sx: { backgroundColor: "white", color: "black" },
                }}
              />
              <TextField
                placeholder="•••"
                fullWidth
                variant="outlined"
                InputProps={{
                  sx: { backgroundColor: "white", color: "black" },
                }}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#fbbf24",
                color: "black",
                "&:hover": { backgroundColor: "#f59e0b" },
              }}
            >
              Complete Payment
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
