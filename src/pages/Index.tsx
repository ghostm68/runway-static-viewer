import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MirrorViewer from "@/components/MirrorViewer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingFinished = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onFinished={handleLoadingFinished} />}
      <div className={isLoading ? "opacity-0" : "animate-fade-up"}>
        <MirrorViewer />
      </div>
    </>
  );
};

export default Index;
