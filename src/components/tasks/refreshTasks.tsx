"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RefreshTasks = () => {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <></>;
};

export default RefreshTasks;
