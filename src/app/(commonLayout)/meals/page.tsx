import { getCategory } from '@/actions/category';
import { getAllMeals } from '@/actions/meals.action'
import RetrieveAllmeals from '@/components/modules/meals/RetrieveAllmeals';
import Notfounddata from '@/components/Notfounddata'
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { TResponseCategoryData } from '@/types/category';
import { TResponseMeals } from '@/types/meals.type';
import { Ipagination } from '@/types/pagination.type';
import { TResponseproviderData } from '@/types/provider.type';
import { TUser } from '@/types/user.type';
import React from 'react';


const GetMeals = async ({
  searchParams,
}: {
  searchParams:Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search =await searchParams
  const response = await getAllMeals(search);
  const categories=await getCategory()

  if(!response.success || !response.data){
    return <Notfounddata content='No meals found.' emoji="🍽️"/>
  }
  if (!categories || (categories.success === false) || !categories.data) {
    return <Notfounddata content="No categories found." emoji="📂" />;
  }
  return (
    <div className="px-4">
      {/* Error Boundary for meal data rendering */}
      <React.Suspense fallback={<div>Loading meals...</div>}>
        <ErrorBoundary fallback={<Notfounddata content="Something went wrong while loading meals." emoji="⚠️" />}>
          <RetrieveAllmeals categories={categories.data as TResponseCategoryData<{user:TUser}>[]} initialMeals={response.data as TResponseMeals<{provider:TResponseproviderData}>[]} pagination={response.pagination as Ipagination} />
        </ErrorBoundary>
      </React.Suspense>
 
    </div>
  )
}

export default GetMeals