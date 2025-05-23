// import React, { useState } from 'react';
// import '../index.css';
// import { useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers';
// import Button from '../components/ui/Button';
// import { TextGenerateEffect } from '../components/ui/text-generate-effect';

// import { motion } from "motion/react";
// import { LinkPreview } from "../components/ui/link-preview";
// import ShinyText from '../components/ui/ShinyText';
// import { apiClient } from '../api/client';

// export default function Login() {
//     const [wallet, setWallet] = useState(null);
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [gender, setGender] = useState('male');
//     const [role] = useState('attendee');
//     const [message, setMessage] = useState('');
//     const [showRegistrationForm, setShowRegistrationForm] = useState(false);
//     const navigate = useNavigate();

//     const connectWallet = async () => {
//         if (!window.ethereum) {
//             setMessage('Please install MetaMask first.');
//             return;
//         }

//         try {
//             const provider = new ethers.BrowserProvider(window.ethereum);
//             const signer = await provider.getSigner();
//             const walletAddress = await signer.getAddress();
//             setWallet(walletAddress);

//             // Check if user exists in database
//             const { data } = await apiClient.get(
//                 `/api/getUserByWallet/${walletAddress}`,
//                 { withCredentials: true }
//             );

//             if (!data.exists) {
//                 setShowRegistrationForm(true);
//                 setMessage('New user detected. Please complete registration.');
//             }

//         } catch (err) {
//             // Handle actual errors (network issues, etc.)
//             console.error("Connection error:", err);
//             setMessage(err.response?.data?.message || 'Failed to connect wallet');
//         }
//     };

//     const handleRegistration = async (e) => {
//         e.preventDefault();
//         if (!wallet || !email || !username || !gender) {
//             setMessage('Please fill in all required fields.');
//             return;
//         }

//         try {
//             const response = await apiClient.post(
//                 `/api/register`,
//                 {
//                     wallet,
//                     email,
//                     username,
//                     gender,

//                 },
//                 { withCredentials: true }
//             );

//             setMessage(response.data.message);
//             await loginUser();
//         } catch (err) {
//             setMessage(err.response?.data?.message || 'Registration failed.');
//         }
//     };

//     const loginUser = async () => {
//         try {
//             const response = await apiClient.post(
//                 `/api/login`,
//                 { wallet },
//                 { withCredentials: true }
//             );

//             setMessage(response.data.message);
//             navigate('/dashboard');
//         } catch (err) {
//             setMessage(err.response?.data?.message || 'Login failed.');
//         }
//     };

//     return (
//         <div align='center'>
//             {!wallet ? (
//                 <div>
//                     <Button
//                         onClick={connectWallet}
//                         val={'Connect with MetaMask 🦊'}
//                         disabled={!window.ethereum ? true : false}
//                         color={'#9900FF8F'}
//                     />

//                     {/* </button> */}
//                     {!window.ethereum && (
//                         <span style={{ fontFamily: 'DM Serif Display, sans-serif', fontSize: '25px' }}>
//                             <LinkPreview url="https://metamask.io/download" quality={50}>
//                                 <b><ShinyText text={'MetaMask'} disabled={false} speed={3} /></b>
//                             </LinkPreview>{" "}
//                             must be installed
//                         </span>

//                     )}
//                 </div>
//             ) : (
//                 <div>
//                     {/* <h2 style={{ fontFamily: 'system-ui' }}>Wallet ID is collected🦊</h2><br />
//                     <ShinyText text={wallet} disabled={false} speed={3} className='custom-class' />

//                     <div align='center'>
//                         <br />
//                         <Button
//                             onClick={loginUser}
//                             val={'Continue to Dashboard'}
//                             color={'#0DFF008F'}
//                         />
//                     </div> */}
//                     {showRegistrationForm ? (
//                         <div className='login-form-wrapper'>
//                             <h2 style={{ fontFamily: 'system-ui' }}>Complete Registration</h2>
//                             <form onSubmit={handleRegistration}>
//                                 <div style={{ margin: '1rem 0' }}>
//                                     <label style={{ display: 'block', marginBottom: '0.5rem' }}>
//                                         Username:
//                                         <input
//                                             type="text"
//                                             value={username}
//                                             onChange={(e) => setUsername(e.target.value)}
//                                             style={{
//                                                 width: '100%',
//                                                 padding: '0.5rem',
//                                                 borderRadius: '4px',
//                                                 border: '1px solid #ccc'
//                                             }}
//                                             required
//                                         />
//                                     </label>
//                                 </div>

//                                 <div style={{ margin: '1rem 0' }}>
//                                     <label style={{ display: 'block', marginBottom: '0.5rem' }}>
//                                         Email:
//                                         <input
//                                             type="email"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                             style={{
//                                                 width: '100%',
//                                                 padding: '0.5rem',
//                                                 borderRadius: '4px',
//                                                 border: '1px solid #ccc'
//                                             }}
//                                             required
//                                         />
//                                     </label>
//                                 </div>

//                                 <div style={{ margin: '1rem 0' }}>
//                                     <label style={{ display: 'block', marginBottom: '0.5rem' }}>
//                                         Gender:
//                                         <select
//                                             value={gender}
//                                             onChange={(e) => setGender(e.target.value)}
//                                             style={{
//                                                 width: '100%',
//                                                 padding: '0.5rem',
//                                                 borderRadius: '4px',
//                                                 border: '1px solid #ccc'
//                                             }}
//                                         >
//                                             <option value="male">Male</option>
//                                             <option value="female">Female</option>
//                                             <option value="other">Other</option>
//                                         </select>
//                                     </label>
//                                 </div>

//                                 <Button
//                                     type="submit"
//                                     val="Complete Registration"
//                                     color="#0DFF008F"
//                                 />
//                             </form>
//                         </div>
//                     ) : (
//                         <div>
//                             <h2 style={{ fontFamily: 'system-ui' }}>Wallet ID is collected🦊</h2><br />
//                             <ShinyText text={wallet} disabled={false} speed={3} className='custom-class' />
//                             <div align='center'>
//                                 <br />
//                                 <Button
//                                     onClick={loginUser}
//                                     val={'Continue to Dashboard'}
//                                     color={'#0DFF008F'}
//                                     disabled={showRegistrationForm}
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )}
//             <div align='center'>
//                 {message && (
//                     <span style={{ fontFamily: 'system-ui', color: '#FF0000FF' }}>
//                         <TextGenerateEffect elements={[message]} duration={2} />
//                     </span>
//                 )}
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Button from '../components/ui/Button';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';
import { LinkPreview } from "../components/ui/link-preview";
import ShinyText from '../components/ui/ShinyText';
import { apiClient } from '../api/client';
import Input from '../components/ui/Input';
import Switch from '../components/ui/Options'

export default function Login() {
    const [wallet, setWallet] = useState(null);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('male');
    const [role] = useState('attendee');
    const [message, setMessage] = useState('');
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();

    const connectWallet = async () => {
        if (!window.ethereum) {
            setMessage('Please install MetaMask first.');
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            setWallet(walletAddress);

            // Check if user exists in database
            const { data } = await apiClient.get(
                `/api/getUserByWallet/${walletAddress}`,
                { withCredentials: true }
            );

            if (!data.exists) {
                setShowRegistrationForm(true);
                setMessage('New user detected. Please complete registration.');
            }

        } catch (err) {
            console.error("Connection error:", err);
            setMessage(err.response?.data?.message || 'Failed to connect wallet');
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (!wallet || !email.trim() || !username.trim()) {
            setMessage('Please fill in all required fields.');
            return;
        }

        try {
            const response = await apiClient.post(
                `/api/register`,
                { wallet, email, username, gender },
                { withCredentials: true }
            );

            console.log(response.data)

            setMessage(response.data.message);
            setShowRegistrationForm(false);
            setShowOtpInput(true);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Registration failed.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) {
            setMessage('Please enter the OTP.');
            return;
        }

        try {
            const response = await apiClient.post(
                '/api/verify-otp',
                {
                    wallet: wallet,
                    otp: otp.toString() // Ensure OTP is string
                },
                { withCredentials: true }
            );

            // setMessage(response.data.message);
            await loginUser();
        } catch (err) {
            console.error('Verification error:', err.response?.data || err);
            setMessage(err.response?.data?.message || 'OTP verification failed.');
        }
    };

    const loginUser = async () => {
        try {
            const response = await apiClient.post(
                `/api/login`,
                { wallet },
                { withCredentials: true }
            );

            // setMessage(response.data.message);
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed.';
            setMessage(errorMessage);
            if (err.response?.status === 401 && errorMessage.includes('verified')) {
                setShowOtpInput(true);
            }
        }
    };
    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
    };
    return (
        <div align='center'>
            {!wallet ? (
                <div>
                    <Button
                        onClick={connectWallet}
                        val={'Connect with MetaMask 🦊'}
                        disabled={!window.ethereum}
                        color={'#9900FF8F'}
                    />

                    {!window.ethereum && (
                        <span style={{ fontFamily: 'DM Serif Display, sans-serif', fontSize: '25px' }}>
                            <LinkPreview url="https://metamask.io/download" quality={50}>
                                <b><ShinyText text={'MetaMask'} disabled={false} speed={3} /></b>
                            </LinkPreview>{" "}
                            must be installed
                        </span>
                    )}
                </div>
            ) : (
                <div>
                    {showOtpInput ? (
                        <div className='otp-form-wrapper' align='center'>
                            <h2 style={{ fontFamily: 'system-ui' }}>Verify OTP</h2>
                            <form onSubmit={handleVerifyOtp}>
                                <div style={{ margin: '1rem 0' }}>
                                    <Input
                                        type="text"
                                        id="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        label="OTP"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    val="Verify OTP"
                                    color="#0DFF008F"
                                />
                            </form>
                        </div>
                    ) : showRegistrationForm ? (
                        <div className='login-form-wrapper'>
                            <h2 style={{ fontFamily: 'system-ui' }}>Complete Registration</h2>
                            <form onSubmit={handleRegistration}>

                                <div style={{ margin: '1rem 0' }}>
                                    <Input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        label="Username"
                                        required
                                    />

                                </div>

                                <div style={{ margin: '1rem 0' }}>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Email"
                                        required
                                    />
                                </div>

                                <div style={{ margin: '1rem 0' }}>
                                    {/* <span className="gender-label">Gender:</span> */}

                                    <Switch
                                        selectedGender={gender}
                                        onGenderChange={handleGenderChange}
                                    />
                                </div>
                                <br />
                                <Button
                                    type="submit"
                                    val="Complete Registration"
                                    color="#0DFF008F"
                                />
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h2 style={{ fontFamily: 'system-ui' }}>Wallet ID is collected🦊</h2>
                            <ShinyText text={wallet} disabled={false} speed={3} className='custom-class' />
                            <div align='center'>
                                <br />
                                <br />
                                <Button
                                    onClick={loginUser}
                                    val={'Continue to Dashboard'}
                                    color={'#0DFF008F'}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div align='center' style={{ alignItems: 'center', justifyContent: 'center' }}>
                {message && (
                    <span style={{ fontFamily: 'system-ui', color: '#FF0000FF' }} align='center'>
                        &nbsp;    <TextGenerateEffect elements={[message]} duration={2} />
                    </span>
                )}
            </div>
        </div>
    )
};
