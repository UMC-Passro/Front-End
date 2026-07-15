import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryPaymentSheet from "../components/delivery/DeliveryPaymentSheet";

export default function DeliveryPaymentPage() {
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="relative mx-auto h-screen w-full max-w-[402px] overflow-hidden bg-white">
      <DeliveryPaymentSheet onConfirm={handleConfirm} />
    </div>
  );
}
