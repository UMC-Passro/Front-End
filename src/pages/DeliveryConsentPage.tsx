import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryConsentSheet from "../components/delivery/DeliveryConsentSheet";

export default function DeliveryConsentPage() {
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="relative mx-auto h-screen w-full max-w-[402px] overflow-hidden bg-white">
      <DeliveryConsentSheet onConfirm={handleConfirm} />
    </div>
  );
}