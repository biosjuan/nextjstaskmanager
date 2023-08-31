'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function ClearFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filersApplied =
    searchParams.get('status') || searchParams.get('priority');

  const onClear = () => {
    // remove search params
    router.refresh();
    router.push('/tasks');
  };
  if (!filersApplied) return null;
  return (
    <div>
      <h1 className='underline cursor-pointer' onClick={onClear}>
        Clear Filters
      </h1>
    </div>
  );
}

export default ClearFilters;
