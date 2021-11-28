
const Avatar = ({ name }: { name: string }) => {

    return <div className="w-[28px] h-[28px] font-[18px] flex items-center justify-center rounded-full bg-greylish bg-opacity-20">
        {name.slice(0, 2)}
    </div>
}

export default Avatar;