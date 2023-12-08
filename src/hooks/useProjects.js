import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    //console.log("sorttttttttt: ", sort)

    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => {
                var dateA = new Date(a[sort]), dateB = new Date(b[sort])
                                
                return dateA-dateB  //сортировка по возрастающей дате     
                //return dateB-dateA  //сортировка по убывающей дате  
            })
        }
        return posts;
    }, [sort, posts])

    return sortedPosts;
}

export const useProjects = (posts2, sort, query, specId) => {
    const sortedPosts = useSortedPosts(posts2, sort);

    const sortedAndSearchedPosts = useMemo(() => {

        //if (query != '') {
            //if (query === 'Все') {

                //return sortedPosts.filter(post=> post.specs.find(item => item.id === specId)); //posts2; 
            //}

            // if (query === 'Новые') {
            //     return sortedPosts.filter(post => post.specs.find(item => item.id === specId)) //post2 
            // }

            // if (query === 'Старые') {         
            //     return sortedPosts.filter(post => post.specs.find(item => item.id === specId)) //post2      
            // }
            
        //}

        return sortedPosts.filter(post=> post.specs.id === specId);

    }, [query, sortedPosts]) //post2

    return sortedAndSearchedPosts;
}