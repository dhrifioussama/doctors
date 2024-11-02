import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointments = () => {
  const docID= useParams()
  const {doctors, currencySymbol }= useContext(AppContext)
  const [docInfo,setDocInfo]= useState(null)
  const [docSolts, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex]= useState(0)
  const [slotTime, setSlotTime]= useState('')
  
  const fetchDochInfo=async() => {
    const docInfo= doctors.find(doc => doc._id === docID)
    setDocInfo(docInfo)
    console.log(docInfo);
  }
  const getAvailabaleSlots= async () => {
    setDocSlots([])


    //getting current date
    let today= new Date()


    for (let i=0 ; i<7 ; i++ ){
      //getting date with index
      let currentDate= new Date(today)
      currentDate.setDate(today.getDate()+i)

      //setting and time of the date with index
      let endTime= new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0) 

      //setting hours
      if(today.getDate()=== currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
    let timeSlots= []
    while(currentDate < endTime){
      let formatedTime = currentDate.toLocaleTimeString([], {hours: '2-digit', minute: '2-digit'})
      //add slot to array
      timeSlots.push({
        dateTime: new Date(currentDate),
        time: formatedTime
      })
      //increment current time by 30 minutes
      currentDate.setMinutes(currentDate.getMinutes()+30)
    } 
     setDocSlots( prev => [...prev, timeSlots] 
      
     )
    }
  } 
    
  
  useEffect(() => {
    fetchDochInfo()
  }, [doctors, docID])

  useEffect( () => {
    getAvailabaleSlots()
  }
  ,[docInfo])
  useEffect(() => {
    console.log(docSolts);
  },[docSolts])
  return docInfo &&(
    <div>
      {/* _______Doctor details__________ */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex flex-1 border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* ________docInfo: name, degree, experience_____________ */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>
            {docInfo.name} 
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docID.experience}</button>
          </div>

          {/* __________doctor about */}
          <div>                                                                                                                       
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4 '>Appointment fee: <span className='text-gray-600'>{docInfo.fees} {currencySymbol}</span></p>
        </div>

      </div>
    </div>
  )
}

export default Appointments