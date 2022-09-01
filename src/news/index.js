import React,{useState,useRef,useCallback} from 'react'
import styled from 'styled-components';
import useNewsSearch from './../feature/useNewsSearch';
import Header from './../view/header';
import Footer from './../view/footer';
import { useSelector, useDispatch } from 'react-redux';
import { addcilp,deleteCilp} from './../store/store';

export default function Index() {
    const [query, setQuery]= useState('')
    const [pageNumber, setPageNumber] = useState(1)  
    const [timer, setTimer] = useState(null);    

    const { news, hasMore, loading,error} = useNewsSearch(query, pageNumber)
    const historyList = useSelector(({ history }) => history.history);
    const isClipList = useSelector(({ history }) => history.isClip);    

    const clipData = isClipList?.map(e=>e.web_url)     
    
    const dispatch= useDispatch()  
    const observer = useRef()  

    const lastElementRef = useCallback(node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    }, [loading, hasMore])  
    const handleSearch = (e) => {
        if (timer) {
          clearTimeout(timer);
          setTimer(null);
        }
        setTimer(
          setTimeout(() => {          
              setQuery(e.target.value)
              setPageNumber(1)                   
          }, 500)
        );
      }    
    return (
      <>
      <Header/>          
      <section>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
      <Relative>   
      <input onChange={handleSearch} placeholder="Search news.."/>       
      <Details open focus>
      <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">search list</summary>
       <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
           {historyList.map((item, index) => ( <p key={index}>{item}</p> ))}
        </div>
     </Details>
     </Relative>
        {news&&news.map((item,i) => (
          <div key={item._id}  className="bg-white shadow-lg p-6 rounded-lg ring-1">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900" >{item.headline.main}</h5>        
          <p className='mb-3 font-normal text-gray-700'>{item.pub_date.replace('T', ' ').substring(0, 19)}</p>           
        <span className="
        inline-flex items-center 
        px-3 py-1 mr-2 mb-2 text-sm 
        font-medium text-center text-white 
        bg-blue-700 rounded-lg 
        hover:bg-blue-800"
        onClick={()=>{
          if(clipData.indexOf(item.web_url)>=0){
            dispatch(deleteClip(item.web_url)) 
          }else{
           dispatch(addClip(
            {web_url:item.web_url,
            pub_date:item.pub_date.replace('T', ' ').substring(0, 19),
            main:item.headline.main, 
            id:item._id 
             }
             ))
             
        }       
        }}>

        {clipData.indexOf(item.web_url)>=0?'unClip':'Clip'}
         </span>
         <a href={item.web_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 mr-2 mb-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">detail
         </a>         
          </div>
        ))}
      </section>
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error...'}</div>
      <div ref={lastElementRef}></div>
      <Footer/>
    </>
     
    )
}

const Relative = styled.div.attrs({
  className: 'relative'
})`
  &{
    input {
      ${tw`block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      &:focus + details {
        display: block;
      }
    }
  }
`
const Details = styled.details.attrs({
  className: 'box-keyword open:bg-white open:ring-1 open:ring-black/5 open:shadow-lg p-6 rounded-lg'
})`
  display: none;
`