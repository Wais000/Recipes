import {useEffect,useState} from 'react'

const useFetch = (url) => {
    const [data,setData]=useState({results:null, loading:true, error: null})

    console.log(url);

    useEffect(()=>{
fetch(url)
.then((res)=> res.json())
.then((results=>setData({results, loading: false, error: null})))
.catch((error)=>setData({results:null, loading:false, error:error.message}))

    },[url])
  return data
}

export default useFetch