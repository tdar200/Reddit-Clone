import { useRouter } from 'next/router'
import React from 'react'

function useGetIntId() {

    const router = useRouter()
    const intId =
      typeof router.query.id === "string" ? parseInt(router.query.id) : -1;


  return intId  
}

export default useGetIntId