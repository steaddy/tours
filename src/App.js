import React, {useState, useEffect, useCallback} from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'

function App(callback, deps) {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState([]);

    const removeTour = id => {
        setTours(tours.filter(tour => tour.id !== id));
    };


    const fetchTours = async () => {
        try {
            const answer = await fetch(url);
            const response = await answer.json();
            setLoading(false);
            setTours(response);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }


    useEffect(() => {
        fetchTours();
    }, []);


    if (loading) {
        return (
            <main>
                <Loading/>
                <button onClick={fetchTours}>Fetch</button>
            </main>
        )
    }

    if (tours.length === 0) {
        return (
            <main>
                <div className="title">
                    <h2>No tours left</h2>
                    <button className='btn' onClick={fetchTours}>Refresh</button>
                </div>
            </main>
        )
    }

    return (
        <main>
            <Tours tours={tours} removeTour={removeTour}/>
        </main>
    )
}

export default App
