import React, { useEffect, useState } from 'react'
import './Challenges.css';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';



function Participatechallenges() {
    const [Data, setData] = useState([]);
    useEffect(() => {
        axiosInstance.post(`viewChallenges`)
            .then((res) => {
                console.log(res);
                setData(res.data.data);

            })
            .catch((err) => {
                console.log(err);
            });

    }, [])
    console.log(Data);

    return (
        <div className='participate-challengemain'>
            <div>
                <h2 className='participate-challengehead'>Participate Challenges</h2>
            </div>
            <div className='continer border participate-challengecard'>
                <div className='col-12'>
                    {Data.map((a) => {
                        return (
                            <div className='row'>

                                <div className='col-6'>
                                    <img src={`${imageUrl}/${a.picture?.filename}`} className=' object-fit-fill rounded participate-challenge-img' alt="..." />
                                </div>
                                <div className='col-6'>
                                    <div className='col-9'>
                                        <label className='participate-challenge-label'>Challenge Title</label>
                                        <input type='text' value={a.title} className='form-control participate-challenge-input'></input>
                                    </div>
                                    <div className='col-9'>
                                        <label className='participate-challenge-label'>Challenge Description</label>
                                        <textarea className='form-control participate-challenge-textarea' value={a.description}></textarea>
                                    </div>
                                    <div className='col-9'>
                                        <label className='participate-challenge-label'>Update daily status</label>
                                        <textarea className='form-control participate-challenge-textarea'></textarea>

                                    </div>
                                    <div>
                                        <button className='participate-challenge-submit' type='submit'>Submit</button>
                                    </div>
                                    <div>
                                        <button className='participate-challenge-cancel' type='submit'>Cancel</button>
                                    </div>
                                </div>

                            </div>
                        )
                    })}

                </div>
            </div>
        // </div>
    )
}

export default Participatechallenges