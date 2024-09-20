import { Suspense, useState, useEffect } from "react";
import { Spin } from 'antd';

const SuspenseComponent = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return     <Spin size="large"  className="flex justify-center items-center h-screen w-screen "/>;
  }

  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
}

const Container = ({ children }) => {
  return (
    <div className="container max-w-[1200px] mx-auto">
      {children}
    </div>
  );
}

export { SuspenseComponent, Container };
