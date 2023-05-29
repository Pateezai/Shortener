import axios from 'axios'
import {useState} from 'react'
// const apikey = axios.create({
//     backendapi:"http://localhost:8000"
// })

const useFetch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const FetchGet = async (apikey) => {
            setLoading(true)
            try {
                const res = await axios.get(apikey)
                setData(res.data)
                console.log(res.data)
            } catch (err) {
                setError(err)
                console.log(err)
            }
            setLoading(false)
        }
        FetchGet()
      }, [apikey]);

      const FetchRe = async (apikey) => {
        setLoading(true)
        try {
            const res = await axios.get(apikey)
            setData(res.data)
            console.log(res.data)
        } catch (err) {
            setError(err)
            console.log(err)
        }
        setLoading(false)
    }
    

    
    return {data, loading, error, FetchRe}
}
export default useFetch