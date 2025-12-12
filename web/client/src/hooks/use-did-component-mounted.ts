import { useEffect, useState } from 'react';

const useDidComponentMount = () => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setMount(true);
  }, []);

  return mount;
};

export default useDidComponentMount;
