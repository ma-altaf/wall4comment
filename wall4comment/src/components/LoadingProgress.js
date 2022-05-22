function LoadingProgress({ progress = 0 }) {
    return (
        <div className="w-full h-full flex items-center justify-center absolute text-white text-3xl">
            <span className="backdrop-blur-[1px] bg-black opacity-50 w-full h-full absolute"></span>
            <p className="z-10">{progress}</p>
        </div>
    );
}

export default LoadingProgress;
