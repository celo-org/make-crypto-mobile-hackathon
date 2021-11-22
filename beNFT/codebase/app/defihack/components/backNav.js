import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

export default function BackNav() {
    const router = useRouter()

    return (
        <nav className="flex justify-start pl-6 mb-3 mt-11">
            <p className="text-white text-base cursor-pointer" onClick={router.back}>
                <ChevronLeftIcon className="h-6 inline-block" /> Back
            </p>
        </nav>
    )
}