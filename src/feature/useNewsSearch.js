import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { API_KEY } from '../apikey';
import { axiosNewsbyWords } from '../store/store';

export default function useNewsSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [news, setNews] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const dispatch=useDispatch()
  
  async function axiosData() {
    // You can await here
    try{
    const res= await dispatch(axiosNewsbyWords({query,pageNumber,API_KEY}))    
    const dispatchData=await res.payload.data 
    setNews(prev => {return [...new Set([...prev, ...dispatchData.response.docs.map(news => news)])]})
    setHasMore(dispatchData.response.docs.length > 0)
    setLoading(false)
    }catch(e){
      setError(true)
    }   
  }

  useEffect(() => {
    setNews([])
  }, [query])
  useEffect(() =>  {
    if(!query) return setLoading(false);
    setLoading(true)
    setError(false) 
    axiosData();  

  }, [query, pageNumber])



  return { loading, error, news, hasMore }
}