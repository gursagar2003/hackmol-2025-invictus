'use client'
 
import { useState } from 'react';
import { Octokit } from 'octokit';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from '@/assets/components/sidebar';
import Topbar from '@/assets/components/topbar';
import Issue from '@/assets/components/issue';
import { useSearchParams } from 'next/navigation';


export default function Anaylze() {
    const octokit = new Octokit({
        auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
    })
    const SearchParams = useSearchParams();
    const owner = SearchParams.get('owner');
    const repo = SearchParams.get('repo');

    const [repoTree, setRepoTree] = useState<any>(null);

    useEffect(() => {
        if (!owner || !repo) return;

        // First get the default branch
        octokit.request('GET /repos/{owner}/{repo}', {
            owner,
            repo
        })
        .then(({ data }) => {
            // Then get the tree recursively
            return octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
                owner,
                repo,
                tree_sha: data.default_branch,
                recursive: '1'
            });
        })
        .then(({ data }) => {
            setRepoTree(data.tree);
        })
        .catch((error) => {
            console.error('Error fetching repo tree:', error);
        });
    }, [owner, repo]);
    console.log(repoTree)

    return (
        <>
            {/* Render your repo tree data here */}
        </>
    )
}