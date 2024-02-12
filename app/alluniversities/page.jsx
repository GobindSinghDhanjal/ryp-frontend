import React from 'react'
import UniversityList from './UniversityList'
import { universities } from '@/public/data/sampledata'

const page = () => {
  return (
    <div className="container">
        <div className="sub-container">
            <h2>
                Universites
            </h2>

            <UniversityList universities={universities}/>

        </div>
    </div>
  )
}

export default page