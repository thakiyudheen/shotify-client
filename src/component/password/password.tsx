
import React, { useState, useEffect } from 'react';
import { FaCopy, FaSync } from 'react-icons/fa';
import Secure from '../../assets/Security.svg'
import {toast} from 'sonner'

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState(20);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordOptions, setPasswordOptions] = useState({
        uppercase: true,
        lowercase: true,
        digits: true,
        symbols: true
    });
    const [again ,setAgain]=useState(false)

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        toast.success('Copied Clipboard !')
    };
    
    useEffect(() => {
        const generateNewPassword = () => {
            const charset = {
                uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                lowercase: 'abcdefghijklmnopqrstuvwxyz',
                digits: '0123456789',
                symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
            };
    
            let characters = '';
            Object.entries(passwordOptions).forEach(([option, isSelected]) => {
                if (isSelected) {
                    characters += charset[option as keyof typeof charset];
                }
            });
    
            if (characters.length === 0) {
                setPassword('');
                return;
            }
    
            const newPassword = Array(passwordLength)
                .fill(null)
                .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
                .join('');
    
            setPassword(newPassword);
        };

        generateNewPassword();
    }, [passwordOptions, passwordLength,again]);

   
    const handleOptionChange = (option: keyof typeof passwordOptions) => {
        setPasswordOptions(prev => {
            const newOptions = { ...prev, [option]: !prev[option] };
            
            // Check if all options would be unchecked
            if (Object.values(newOptions).every(value => !value)) {
                // If so, don't allow the change
                return prev;
            }
            
            return newOptions;
        });
    };

    const calculatePasswordStrength = (pwd: string): string => {
        if (pwd.length < 8) return 'Weak';
        if (pwd.length < 12) return 'Medium';
        return 'Strong';
    };

    useEffect(() => {
        const strength = calculatePasswordStrength(password);
        setPasswordStrength(strength);
    }, [password]);


    return (
        <div className='flex flex-col md:flex-row justify-evenly items-start mt-[4vh] p-7 text-gray-300'>
        <div className="w-full md:w-2/4 space-y-4 p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-500">Password Generator</h1>
    
            <div className="dark:bg-gray-800 bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                <span className="text-md text-gray-500">{password}</span>
                <div className="flex space-x-2">
                    <button onClick={() => setAgain(!again)} className="text-blue-400 hover:text-blue-300"><FaSync /></button>
                    <button onClick={copyPassword} className="text-blue-400 hover:text-blue-300"><FaCopy /></button>
                </div>
            </div>
    
            <div className="flex justify-between items-center">
                <button onClick={copyPassword} className="bg-[blue] hover:bg-[blue] text-white py-2 px-4 rounded-lg flex items-center">
                    <small>COPY PASSWORD</small> <span className="ml-2">→</span>
                </button>
                <span className={`font-bold ${
                    passwordStrength === 'Weak' ? 'text-red-500' :
                    passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                }`}>
                    <small>{passwordStrength}</small>
                </span>
            </div>
    
            <div>
                <label className="block mb-2 text-gray-700">Password Length: {passwordLength}</label>
                <input
                    type="range"
                    min="8"
                    max="50"
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                    className="w-full bg-[blue]"
                />
            </div>
    
            <div className="grid grid-cols-2 gap-2">
                {Object.entries(passwordOptions).map(([option, value]) => (
                    <label key={option} className="flex items-center text-black dark:text-gray-500">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handleOptionChange(option as keyof typeof passwordOptions)}
                            className="mr-2 bg-[blue] text-[blue] w-7"
                        />
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                ))}
            </div>
            
        </div>
        <div className='w-full md:w-1/2 flex items-center justify-center'>
            <img src={Secure} alt="Secure" className='w-[80%] md:w-[60%]' />
        </div>
    </div>
    
    );
};

export default PasswordGenerator;