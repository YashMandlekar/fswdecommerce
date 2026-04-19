import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";

function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        if (!orderId) {
          setStatus("Invalid Order");
          return;
        }

        const res = await API.get(`/payment/status/${orderId}`);

        setStatus(res.data.status);

      } catch (err) {
        console.error(err);
        setStatus("Error checking payment");
      }
    };

    checkStatus();
  }, [orderId]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Payment Status</h2>
      <h1>{status}</h1>
    </div>
  );
}

export default PaymentStatus;