import React from 'react'
import {useParams} from "react-router-dom"
import moment from "moment"
import {AnimatePresence, motion} from "framer-motion"
import {LuCircleAlert, LuListCollapse} from "react-icons/lu"
import SpinnerLoader from '../Home/SpinnerLoader'
import {toast} from "react-hot-toast"

const InterviewPrep = () => {

  const {sessionId} = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMore, setOpenLearnMore] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  //Fetch session data by session id
  const fetchSessionDetailsById = async () => {};

  //Generate Concept explanation
  const generateConceptExplanation = async (concept) => {};

  return (
    <div>
      interview prep page
    </div>
  )
}

export default InterviewPrep
