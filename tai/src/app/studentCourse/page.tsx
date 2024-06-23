"use client"
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// import { AnimatePresence, motion } from 'framer-motion';

const StudentCourse = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [code, setCode] = useState('');

    useEffect(() => {
        const searchParamString = `${searchParams}`;
        const codeParam = searchParamString.replace(/(code=)/g, '').replace(/(\+)/g, ' ');
        console.log(codeParam);
        setCode(codeParam);
    }, [pathname, searchParams]);

    return null;
};
export default StudentCourse;