import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    //console.log("sorttttttttt: ", sort)

    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => {
                var dateA = new Date(a[sort]), dateB = new Date(b[sort])
                                
                //return dateA-dateB  //сортировка по возрастающей дате     
                return dateB-dateA  //сортировка по убывающей дате  
            })
        }
        return posts;
    }, [sort, posts])

    return sortedPosts;
}

export const useProjects = (posts2, sort, query, specId) => {
    const sortedPosts = useSortedPosts(posts2, sort);
    console.log("query: ", query)
    console.log("specId: ", specId)
    //console.log("context projects: ", posts2)

    const sortedAndSearchedPosts = useMemo(() => {

        if (query != '') {
            if (query === 'Все') {
                console.log("filter all")
                return sortedPosts.filter(post=> post.spec.find(item => item.id === specId)); //posts2; 
            }

            if (query === 'Новые') {
                return sortedPosts.filter(post => ((post.status != null ? post.status.name : '') === "Load" ||
                                        (post.status != null ? post.status.name : '') === "Ready" ||
                                        (post.status != null ? post.status.name : '') === "OnAir") && post.spec.find(item => item.id === specId))        //post2 
            }

            if (query === 'Старые') {         
                return sortedPosts.filter(post => ((post.status != null ? post.status.name : '') === "Done" ||
                                        (post.status != null ? post.status.name : '') === "Wasted") && post.spec.find(item => item.id === specId)) //post2      
            }
            
        }
        return sortedPosts; //posts2 

    }, [query, sortedPosts]) //post2

    return sortedAndSearchedPosts;
}