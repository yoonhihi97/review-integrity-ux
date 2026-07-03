import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import ReviewExplore from "./pages/ReviewExplore";
import SellerDetail from "./pages/SellerDetail";
import WriteReview from "./pages/WriteReview";
import Checkout from "./pages/Checkout";
import OrderComplete from "./pages/OrderComplete";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/:id/reviews" element={<ReviewExplore />} />
        <Route path="/seller/:id" element={<SellerDetail />} />
        <Route path="/review/write" element={<WriteReview />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-complete" element={<OrderComplete />} />
      </Routes>
    </BrowserRouter>
  );
}
