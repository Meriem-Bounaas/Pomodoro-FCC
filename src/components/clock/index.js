import {FaArrowDown, FaArrowUp, FaStop , FaPlay } from 'react-icons/fa'
import { useRef, useState } from 'react'
import {FiRefreshCw} from 'react-icons/fi'
import { useInterval } from 'usehooks-ts'
// import {formatTime} from '../../utils/index'

const Clock = () => {
    const [pause,setPause] = useState(5)
    const [session,setSession] = useState(25)
    const [isPlaying, setPlaying] = useState(false)
    const [time,setTime] = useState(session*60)
    const [isBreakTime,setisBreakTime] =useState(false)
    const [timerLabelTxt,settimerLabelTxt] = useState("Session")
    const audioPlayer=useRef()

    useInterval(() => {
        setTime(time => time-1);

        if (time < 1){
            audioPlayer.current.play()
            if(!isBreakTime){               
                setTime(pause*60);
                settimerLabelTxt("Break")
                setisBreakTime(true)
            }
            else{               
                setTime(session*60);
                settimerLabelTxt("Session")
                setisBreakTime(false)
            }
        }
        
    }, isPlaying ? 1000 : null);

    
    return(
        <div className=" w-2/4 h-3/4 flex flex-col gap-10  items-center">
                <div className=" text-center mt-5 font-serif text-4xl text-white flex gap-2">
                    <span >25 + 5 Clock</span>
                </div>

                <div className=" w-3/4 flex sm:flex-row flex-col justify-center items-center">
                    <div className=" flex m-2 p-3 flex-col w-3/5 items-center gap-3">
                        <div>
                            <label id="break-label" className=" font-bold text-white text-lg">Break Length</label>
                        </div>
                        <div className="gap-3 flex justify-center">
                            <button id="break-increment" className="" onClick={()=>{
                                if(!isPlaying){
                                    if(pause < 60)
                                    setPause(pause+1)
                                }
                            }}><FaArrowUp className="text-white"/></button>
                            <span id="break-length" className="text-white">{pause}</span>
                            <button id="break-decrement" onClick={()=>{
                                if(!isPlaying){
                                    if(pause > 1)
                                    setPause(pause-1)
                                }
                            }}><FaArrowDown className="text-white"/></button>
                        </div>
                    </div>

                    <div className=" flex m-2  p-3 flex-col w-3/5 items-center gap-3">
                        <div>
                            <label id="session-label" className=" font-bold text-white text-lg">Session Length</label>
                        </div>
                        <div className="gap-3 flex justify-center">
                            <button id="session-increment" onClick={()=>{
                                if(!isPlaying){
                                    if(session < 60)
                                    {setSession(session+1)
                                    setTime((session*60)+60)}
                                }
                            }}><FaArrowUp className="text-white"/></button>
                            <span id="session-length" className="text-white">{session}</span>
                            <button id="session-decrement" onClick={()=>{
                                if(!isPlaying){
                                    if(session > 1)
                                    {setSession(session-1)
                                    setTime((session*60)-60)}
                                }
                            }}><FaArrowDown className="text-white" /></button>
                        </div>
                    </div>
            </div>
            <>
            <audio id="beep" src="https://www.fesliyanstudios.com/play-mp3/4387" ref={audioPlayer} ></audio>
            <div className="border-4 p-3 rounded-3xl w-2/5 h-auto">
                <div id="timer-label" className="text-center text-white text-lg">{timerLabelTxt}</div>
                <label  className='flex justify-center'>
                    <span id="time-left" className='text-white text-6xl'>
                        {("0" + Math.floor(time / 60)).slice(-2) + ":" + ("0" + Math.floor(time % 60)).slice(-2)}
                    </span>
                    {/* <span id="time-left" className='text-white text-6xl'>{new Date(time * 1000).toISOString().slice(14, 19)}</span> */}
                    <span></span>
                </label>
            </div>

            <div className='flex gap-3'>
                <button id="start_stop" onClick={() => setPlaying(!isPlaying)}>
                    {isPlaying ?  <FaStop className='text-white text-2xl'  />:
                                   <FaPlay className='text-white text-2xl'/>   
                    }
                  
                </button>
                
                <button id="reset" onClick={()=>{
                    setPlaying(false)
                    setPause(5)
                    setSession(25)
                    setTime(25*60)
                    setisBreakTime(false)
                    settimerLabelTxt("Session")
                    audioPlayer.current.pause()
                    audioPlayer.current.currentTime = 0
                }}>
                    <FiRefreshCw  className='text-white text-2xl'/>
                </button>
                
            </div>
        </>
            
        </div>
    )
}

export default Clock