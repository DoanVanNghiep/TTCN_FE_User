import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PaymentPage from "@/components/payment/PaymentPage";

function App() {
  return (
    <Router>
      <Route path="/paymentCourse/:id" element={<PaymentPage />} />
    </Router>
  );
}

export default AppRouter;
