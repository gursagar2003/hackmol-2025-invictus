'use client'

import React from 'react'
import Sidebar from '@/assets/components/sidebar'
import Topbar from '@/assets/components/topbar'
import Issue from '@/assets/components/issue'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
export default function Browse() {
  const session=useSession();
  console.log(session)
  const id=session?.data?.user?.id
  const [image,updateImage]=useState('')
  const [visible,setVisible]=useState(null)
  const [repoData,setRepoData]=useState<any>([])
  const [projImage,setProjImage]=useState<any>(null)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    
      const fetchrepo=async()=>{
         await fetch('/api/add-projects',
          {
              method:'GET',
              headers:{
                  'Content-Type':'application/json'
              },
          }
         ).then((res)=>res.json())
        .then((data)=>{
              setRepoData(data.projects)
              setIsLoading(true);
         })

      }
      const fetchData=async()=>{
         await fetch('/api/add-issues',
          {
              method:'GET',
              headers:{
                  'Content-Type':'application/json'
              },
          }
         ).then((res)=>res.json())
         .then((data)=>{
              setRepoData(data.projects)
              setIsLoading(true);
         })
         
      }
      fetchData();
      
  },[])

  useEffect(()=>{
      if(session?.data?.user?.image){
          updateImage(session?.data?.user?.image)
      }
  },[session?.data?.user?.image])
  console.log(repoData)

    return (
        <div className='flex'>
            <div className='w-[16rem] '>
            <Sidebar />
            </div>
            <div className="flex-1">
                <Topbar/>
                <div className='px-10 pt-20'>
                    <div className='dark:text-white text-3xl my-1'>Projects</div>
                    <div className='dark:text-gray-400'>
                        Discover projects that match the languages you love to code in.
                    </div>

                    <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            repoData.map((repo: any) => {
                                if (!repo.image_url?.trim()) return null;
                                
                                return (
                                    <div key={repo.projectName} className="hover:scale-[1.02] transition-transform duration-200">
                                        <Link 
                                            href={`/projects/${repo.project_repository}`}
                                            className="block rounded-lg hover:bg-gray-800 transition-colors h-full"
                                        >
                                            <Issue 
                                                image={repo.image_url || 'back_2.jpg'}
                                                Project={repo.projectName}
                                                Fork={42}
                                                Stars={128}
                                                Contributors={8}
                                                shortDescription={repo.shortdes}
                                            />
                                        </Link>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="col-span-full text-center text-gray-400">
                                Loading projects...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}