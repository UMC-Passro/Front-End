import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryRequestForm from "../components/delivery/DeliveryRequestForm";

export default function DeliveryRequestPage() {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return <DeliveryRequestForm onBack={handleBack} />;
}
