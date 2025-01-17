import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [ready, setReady] = useState(false);
  const [titleAlert, setTitleAlert] = useState(false);
  const [visibility, setVisibility] = useState(false);
  

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3000/post"
  );

  
  useEffect(() => {
    setPosts(data);
  }, [data]);


  

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  
  
  

  return (
    <DataContext.Provider
      value={{
        
        posts,
        setPosts,
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        ready,
        setReady,
         titleAlert,
         setTitleAlert,
         visibility,
         setVisibility,
          
      }}
    >
      {children}
    </DataContext.Provider> 
  );
};

export default DataContext;
