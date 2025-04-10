'use client'
import { useSession } from 'next-auth/react';
import {useEffect, useState} from'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '@/assets/components/sidebar';
import Topbar from '@/assets/components/topbar';
import Issue from '@/assets/components/issue';

import { Command } from 'cmdk';


export default function Home(){

    const [open, setOpen] = useState(false)

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e:any) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])


    const session=useSession();
    console.log(session)
    const id=session?.data?.user?.id
    const [image,updateImage]=useState('')
    const [visible,setVisible]=useState(null)
    const [repoData,setRepoData]=useState<any>([])
    const [projImage,setProjImage]=useState<any>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
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
        if(repoData.length>0){
            
            const getImage=async()=>
                {
                    await fetch(`/api/s3?fileName={}`,{
                        
                    }
                )
                }
        }
    },[])

    useEffect(()=>{
        if(session?.data?.user?.image){
            updateImage(session?.data?.user?.image)
        }
    },[session?.data?.user?.image])
    console.log(repoData)
    return(
        <>
        {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-blur bg-opacity-50 z-50">
                                        <Command.Dialog 
                        open={open} 
                        onOpenChange={setOpen} 
                        label="Global Command Menu"
                        className="w-[600px] fixed inset-0 m-auto h-[20rem] rounded-lg backdrop-blur-xl overflow-hidden border border-gray-800"
                    >
                        <Command.Input 
                            placeholder="Search projects..."
                            className="w-full p-4 bg-transparent outline-none"
                        />
                          <Command.List className="p-2 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            <Command.Empty className="p-2 text-gray-400">
                                No projects found.
                            </Command.Empty>
                            <div>
                            {repoData.map((repo: any) => (
                                <Command.Item
                                    key={repo.projectName}
                                    className="p-3 rounded hover:bg-gray-800 cursor-pointer my-1"
                                    onSelect={() => {
                                        window.location.href = `/projects/${repo.project_repository}`;
                                    }}
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        {repo.image_url && (
                                            <img
                                                src={repo.image_url}
                                                alt={repo.projectName}
                                                className="w-6 h-6 rounded-full flex-shrink-0"
                                            />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className="font-medium truncate">{repo.projectName}</div>
                                            <div className="text-sm text-gray-400 truncate">{repo.shortdes}</div>
                                        </div>
                                    </div>
                                </Command.Item>
                            ))}
                            </div>
                            
                        </Command.List>
                    </Command.Dialog>
                </div>
            )}
        <div className='flex'>
            <div className='w-[16rem] '>
            <Sidebar />
            </div>
            
            <div >
                <Topbar/>
                
                <div className='flex pt-16'>
                    <div className='w-1/2 px-4' >
                    <div className='pt-3  text-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-white to-gray-500 text-3xl font-bold'>
                        Start Contributing
                        </div>
                        <div className='text-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-white to-gray-500 text-3xl font-bold'>
                            Begin Earning
                        </div>
                        <h4 className="text-center pt-4 dark:text-gray-400 text-[15px]">
                        Get recommendations based on your profile and past contributions.
                        </h4>
                        <h4 className="text-center pt-2 dark:text-gray-400 text-[15px]">
                        Didn’t find what you’re looking for?
                        </h4>

                        <div className='flex mt-4 space-x-5'>
                        <div className='p-4 w-1/2 rounded-xl border-gray-400 dark:border-gray-800 border-1'>
                            <h3 className='text-[14px] flex'><svg xmlns="http://www.w3.org/2000/svg" className="my-auto mr-3" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 6.5h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 .827.827C22 8.59 22 9.393 22 11.5m-10-5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69 2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38 4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535C4.822 20.394 6.944 20.493 11 20.5h1m10 1l-2.147-2.147m0 0a3.43 3.43 0 0 0 1.004-2.424a3.429 3.429 0 1 0-1.004 2.424" color="currentColor"></path></svg>Browse</h3>
                            <p className='text-gray-500 text-[14px] pt-2'>Browse Projects and Dive into world of hidden rewards.</p>
                        </div>
                        <div className='p-4 w-1/2 rounded-xl border-gray-400 dark:border-gray-800 border-1'>
                            <h3 className='text-[14px] flex'><svg xmlns="http://www.w3.org/2000/svg" className="mr-3" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2m16 0h2m-7-1v2m-6-2v2"/></g></svg>GitBot</h3>
                            <p className='text-gray-500 text-[14px] pt-2'>Can't find Interting projects.Try our AI Bot to find porjects that you love.</p>
                        </div>
                    </div>
                    </div>
                    <div className='w-1/2 rounded-xl px-4 '>
                        <img 
                            src='/home_back.jpg' 
                            alt=""  
                            className='rounded-2xl h-[20em] object-cover w-full '
                        />
                    </div>
                    
                    
                       
                </div>
                <div className='mt-10 mx-4'>
                        <div>
                            <h1 className='pt-3 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-white to-gray-500 text-3xl font-bold'>Projects in your favorite languages </h1>
                            <p className='pt-2 dark:text-gray-400 text-[15px]'>Discover projects that match the languages you love to code in.</p>
                            
                            <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                isLoading ? (
                                    repoData.map((repo: any) => {
                                        if (!repo.image_url?.trim()) return null;
                                        
                                        return (
                                            <div key={repo.projectName} className="hover:scale-[1.02] transition-transform duration-200">
                                                <Link 
                                                    href={`/projects/${repo.project_repository}`}
                                                    className="block rounded-lg   hover:bg-gray-800 transition-colors h-full"
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
                                        );
                                    })
                                ) : (
                                    <div className="col-span-full text-center text-gray-400">
                                        Loading projects...
                                    </div>
                                )
                            }
                            </div>

                            
                        </div>
                </div>
            </div>
        </div>

        </>
    )

}