
import React from 'react';
import Footer from '../view/footer';
import Header from '../view/header';
import { useDispatch,useSelector} from 'react-redux';
import {  deleteClip } from '../store/store';
import { PageContainer,Section } from '../news';


const ClipIndex = () => { 
    const dispatch=useDispatch()
    const isclipList = useSelector(({ history }) => history.isClip);   
    const clipData = isclipList?.map(e=>e.web_url)       
    return (
        <>
        <PageContainer>
        <Header/>
        <Section>     
        {isclipList&&isclipList.map((item) => (
            <div key={item.id}  className="bg-white shadow-lg p-6 rounded-lg ring-1 m-3">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900" >{item.main}</h5>        
            <p className='mb-3 font-normal text-gray-700'>{item.pub_date}</p>           
          <span className=" inline-flex items-center    px-3 py-1 mr-2 mb-2 text-sm       font-medium text-center text-white 
          bg-blue-700 rounded-lg  hover:bg-blue-800" onClick={()=>{        
            dispatch(deleteClip(item.web_url))         
        }}>{clipData.includes(item.web_url)?'unClip':'Clip'}</span>
           <a href={item.web_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 mr-2 mb-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">detail
           </a>         
          </div>
          ))}
        </Section>     
        <Footer/> 
        </PageContainer>           
        </>
    );
}

export default ClipIndex;