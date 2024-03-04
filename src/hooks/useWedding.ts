import { getWedding } from '@/api/wedding';
import { Wedding } from '@/models/wedding';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

function useWedding() {
  const [wedding, setWedding] = useState<Wedding | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['wedding'],
    queryFn: () => {
      getWedding().then((res) => {
        if (!res.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.');
        }
        return res.json();
      });
    },
  });

  useEffect(() => {
    getWedding()
      .then((res) => {
        if (!res.ok) {
          setError(true);
          throw new Error('청첩장 정보를 불러오지 못했습니다.!!');
        }
        return res.json();
      })
      .then((data) => {
        setWedding(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { wedding, loading, error };
}

export default useWedding;
