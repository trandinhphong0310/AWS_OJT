import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../Services/apiServices'
import { toast } from 'react-toastify'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isShowPassword, setIsShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleHomePage = () => {
    navigate('/')
  }
  const handleSignUpPage = () => {
    navigate('/register')
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM)
      navigate('/')
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }
  }

  return (
    <div className='min-h-screen flex flex-col px-4'>
      <div className='flex justify-between leading-[40px] mb-4'>
        <div className='flex items-center'>
          <svg viewBox="0 0 146 25" width="120" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#2A222B" d="M4.484.05c2.403 0 3.83 1.876 3.83 5.495v10.963c0 3.62-1.426 5.495-3.83 5.495-2.403 0-3.829-1.876-3.829-5.495V5.545C.655 1.925 2.081.05 4.485.05Zm21.965 0c7.1 0 7.646 3.066 7.646 7.165v7.644c0 4.088-.523 7.144-7.646 7.144h-7.887c-7.161 0-7.696-2.903-7.696-7.165l.01-7.634c0-4.088.56-7.154 7.659-7.154h7.914ZM127.759 19.394a.095.095 0 0 1-.095-.095V6.926c0-.052.043-.094.095-.094h2.713c.052 0 .094.042.094.094v1.525c0 .108.177.14.223.043.225-.477.548-.948.969-1.285.59-.472 1.301-.708 2.135-.708 1.675 0 2.815.717 3.421 2.151.033.077.144.082.182.008.358-.694.785-1.217 1.281-1.569.55-.393 1.258-.59 2.123-.59 1.518 0 2.666.464 3.445 1.392.778.92 1.168 2.155 1.168 3.704v7.635a.095.095 0 0 1-.092.094l-2.725.066a.094.094 0 0 1-.097-.095V12.27c0-2.14-.696-3.209-2.088-3.209-.747 0-1.345.378-1.793 1.133-.44.747-.661 1.792-.661 3.137V19.3a.094.094 0 0 1-.094.095h-2.69a.094.094 0 0 1-.094-.095v-7.03c0-.408-.016-.762-.047-1.061a3.963 3.963 0 0 0-.189-.873 1.767 1.767 0 0 0-.366-.684 1.487 1.487 0 0 0-.601-.425 2.108 2.108 0 0 0-.873-.165c-1.644 0-2.466 1.522-2.466 4.565V19.3a.094.094 0 0 1-.094.095h-2.784ZM122.052 6.83c.052 0 .095.043.095.095v1.682c0 .104.158.137.206.045.661-1.263 1.814-1.917 3.461-1.961a.094.094 0 0 1 .096.094V9.39a.096.096 0 0 1-.095.095c-.573.005-1.002.056-1.286.153a3.825 3.825 0 0 0-.695.212 2.137 2.137 0 0 0-.614.402 2.38 2.38 0 0 0-.531.695c-.134.276-.247.646-.342 1.11-.086.456-.13.986-.13 1.592v5.65a.094.094 0 0 1-.094.094h-2.784a.094.094 0 0 1-.094-.094V6.925c0-.052.042-.094.094-.094h2.713ZM94.888 15.913c.127 0 .218.122.176.242-.397 1.152-1.086 2.066-2.067 2.743-1.041.715-2.312 1.073-3.814 1.073-1.907 0-3.456-.61-4.648-1.828-1.184-1.227-1.776-2.831-1.776-4.813 0-1.259.274-2.387.823-3.386a5.975 5.975 0 0 1 2.3-2.347c.977-.566 2.078-.85 3.301-.85.834 0 1.593.122 2.276.366.684.244 1.26.578 1.729 1.003.468.424.866.932 1.191 1.521.326.582.565 1.208.715 1.876.152.66.231 1.36.239 2.1 0 .146-.004.275-.01.386a.18.18 0 0 1-.183.168h-9.309c-.112 0-.2.098-.184.21.144.948.512 1.708 1.105 2.28.644.613 1.446.92 2.407.92.731 0 1.359-.138 1.883-.413.494-.256.85-.632 1.071-1.13a.198.198 0 0 1 .18-.12h2.595Zm-9.205-3.992a.183.183 0 0 0 .181.217h6.35c.112 0 .2-.098.183-.21-.127-.817-.444-1.494-.95-2.031-.548-.582-1.31-.873-2.288-.873-.953 0-1.74.283-2.36.85-.571.514-.943 1.197-1.116 2.047ZM42.177 4.967a.189.189 0 0 1-.188-.189v-2.23c0-.104.084-.188.188-.188h12.858c.105 0 .19.084.19.188v2.23a.189.189 0 0 1-.19.189h-4.694a.189.189 0 0 0-.19.188v14.262a.189.189 0 0 1-.188.19H47.25a.189.189 0 0 1-.189-.19V5.155a.189.189 0 0 0-.189-.188h-4.695Z"></path><path fill="#2A222B" d="M56.584 6.81c.08 0 .152.051.178.128a521.38 521.38 0 0 0 1.608 4.58c.734 2.038 1.286 3.105 1.656 4.175a.032.032 0 0 0 .061-.001c.331-1.126.86-2.334 1.586-4.6a912.456 912.456 0 0 0 1.339-4.15.188.188 0 0 1 .18-.132h2.683c.131 0 .222.13.178.253a740.273 740.273 0 0 1-2.634 7.227c-.677 1.808-1.589 3.804-2.737 6.981-.582 1.58-1.616 2.369-3.311 2.746-1.195.265-1.783.28-2.026.265-.085-.005-.142-.076-.142-.161v-2.282c0-.097.073-.179.17-.188l.868-.083s.99-.154 1.318-.377c.523-.356.785-.862.942-1.318.157-.456.034-.796.034-.796-.605-1.589-1.45-3.274-2.536-6.05A1027.776 1027.776 0 0 1 53.7 7.066a.189.189 0 0 1 .177-.256h2.706ZM103.381 4.22a.202.202 0 0 1-.225.196 4.971 4.971 0 0 0-1 0c-.938.107-1.285 1.096-1.285 2.326v.402a.19.19 0 0 0 .189.188h2.132a.19.19 0 0 1 .189.19v2.08a.19.19 0 0 1-.189.19h-2.132a.19.19 0 0 0-.189.188v9.412a.189.189 0 0 1-.187.189l-2.478.025a.189.189 0 0 1-.19-.189V9.98a.189.189 0 0 0-.19-.189h-1.265a.189.189 0 0 1-.19-.188V7.52c0-.104.085-.189.19-.189h1.367c.105 0 .19-.084.19-.189.005-.213.015-.568.047-.854.048-.441 0-4.544 4.028-4.544h.999a.19.19 0 0 1 .189.188V4.22ZM74.87 6.649c3.46 0 6.264 2.957 6.264 6.604 0 3.646-2.804 6.603-6.264 6.603-1.605 0-3.07-.637-4.178-1.683-.093-.088-.251-.024-.251.104v6.16a.142.142 0 0 1-.142.142h-2.642a.142.142 0 0 1-.141-.141V6.983c0-.079.063-.142.141-.142H70.3c.078 0 .142.063.142.142v1.245c0 .128.158.192.251.104 1.109-1.047 2.573-1.683 4.178-1.683Zm-.554 2.51c-2.13 0-3.855 1.823-3.855 4.07 0 2.25 1.726 4.072 3.855 4.072 2.13 0 3.856-1.823 3.856-4.071 0-2.248-1.726-4.07-3.856-4.07ZM110.799 6.747c3.652 0 6.612 2.929 6.612 6.541 0 3.613-2.96 6.542-6.612 6.542s-6.612-2.93-6.612-6.542c0-3.612 2.96-6.54 6.612-6.54Zm0 2.377c-2.064 0-3.738 1.875-3.738 4.188 0 2.313 1.674 4.188 3.738 4.188 2.065 0 3.738-1.875 3.738-4.188 0-2.313-1.673-4.188-3.738-4.188Z"></path></svg>
        </div>
        <div className='flex gap-4 mt-2'>
          <span className='underline cursor-pointer'>Don't have an account yet?</span>
          <button onClick={handleSignUpPage} className='bg-black text-white px-3 rounded-xl text-[16px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-700'>Sign up</button>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-center px-4 bg-[rgb(247,247,248)]'>
        <div className='w-full max-w-md text-center'>
          <h1 className='text-[36px] font-semibold text-[#3C323E] mb-12'>Typeform</h1>
          <div className='mb-8'>
            <span className='text-[16px] text-[#655d67]'>Hello, who is this?</span>
          </div>
          <div className='text-left w-1/2 mx-auto'>
            <form onSubmit={handleLogin}>
              <div className='flex flex-wrap mb-6'>
                <label className='w-full text-[18px] text-[#3c323e]'>Email</label>
                <input
                  className='border rounded-sm border-gray-400 shadow-lg w-full py-1'
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className='flex flex-wrap mb-3'>
                <label className='w-full text-[18px] text-[#3c323e]'>Password</label>
                <input
                  className='border rounded-sm border-gray-400 shadow-lg w-full py-1'
                  type={isShowPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <span
                onClick={() => setIsShowPassword(!isShowPassword)}
                className='absolute left-[54.5%] top-[61%] -translate-y-1/2 cursor-pointer text-xl'
              >
                {isShowPassword ? <VscEye /> : <VscEyeClosed />}
              </span>

              <span className='mb-6 inline-block'>Forgot password?</span>
              <div className='text-center'>
                <button
                  type='submit'
                  className="
                text-white bg-black w-full p-2 rounded-lg text-[16px] cursor-pointer 
                transition-all duration-300 ease-in-out hover:bg-gray-800 hover:scale-[1.02]">Login
                </button>
              </div>
            </form>
            <button
              onClick={() => handleHomePage()}
              className='float-right mt-2 cursor-pointer'>
              Go to homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}